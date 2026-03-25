'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Animated payment flow for the Mobile Lending Management hero.
 *
 * Sequence:
 *   1. Review payment screen (idle)
 *   2. Submit button press animation
 *   3. Fade to success screen
 *   4. Confetti bursts from checkmark
 *   5. Hold on success screen → loop after 6s
 *
 * Designed at 440px (Figma spec) and scaled down to 130×281px display size.
 */

// ── Constants ──────────────────────────────────────────────────────────────

const DESIGN_W = 440
const DISP_W   = 130
const DISP_H   = 281
const SCALE    = DISP_W / DESIGN_W  // 0.2955

// Lendmark design tokens (from Figma)
const RED     = '#a50011'
const RED_DIM = '#7a0008'
const SURFACE = '#fff8f7'
const INK     = '#291715'
const MUTED   = '#5e3f3c'
const SUBTLE  = '#534341'

// ── Types ──────────────────────────────────────────────────────────────────

type Phase = 'idle' | 'pressing' | 'success'

interface ConfettiPiece {
  id:    number
  x:     number
  y:     number
  dx:    string
  dy:    string
  rot:   string
  w:     number
  h:     number
  color: string
  delay: number
  dur:   number
}

// ── Helpers ────────────────────────────────────────────────────────────────

const CONFETTI_COLORS = [RED, '#ff4d4d', '#ff9999', '#ffd6cc', '#ffffff', '#ffb3b3']

function makeConfetti(ox: number, oy: number): ConfettiPiece[] {
  return Array.from({ length: 26 }, (_, i) => {
    const angle = ((i / 26) * 360 + Math.random() * 14) * (Math.PI / 180)
    const speed = 22 + Math.random() * 32
    return {
      id:    i,
      x:     ox,
      y:     oy,
      dx:    `${(Math.cos(angle) * speed).toFixed(1)}px`,
      dy:    `${(Math.sin(angle) * speed + 38).toFixed(1)}px`,
      rot:   `${(Math.random() - 0.5) * 540}deg`,
      w:     2.5 + Math.random() * 3,
      h:     1.5 + Math.random() * 2.5,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      delay: Math.floor(Math.random() * 180),
      dur:   800 + Math.floor(Math.random() * 500),
    }
  })
}

// ── Sub-components ─────────────────────────────────────────────────────────

