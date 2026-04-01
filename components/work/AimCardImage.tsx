/**
 * AIM work card — composed marketing-style image.
 * Simplified: one main card + a couple floating accents.
 * Big enough to read, few enough to breathe.
 */
export default function AimCardImage() {
  return (
    <>
      {/* ── Desktop composition ── */}
      <div className="hidden md:block" style={{ position: 'absolute', inset: 0 }}>
        {/* Radial glow */}
        <div
          style={{
            position: 'absolute',
            top: '5%',
            left: '10%',
            width: '80%',
            height: '80%',
            background: 'radial-gradient(ellipse, rgba(50,120,200,0.1) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        {/* ─── Main card: Account overview ─── */}
        <div
          style={{
            position: 'absolute',
            top: '6%',
            left: '8%',
            right: '-6%',
            bottom: '18%',
            padding: '22px 26px',
            background: 'rgba(10,20,38,0.92)',
            borderRadius: '12px',
            border: '0.5px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            overflow: 'hidden',
            zIndex: 2,
          }}
        >
          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(60,130,200,0.4), rgba(40,80,140,0.6))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                }}
              >
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', fontWeight: 600, fontFamily: 'var(--font-outfit)' }}>ST</span>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '16px', fontWeight: 600, color: 'rgba(255,255,255,0.95)', margin: 0, lineHeight: 1.2 }}>
                  Sam Taylor
                </p>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.4)', margin: 0, marginTop: '2px' }}>
                  3 active accounts · Member since 2019
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <div style={{ padding: '5px 14px', borderRadius: '999px', background: 'rgba(60,160,120,0.12)', border: '0.5px solid rgba(60,160,120,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-outfit)', fontSize: '10px', fontWeight: 500, color: 'rgba(80,200,140,0.9)', lineHeight: 1 }}>Active</span>
              </div>
            </div>
          </div>

          {/* AI Summary */}
          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                <path d="M6 1L7.5 4.5L11 6L7.5 7.5L6 11L4.5 7.5L1 6L4.5 4.5L6 1Z" fill="rgba(100,170,255,0.7)" />
              </svg>
              <span style={{ fontFamily: 'var(--font-outfit)', fontSize: '11px', fontWeight: 500, color: 'rgba(100,170,255,0.8)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                AI Account Summary
              </span>
            </div>
            <div
              style={{
                padding: '12px 16px',
                background: 'rgba(255,255,255,0.025)',
                borderRadius: '8px',
                border: '0.5px solid rgba(255,255,255,0.06)',
              }}
            >
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.7 }}>
                Healthy profile. Consistent on-time payments across all active accounts. Current balance at normal levels with strong payment history.
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '10px' }}>
            {[
              { label: 'Current Balance', value: '$385,654' },
              { label: 'Next Payment', value: 'Apr 15' },
              { label: 'Credit Score', value: '742' },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  flex: 1,
                  padding: '12px 14px',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '8px',
                  border: '0.5px solid rgba(255,255,255,0.05)',
                }}
              >
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '9px', fontWeight: 400, color: 'rgba(255,255,255,0.35)', margin: 0, marginBottom: '4px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {stat.label}
                </p>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '20px', fontWeight: 600, color: 'rgba(255,255,255,0.95)', margin: 0, letterSpacing: '-0.01em' }}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Floating task queue ─── */}
        <div
          style={{
            position: 'absolute',
            bottom: '4%',
            left: '-2%',
            width: '46%',
            padding: '14px 16px',
            background: 'rgba(10,20,38,0.92)',
            borderRadius: '10px',
            border: '0.5px solid rgba(255,255,255,0.08)',
            boxShadow: '0 10px 32px rgba(0,0,0,0.4)',
            zIndex: 1,
            transform: 'rotate(-1.5deg)',
          }}
        >
          <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '10px', fontWeight: 500, color: 'rgba(255,255,255,0.55)', margin: 0, marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Task Queue
          </p>
          {[
            { task: 'Review loan application', status: 'In progress', color: 'rgba(100,170,255,0.7)' },
            { task: 'Payment verification', status: 'Pending', color: 'rgba(255,180,60,0.7)' },
            { task: 'Document follow-up', status: 'Pending', color: 'rgba(255,180,60,0.7)' },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '5px 0',
                borderTop: i > 0 ? '0.5px solid rgba(255,255,255,0.04)' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-outfit)', fontSize: '10px', fontWeight: 300, color: 'rgba(255,255,255,0.6)' }}>{item.task}</span>
              </div>
              <span style={{ fontFamily: 'var(--font-outfit)', fontSize: '8px', fontWeight: 400, color: 'rgba(255,255,255,0.3)', flexShrink: 0, marginLeft: '8px' }}>{item.status}</span>
            </div>
          ))}
        </div>

        {/* ─── Floating accent: queue status ─── */}
        <div
          style={{
            position: 'absolute',
            bottom: '4%',
            right: '-2%',
            padding: '10px 16px',
            background: 'rgba(10,20,38,0.92)',
            borderRadius: '10px',
            border: '0.5px solid rgba(255,255,255,0.08)',
            boxShadow: '0 10px 32px rgba(0,0,0,0.4)',
            zIndex: 1,
            transform: 'rotate(1deg)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(80,200,140,0.8)' }} />
            <span style={{ fontFamily: 'var(--font-outfit)', fontSize: '11px', fontWeight: 400, color: 'rgba(255,255,255,0.6)' }}>Queue auto-assigned</span>
          </div>
        </div>
      </div>

      {/* ── Mobile composition ── */}
      <div className="md:hidden" style={{ position: 'absolute', inset: 0 }}>
        {/* Radial glow */}
        <div
          style={{
            position: 'absolute',
            top: '5%',
            left: '10%',
            width: '80%',
            height: '70%',
            background: 'radial-gradient(ellipse, rgba(50,120,200,0.1) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        {/* ─── Main card ─── */}
        <div
          style={{
            position: 'absolute',
            top: '3%',
            left: '2%',
            right: '2%',
            padding: '14px 16px',
            background: 'rgba(10,20,38,0.92)',
            borderRadius: '10px',
            border: '0.5px solid rgba(255,255,255,0.1)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
            overflow: 'hidden',
            zIndex: 2,
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(60,130,200,0.4), rgba(40,80,140,0.6))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.9)', fontWeight: 600, fontFamily: 'var(--font-outfit)' }}>ST</span>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.95)', margin: 0, lineHeight: 1.2 }}>Sam Taylor</p>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '9px', fontWeight: 300, color: 'rgba(255,255,255,0.4)', margin: 0, marginTop: '1px' }}>3 active accounts</p>
              </div>
            </div>
            <div style={{ padding: '4px 12px', borderRadius: '999px', background: 'rgba(60,160,120,0.12)', border: '0.5px solid rgba(60,160,120,0.25)', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-outfit)', fontSize: '9px', fontWeight: 500, color: 'rgba(80,200,140,0.9)', lineHeight: 1 }}>Active</span>
            </div>
          </div>

          {/* AI label + summary */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M6 1L7.5 4.5L11 6L7.5 7.5L6 11L4.5 7.5L1 6L4.5 4.5L6 1Z" fill="rgba(100,170,255,0.7)" />
            </svg>
            <span style={{ fontFamily: 'var(--font-outfit)', fontSize: '9px', fontWeight: 500, color: 'rgba(100,170,255,0.8)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              AI Account Summary
            </span>
          </div>
          <div style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.025)', borderRadius: '6px', border: '0.5px solid rgba(255,255,255,0.05)' }}>
            <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '10px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.6 }}>
              Healthy profile. Consistent on-time payments. No flags in 12 months.
            </p>
          </div>
        </div>

        {/* ─── Floating stat: balance (in front) ─── */}
        <div
          style={{
            position: 'absolute',
            bottom: '6%',
            left: '6%',
            padding: '10px 16px',
            background: 'rgba(10,20,38,0.95)',
            borderRadius: '10px',
            border: '0.5px solid rgba(255,255,255,0.1)',
            boxShadow: '0 14px 40px rgba(0,0,0,0.5)',
            zIndex: 3,
            transform: 'rotate(-2deg)',
          }}
        >
          <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '8px', fontWeight: 400, color: 'rgba(255,255,255,0.35)', margin: 0, marginBottom: '3px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Balance
          </p>
          <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '20px', fontWeight: 600, color: 'rgba(255,255,255,0.95)', margin: 0 }}>
            $385,654
          </p>
        </div>

        {/* ─── Floating task queue (behind balance) ─── */}
        <div
          style={{
            position: 'absolute',
            bottom: '2%',
            right: '8%',
            width: '48%',
            padding: '10px 12px',
            background: 'rgba(10,20,38,0.92)',
            borderRadius: '10px',
            border: '0.5px solid rgba(255,255,255,0.08)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
            zIndex: 1,
            transform: 'rotate(1.5deg)',
          }}
        >
          <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '8px', fontWeight: 500, color: 'rgba(255,255,255,0.5)', margin: 0, marginBottom: '6px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Task Queue
          </p>
          {[
            { task: 'Review loan app', color: 'rgba(100,170,255,0.7)' },
            { task: 'Payment verification', color: 'rgba(255,180,60,0.7)' },
            { task: 'Doc follow-up', color: 'rgba(255,180,60,0.7)' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '3px 0', borderTop: i > 0 ? '0.5px solid rgba(255,255,255,0.04)' : 'none' }}>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-outfit)', fontSize: '9px', fontWeight: 300, color: 'rgba(255,255,255,0.55)' }}>{item.task}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
