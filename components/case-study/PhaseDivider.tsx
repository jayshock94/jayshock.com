import type { PhaseKey } from '@/data/types'

const PHASE_LABEL_VARS: Record<PhaseKey, string> = {
  impact:    'var(--phase-impact-label)',
  problem:   'var(--phase-problem-label)',
  discovery: 'var(--phase-discovery-label)',
  solution:  'var(--phase-solution-label)',
}

interface PhaseDividerProps {
  fromPhase: PhaseKey
  toPhase:   PhaseKey
}

export default function PhaseDivider({ fromPhase, toPhase }: PhaseDividerProps) {
  return (
    <div
      className="max-w-layout mx-auto"
      style={{
        height: '1px',
        background: `linear-gradient(to right, ${PHASE_LABEL_VARS[fromPhase]}, ${PHASE_LABEL_VARS[toPhase]})`,
        opacity: 0.3,
      }}
      aria-hidden="true"
    />
  )
}
