/**
 * RedesignedLoanApp — Server component
 *
 * Coded representation of the new Lendmark mobile app, built from Figma node 8:23363.
 * Inline styles are used throughout because this is a self-contained UI mock that
 * intentionally uses Lendmark brand colors, not portfolio design tokens.
 */

const FONT_BODY    = "'Inter', system-ui, sans-serif"
const FONT_DISPLAY = "Georgia, 'Times New Roman', serif"

const COLORS = {
  bgWarm:         '#fff8f7',
  textPrimary:    '#291715',
  textSecondary:  '#534341',
  textMuted:      '#936e6a',
  brandRed:       '#a50011',
  cardBgLow:      '#fff0ef',
  cardBgLowest:   '#ffffff',
  borderSubtle:   '#e8bcb8',
  navPillActive:  '#ffd7d1',
  navBg:          '#fff0ef',
} as const

// ─── Icon components ──────────────────────────────────────────────────────────

function BellIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3a6 6 0 0 1 6 6v3.586l1.707 1.707A1 1 0 0 1 19 16H5a1 1 0 0 1-.707-1.707L6 12.586V9a6 6 0 0 1 6-6ZM10 19h4a2 2 0 1 1-4 0Z"
        stroke={COLORS.textSecondary}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M9 4v10M4 9h10" stroke={COLORS.brandRed} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M4 9h10M10 5l4 4-4 4" stroke={COLORS.brandRed} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M3 9l1.5-4h11l1.5 4M3 9v5h1v1.5a.5.5 0 0 0 1 0V14h10v1.5a.5.5 0 0 0 1 0V14h1V9M3 9h14"
        stroke={COLORS.textSecondary}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="6" cy="13" r="1" fill={COLORS.textSecondary} />
      <circle cx="14" cy="13" r="1" fill={COLORS.textSecondary} />
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M3 10l7-7 7 7M5 8.5V17h4v-4h2v4h4V8.5"
        stroke={COLORS.textSecondary}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

function PersonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="7" r="3" stroke={COLORS.textSecondary} strokeWidth="1.2" fill="none" />
      <path
        d="M4 17c0-3.314 2.686-6 6-6s6 2.686 6 6"
        stroke={COLORS.textSecondary}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

// Nav icons
function NavHomeIcon({ active }: { active: boolean }) {
  const stroke = active ? COLORS.textPrimary : COLORS.textSecondary
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M3 10l7-7 7 7M5 8.5V17h4v-4h2v4h4V8.5"
        stroke={stroke}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

function NavPayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="16" height="10" rx="2" stroke={COLORS.textSecondary} strokeWidth="1.3" fill="none" />
      <rect x="2" y="8" width="16" height="2.5" fill={COLORS.textSecondary} />
    </svg>
  )
}

function NavHelpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke={COLORS.textSecondary} strokeWidth="1.3" fill="none" />
      <path
        d="M8 8c0-1.105.895-2 2-2s2 .895 2 2-.895 2-2 2v1.5"
        stroke={COLORS.textSecondary}
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="10" cy="14.5" r=".75" fill={COLORS.textSecondary} />
    </svg>
  )
}

function NavMoreIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="5"  cy="10" r="1.5" fill={COLORS.textSecondary} />
      <circle cx="10" cy="10" r="1.5" fill={COLORS.textSecondary} />
      <circle cx="15" cy="10" r="1.5" fill={COLORS.textSecondary} />
    </svg>
  )
}

// ─── Account data ─────────────────────────────────────────────────────────────

type AccountIconType = 'car' | 'home' | 'person'

interface Account {
  icon:    AccountIconType
  label:   string
  balance: string
}

const ACCOUNTS: Account[] = [
  { icon: 'car',    label: '2021 Jeep Rubicon 1234', balance: '$15,000.35'   },
  { icon: 'home',   label: '801 Monroe St 8250',     balance: '$264,376.87'  },
  { icon: 'person', label: 'Personal loan 2275',     balance: '$9,167.33'    },
]

