import { NextResponse } from 'next/server'

/**
 * Resume PDF download endpoint.
 *
 * Phase 2: Replace the 501 response with server-side PDF generation.
 * The PDF should be generated fresh on every request from the
 * Experience page content. See site-structure.md for full spec.
 *
 * PDF requirements (Phase 2):
 * - Fraunces for name and section headers
 * - Jost 400 for body text
 * - Warm neutral palette matching portfolio brand
 * - Single column, ATS-compatible (no tables, no text boxes)
 * - US Letter (8.5 × 11 in)
 * - QR code bottom-right linking to jayshock.com
 * - No caching — generated fresh every download
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    {
      error: 'PDF generation coming soon.',
      note:  'This endpoint is scaffolded for Phase 2. Wire up a PDF library (e.g. @react-pdf/renderer or Puppeteer) to complete the implementation.',
    },
    {
      status:  501,
      headers: { 'Content-Type': 'application/json' },
    },
  )
}
