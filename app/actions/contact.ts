'use server'

import { Resend } from 'resend'

export interface ContactFormState {
  status: 'idle' | 'success' | 'error'
  message?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const TOPIC_LABELS: Record<string, string> = {
  job:        'Job opportunity',
  consulting: 'Consulting inquiry',
  hello:      'Just saying hello',
}

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name    = formData.get('name')?.toString().trim()    ?? ''
  const email   = formData.get('email')?.toString().trim()   ?? ''
  const topic   = formData.get('topic')?.toString()          ?? ''
  const message = formData.get('message')?.toString().trim() ?? ''

  if (!name || !email || !topic || !message) {
    return { status: 'error', message: 'All fields are required.' }
  }

  if (!EMAIL_RE.test(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' }
  }

  const topicLabel = TOPIC_LABELS[topic] ?? topic

  // Send via Resend if API key is available, otherwise log
  const apiKey = process.env.RESEND_API_KEY
  if (apiKey) {
    try {
      const resend = new Resend(apiKey)
      await resend.emails.send({
        from: 'Jay Shock Portfolio <hello@jayshock.com>',
        to: 'hello@jayshock.com',
        replyTo: email,
        subject: `[Portfolio] ${topicLabel} from ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Topic: ${topicLabel}`,
          '',
          message,
        ].join('\n'),
      })
    } catch (err) {
      console.error('[Contact Form] Resend error:', err)
      return { status: 'error', message: 'Something went wrong. Try emailing me directly at hello@jayshock.com.' }
    }
  } else {
    console.log('[Contact Form] No RESEND_API_KEY, logging:', { name, email, topic, chars: message.length })
  }

  return { status: 'success' }
}
