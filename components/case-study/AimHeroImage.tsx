'use client'

import { useEffect, useState } from 'react'

/**
 * AIM hero — expanded marketing-style floating UI composition.
 * Same visual language as AimCardImage (the work card), but larger
 * and more detailed. Transition from card → hero should feel like
 * zooming into the same interface.
 */
export default function AimHeroImage() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 900)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        height: 'clamp(300px, 38vw, 420px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          left: '10%',
          width: '80%',
          height: '80%',
          background: 'radial-gradient(ellipse, rgba(50,120,200,0.08) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* ─── Main card: Account overview ─── */}
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '8%',
          right: '-4%',
          bottom: '22%',
          padding: 'clamp(20px, 3vw, 32px) clamp(24px, 3.5vw, 36px)',
          background: 'rgba(10,20,38,0.92)',
          borderRadius: '14px',
          border: '0.5px solid rgba(255,255,255,0.1)',
          boxShadow: '0 24px 72px rgba(0,0,0,0.5)',
          overflow: 'hidden',
          zIndex: 2,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease 0.15s',
        }}
      >
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: 'clamp(12px, 1.8vw, 20px)' }}>
          {['Search', '›', 'Search results', '›', 'Sam Taylor'].map((item, i) => (
            <span key={i} style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(9px, 1vw, 12px)', fontWeight: 300, color: i === 4 ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.25)' }}>
              {item}
            </span>
          ))}
        </div>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'clamp(16px, 2.5vw, 28px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px, 1.5vw, 16px)' }}>
            <div
              style={{
                width: 'clamp(40px, 5vw, 52px)',
                height: 'clamp(40px, 5vw, 52px)',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(60,130,200,0.4), rgba(40,80,140,0.6))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}
            >
              <span style={{ fontSize: 'clamp(14px, 1.8vw, 20px)', color: 'rgba(255,255,255,0.9)', fontWeight: 600, fontFamily: 'var(--font-outfit)' }}>ST</span>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(18px, 2.2vw, 24px)', fontWeight: 600, color: 'rgba(255,255,255,0.95)', margin: 0, lineHeight: 1.2 }}>
                Sam Taylor
              </p>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(11px, 1.2vw, 14px)', fontWeight: 300, color: 'rgba(255,255,255,0.4)', margin: 0, marginTop: '3px' }}>
                3 active accounts · Member since 2019
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ padding: '5px 16px', borderRadius: '999px', background: 'rgba(60,160,120,0.12)', border: '0.5px solid rgba(60,160,120,0.25)', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(10px, 1vw, 12px)', fontWeight: 500, color: 'rgba(80,200,140,0.9)', lineHeight: 1 }}>Active</span>
            </div>
            <div className="hidden md:flex" style={{ padding: '5px 16px', borderRadius: '999px', background: 'rgba(60,120,200,0.1)', border: '0.5px solid rgba(60,120,200,0.2)', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(10px, 1vw, 12px)', fontWeight: 500, color: 'rgba(100,170,255,0.8)', lineHeight: 1 }}>Lender View</span>
            </div>
          </div>
        </div>

        {/* AI Summary */}
        <div style={{ marginBottom: 'clamp(16px, 2.5vw, 28px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <svg width="16" height="16" viewBox="0 0 12 12" fill="none">
              <path d="M6 1L7.5 4.5L11 6L7.5 7.5L6 11L4.5 7.5L1 6L4.5 4.5L6 1Z" fill="rgba(100,170,255,0.7)" />
            </svg>
            <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(11px, 1.2vw, 13px)', fontWeight: 500, color: 'rgba(100,170,255,0.8)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              AI Account Summary
            </span>
          </div>
          <div
            style={{
              padding: 'clamp(12px, 1.5vw, 18px) clamp(14px, 1.8vw, 22px)',
              background: 'rgba(255,255,255,0.025)',
              borderRadius: '10px',
              border: '0.5px solid rgba(255,255,255,0.06)',
            }}
          >
            <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(12px, 1.3vw, 15px)', fontWeight: 300, color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.7 }}>
              Healthy profile. Consistent on-time payments across all active accounts. Current balance at normal levels with strong payment history. No flags or escalations in the last 12 months.
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 'clamp(8px, 1.2vw, 14px)' }}>
          {[
            { label: 'Current Balance', value: '$385,654', sub: 'On track' },
            { label: 'Next Payment', value: 'Apr 15', sub: '$2,840.00' },
            { label: 'Credit Score', value: '742', sub: '+12 this year' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                padding: 'clamp(12px, 1.5vw, 18px) clamp(14px, 1.8vw, 20px)',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '10px',
                border: '0.5px solid rgba(255,255,255,0.05)',
              }}
            >
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(9px, 1vw, 11px)', fontWeight: 400, color: 'rgba(255,255,255,0.35)', margin: 0, marginBottom: '4px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {stat.label}
              </p>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 600, color: 'rgba(255,255,255,0.95)', margin: 0, letterSpacing: '-0.01em' }}>
                {stat.value}
              </p>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(9px, 1vw, 11px)', fontWeight: 400, color: 'rgba(80,200,140,0.7)', margin: 0, marginTop: '3px' }}>
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Floating balance stat (in front) ─── */}
      <div
        style={{
          position: 'absolute',
          bottom: '8%',
          left: '-3%',
          padding: 'clamp(14px, 1.8vw, 20px) clamp(18px, 2.2vw, 28px)',
          background: 'rgba(10,20,38,0.95)',
          borderRadius: '12px',
          border: '0.5px solid rgba(255,255,255,0.1)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
          zIndex: 4,
          transform: 'rotate(-2deg)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease 0.35s',
        }}
      >
        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(9px, 1vw, 11px)', fontWeight: 400, color: 'rgba(255,255,255,0.35)', margin: 0, marginBottom: '4px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Current Balance
        </p>
        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 600, color: 'rgba(255,255,255,0.95)', margin: 0, letterSpacing: '-0.01em' }}>
          $385,654
        </p>
        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(9px, 1vw, 11px)', fontWeight: 400, color: 'rgba(80,200,140,0.7)', margin: 0, marginTop: '3px' }}>
          On track
        </p>
      </div>

      {/* ─── Floating payoff quote (desktop only) ─── */}
      <div
        className="hidden md:block"
        style={{
          position: 'absolute',
          bottom: '2%',
          left: '22%',
          padding: 'clamp(12px, 1.5vw, 18px) clamp(16px, 2vw, 24px)',
          background: 'rgba(10,20,38,0.95)',
          borderRadius: '12px',
          border: '0.5px solid rgba(255,255,255,0.08)',
          boxShadow: '0 12px 36px rgba(0,0,0,0.45)',
          zIndex: 3,
          transform: 'rotate(0.5deg)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease 0.5s',
        }}
      >
        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(9px, 1vw, 11px)', fontWeight: 400, color: 'rgba(255,255,255,0.35)', margin: 0, marginBottom: '4px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Payoff Quote
        </p>
        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(18px, 2.2vw, 26px)', fontWeight: 600, color: 'rgba(255,255,255,0.95)', margin: 0, letterSpacing: '-0.01em' }}>
          $35,000
        </p>
        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(9px, 1vw, 11px)', fontWeight: 400, color: 'rgba(255,255,255,0.35)', margin: 0, marginTop: '3px' }}>
          Valid through May 1
        </p>
      </div>

      {/* ─── Floating task queue (behind balance) ─── */}
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '2%',
          width: 'clamp(180px, 32vw, 300px)',
          padding: 'clamp(12px, 1.5vw, 18px) clamp(14px, 1.8vw, 20px)',
          background: 'rgba(10,20,38,0.92)',
          borderRadius: '12px',
          border: '0.5px solid rgba(255,255,255,0.08)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
          zIndex: 3,
          transform: 'rotate(1.5deg)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease 0.45s',
        }}
      >
        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(10px, 1.1vw, 12px)', fontWeight: 500, color: 'rgba(255,255,255,0.55)', margin: 0, marginBottom: '10px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
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
              padding: '6px 0',
              borderTop: i > 0 ? '0.5px solid rgba(255,255,255,0.04)' : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(10px, 1.1vw, 13px)', fontWeight: 300, color: 'rgba(255,255,255,0.6)' }}>{item.task}</span>
            </div>
            <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(8px, 0.9vw, 10px)', fontWeight: 400, color: 'rgba(255,255,255,0.3)', flexShrink: 0, marginLeft: '10px' }}>{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