function StatusBar() {
  return (
    <div style={{
      height: 54, display: 'flex', alignItems: 'flex-end',
      justifyContent: 'space-between', padding: '0 28px 10px',
    }}>
      <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: 17, fontWeight: 600, color: INK }}>
        9:41
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        {/* Signal */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill={INK}>
          <rect x="0"   y="8" width="3" height="4" rx="0.5" />
          <rect x="4.5" y="5" width="3" height="7" rx="0.5" />
          <rect x="9"   y="2" width="3" height="10" rx="0.5" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" opacity="0.3" />
        </svg>
        {/* Wifi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <circle cx="8" cy="11" r="1.2" fill={INK} />
          <path d="M4.8 7.8a4.5 4.5 0 0 1 6.4 0" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
          <path d="M2 5a8 8 0 0 1 12 0" stroke={INK} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
        </svg>
        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke={INK} strokeOpacity="0.35" />
          <rect x="2" y="2" width="17.5" height="8" rx="2" fill={INK} />
          <path d="M23 4.5v3" stroke={INK} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" />
        </svg>
      </div>
    </div>
  )
}

const DETAIL_ROWS: [string, string][] = [
  ['Pay to',           '2021 Jeep Rubicon 1234'],
  ['Pay from',         'Card ending in 1234'],
  ['When',             'One time'],
  ['Payment date',     '01/28/2025'],
  ['Min. payment',     '$500.38'],
  ['Processing fee',   '$5.00'],
]

// ── Main component ─────────────────────────────────────────────────────────

export default function PaymentSuccessAnimation() {
  const [phase,    setPhase]    = useState<Phase>('idle')
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    let alive = true
    const timers: ReturnType<typeof setTimeout>[] = []

    function after(fn: () => void, ms: number) {
      const t = setTimeout(() => { if (alive) fn() }, ms)
      timers.push(t)
    }

    function run() {
      setPhase('idle')
      setConfetti([])
      after(() => setPhase('pressing'), 900)
      after(() => {
        setPhase('success')
        // Checkmark is at ~30% height in display coords
        setConfetti(makeConfetti(DISP_W / 2, DISP_H * 0.30))
      }, 1400)
      // Loop: hold on success then replay
      after(run, 1400 + 6000)
    }

    after(run, 700)

    return () => {
      alive = false
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <>
      <style>{`
        @keyframes confettiFly {
          0%   { transform: translate(0,0) rotate(0deg); opacity: 1; }
          100% { transform: translate(var(--cdx), var(--cdy)) rotate(var(--cdr)); opacity: 0; }
        }
      `}</style>

      <div style={{
        width:        DISP_W,
        height:       DISP_H,
        position:     'relative',
        overflow:     'hidden',
        borderRadius: '24px',
        flexShrink:   0,
        boxShadow:    '0 20px 60px rgba(0,0,0,0.35)',
      }}>

        {/* ── Confetti layer (display coordinate space) ── */}
        {confetti.map(p => (
          <div
            key={p.id}
            style={{
              '--cdx':          p.dx,
              '--cdy':          p.dy,
              '--cdr':          p.rot,
              position:         'absolute',
              left:             p.x,
              top:              p.y,
              width:            p.w,
              height:           p.h,
              borderRadius:     1,
              backgroundColor:  p.color,
              animation:        `confettiFly ${p.dur}ms ease-out ${p.delay}ms both`,
              zIndex:           10,
              pointerEvents:    'none',
            } as React.CSSProperties}
          />
        ))}

        {/* ── Scaled design canvas (440px → 130px) ── */}
        <div style={{
          width:           DESIGN_W,
          position:        'absolute',
          top:             0,
          left:            0,
          transform:       `scale(${SCALE})`,
          transformOrigin: 'top left',
        }}>

          {/* ── Review payment screen ── */}
          <div style={{
            width:         DESIGN_W,
            height:        DESIGN_W / SCALE,
            background:    SURFACE,
            display:       'flex',
            flexDirection: 'column',
            position:      'absolute',
            top:           0,
            left:          0,
            opacity:       phase === 'success' ? 0 : 1,
            transition:    'opacity 280ms ease',
          }}>
            <StatusBar />

            {/* App bar */}
            <div style={{ height: 64, display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
              <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span style={{ fontFamily: 'system-ui', fontSize: 22, color: INK }}>
                Review payment
              </span>
            </div>

            {/* Payment amount */}
            <div style={{ textAlign: 'center', padding: '16px 44px 24px' }}>
              <div style={{ fontFamily: 'system-ui', fontSize: 14, color: INK, marginBottom: 8, letterSpacing: '0.25px' }}>
                Payment amount
              </div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 57, color: RED, lineHeight: '64px', letterSpacing: '-0.25px' }}>
                $505.38
              </div>
            </div>

            {/* Detail rows */}
            <div style={{ padding: '0 44px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              {DETAIL_ROWS.map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    display:       'flex',
                    justifyContent:'space-between',
                    alignItems:    'center',
                    padding:       '14px 0',
                    borderBottom:  '1px solid rgba(41,23,21,0.10)',
                  }}
                >
                  <span style={{ fontFamily: 'system-ui', fontSize: 12, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 500 }}>
                    {label}
                  </span>
                  <span style={{ fontFamily: 'system-ui', fontSize: 16, color: INK }}>
                    {value}
                  </span>
                </div>
              ))}

              <div style={{ flex: 1 }} />

              {/* Submit button */}
              <div style={{ paddingBottom: 48 }}>
                <div style={{
                  height:          56,
                  borderRadius:    100,
                  background:      phase === 'pressing' ? RED_DIM : RED,
                  display:         'flex',
                  alignItems:      'center',
                  justifyContent:  'center',
                  color:           '#ffffff',
                  fontFamily:      'system-ui',
                  fontSize:        14,
                  fontWeight:      500,
                  letterSpacing:   '0.1px',
                  transform:       phase === 'pressing' ? 'scale(0.97)' : 'scale(1)',
                  transition:      'transform 150ms ease, background 150ms ease',
                }}>
                  Submit payment
                </div>
              </div>
            </div>
          </div>

          {/* ── Success screen ── */}
          <div style={{
            width:          DESIGN_W,
            height:         DESIGN_W / SCALE,
            background:     SURFACE,
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            position:       'absolute',
            top:            0,
            left:           0,
            opacity:        phase === 'success' ? 1 : 0,
            transition:     'opacity 300ms ease',
          }}>
            {/* Status bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
              <StatusBar />
            </div>

            {/* Content — centered */}
            <div style={{
              flex:          1,
              display:       'flex',
              flexDirection: 'column',
              alignItems:    'center',
              justifyContent:'center',
              padding:       '0 44px',
              paddingTop:    54 + 32,
              width:         '100%',
            }}>
              {/* Checkmark */}
              <div style={{
                width:           86,
                height:          86,
                borderRadius:    '50%',
                background:      'rgba(165,0,17,0.10)',
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                marginBottom:    16,
              }}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="21" stroke={RED} strokeWidth="2.5" />
                  <path d="M14 24.5l7 7 13-14.5" stroke={RED} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div style={{ fontFamily: 'Georgia, serif', fontSize: 24, color: INK, textAlign: 'center', marginBottom: 6 }}>
                Submitted successfully
              </div>

              <div style={{ fontFamily: 'Georgia, serif', fontSize: 57, color: RED, lineHeight: '64px', letterSpacing: '-0.25px', textAlign: 'center', marginBottom: 16 }}>
                $505.38
              </div>

              <div style={{ fontFamily: 'system-ui', fontSize: 22, color: INK, textAlign: 'center', marginBottom: 6 }}>
                Payment made on time!
              </div>

              <div style={{ fontFamily: 'system-ui', fontSize: 14, color: SUBTLE, textAlign: 'center', width: 308, lineHeight: '20px', marginBottom: 32 }}>
                Your payment has been successfully completed. Please allow 1–2 business days for your payment to process.
              </div>

              <div style={{ fontFamily: 'system-ui', fontSize: 16, color: SUBTLE, textAlign: 'center', lineHeight: '28px' }}>
                <div>Payment date: 01/28/2025</div>
                <div>Confirmation code: <strong>1234567890</strong></div>
              </div>
            </div>

            {/* Buttons */}
            <div style={{ width: '100%', padding: '0 44px 48px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{
                height: 56, borderRadius: 100, background: RED,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontFamily: 'system-ui', fontSize: 14, fontWeight: 500,
              }}>
                Close
              </div>
              <div style={{
                height: 56, borderRadius: 100,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: RED, fontFamily: 'system-ui', fontSize: 14, fontWeight: 500,
              }}>
                View payment activity
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
