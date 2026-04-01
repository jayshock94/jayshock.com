/**
 * Caliber Smart work card — composed marketing-style image.
 * Dark mode with contrast-safe gold accents. Tablet-first.
 *
 * Contrast on #1C1917: #D4A017 gold, rgba(255,255,255,0.6) secondary,
 * rgba(255,255,255,0.4) muted, #22C55E green
 */
export default function CaliberCardImage() {
  const f = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

  const gold     = '#D4A017'
  const goldBg   = '#D4A017'
  const green    = '#22C55E'
  const muted    = 'rgba(255,255,255,0.4)'
  const secondary = 'rgba(255,255,255,0.6)'
  const ink      = '#F2F2F2'

  return (
    <>
      {/* ── Desktop composition ── */}
      <div className="hidden md:block" style={{ position: 'absolute', inset: 0 }}>
        <div style={{
          position: 'absolute', top: '10%', left: '15%', width: '70%', height: '70%',
          background: 'radial-gradient(ellipse, rgba(212,160,23,0.08) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        {/* Main card: Dashboard */}
        <div style={{
          position: 'absolute', top: '4%', left: '4%', right: '-6%', bottom: '20%',
          background: '#1C1917', borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
          overflow: 'hidden', zIndex: 2, padding: '18px 20px', fontFamily: f, color: ink,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <p style={{ fontSize: '10px', color: secondary, margin: 0, fontFamily: f }}>Good morning</p>
              <p style={{ fontSize: '16px', fontWeight: 700, color: ink, margin: '2px 0 0', fontFamily: f }}>Marcus J.</p>
            </div>
            <div style={{
              width: '30px', height: '30px', borderRadius: '50%',
              background: `linear-gradient(135deg, ${goldBg}, #8B6914)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '11px', fontWeight: 700, color: '#fff', fontFamily: f,
            }}>MJ</div>
          </div>

          <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
            {['Solar', 'T-Mobile', 'Dish'].map((p, i) => (
              <div key={p} style={{
                padding: '3px 10px', borderRadius: '999px',
                background: i === 0 ? 'rgba(212,160,23,0.10)' : '#292524',
                border: `1px solid ${i === 0 ? 'rgba(212,160,23,0.25)' : 'rgba(255,255,255,0.06)'}`,
                fontSize: '9px', fontWeight: i === 0 ? 600 : 400,
                color: i === 0 ? gold : secondary, fontFamily: f,
              }}>{p}</div>
            ))}
          </div>

          <div style={{
            background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.15)',
            borderRadius: '10px', padding: '10px 12px', marginBottom: '10px',
          }}>
            <p style={{ fontSize: '8px', fontWeight: 600, color: gold, textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0, fontFamily: f }}>LEADERBOARD</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '2px' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, color: gold, fontFamily: f }}>#7</span>
              <span style={{ fontSize: '9px', color: secondary, fontFamily: f }}>of 142 reps</span>
            </div>
            <div style={{ marginTop: '6px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', padding: '6px 8px' }}>
              <p style={{ fontSize: '9px', color: secondary, margin: '0 0 4px', fontFamily: f }}>3 more installs to qualify</p>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: '78%', height: '100%', background: `linear-gradient(90deg, #8B6914, ${goldBg})`, borderRadius: '999px' }} />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            {[
              { label: 'Total Sales', value: '34', change: '+6' },
              { label: 'Est. Pay', value: '$4,280', change: '' },
            ].map((m) => (
              <div key={m.label} style={{
                background: '#292524', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px', padding: '8px 10px',
              }}>
                <p style={{ fontSize: '8px', color: muted, margin: 0, fontFamily: f }}>{m.label}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '2px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: m.label === 'Est. Pay' ? green : ink, fontFamily: f }}>{m.value}</span>
                  {m.change && <span style={{ fontSize: '8px', fontWeight: 600, color: green, fontFamily: f }}>{m.change}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating: Incentive progress */}
        <div style={{
          position: 'absolute', bottom: '6%', left: '-2%', width: '55%',
          background: '#1C1917', borderRadius: '10px',
          border: '1px solid rgba(212,160,23,0.18)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
          padding: '10px 12px', zIndex: 4, transform: 'rotate(-1.5deg)', fontFamily: f, color: ink,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: goldBg, boxShadow: `0 0 6px rgba(212,160,23,0.3)` }} />
            <p style={{ fontSize: '11px', fontWeight: 700, color: ink, margin: 0, fontFamily: f }}>Cancun Trip</p>
            <span style={{ fontSize: '8px', color: muted, marginLeft: 'auto', fontFamily: f }}>12d left</span>
          </div>
          <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden', marginBottom: '3px' }}>
            <div style={{ width: '78%', height: '100%', background: `linear-gradient(90deg, #8B6914, ${goldBg})`, borderRadius: '999px' }} />
          </div>
          <p style={{ fontSize: '8px', color: muted, margin: 0, textAlign: 'right', fontFamily: f }}>18 / 23 installs</p>
        </div>

        {/* Floating: Pay card */}
        <div style={{
          position: 'absolute', bottom: '4%', right: '4%', width: '38%',
          background: '#1C1917', borderRadius: '10px',
          border: '1px solid rgba(34,197,94,0.15)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
          padding: '8px 10px', zIndex: 3, transform: 'rotate(1deg)', fontFamily: f, color: ink,
        }}>
          <p style={{ fontSize: '8px', color: muted, textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0, fontFamily: f }}>EST. PAY</p>
          <p style={{ fontSize: '20px', fontWeight: 800, color: green, margin: '2px 0 0', fontFamily: f }}>$4,280</p>
          <p style={{ fontSize: '8px', color: secondary, margin: '1px 0 0', fontFamily: f }}>Potential: $5,840</p>
        </div>
      </div>

      {/* ── Mobile composition ── */}
      <div className="md:hidden" style={{ position: 'absolute', inset: 0 }}>
        <div style={{
          position: 'absolute', inset: '5%',
          background: 'radial-gradient(ellipse, rgba(212,160,23,0.08) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          position: 'absolute', top: '2%', left: '4%', right: '4%', bottom: '28%',
          background: '#1C1917', borderRadius: '14px',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: '0 6px 24px rgba(0,0,0,0.4)',
          overflow: 'hidden', zIndex: 2, padding: '14px 16px', fontFamily: f, color: ink,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div>
              <p style={{ fontSize: '9px', color: secondary, margin: 0, fontFamily: f }}>Good morning</p>
              <p style={{ fontSize: '14px', fontWeight: 700, color: ink, margin: '1px 0 0', fontFamily: f }}>Marcus J.</p>
            </div>
            <div style={{
              width: '26px', height: '26px', borderRadius: '50%',
              background: `linear-gradient(135deg, ${goldBg}, #8B6914)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '9px', fontWeight: 700, color: '#fff', fontFamily: f,
            }}>MJ</div>
          </div>

          <div style={{
            background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.15)',
            borderRadius: '8px', padding: '8px 10px',
          }}>
            <p style={{ fontSize: '7px', color: gold, textTransform: 'uppercase', margin: 0, fontFamily: f }}>LEADERBOARD</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px', marginTop: '1px' }}>
              <span style={{ fontSize: '20px', fontWeight: 800, color: gold, fontFamily: f }}>#7</span>
              <span style={{ fontSize: '8px', color: secondary, fontFamily: f }}>of 142</span>
            </div>
            <div style={{ marginTop: '4px', height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ width: '78%', height: '100%', background: `linear-gradient(90deg, #8B6914, ${goldBg})`, borderRadius: '999px' }} />
            </div>
          </div>
        </div>

        <div style={{
          position: 'absolute', bottom: '8%', left: '6%', width: '55%',
          background: '#1C1917', borderRadius: '8px',
          border: '1px solid rgba(212,160,23,0.18)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          padding: '8px 10px', zIndex: 3, transform: 'rotate(-1deg)', fontFamily: f, color: ink,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: goldBg }} />
            <p style={{ fontSize: '9px', fontWeight: 700, color: ink, margin: 0, fontFamily: f }}>Cancun Trip</p>
          </div>
          <div style={{ marginTop: '4px', height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{ width: '78%', height: '100%', background: goldBg, borderRadius: '999px' }} />
          </div>
        </div>

        <div style={{
          position: 'absolute', bottom: '6%', right: '8%', width: '38%',
          background: '#1C1917', borderRadius: '8px',
          border: '1px solid rgba(34,197,94,0.15)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          padding: '6px 8px', zIndex: 4, transform: 'rotate(1.5deg)', fontFamily: f, color: ink,
        }}>
          <p style={{ fontSize: '7px', color: muted, textTransform: 'uppercase', margin: 0, fontFamily: f }}>EST. PAY</p>
          <p style={{ fontSize: '16px', fontWeight: 800, color: green, margin: '1px 0 0', fontFamily: f }}>$4,280</p>
        </div>
      </div>
    </>
  )
}
