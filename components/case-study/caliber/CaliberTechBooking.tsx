'use client'

/**
 * CaliberTechBooking — App screen mockup (tablet, light mode)
 * Contrast-safe colors on white surfaces.
 */
export default function CaliberTechBooking() {
  const f = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

  const gold      = '#7B5B0D'
  const goldBg    = '#D4A017'
  const green     = '#15803D'
  const muted     = '#6B6B6B'
  const secondary = '#525252'
  const ink       = '#1A1A1A'

  const techs = [
    { name: 'Brandon K.', rating: 4.9, reviews: 127, specialty: 'Solar Install', available: 'Tomorrow, 8am', initials: 'BK', color: '#1D4ED8' },
    { name: 'Sarah M.', rating: 4.8, reviews: 94, specialty: 'Solar Install', available: 'Thu, Oct 10', initials: 'SM', color: '#6D28D9' },
    { name: 'Derek W.', rating: 4.7, reviews: 83, specialty: 'Solar + Pest', available: 'Fri, Oct 11', initials: 'DW', color: '#7B5B0D' },
  ]

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
      <div style={{ padding: '16px 24px 4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{ fontSize: '14px', color: secondary }}>←</span>
          <p style={{ fontSize: '10px', fontWeight: 600, color: muted, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0, fontFamily: f }}>BOOK A TECHNICIAN</p>
        </div>
        <p style={{ fontSize: '20px', fontWeight: 700, margin: '4px 0 0', fontFamily: f }}>Available techs near Provo</p>
        <p style={{ fontSize: '12px', color: secondary, margin: '2px 0 0', fontFamily: f }}>Customer: Johnson, R. · 1847 Maple Ridge Dr</p>
      </div>

      {/* Sort pills */}
      <div style={{ padding: '12px 24px 4px', display: 'flex', gap: '6px' }}>
        {['Top Rated', 'Soonest', 'Nearest'].map((s, i) => (
          <div key={s} style={{
            padding: '6px 14px', borderRadius: '999px',
            background: i === 0 ? 'rgba(123,91,13,0.08)' : '#F0F0F0',
            border: `1px solid ${i === 0 ? 'rgba(123,91,13,0.25)' : 'rgba(0,0,0,0.08)'}`,
            fontSize: '12px', fontWeight: i === 0 ? 600 : 400,
            color: i === 0 ? gold : secondary, fontFamily: f,
          }}>{s}</div>
        ))}
      </div>

      {/* Tech cards */}
      <div style={{ padding: '14px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {techs.map((tech, i) => (
          <div key={tech.name} style={{
            background: i === 0 ? 'rgba(123,91,13,0.04)' : '#F5F5F5',
            border: `1px solid ${i === 0 ? 'rgba(123,91,13,0.15)' : 'rgba(0,0,0,0.08)'}`,
            borderRadius: '14px', padding: '16px 18px',
          }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px',
                background: `linear-gradient(135deg, ${tech.color}18, ${tech.color}08)`,
                border: `1px solid ${tech.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '15px', fontWeight: 700, color: tech.color, flexShrink: 0, fontFamily: f,
              }}>{tech.initials}</div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: 600, margin: 0, fontFamily: f }}>{tech.name}</p>
                    <p style={{ fontSize: '11px', color: secondary, margin: '1px 0 0', fontFamily: f }}>{tech.specialty}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '13px', color: goldBg }}>★</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, fontFamily: f }}>{tech.rating}</span>
                    <span style={{ fontSize: '11px', color: muted, fontFamily: f }}>({tech.reviews})</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: i === 0 ? green : '#B0B0B0' }} />
                    <span style={{ fontSize: '12px', color: i === 0 ? green : secondary, fontWeight: i === 0 ? 500 : 400, fontFamily: f }}>{tech.available}</span>
                  </div>
                  <div style={{
                    padding: '6px 16px', borderRadius: '999px',
                    background: i === 0 ? goldBg : 'rgba(0,0,0,0.05)',
                    fontSize: '12px', fontWeight: 600,
                    color: i === 0 ? '#fff' : secondary, fontFamily: f,
                  }}>{i === 0 ? 'Book' : 'Select'}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info note */}
      <div style={{ padding: '4px 24px 20px' }}>
        <div style={{
          background: 'rgba(29,78,216,0.04)', border: '1px solid rgba(29,78,216,0.12)',
          borderRadius: '12px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <span style={{ fontSize: '13px', color: '#1D4ED8' }}>ℹ</span>
          <p style={{ fontSize: '11px', color: secondary, margin: 0, fontFamily: f, lineHeight: 1.4 }}>
            Customer will see the tech&apos;s name, photo, rating, and arrival window after booking.
          </p>
        </div>
      </div>
    </div>
  )
}
