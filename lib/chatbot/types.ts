/** Role in the conversation. 'system' is never stored in messages array. */
export type MessageRole = 'user' | 'assistant'

/** A single message in the conversation. */
export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  /** ISO timestamp string */
  timestamp: string
  /** Fun fact shown while waiting for this response */
  loadingFact?: string
  /** Dynamic suggestion chips returned by the bot */
  chips?: SuggestionChip[]
}

/** What the client POSTs to /api/chat */
export interface ChatRequest {
  messages: { role: MessageRole; content: string }[]
  /** Current page path, e.g. '/work/mobile-lending-management' */
  currentPage: string
}

/** Shape stored in sessionStorage */
export interface ChatSession {
  messages: ChatMessage[]
  /** Tracks which loading messages have been shown this session */
  usedLoadingIds: string[]
}

/** A suggestion chip definition */
export interface SuggestionChip {
  label: string
  /** The message text sent when the chip is clicked */
  message: string
}

/** Page context extracted from the current route */
export interface PageContext {
  path: string
  pageType: 'home' | 'work-index' | 'case-study' | 'about' | 'experience' | 'contact'
  /** Case study slug, if on a case study page */
  caseStudySlug?: string
  /** Case study title, if on a case study page */
  caseStudyTitle?: string
}

/** A loading message entry */
export interface LoadingMessage {
  id: string
  text: string
  category: 'cat_sounds' | 'fun_facts' | 'ux_principles' | 'fake_outs'
}
