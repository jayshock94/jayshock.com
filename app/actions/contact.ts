'use server'

export interface ContactFormState {
  status: 'idle' | 'success' | 'error'
  message?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Contact form server action.
 *
 * Phase 2: Wire up an email provider (Resend, Postmark, SendGrid, etc.)
 * in place of the console.log call below. The function signature and
 * return shape should stay the same — only the sending logic changes.
 */
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

  // Phase 2 TODO: send email to hello@jayshock.com
  console.log('[Contact Form]', { name, email, topic, chars: message.length })

  return { status: 'success' }
}
