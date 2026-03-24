import type { Metadata } from 'next'
import { Fraunces, Jost } from 'next/font/google'
import Nav    from '@/components/nav/Nav'
import Footer from '@/components/ui/Footer'
import '../styles/tokens.css'
import './globals.css'

// Fraunces — variable font with optical size axis
// Weight is controlled by the font-weight CSS property (400 throughout)
// opsz axis enables optical adaptation at different sizes
const fraunces = Fraunces({
  subsets: ['latin'],
  axes:    ['opsz'],
  variable: '--font-fraunces',
  display: 'swap',
})

// Jost — three weights: 300 body copy, 400 UI text, 500 uppercase labels
const jost = Jost({
  subsets: ['latin'],
  weight:  ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  title:       'Jay Shock — Product Designer',
  description:
    'I make complex products feel like they were always simple. 8 plus years in fintech and enterprise SaaS.',
  metadataBase: new URL('https://jayshock.com'),
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         'https://jayshock.com',
    siteName:    'Jay Shock',
    title:       'Jay Shock — Product Designer',
    description:
      'I make complex products feel like they were always simple. 8 plus years in fintech and enterprise SaaS.',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Jay Shock — Product Designer',
    description:
      'I make complex products feel like they were always simple.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jost.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