function AccountIcon({ type }: { type: AccountIconType }) {
  if (type === 'car')    return <CarIcon />
  if (type === 'home')   return <HomeIcon />
  return <PersonIcon />
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function RedesignedLoanApp() {
  return (
    <div
      style={{
        fontFamily:      FONT_BODY,
        backgroundColor: COLORS.bgWarm,
        display:         'flex',
        flexDirection:   'column',
        minHeight:       '100%',
      }}
    >
      {/* 1. Top app bar */}
      <div
        style={{
          height:          '56px',
          backgroundColor: COLORS.bgWarm,
          padding:         '0 20px',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'space-between',
          flexShrink:      0,
        }}
      >
        <span
          style={{
            color:      COLORS.brandRed,
            fontWeight: 700,
            fontSize:   '17px',
            fontFamily: FONT_BODY,
          }}
        >
          Lendmark
        </span>
        <BellIcon />
      </div>

      {/* 2. Greeting */}
      <div style={{ padding: '8px 20px 20px' }}>
        <p
          style={{
            fontFamily:  FONT_DISPLAY,
            fontSize:    '30px',
            fontWeight:  400,
            color:       COLORS.textPrimary,
            lineHeight:  1.2,
            margin:      0,
          }}
        >
          Good afternoon,
          <br />
          John
        </p>
      </div>

      {/* 3. Promo banner */}
      <div
        style={{
          margin:       '0 20px 16px',
          borderRadius: '12px',
          background:   'linear-gradient(135deg, #a50011 0%, #6c0009 100%)',
          height:       '140px',
          overflow:     'hidden',
          position:     'relative',
          boxShadow:    '0px 4px 8px 3px rgba(0,0,0,0.15), 0px 1px 3px 0px rgba(0,0,0,0.3)',
          flexShrink:   0,
        }}
      >
        {/* Decorative text */}
        <span
          style={{
            position:   'absolute',
            top:        '12px',
            left:       '16px',
            fontFamily: FONT_DISPLAY,
            fontStyle:  'italic',
            fontSize:   '20px',
            color:      'rgba(255,255,255,0.2)',
            lineHeight: 1.2,
            userSelect: 'none',
          }}
        >
          Fall Into Savings
        </span>

        {/* Bottom strip */}
        <div
          style={{
            position:        'absolute',
            bottom:          0,
            left:            0,
            right:           0,
            backgroundColor: 'rgba(96,0,10,0.8)',
            padding:         '12px 16px',
          }}
        >
          <p
            style={{
              margin:     0,
              fontSize:   '13px',
              fontWeight: 600,
              color:      '#ffffff',
              lineHeight: 1.4,
            }}
          >
            Lower your monthly payments with our limited-time refinancing offer.
          </p>
        </div>
      </div>

      {/* 4. Apply for a loan card (redesigned — no family photo) */}
      <div
        style={{
          margin:        '0 20px 16px',
          borderRadius:  '12px',
          backgroundColor: COLORS.cardBgLowest,
          border:        `1px solid ${COLORS.borderSubtle}`,
          padding:       '16px',
          display:       'flex',
          alignItems:    'center',
          gap:           '14px',
          boxShadow:     '0px 1px 2px rgba(0,0,0,0.08)',
          flexShrink:    0,
        }}
      >
        {/* Left: circular icon container */}
        <div
          style={{
            width:           '44px',
            height:          '44px',
            borderRadius:    '50%',
            backgroundColor: COLORS.cardBgLow,
            border:          `1px solid ${COLORS.borderSubtle}`,
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            flexShrink:      0,
          }}
        >
          <PlusIcon />
        </div>

        {/* Middle */}
        <div style={{ flex: 1 }}>
          <p
            style={{
              margin:     0,
              fontSize:   '15px',
              fontWeight: 600,
              color:      COLORS.textPrimary,
            }}
          >
            Apply for a loan
          </p>
          <p
            style={{
              margin:     '2px 0 0',
              fontSize:   '12px',
              color:      COLORS.textMuted,
            }}
          >
            Takes about 2 minutes
          </p>
        </div>

        {/* Right: arrow */}
        <ArrowRightIcon />
      </div>

      {/* 5. Accounts section */}
      <div style={{ padding: '0 20px' }}>
        <h2
          style={{
            fontFamily:   FONT_DISPLAY,
            fontSize:     '24px',
            fontWeight:   400,
            color:        COLORS.textPrimary,
            margin:       '0 0 12px',
          }}
        >
          Accounts
        </h2>

        {ACCOUNTS.map((account, i) => (
          <div
            key={account.label}
            style={{
              borderRadius:    '12px',
              backgroundColor: COLORS.cardBgLowest,
              border:          `1px solid #f0ddd9`,
              padding:         '16px',
              display:         'flex',
              alignItems:      'center',
              gap:             '14px',
              boxShadow:       '0px 1px 2px rgba(0,0,0,0.06)',
              marginBottom:    i < ACCOUNTS.length - 1 ? '8px' : 0,
            }}
          >
            {/* Icon circle */}
            <div
              style={{
                width:           '40px',
                height:          '40px',
                borderRadius:    '50%',
                backgroundColor: COLORS.bgWarm,
                border:          `1px solid ${COLORS.borderSubtle}`,
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                flexShrink:      0,
              }}
            >
              <AccountIcon type={account.icon} />
            </div>

            {/* Text */}
            <div>
              <p
                style={{
                  margin:     0,
                  fontSize:   '13px',
                  fontWeight: 500,
                  color:      COLORS.textSecondary,
                }}
              >
                {account.label}
              </p>
              <p
                style={{
                  margin:     '4px 0 0',
                  fontSize:   '20px',
                  fontWeight: 400,
                  color:      COLORS.textPrimary,
                }}
              >
                {account.balance}
              </p>
              <p
                style={{
                  margin:         '2px 0 0',
                  fontSize:       '11px',
                  color:          COLORS.textMuted,
                  textTransform:  'uppercase',
                  letterSpacing:  '0.04em',
                }}
              >
                Current balance
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 6. Bottom nav bar */}
      <nav
        aria-label="App navigation"
        style={{
          marginTop:    '24px',
          backgroundColor: COLORS.navBg,
          borderTop:    `1px solid ${COLORS.borderSubtle}`,
          display:      'flex',
          justifyContent: 'space-around',
          padding:      '8px 0 12px',
          flexShrink:   0,
        }}
      >
        {/* Home — active */}
        <div
          style={{
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            gap:            '2px',
          }}
        >
          <div
            style={{
              width:           '64px',
              height:          '32px',
              borderRadius:    '16px',
              backgroundColor: COLORS.navPillActive,
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
            }}
          >
            <NavHomeIcon active={true} />
          </div>
          <span
            style={{
              fontSize:   '11px',
              fontWeight: 600,
              color:      COLORS.textPrimary,
            }}
          >
            Home
          </span>
        </div>

        {/* Pay */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          <div style={{ width: '64px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <NavPayIcon />
          </div>
          <span style={{ fontSize: '11px', fontWeight: 500, color: COLORS.textSecondary }}>Pay</span>
        </div>

        {/* Help */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          <div style={{ width: '64px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <NavHelpIcon />
          </div>
          <span style={{ fontSize: '11px', fontWeight: 500, color: COLORS.textSecondary }}>Help</span>
        </div>

        {/* More */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          <div style={{ width: '64px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <NavMoreIcon />
          </div>
          <span style={{ fontSize: '11px', fontWeight: 500, color: COLORS.textSecondary }}>More</span>
        </div>
      </nav>
    </div>
  )
}
