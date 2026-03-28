import type { PageContext, SuggestionChip } from './types'

/** Section-aware chips for homepage — first chip reflects what the user is looking at. */
const SECTION_CHIPS: Record<string, SuggestionChip> = {
  hero:       { label: 'What kind of work does Jay do?', message: 'What kind of work does Jay do?' },
  work:       { label: 'Tell me about these projects', message: "What are Jay's case studies about?" },
  about:      { label: 'What makes Jay different?', message: 'What makes Jay different from other designers?' },
  'how-i-work': { label: 'What is the compass?', message: "What is Jay's design compass and how does he use it?" },
  toolkit:    { label: 'What tools does Jay use?', message: 'What are Jay\'s go-to design tools?' },
  experience: { label: 'Tell me about his experience', message: "Walk me through Jay's career history." },
  contact:    { label: 'Is he available?', message: 'Is Jay available for hire right now?' },
}

/** Returns page-aware suggestion chips. All work-focused — no personal/disarming chips by default. */
export function getChipsForPage(context: PageContext, visibleSection?: string | null): SuggestionChip[] {
  switch (context.pageType) {
    case 'home': {
      const sectionChip = visibleSection && SECTION_CHIPS[visibleSection]
        ? SECTION_CHIPS[visibleSection]
        : SECTION_CHIPS.hero
      return [
        sectionChip,
        { label: 'Is he available right now?', message: 'Is Jay available for hire right now?' },
        { label: 'Show me his best project', message: "What's Jay's strongest case study?" },
      ]
    }

    case 'work-index':
      return [
        { label: "What's his strongest project?", message: "What's Jay's strongest case study?" },
        { label: 'What kind of work does he do?', message: 'What kind of work does Jay do?' },
        { label: 'Is he available?', message: 'Is Jay available for hire?' },
      ]

    case 'case-study':
      return [
        { label: 'What was the hardest constraint?', message: `What was the biggest constraint Jay faced on the ${context.caseStudyTitle} project?` },
        { label: 'How did he test it?', message: `How did Jay validate his design decisions on this project?` },
        { label: 'Tell me more about his process', message: `Walk me through how Jay approached the ${context.caseStudyTitle} project step by step.` },
      ]

    case 'about':
      return [
        { label: 'How does Jay approach design?', message: 'How does Jay approach design problems?' },
        { label: "What's his design philosophy?", message: "What's Jay's design philosophy?" },
        { label: 'What makes him different?', message: 'What makes Jay different from other designers?' },
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
        { label: 'Show me his best project', message: "What's Jay's strongest case study?" },
      ]
  }
}
