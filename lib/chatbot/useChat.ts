'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import type { ChatMessage, ChatSession, SuggestionChip } from './types'
import { extractPageContext } from './pageContext'
import { getChipsForPage } from './suggestionChips'
import { pickCatPhrase, pickFactMessage } from './loadingMessages'

const STORAGE_KEY = 'jayshock-chat'
const CHIP_DELIMITER = '<<<CHIPS>>>'

/** Parse chip suggestions from the bot response and strip them from display text. */
function parseChips(text: string): { content: string; chips: SuggestionChip[] } {
  const idx = text.indexOf(CHIP_DELIMITER)
  if (idx === -1) return { content: text, chips: [] }

  const content = text.slice(0, idx).trim()
  const chipBlock = text.slice(idx + CHIP_DELIMITER.length).trim()
  const chips = chipBlock
    .split('\n')
    .filter(Boolean)
    .slice(0, 4) // max 4 chips
    .map(line => {
      const [label, ...rest] = line.split('|')
      return {
        label: label.trim(),
        message: (rest.join('|') || label).trim(),
      }
    })
    .filter(c => c.label.length > 0)

  return { content, chips }
}

/** Generate a unique ID for messages. */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/** Safely read session from sessionStorage. */
function loadSession(): ChatSession {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as ChatSession
      if (Array.isArray(parsed.messages)) return parsed
    }
  } catch {
    // Ignore parse errors
  }
  return { messages: [], usedLoadingIds: [] }
}

/** Save session to sessionStorage. */
function saveSession(session: ChatSession): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  } catch {
    // Ignore quota errors
  }
}

/** Greeting messages per page type. */
const GREETINGS: Record<string, string[]> = {
  home: [
    "Hey! I'm Barnaby. I know basically everything about Jay and almost nothing about anything else. What do you want to know?",
  ],
  'work-index': [
    "Looking at Jay's work? Good taste. I'm Barnaby, I can tell you about any of these projects. Pick one or ask me to recommend.",
  ],
  about: [
    "Ah, the about page. This is where I get to brag. I'm Barnaby. What do you want to know about Jay?",
  ],
  experience: [
    "Looking at Jay's experience? I'm Barnaby. I can break down any role, or just tell you what matters most. Your call.",
  ],
  contact: [
    "Ready to reach out? I'm Barnaby. I can answer any last questions, or you can just go for it. Jay's pretty responsive.",
  ],
}

function getGreeting(pageType: string, caseStudyTitle?: string): string {
  if (pageType === 'case-study' && caseStudyTitle) {
    const options = [
      `Oh, you're looking at ${caseStudyTitle}. Good choice. I'm Barnaby. Got questions about this one?`,
      `${caseStudyTitle}? Jay won't stop talking about this one. I'm Barnaby, ask me anything about it.`,
    ]
    return options[Math.floor(Math.random() * options.length)]
  }

  const options = GREETINGS[pageType] ?? GREETINGS.home
  return options[Math.floor(Math.random() * options.length)]
}

