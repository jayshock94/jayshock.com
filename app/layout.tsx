import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import Nav         from '@/components/nav/Nav'
import Footer      from '@/components/ui/Footer'
import ChatLazy    from '@/components/chat/ChatLazy'
import BloomScroll from '@/components/BloomScroll'
import '../styles/tokens.css'
import './globals.css'

// Outfit — single font family for the entire site
// 300 body, 400 UI/nav, 500 labels, 600 h4, 700 headings
const outfit = Outfit({
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display:  'swap',
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
      className={outfit.variable}
      data-theme="dark"
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">
        <BloomScroll />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatLazy />
      </body>
    </html>
  )
}
