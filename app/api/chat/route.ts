import Anthropic from '@anthropic-ai/sdk'
import { headers } from 'next/headers'
import { buildSystemPrompt } from '@/lib/chatbot/systemPrompt'
import { extractPageContext } from '@/lib/chatbot/pageContext'
import {
  sanitizeInput,
  filterResponse,
  checkRateLimit,
  MAX_INPUT_LENGTH,
} from '@/lib/chatbot/guardrails'
import type { ChatRequest } from '@/lib/chatbot/types'

function getClient() {
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) {
    throw new Error('ANTHROPIC_API_KEY environment variable is not set')
  }
  return new Anthropic({ apiKey: key })
}

/** Maximum messages to send to the API (keeps context manageable). */
const MAX_HISTORY = 15

/** Extract a best-effort client IP from request headers. */
async function getClientIp(): Promise<string> {
  const h = await headers()
  return (
    h.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    h.get('x-real-ip') ??
    'unknown'
  )
}

export async function POST(req: Request): Promise<Response> {
  try {
    /* ---- Rate limiting ---- */
    const ip = await getClientIp()
    if (!checkRateLimit(ip)) {
      return Response.json(
        { error: 'Slow down a bit! Try again in a few minutes.' },
        { status: 429 }
      )
    }

    const body: ChatRequest = await req.json()

    /* ---- Input length cap ---- */
    const lastMsg = body.messages[body.messages.length - 1]
    if (lastMsg && lastMsg.content.length > MAX_INPUT_LENGTH) {
      return Response.json(
        { error: 'Message is too long. Keep it under 500 characters.' },
        { status: 400 }
      )
    }

    // Cap conversation history
    const recentMessages = body.messages.slice(-MAX_HISTORY)

    /* ---- Input sanitization ---- */
    // If the latest user message triggers injection patterns, prepend a
    // reinforcement system note so the model stays in character.
    const reinforcement = lastMsg ? sanitizeInput(lastMsg.content) : null

    const pageContext = extractPageContext(body.currentPage)
    const systemPrompt = buildSystemPrompt(pageContext)

    const anthropic = getClient()

    // Build the system prompt, optionally with reinforcement
    const finalSystem = reinforcement
      ? `${systemPrompt}\n\n${reinforcement}`
      : systemPrompt

    // Create streaming response
    const stream = anthropic.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 180,
      system: finalSystem,
      messages: recentMessages.map(m => ({
        role: m.role,
        content: m.content,
      })),
    })

    /* ---- Response filtering (post-stream) ---- */
    // We collect the full response, run leak detection, then stream the
    // (possibly replaced) result to the client. This adds minimal latency
    // since we still use the streaming SDK to get fast TTFB from Anthropic,
    // we just buffer before forwarding.
    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          let fullText = ''

          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              fullText += event.delta.text
            }
          }

          // Run leak filter on the complete response
          const safeText = filterResponse(fullText)

          // Stream the safe response to the client
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ text: safeText })}\n\n`)
          )
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Stream error'
          console.error('[chat] Stream error:', message)
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: message })}\n\n`)
          )
          controller.close()
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[chat] Route error:', message)
    return Response.json({ error: message }, { status: 500 })
  }
}