export function useChat() {
  const pathname = usePathname()
  const pageContext = extractPageContext(pathname)

  // Initialize state from sessionStorage
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const session = loadSession()
    if (session.messages.length > 0) return session.messages

    // First load: generate greeting
    const greeting: ChatMessage = {
      id: generateId(),
      role: 'assistant',
      content: getGreeting(pageContext.pageType, pageContext.caseStudyTitle),
      timestamp: new Date().toISOString(),
    }
    return [greeting]
  })

  const [usedLoadingIds, setUsedLoadingIds] = useState<string[]>(() => {
    return loadSession().usedLoadingIds
  })

  const [isOpen, setIsOpen] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null)

  // Track whether user has interacted (to show static vs dynamic chips)
  const hasInteracted = useRef(messages.length > 1)

  // Persist to sessionStorage whenever messages change
  useEffect(() => {
    saveSession({ messages, usedLoadingIds })
  }, [messages, usedLoadingIds])

  // Chips: static page chips before first interaction, dynamic from last bot message after
  const chips: SuggestionChip[] = (() => {
    if (!hasInteracted.current) {
      return getChipsForPage(pageContext)
    }
    // Find the last assistant message and return its chips
    const lastBot = [...messages].reverse().find(m => m.role === 'assistant')
    return lastBot?.chips ?? []
  })()

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen(prev => !prev), [])

  const sendMessage = useCallback(
    async (text: string) => {
      const userMessage: ChatMessage = {
        id: generateId(),
        role: 'user',
        content: text,
        timestamp: new Date().toISOString(),
      }

      // Mark as interacted (switches from static to dynamic chips)
      hasInteracted.current = true

      setMessages(prev => [...prev, userMessage])
      setIsStreaming(true)
      setIsWaiting(true)

      // Always pick a fun fact for the persistent psst tag
      const fact = pickFactMessage(usedLoadingIds)
      setUsedLoadingIds(prev => [...prev, fact.id])

      // Show rotating cat phrases while loading
      const shownPhraseIds: string[] = []
      const first = pickCatPhrase(shownPhraseIds)
      shownPhraseIds.push(first.id)
      setLoadingMessage(first.text)

      const phraseInterval = setInterval(() => {
        const next = pickCatPhrase(shownPhraseIds)
        shownPhraseIds.push(next.id)
        setLoadingMessage(next.text)
      }, 2500)

      // Minimum time to show the loading message so users can read it
      const MIN_LOADING_MS = 2000
      const loadingStart = Date.now()

      // Create the assistant message placeholder
      const assistantId = generateId()
      const assistantMessage: ChatMessage = {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: new Date().toISOString(),
      }

      try {
        // Build messages for the API (just role + content)
        const apiMessages = [...messages, userMessage].map(m => ({
          role: m.role,
          content: m.content,
        }))

        // Retry up to 2 times on transient failures
        const MAX_RETRIES = 2
        let accumulated = ''
        let hasError = false

        for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
          accumulated = ''
          hasError = false

          try {
            const response = await fetch('/api/chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                messages: apiMessages,
                currentPage: pathname,
              }),
            })

            if (!response.ok || !response.body) {
              // Don't retry client errors (rate limit, bad input)
              if (response.status === 429 || response.status === 400) {
                const errBody = await response.json().catch(() => null)
                accumulated = errBody?.error ?? "Let's slow down a bit. Try again in a minute."
                break
              }
              if (attempt < MAX_RETRIES) {
                await new Promise(r => setTimeout(r, 1000 * (attempt + 1)))
                continue
              }
              throw new Error(`API error: ${response.status}`)
            }

            const reader = response.body.getReader()
            const decoder = new TextDecoder()

            while (true) {
              const { done, value } = await reader.read()
              if (done) break

              const chunk = decoder.decode(value, { stream: true })
              const lines = chunk.split('\n\n').filter(line => line.startsWith('data: '))

              for (const line of lines) {
                const data = line.slice(6)
                if (data === '[DONE]') continue

                try {
                  const parsed = JSON.parse(data)
                  if (parsed.error) {
                    hasError = true
                    break
                  }
                  if (parsed.text) {
                    accumulated += parsed.text
                  }
                } catch {
                  // Ignore malformed JSON chunks
                }
              }
              if (hasError) break
            }

            // If stream errored but we have retries left, try again
            if (hasError && attempt < MAX_RETRIES) {
              await new Promise(r => setTimeout(r, 1000 * (attempt + 1)))
              continue
            }

            // Success or final attempt — break out of retry loop
            break
          } catch (fetchErr) {
            if (attempt < MAX_RETRIES) {
              await new Promise(r => setTimeout(r, 1000 * (attempt + 1)))
              continue
            }
            throw fetchErr
          }
        }

        // If still errored after retries, show error message
        if (hasError) {
          accumulated = "Something went sideways on my end. Give me a sec and try again? If it keeps happening, Jay's contact info is on the contact page. He's nicer than me anyway."
        }

        // Wait for minimum loading time so users can read the message
        const elapsed = Date.now() - loadingStart
        const remaining = MIN_LOADING_MS - elapsed
        if (remaining > 0) {
          await new Promise(r => setTimeout(r, remaining))
        }

        // Stop rotating cat phrases and show the response
        if (phraseInterval) clearInterval(phraseInterval)
        setIsWaiting(false)
        setLoadingMessage(null)

        if (accumulated) {
          const parsed = parseChips(accumulated)
          setMessages(prev => [
            ...prev,
            {
              ...assistantMessage,
              content: parsed.content,
              loadingFact: fact.text,
              chips: parsed.chips.length > 0 ? parsed.chips : undefined,
            },
          ])
        } else {
          setMessages(prev => [
            ...prev,
            {
              ...assistantMessage,
              content: "Something went sideways on my end. Give me a sec and try again?",
            },
          ])
        }
      } catch {
        if (phraseInterval) clearInterval(phraseInterval)
        setIsWaiting(false)
        setLoadingMessage(null)
        setMessages(prev => [
          ...prev,
          {
            ...assistantMessage,
            content: "Something went sideways on my end. Give me a sec and try again? If it keeps happening, Jay's contact info is on the contact page.",
          },
        ])
      } finally {
        if (phraseInterval) clearInterval(phraseInterval)
        setIsStreaming(false)
        setIsWaiting(false)
        setLoadingMessage(null)
      }
    },
    [messages, pathname, usedLoadingIds]
  )

  const selectChip = useCallback(
    (chip: SuggestionChip) => {
      sendMessage(chip.message)
    },
    [sendMessage]
  )

  // Hide chips while waiting for a response
  const visibleChips = isWaiting || isStreaming ? [] : chips

  return {
    messages,
    isOpen,
    isStreaming,
    isWaiting,
    loadingMessage,
    chips: visibleChips,
    open,
    close,
    toggle,
    sendMessage,
    selectChip,
  }
}
