/**
 * Caliber Smart work card — mobile app mockup.
 * Shows a rep's daily sales dashboard on a phone frame.
 */
export default function CaliberCardImage() {
  const f = 'var(--font-outfit), system-ui, sans-serif'

  const gold      = '#D4A017'
  const green     = '#22C55E'
  const muted     = 'rgba(255,255,255,0.35)'
  const secondary = 'rgba(255,255,255,0.55)'
  const ink       = '#F2F2F2'

  return (
    <>
      {/* ── Desktop ── */}
      <div className="hidden md:block" style={{ position: 'absolute', inset: 0 }}>
        {/* Ambient glow */}
        <div style={{
          position: 'absolute', top: '20%', left: '30%', width: '40%', height: '60%',
          background: 'radial-gradient(ellipse, rgba(212,160,23,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Phone frame */}
        <div style={{
          position: 'absolute', top: '24px', left: '24px', width: '52%', bottom: '-8%',
          background: 'rgba(255,255,255,0.04)',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Status bar */}
          <div style={{
            padding: '10px 16px 6px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontSize: '9px', fontWeight: 600, color: secondary, fontFamily: f }}>9:41</span>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <div style={{ width: '12px', height: '8px', borderRadius: '1px', border: '1px solid rgba(255,255,255,0.3)' }}>
                <div style={{ width: '8px', height: '100%', background: 'rgba(255,255,255,0.5)', borderRadius: '0.5px' }} />
              </div>
            </div>
          </div>

          {/* App content */}
          <div style={{ padding: '12px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', fontFamily: f }}>
            {/* Greeting */}
            <div>
              <p style={{ fontSize: '10px', color: muted, margin: 0 }}>Today&apos;s route</p>
              <p style={{ fontSize: '16px', fontWeight: 600, color: ink, margin: '2px 0 0' }}>12 stops remaining</p>
            </div>

            {/* Progress ring + stats */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              {/* Ring */}
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: `conic-gradient(${gold} 0deg 250deg, rgba(255,255,255,0.06) 250deg 360deg)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '50%',
                  background: 'rgba(28,25,23,0.95)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column',
                }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: gold }}>7</span>
                  <span style={{ fontSize: '6px', color: muted, marginTop: '-1px' }}>closed</span>
                </div>
              </div>
              {/* Mini stats */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                {[
                  { label: 'Knocked', value: '34', color: ink },
                  { label: 'Pitched', value: '18', color: ink },
                  { label: 'Closed', value: '7', color: green },
                ].map(s => (
                  <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '8px', color: muted }}>{s.label}</span>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: s.color }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next stop card */}
            <div style={{
              background: 'rgba(212,160,23,0.06)',
              border: '1px solid rgba(212,160,23,0.12)',
              borderRadius: '10px', padding: '10px 12px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '7px', fontWeight: 600, color: gold, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Next stop</span>
                <span style={{ fontSize: '7px', color: muted }}>0.3 mi</span>
              </div>
              <p style={{ fontSize: '11px', fontWeight: 600, color: ink, margin: 0 }}>742 Evergreen Terrace</p>
              <p style={{ fontSize: '8px', color: secondary, margin: '2px 0 0' }}>Homeowner · No prior contact</p>
            </div>

            {/* Leaderboard snippet */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '10px', padding: '10px 12px',
            }}>
              <p style={{ fontSize: '7px', fontWeight: 600, color: muted, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 6px' }}>Team ranking</p>
              {[
                { rank: '5', name: 'Sarah K.', sales: '9', highlight: false },
                { rank: '6', name: 'Derek M.', sales: '8', highlight: false },
                { rank: '7', name: 'You', sales: '7', highlight: true },
              ].map(r => (
                <div key={r.rank} style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '4px 6px', marginBottom: '2px',
                  borderRadius: '6px',
                  background: r.highlight ? 'rgba(212,160,23,0.08)' : 'transparent',
                }}>
                  <span style={{ fontSize: '9px', fontWeight: 700, color: r.highlight ? gold : muted, width: '14px' }}>#{r.rank}</span>
                  <span style={{ fontSize: '9px', fontWeight: r.highlight ? 600 : 400, color: r.highlight ? ink : secondary, flex: 1 }}>{r.name}</span>
                  <span style={{ fontSize: '9px', fontWeight: 600, color: r.highlight ? gold : secondary }}>{r.sales}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side badges — stacked vertically */}
        <div style={{
          position: 'absolute', top: '24px', right: '8%',
          display: 'flex', flexDirection: 'column', gap: '8px',
          fontFamily: f,
        }}>
          {/* Earnings */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(34,197,94,0.12)',
            borderRadius: '10px', padding: '10px 14px',
            textAlign: 'right',
          }}>
            <p style={{ fontSize: '7px', color: muted, textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Today&apos;s earnings</p>
            <p style={{ fontSize: '22px', fontWeight: 700, color: green, margin: '2px 0 0' }}>$1,840</p>
          </div>

          {/* Incentive */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(212,160,23,0.10)',
            borderRadius: '10px', padding: '8px 12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: gold }} />
              <span style={{ fontSize: '8px', fontWeight: 600, color: ink }}>Cancun Trip</span>
            </div>
            <div style={{ width: '80px', height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ width: '78%', height: '100%', background: `linear-gradient(90deg, #8B6914, ${gold})`, borderRadius: '999px' }} />
            </div>
            <p style={{ fontSize: '7px', color: muted, margin: '3px 0 0' }}>18 / 23 installs</p>
          </div>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="md:hidden" style={{ position: 'absolute', inset: 0 }}>
        <div style={{
          position: 'absolute', top: '4%', left: '6%', right: '6%', bottom: '4%',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
          padding: '14px 16px',
          fontFamily: f,
          color: ink,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          <div>
            <p style={{ fontSize: '8px', color: muted, margin: 0 }}>Today&apos;s route</p>
            <p style={{ fontSize: '14px', fontWeight: 600, color: ink, margin: '2px 0 0' }}>12 stops remaining</p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '50%',
              background: `conic-gradient(${gold} 0deg 250deg, rgba(255,255,255,0.06) 250deg 360deg)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'rgba(28,25,23,0.95)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column',
              }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: gold }}>7</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1 }}>
              {[
                { label: 'Knocked', value: '34' },
                { label: 'Closed', value: '7' },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '7px', color: muted }}>{s.label}</span>
                  <span style={{ fontSize: '8px', fontWeight: 600, color: ink }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '8px', padding: '8px 10px',
          }}>
            <p style={{ fontSize: '7px', color: muted, textTransform: 'uppercase', margin: '0 0 4px' }}>Earnings</p>
            <span style={{ fontSize: '16px', fontWeight: 700, color: green }}>$1,840</span>
          </div>
        </div>
      </div>
    </>
  )
}
