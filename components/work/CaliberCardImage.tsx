/**
 * Fake Caliber Smart sales dashboard for the work card hero.
 * Two overlapping phone screens: leaderboard/metrics dashboard (front)
 * and a solar panel estimator view (behind).
 * All CSS — no external images.
 */
export default function CaliberCardImage() {
  const brand = '#D4A017'
  const brandLight = '#F5E6B8'
  const brandDark = '#8B6914'
  const bg = '#1A1A1A'
  const surface = '#242424'
  const border = '#333'
  const textPrimary = '#F2F2F2'
  const textMuted = '#888'

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        paddingTop: '24px',
      }}
    >
      {/* Back phone — Solar estimator */}
      <div
        style={{
          position: 'relative',
          width: 'clamp(90px, 30vw, 120px)',
          height: 'clamp(195px, 65vw, 260px)',
          borderRadius: '18px',
          overflow: 'hidden',
          flexShrink: 0,
          marginRight: '-16px',
          marginTop: '24px',
          transform: 'rotate(-5deg)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08)',
          zIndex: 1,
          background: bg,
          fontFamily: 'var(--font-outfit), system-ui, sans-serif',
        }}
      >
        {/* Status bar */}
        <div style={{ height: '24px', background: surface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '7px', color: textMuted }}>9:41</span>
        </div>
        {/* Header */}
        <div style={{ padding: '8px 10px 6px', borderBottom: `0.5px solid ${border}` }}>
          <span style={{ fontSize: '8px', color: brand, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Solar estimate</span>
        </div>
        {/* Fake roof view */}
        <div style={{ margin: '8px', height: '60px', borderRadius: '6px', background: '#2A2A2A', position: 'relative', overflow: 'hidden' }}>
          {/* Roof shape */}
          <div style={{ position: 'absolute', top: '12px', left: '15%', width: '70%', height: '36px', background: '#333', transform: 'perspective(80px) rotateX(8deg)', borderRadius: '2px' }} />
          {/* Solar panels */}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{
              position: 'absolute',
              top: `${16 + Math.floor(i / 3) * 14}px`,
              left: `${20 + (i % 3) * 22}%`,
              width: '18%',
              height: '10px',
              background: brand,
              opacity: 0.7,
              borderRadius: '1px',
            }} />
          ))}
        </div>
        {/* Stats */}
        <div style={{ padding: '6px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontSize: '6px', color: textMuted }}>Panels</span>
            <span style={{ fontSize: '7px', color: textPrimary, fontWeight: 500 }}>24</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontSize: '6px', color: textMuted }}>kW output</span>
            <span style={{ fontSize: '7px', color: textPrimary, fontWeight: 500 }}>8.4</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '6px', color: textMuted }}>Est. savings</span>
            <span style={{ fontSize: '7px', color: brand, fontWeight: 600 }}>$142/mo</span>
          </div>
        </div>
      </div>

      {/* Front phone — Sales Dashboard */}
      <div
        style={{
          position: 'relative',
          width: 'clamp(105px, 35vw, 140px)',
          height: 'clamp(225px, 75vw, 300px)',
          borderRadius: '20px',
          overflow: 'hidden',
          flexShrink: 0,
          transform: 'rotate(2deg)',
          boxShadow: '0 20px 56px rgba(0,0,0,0.40), 0 0 0 1px rgba(255,255,255,0.10)',
          zIndex: 2,
          background: bg,
          fontFamily: 'var(--font-outfit), system-ui, sans-serif',
        }}
      >
        {/* Status bar */}
        <div style={{ height: '28px', background: surface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '8px', color: textMuted }}>9:41</span>
        </div>

        {/* Header */}
        <div style={{ padding: '10px 12px 8px' }}>
          <span style={{ fontSize: '7px', color: textMuted, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>Welcome back</span>
          <div style={{ fontSize: '11px', color: textPrimary, fontWeight: 600, marginTop: '2px' }}>Your Dashboard</div>
        </div>

        {/* Goal progress */}
        <div style={{ margin: '0 12px', padding: '8px 10px', background: surface, borderRadius: '8px', marginBottom: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '7px', color: textMuted }}>Weekly goal</span>
            <span style={{ fontSize: '8px', color: brand, fontWeight: 600 }}>78%</span>
          </div>
          {/* Progress bar */}
          <div style={{ height: '4px', background: '#333', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: '78%', height: '100%', background: `linear-gradient(90deg, ${brandDark}, ${brand})`, borderRadius: '2px' }} />
          </div>
        </div>

        {/* Leaderboard */}
        <div style={{ margin: '0 12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '7px', color: textMuted, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Leaderboard</span>
          {[
            { rank: 1, name: 'M. Torres', sales: 47, highlight: true },
            { rank: 2, name: 'You', sales: 42, highlight: false },
            { rank: 3, name: 'K. Chen', sales: 38, highlight: false },
          ].map(rep => (
            <div
              key={rep.rank}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 8px',
                marginTop: '3px',
                borderRadius: '6px',
                background: rep.rank === 2 ? `${brand}18` : 'transparent',
                border: rep.rank === 2 ? `0.5px solid ${brand}33` : '0.5px solid transparent',
              }}
            >
              <span style={{ fontSize: '8px', fontWeight: 600, color: rep.rank === 1 ? brand : textMuted, width: '10px' }}>
                {rep.rank}
              </span>
              <span style={{ fontSize: '8px', color: rep.rank === 2 ? textPrimary : textMuted, fontWeight: rep.rank === 2 ? 500 : 400, flex: 1 }}>
                {rep.name}
              </span>
              <span style={{ fontSize: '8px', color: textPrimary, fontWeight: 500 }}>{rep.sales}</span>
            </div>
          ))}
        </div>

        {/* Payroll quick stat */}
        <div style={{ margin: '0 12px', padding: '8px 10px', background: surface, borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '6px', color: textMuted, display: 'block' }}>This period</span>
              <span style={{ fontSize: '10px', color: textPrimary, fontWeight: 600 }}>$3,240</span>
            </div>
            <div style={{
              padding: '3px 8px',
              borderRadius: '999px',
              background: `${brand}22`,
              border: `0.5px solid ${brand}44`,
            }}>
              <span style={{ fontSize: '7px', color: brand, fontWeight: 500 }}>+12%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
