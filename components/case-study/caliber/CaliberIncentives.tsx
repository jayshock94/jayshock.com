'use client'

/**
 * CaliberIncentives — App screen mockup (tablet, light mode)
 * Incentive tracking page. Contrast-safe colors on white.
 */
export default function CaliberIncentives() {
  const f = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

  const gold      = '#7B5B0D'
  const goldBg    = '#D4A017'
  const green     = '#15803D'
  const muted     = '#6B6B6B'
  const secondary = '#525252'
  const ink       = '#1A1A1A'

  const incentives = [
    { title: 'Cancun Trip', subtitle: 'Top 20 Solar Reps · Q4', criteria: '23 solar installs', current: 18, total: 23, daysLeft: 12, tier: 'gold' as const },
    { title: 'Snowboard Package', subtitle: 'All Products · Monthly', criteria: '45 total sales', current: 34, total: 45, daysLeft: 8, tier: 'silver' as const },
    { title: '$500 Bonus', subtitle: 'Solar · Weekly Sprint', criteria: '8 installs this week', current: 6, total: 8, daysLeft: 3, tier: 'bronze' as const },
  ]

  const tierColors = { gold: '#7B5B0D', silver: '#475569', bronze: '#92400E' }
  const tierBg     = { gold: goldBg, silver: '#94A3B8', bronze: '#CD7F32' }

  return (
    <div style={{
      background: '#FFFFFF', borderRadius: '20px', overflow: 'hidden',
      fontFamily: f, color: ink, width: '100%', maxWidth: '860px', margin: '0 auto',
      border: '1px solid rgba(0,0,0,0.10)',
      boxShadow: '0 8px 40px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)',
    }}>
      {/* Status bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 24px 0', fontSize: '12px', fontWeight: 600, color: muted, fontFamily: f }}>
        <span>9:41</span>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <div style={{ width: '16px', height: '10px', borderRadius: '2px', border: `1.5px solid ${muted}`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '70%', background: muted, borderRadius: '1px' }} />
          </div>
        </div>
      </div>

      {/* Header */}
      <div style={{ padding: '16px 24px 6px' }}>
        <p style={{ fontSize: '10px', fontWeight: 600, color: muted, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0, fontFamily: f }}>ACTIVE INCENTIVES</p>
        <p style={{ fontSize: '22px', fontWeight: 700, margin: '4px 0 0', fontFamily: f }}>What you&apos;re chasing</p>
      </div>

      {/* Filter tabs */}
      <div style={{ padding: '12px 24px 4px', display: 'flex', gap: '6px' }}>
        {['All', 'Solar', 'Monthly', 'Weekly'].map((tab, i) => (
          <div key={tab} style={{
            padding: '6px 14px', borderRadius: '999px',
            background: i === 0 ? 'rgba(123,91,13,0.08)' : '#F0F0F0',
            border: `1px solid ${i === 0 ? 'rgba(123,91,13,0.25)' : 'rgba(0,0,0,0.08)'}`,
            fontSize: '12px', fontWeight: i === 0 ? 600 : 400,
            color: i === 0 ? gold : secondary, fontFamily: f,
          }}>{tab}</div>
        ))}
      </div>

      {/* Incentive cards */}
      <div style={{ padding: '14px 24px 10px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {incentives.map((inc) => {
          const pct = Math.round((inc.current / inc.total) * 100)
          const color = tierColors[inc.tier]
          const bg = tierBg[inc.tier]
          return (
            <div key={inc.title} style={{
              background: '#F5F5F5', border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '14px', padding: '16px 18px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: bg, boxShadow: `0 0 6px ${bg}40` }} />
                    <p style={{ fontSize: '15px', fontWeight: 700, margin: 0, fontFamily: f }}>{inc.title}</p>
                  </div>
                  <p style={{ fontSize: '12px', color: secondary, margin: '3px 0 0 16px', fontFamily: f }}>{inc.subtitle}</p>
                </div>
                <div style={{
                  background: 'rgba(0,0,0,0.05)', borderRadius: '999px', padding: '4px 10px',
                  fontSize: '11px', fontWeight: 500, color: secondary, fontFamily: f, whiteSpace: 'nowrap',
                }}>{inc.daysLeft}d left</div>
              </div>
              <div style={{ marginTop: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', color: secondary, fontFamily: f }}>{inc.criteria}</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color, fontFamily: f }}>{pct}%</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(0,0,0,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg, ${bg}cc, ${bg})`, borderRadius: '999px' }} />
                </div>
                <p style={{ fontSize: '11px', color: muted, margin: '4px 0 0', textAlign: 'right', fontFamily: f }}>{inc.current} / {inc.total}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Completed */}
      <div style={{ padding: '4px 24px 20px' }}>
        <div style={{
          background: 'rgba(21,128,61,0.05)', border: '1px solid rgba(21,128,61,0.15)',
          borderRadius: '12px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <span style={{ fontSize: '16px', color: green }}>✓</span>
          <div>
            <p style={{ fontSize: '13px', fontWeight: 600, color: green, margin: 0, fontFamily: f }}>Segway Earned</p>
            <p style={{ fontSize: '11px', color: secondary, margin: '2px 0 0', fontFamily: f }}>50 sales milestone · Completed Oct 3</p>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px 24px 18px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        {([
          { label: 'Dashboard', active: false, d: 'M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z' },
          { label: 'Board', active: false, d: 'M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z' },
          { label: 'Sales', active: false, d: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
          { label: 'Incentives', active: true, d: 'M13 10V3L4 14h7v7l9-11h-7z' },
          { label: 'More', active: false, d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066zM15 12a3 3 0 11-6 0 3 3 0 016 0z' },
        ] as const).map((n) => (
          <div key={n.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={n.active ? gold : '#B0B0B0'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d={n.d} />
            </svg>
            <span style={{ fontSize: '10px', fontWeight: n.active ? 600 : 400, color: n.active ? gold : '#B0B0B0', fontFamily: f }}>{n.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
