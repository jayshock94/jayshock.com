import type { PageContext, SuggestionChip } from './types'

/** Disarming chips — one is randomly included per page load. */
const DISARMING_CHIPS: SuggestionChip[] = [
  { label: 'Cereal or milk first?', message: 'Does Jay pour cereal or milk first?' },
  { label: 'Single or double stuffed Oreos?', message: 'Single or double stuffed Oreos?' },
  { label: 'Tabs or spaces?', message: 'Does Jay use tabs or spaces?' },
  { label: 'Does Jay have a hot take?', message: "What's Jay's hottest design take?" },
  { label: "What's something random about Jay?", message: 'Tell me something random about Jay.' },
  { label: 'Light mode or dark mode?', message: 'Does Jay prefer light mode or dark mode?' },
]

function randomDisarmingChip(): SuggestionChip {
  return DISARMING_CHIPS[Math.floor(Math.random() * DISARMING_CHIPS.length)]
}

/** Returns page-aware suggestion chips. */
export function getChipsForPage(context: PageContext): SuggestionChip[] {
  switch (context.pageType) {
    case 'home':
      return [
        { label: 'What kind of work does Jay do?', message: 'What kind of work does Jay do?' },
        { label: 'Is he available right now?', message: 'Is Jay available for hire right now?' },
        { label: 'Show me his best project', message: "What's Jay's strongest case study?" },
        randomDisarmingChip(),
      ]

    case 'work-index':
      return [
        { label: "What's his strongest project?", message: "What's Jay's strongest case study?" },
        { label: 'What kind of work does he do?', message: 'What kind of work does Jay do?' },
        { label: 'Is he available?', message: 'Is Jay available for hire?' },
      ]

    case 'case-study':
      return [
        { label: 'What was hardest about this?', message: `What was the hardest part of the ${context.caseStudyTitle} project?` },
        { label: "What was Jay's role?", message: `What was Jay's role on the ${context.caseStudyTitle} project?` },
        { label: 'Show me another project', message: 'Show me a different case study.' },
      ]

    case 'about':
      return [
        { label: 'How does Jay approach design?', message: 'How does Jay approach design problems?' },
        { label: "What's his design philosophy?", message: "What's Jay's design philosophy?" },
        { label: 'What makes him different?', message: 'What makes Jay different from other designers?' },
        randomDisarmingChip(),
      ]

    case 'experience':
      return [
        { label: 'Can I see his resume?', message: "Can I download Jay's resume?" },
        { label: "What's his most recent role?", message: "What's Jay's most recent role?" },
        { label: 'What kind of teams has he led?', message: 'What kind of teams has Jay worked on?' },
      ]

    case 'contact':
      return [
        { label: "Best way to reach Jay?", message: "What's the best way to reach Jay?" },
        { label: 'Is he open to consulting?', message: 'Is Jay open to consulting work?' },
        { label: "What's his response time?", message: 'How quickly does Jay respond?' },
      ]

    default:
      return [
        { label: 'What does Jay do?', message: 'What kind of work does Jay do?' },
        { label: 'Is he available?', message: 'Is Jay available for hire?' },
        randomDisarmingChip(),
      ]
  }
}
