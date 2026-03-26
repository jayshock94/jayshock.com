import Anthropic from '@anthropic-ai/sdk'
import { buildSystemPrompt } from '@/lib/chatbot/systemPrompt'
import { extractPageContext } from '@/lib/chatbot/pageContext'
import type { ChatRequest } from '@/lib/chatbot/types'

function getClient() {
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) {
    throw new Error('ANTHROPIC_API_KEY environment variable is not set')
  }
  return new Anthropic({ apiKey: key })
}

/** Maximum messages to send to the API (keeps context manageable). */
const MAX_HISTORY = 20

export async function POST(req: Request): Promise<Response> {
  try {
    const body: ChatRequest = await req.json()

    // Cap conversation history
    const recentMessages = body.messages.slice(-MAX_HISTORY)

    const pageContext = extractPageContext(body.currentPage)
    const systemPrompt = buildSystemPrompt(pageContext)

    const anthropic = getClient()

    // Create streaming response
    const stream = anthropic.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 250,
      system: systemPrompt,
      messages: recentMessages.map(m => ({
        role: m.role,
        content: m.content,
      })),
    })

    // Convert to SSE ReadableStream
    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
              )
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Stream error'
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
    return Response.json({ error: message }, { status: 500 })
  }
}
