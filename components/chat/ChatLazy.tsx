'use client'

import dynamic from 'next/dynamic'

const ChatRoot = dynamic(() => import('./ChatRoot'), {
  ssr: false,
  loading: () => null,
})

export default function ChatLazy() {
  return <ChatRoot />
}
