'use client'

/**
 * CaliberDashboard — App screen mockup (tablet, light mode)
 * The first thing a rep sees. Leaderboard position, key metrics,
 * goal gradient progress, and estimated pay. Light theme
 * with gold accents. Tablet-first layout.
 *
 * Contrast targets on #FFF:
 *   #7B5B0D gold text → 5.5:1
 *   #525252 secondary → 7.1:1
 *   #6B6B6B muted     → 4.9:1
 *   #15803D green     → 4.7:1
 */
export default function CaliberDashboard() {
  const f = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

  /* ── Contrast-safe palette ── */
  const gold     = '#7B5B0D'   // 5.5:1 on white
  const goldBg   = '#D4A017'   // decorative fills only
  const green    = '#15803D'   // 4.7:1 on white
  const muted    = '#6B6B6B'   // 4.9:1 on white
  const secondary = '#525252'  // 7.1:1 on white
  const ink      = '#1A1A1A'

  return (
    <div
      className="caliber-screen"
      style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        overflow: 'hidden',
        fontFamily: f,
        color: ink,
        width: '100%',
        maxWidth: '860px',
        margin: '0 auto',
        border: '1px solid rgba(0,0,0,0.10)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      {/* ── Status bar ── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 24px 0',
          fontSize: '12px',
          fontWeight: 600,
          color: muted,
          fontFamily: f,
        }}
      >
        <span>9:41</span>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <div style={{ width: '16px', height: '10px', borderRadius: '2px', border: `1.5px solid ${muted}`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '70%', background: muted, borderRadius: '1px' }} />
          </div>
        </div>
      </div>

      {/* ── Header ── */}
      <div style={{ padding: '16px 24px 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '13px', color: secondary, margin: 0, fontFamily: f }}>
              Good morning
            </p>
            <p style={{ fontSize: '22px', fontWeight: 700, margin: '2px 0 0', fontFamily: f }}>
              Marcus J.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Notification bell */}
            <div style={{ position: 'relative' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={secondary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
              </svg>
              <div style={{
                position: 'absolute', top: '-2px', right: '-2px',
                width: '8px', height: '8px', borderRadius: '50%',
                background: '#DC2626', border: '1.5px solid #fff',
              }} />
            </div>
            {/* Avatar */}
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${goldBg}, #8B6914)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 700,
              color: '#fff',
              fontFamily: f,
            }}>
              MJ
            </div>
          </div>
        </div>
      </div>

      {/* ── Product switcher ── */}
      <div style={{ padding: '0 24px 14px', display: 'flex', gap: '6px' }}>
        {['Solar', 'T-Mobile', 'Dish', 'Pest'].map((p, i) => (
          <div
            key={p}
            style={{
              padding: '6px 14px',
              borderRadius: '999px',
              background: i === 0 ? 'rgba(123,91,13,0.08)' : '#F0F0F0',
              border: `1px solid ${i === 0 ? 'rgba(123,91,13,0.25)' : 'rgba(0,0,0,0.08)'}`,
              fontSize: '12px',
              fontWeight: i === 0 ? 600 : 400,
              color: i === 0 ? gold : secondary,
              fontFamily: f,
            }}
          >
            {p}
          </div>
        ))}
      </div>

      {/* ── Top row: Leaderboard + Estimated Pay (side by side on tablet) ── */}
      <div style={{ padding: '0 24px 14px', display: 'flex', gap: '14px' }}>
        {/* Leaderboard rank card */}
        <div style={{
          flex: '1 1 55%',
          background: 'rgba(123,91,13,0.05)',
          border: '1px solid rgba(123,91,13,0.15)',
          borderRadius: '16px',
          padding: '16px 18px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '10px', fontWeight: 600, color: gold, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0, fontFamily: f }}>
                LEADERBOARD
              </p>
              <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
                {['Day', 'Week', 'Month'].map((t, i) => (
                  <div key={t} style={{
                    padding: '3px 10px', borderRadius: '999px',
                    background: i === 1 ? 'rgba(123,91,13,0.12)' : 'transparent',
                    fontSize: '10px', fontWeight: i === 1 ? 600 : 400,
                    color: i === 1 ? gold : muted, fontFamily: f,
                  }}>{t}</div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '4px' }}>
                <span style={{ fontSize: '36px', fontWeight: 800, color: gold, fontFamily: f }}>
                  #7
                </span>
                <span style={{ fontSize: '13px', color: secondary, fontFamily: f }}>
                  of 142 reps
                </span>
              </div>
            </div>
            <div style={{
              background: 'rgba(21,128,61,0.08)',
              borderRadius: '999px',
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: 600,
              color: green,
              fontFamily: f,
            }}>
              ↑ 3 this week
            </div>
          </div>

          {/* Goal gradient callout */}
          <div style={{
            marginTop: '14px',
            background: 'rgba(0,0,0,0.03)',
            borderRadius: '12px',
            padding: '12px 14px',
          }}>
            <p style={{ fontSize: '12px', color: secondary, margin: '0 0 6px', fontFamily: f }}>
              3 more solar installs to qualify
            </p>
            <p style={{ fontSize: '14px', fontWeight: 600, color: gold, margin: 0, fontFamily: f }}>
              Cancun Trip
            </p>
            <div style={{
              marginTop: '8px',
              height: '6px',
              background: 'rgba(0,0,0,0.08)',
              borderRadius: '999px',
              overflow: 'hidden',
            }}>
              <div style={{
                width: '78%',
                height: '100%',
                background: `linear-gradient(90deg, #8B6914, ${goldBg})`,
                borderRadius: '999px',
              }} />
            </div>
            <p style={{ fontSize: '11px', color: muted, margin: '4px 0 0', textAlign: 'right', fontFamily: f }}>
              18 / 23 installs
            </p>
          </div>
        </div>

        {/* Estimated pay */}
        <div style={{
          flex: '1 1 45%',
          background: '#F5F5F5',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: '16px',
          padding: '16px 18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <p style={{ fontSize: '10px', fontWeight: 600, color: muted, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0, fontFamily: f }}>
            ESTIMATED PAY · THIS PERIOD
          </p>
          <div style={{ marginTop: '8px' }}>
            <p style={{ fontSize: '32px', fontWeight: 800, color: green, margin: 0, fontFamily: f }}>
              $4,280
            </p>
            <p style={{ fontSize: '11px', color: muted, margin: '2px 0 0', fontFamily: f }}>
              Based on current metrics
            </p>
          </div>
          <div style={{ marginTop: '14px', padding: '10px 12px', background: 'rgba(21,128,61,0.05)', borderRadius: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '11px', color: secondary, fontFamily: f }}>If you hit remaining</span>
              <span style={{ fontSize: '16px', fontWeight: 700, color: secondary, fontFamily: f }}>$5,840</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Key metrics grid ── */}
      <div style={{ padding: '0 24px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <p style={{ fontSize: '10px', fontWeight: 600, color: muted, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0, fontFamily: f }}>
            KEY METRICS
          </p>
          <div style={{ display: 'flex', gap: '4px' }}>
            {['Day', 'Week', 'Month'].map((t, i) => (
              <div key={t} style={{
                padding: '3px 10px', borderRadius: '999px',
                background: i === 2 ? 'rgba(0,0,0,0.06)' : 'transparent',
                fontSize: '10px', fontWeight: i === 2 ? 600 : 400,
                color: i === 2 ? secondary : muted, fontFamily: f,
              }}>{t}</div>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px' }}>
          {[
            { label: 'Total Sales', value: '34', change: '+6', positive: true },
            { label: 'Solar Installs', value: '18', change: '+3', positive: true },
            { label: 'Cancelations', value: '2', change: '-1', positive: true },
            { label: 'Close Rate', value: '24%', change: '+2%', positive: true },
          ].map((m) => (
            <div
              key={m.label}
              style={{
                background: '#F5F5F5',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: '12px',
                padding: '12px 14px',
              }}
            >
              <p style={{ fontSize: '10px', color: muted, margin: 0, fontFamily: f }}>
                {m.label}
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '4px' }}>
                <span style={{ fontSize: '24px', fontWeight: 700, fontFamily: f }}>
                  {m.value}
                </span>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: m.positive ? green : '#DC2626',
                  fontFamily: f,
                }}>
                  {m.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tasks & Notifications row ── */}
      <div style={{ padding: '0 24px 20px', display: 'flex', gap: '14px' }}>
        {/* Tasks / Reminders */}
        <div style={{
          flex: '1 1 60%',
          background: '#F5F5F5',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: '16px',
          padding: '16px 18px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <p style={{ fontSize: '10px', fontWeight: 600, color: muted, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0, fontFamily: f }}>
              TASKS & REMINDERS
            </p>
            <span style={{ fontSize: '11px', color: gold, fontWeight: 600, fontFamily: f }}>View all</span>
          </div>
          {[
            { text: 'Follow up with Johnson install', time: 'Today, 2pm', done: false, urgent: false },
            { text: 'Submit permit docs — Maple Ridge', time: 'Today, 5pm', done: false, urgent: true },
            { text: 'Call back Garcia re: financing', time: 'Tomorrow', done: false, urgent: false },
            { text: 'Site survey — 440 Elm St', time: 'Completed', done: true, urgent: false },
          ].map((task, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: '10px',
              padding: '8px 0',
              borderTop: i > 0 ? '1px solid rgba(0,0,0,0.05)' : 'none',
              opacity: task.done ? 0.5 : 1,
            }}>
              <div style={{
                width: '16px', height: '16px', borderRadius: '4px', flexShrink: 0, marginTop: '1px',
                border: task.done ? 'none' : '1.5px solid rgba(0,0,0,0.2)',
                background: task.done ? green : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {task.done && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{
                  fontSize: '12px', fontWeight: 500, margin: 0, fontFamily: f,
                  textDecoration: task.done ? 'line-through' : 'none',
                  color: task.done ? muted : ink,
                }}>{task.text}</p>
                <p style={{ fontSize: '10px', color: task.urgent ? '#DC2626' : muted, margin: '1px 0 0', fontFamily: f, fontWeight: task.urgent ? 600 : 400 }}>
                  {task.urgent && '⚠ '}{task.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Notifications */}
        <div style={{
          flex: '1 1 40%',
          background: '#F5F5F5',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: '16px',
          padding: '16px 18px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <p style={{ fontSize: '10px', fontWeight: 600, color: muted, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0, fontFamily: f }}>
              NOTIFICATIONS
            </p>
            <div style={{
              background: '#DC2626', borderRadius: '999px', padding: '1px 7px',
              fontSize: '10px', fontWeight: 700, color: '#fff', fontFamily: f,
            }}>3</div>
          </div>
          {[
            { icon: '★', iconColor: goldBg, text: 'You moved up to #7 on the board', time: '2h ago' },
            { icon: '✓', iconColor: green, text: 'Garcia install confirmed for Thursday', time: '4h ago' },
            { icon: '💬', iconColor: '#1D4ED8', text: 'New message from area manager', time: 'Yesterday' },
          ].map((n, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: '10px',
              padding: '8px 0',
              borderTop: i > 0 ? '1px solid rgba(0,0,0,0.05)' : 'none',
            }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
                background: `${n.iconColor}12`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px',
              }}>{n.icon}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '11px', fontWeight: 500, margin: 0, fontFamily: f, lineHeight: 1.35 }}>{n.text}</p>
                <p style={{ fontSize: '10px', color: muted, margin: '2px 0 0', fontFamily: f }}>{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom nav ── */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px 24px 18px',
        borderTop: '1px solid rgba(0,0,0,0.08)',
      }}>
        {([
          { label: 'Dashboard', active: true, d: 'M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z' },
          { label: 'Board', active: false, d: 'M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z' },
          { label: 'Sales', active: false, d: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
          { label: 'Incentives', active: false, d: 'M13 10V3L4 14h7v7l9-11h-7z' },
          { label: 'More', active: false, d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066zM15 12a3 3 0 11-6 0 3 3 0 016 0z' },
        ] as const).map((n) => (
          <div
            key={n.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={n.active ? gold : '#B0B0B0'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d={n.d} />
            </svg>
            <span style={{
              fontSize: '10px',
              fontWeight: n.active ? 600 : 400,
              color: n.active ? gold : '#B0B0B0',
              fontFamily: f,
            }}>
              {n.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
