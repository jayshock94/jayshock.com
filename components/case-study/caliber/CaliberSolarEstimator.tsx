'use client'

/**
 * CaliberSolarEstimator — App screen mockup (tablet, light mode)
 * Contrast-safe colors on white surfaces.
 */
export default function CaliberSolarEstimator() {
  const f = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

  const gold      = '#7B5B0D'
  const goldBg    = '#D4A017'
  const green     = '#15803D'
  const muted     = '#6B6B6B'
  const secondary = '#525252'
  const ink       = '#1A1A1A'

  return (
    <div style={{
      background: '#FFFFFF', borderRadius: '20px', overflow: 'hidden',
      fontFamily: f, color: ink, width: '100%', maxWidth: '860px', margin: '0 auto',
      border: '1px solid rgba(0,0,0,0.10)',
      boxShadow: '0 8px 40px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)',
    }}>
      {/* Header bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 24px', borderBottom: '1px solid rgba(0,0,0,0.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', color: secondary }}>←</span>
          <p style={{ fontSize: '16px', fontWeight: 600, margin: 0, fontFamily: f }}>Solar Estimate</p>
        </div>
        <div style={{
          background: 'rgba(123,91,13,0.08)', border: '1px solid rgba(123,91,13,0.2)',
          borderRadius: '999px', padding: '6px 14px',
          fontSize: '12px', fontWeight: 600, color: gold, fontFamily: f,
        }}>Share with customer</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', minHeight: '300px' }}>
        {/* Roof view (left) */}
        <div style={{ flex: '1 1 55%', position: 'relative', background: 'linear-gradient(135deg, #4A6741, #3A5535)', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(255,255,255,0.02) 8px, rgba(255,255,255,0.02) 9px), repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(255,255,255,0.02) 8px, rgba(255,255,255,0.02) 9px)',
            }} />
            <div style={{ position: 'absolute', bottom: 0, left: '35%', width: '30%', height: '40%', background: 'rgba(160,155,145,0.3)', borderRadius: '4px 4px 0 0' }} />
            <div style={{
              position: 'absolute', top: '15%', left: '15%', width: '70%', height: '50%',
              background: 'rgba(140,130,115,0.5)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '2px',
            }}>
              <div style={{
                position: 'absolute', top: '10%', left: '8%', width: '84%', height: '80%',
                display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gridTemplateRows: 'repeat(4, 1fr)', gap: '2px',
              }}>
                {Array.from({ length: 22 }).map((_, i) => (
                  <div key={i} style={{ background: 'rgba(30,60,140,0.55)', border: '0.5px solid rgba(80,140,220,0.4)', borderRadius: '1px' }} />
                ))}
              </div>
              <div style={{
                position: 'absolute', top: '-26px', left: '50%', transform: 'translateX(-50%)',
                background: goldBg, borderRadius: '999px', padding: '4px 12px',
                fontSize: '11px', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', fontFamily: f,
              }}>22 panels</div>
            </div>
            <div style={{ position: 'absolute', top: '10%', right: '8%', width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(50,90,50,0.5)' }} />
            <div style={{ position: 'absolute', bottom: '25%', left: '5%', width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(50,90,50,0.4)' }} />
          </div>

          {/* Zoom controls */}
          <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {['+', '−'].map((z) => (
              <div key={z} style={{
                width: '30px', height: '30px', background: 'rgba(255,255,255,0.9)',
                border: '1px solid rgba(0,0,0,0.12)', borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', color: secondary, fontFamily: f, boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              }}>{z}</div>
            ))}
          </div>

          {/* Address bar */}
          <div style={{
            position: 'absolute', top: '12px', left: '12px', right: '12px',
            background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: '10px', padding: '8px 12px',
            fontSize: '12px', color: secondary, fontFamily: f, boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}>1847 Maple Ridge Dr, Provo UT</div>
        </div>

        {/* Estimate panel (right) */}
        <div style={{ flex: '1 1 45%', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', borderLeft: '1px solid rgba(0,0,0,0.08)' }}>
          <p style={{ fontSize: '10px', fontWeight: 600, color: muted, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0, fontFamily: f }}>SYSTEM ESTIMATE</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'System Size', value: '7.04 kW' },
              { label: 'Panel Count', value: '22 panels' },
              { label: 'Annual Production', value: '10,200 kWh' },
            ].map((s) => (
              <div key={s.label}>
                <p style={{ fontSize: '11px', color: secondary, margin: 0, fontFamily: f }}>{s.label}</p>
                <p style={{ fontSize: '18px', fontWeight: 700, margin: '2px 0 0', fontFamily: f }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Savings callout */}
          <div style={{
            background: 'rgba(21,128,61,0.05)', border: '1px solid rgba(21,128,61,0.15)',
            borderRadius: '12px', padding: '12px 14px',
          }}>
            <p style={{ fontSize: '10px', color: green, margin: 0, fontFamily: f, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>EST. MONTHLY SAVINGS</p>
            <p style={{ fontSize: '26px', fontWeight: 800, color: green, margin: '4px 0 0', fontFamily: f }}>$142/mo</p>
            <p style={{ fontSize: '11px', color: secondary, margin: '2px 0 0', fontFamily: f }}>~$1,704 annual savings</p>
          </div>

          {/* Offset */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', color: secondary, fontFamily: f }}>Energy offset</span>
              <span style={{ fontSize: '11px', fontWeight: 600, color: gold, fontFamily: f }}>94%</span>
            </div>
            <div style={{ height: '6px', background: 'rgba(0,0,0,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ width: '94%', height: '100%', background: `linear-gradient(90deg, #8B6914, ${goldBg})`, borderRadius: '999px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
