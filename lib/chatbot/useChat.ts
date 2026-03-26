'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import type { ChatMessage, ChatSession, SuggestionChip } from './types'
import { extractPageContext } from './pageContext'
import { getChipsForPage } from './suggestionChips'
import { pickLoadingMessage } from './loadingMessages'

const STORAGE_KEY = 'jayshock-chat'

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
    "Hey! I'm Barnaby. I know basically everything about Jay and almost nothing about anything else. What can I help with?",
    "Oh, hi! I'm Barnaby. I live on this site and I'm extremely biased toward Jay. Ask me anything about his work.",
    "Hi! I'm Barnaby. I'm Jay's AI assistant and honestly his biggest fan. What do you want to know?",
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
  const [showChips, setShowChips] = useState(true)

  // Track whether user has interacted (to hide chips after first message)
  const hasInteracted = useRef(messages.length > 1)

  // Persist to sessionStorage whenever messages change
  useEffect(() => {
    saveSession({ messages, usedLoadingIds })
  }, [messages, usedLoadingIds])

  // Get page-aware chips
  const chips = showChips && !hasInteracted.current
    ? getChipsForPage(pageContext)
    : []

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

      // Hide chips after first user interaction
      hasInteracted.current = true
      setShowChips(false)

      setMessages(prev => [...prev, userMessage])
      setIsStreaming(true)
      setIsWaiting(true)

      // Pick a loading message (not on the very first exchange — greeting was instant)
      const shouldShowLoading = messages.length > 1
      if (shouldShowLoading) {
        const picked = pickLoadingMessage(usedLoadingIds)
        setLoadingMessage(picked.text)
        setUsedLoadingIds(prev => [...prev, picked.id])
      }

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

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: apiMessages,
            currentPage: pathname,
          }),
        })

        if (!response.ok || !response.body) {
          throw new Error(`API error: ${response.status}`)
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let accumulated = ''
        let firstToken = true

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n\n').filter(line => line.startsWith('data: '))

          for (const line of lines) {
            const data = line.slice(6) // Remove 'data: '

            if (data === '[DONE]') continue

            try {
              const parsed = JSON.parse(data)

              if (parsed.error) {
                accumulated = "Something went sideways on my end \u2014 give me a sec and try again? If it keeps happening, Jay's contact info is on the contact page. He's nicer than me anyway."
                break
              }

              if (parsed.text) {
                if (firstToken) {
                  // First token arrived — hide loading message and typing indicator
                  setIsWaiting(false)
                  setLoadingMessage(null)
                  firstToken = false

                  // Add the assistant message to the list
                  accumulated = parsed.text
                  setMessages(prev => [
                    ...prev,
                    { ...assistantMessage, content: accumulated },
                  ])
                } else {
                  accumulated += parsed.text
                  // Update the last message in place
                  setMessages(prev => {
                    const updated = [...prev]
                    const last = updated[updated.length - 1]
                    if (last && last.id === assistantId) {
                      updated[updated.length - 1] = { ...last, content: accumulated }
                    }
                    return updated
                  })
                }
              }
            } catch {
              // Ignore malformed JSON chunks
            }
          }
        }

        // If we never got any tokens, show error
        if (firstToken) {
          setIsWaiting(false)
          setLoadingMessage(null)
          setMessages(prev => [
            ...prev,
            {
              ...assistantMessage,
              content: "Something went sideways on my end \u2014 give me a sec and try again?",
            },
          ])
        }
      } catch {
        setIsWaiting(false)
        setLoadingMessage(null)
        setMessages(prev => [
          ...prev,
          {
            ...assistantMessage,
            content: "Something went sideways on my end \u2014 give me a sec and try again? If it keeps happening, Jay's contact info is on the contact page.",
          },
        ])
      } finally {
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

  return {
    messages,
    isOpen,
    isStreaming,
    isWaiting,
    loadingMessage,
    chips,
    showChips,
    open,
    close,
    toggle,
    sendMessage,
    selectChip,
  }
}
