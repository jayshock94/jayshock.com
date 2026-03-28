'use client'

import { useChat } from '@/lib/chatbot/useChat'
import ChatFAB from './ChatFAB'
import ChatPanel from './ChatPanel'

export default function ChatRoot() {
  const chat = useChat()

  return (
    <>
      <ChatFAB
        isOpen={chat.isOpen}
        isStreaming={chat.isStreaming}
        onClick={chat.toggle}
        pageType={chat.pageType}
      />

      {chat.isOpen && (
        <ChatPanel
          messages={chat.messages}
          isStreaming={chat.isStreaming}
          isWaiting={chat.isWaiting}
          loadingMessage={chat.loadingMessage}
          chips={chat.chips}
          onSendMessage={chat.sendMessage}
          onSelectChip={chat.selectChip}
          onClose={chat.close}
        />
      )}
    </>
  )
}
