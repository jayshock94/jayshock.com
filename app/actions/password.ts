'use server'

/**
 * Password validation for NDA-protected case studies.
 *
 * This is a professional courtesy lock, not a security system.
 * Set the env var on Vercel before publishing the site.
 *
 * CASE_PASSWORD_LES — lending-engine-service
 */
const PASSWORDS: Record<string, string | undefined> = {
  'lending-engine-service': process.env.CASE_PASSWORD_LES,
}

export async function validateCasePassword(
  slug: string,
  password: string,
): Promise<boolean> {
  const expected = PASSWORDS[slug]
  if (!expected) return false
  return password.trim() === expected.trim()
}
