'use client'

import { useEffect, useState } from 'react'

/**
 * Animated payment flow for the Mobile Lending Management hero.
 *
 * Plays once on mount:
 *   1. Review payment screen (idle)
 *   2. Submit button press at 900ms
 *   3. Fade to success screen at 1400ms + confetti burst
 *   4. Stays on success screen permanently
 *
 * Designed at 440px (Figma spec) and scaled to 130×281px display size.
 */

// ── Constants ──────────────────────────────────────────────────────────────

const DESIGN_W = 440
const DISP_W   = 130
const DISP_H   = 281
const SCALE    = DISP_W / DESIGN_W        // 0.2955
const DESIGN_H = Math.round(DISP_H / SCALE) // 951

// Lendmark design tokens
const RED     = '#a50011'
const RED_DIM = '#7a0008'
const SURFACE = '#fff8f7'
const INK     = '#291715'
const MUTED   = '#6b4c49'
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
  return Array.from({ length: 36 }, (_, i) => {
    const angle = ((i / 36) * 360 + Math.random() * 10) * (Math.PI / 180)
    const speed = 35 + Math.random() * 65
    return {
      id:    i,
      x:     ox,
      y:     oy,
      dx:    `${(Math.cos(angle) * speed).toFixed(1)}px`,
      dy:    `${(Math.sin(angle) * speed).toFixed(1)}px`,
      rot:   `${(Math.random() - 0.5) * 720}deg`,
      w:     3 + Math.random() * 4,
      h:     2 + Math.random() * 3,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      delay: Math.floor(Math.random() * 120),
      dur:   900 + Math.floor(Math.random() * 600),
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
          <rect x="0"    y="8" width="3" height="4"  rx="0.5" />
          <rect x="4.5"  y="5" width="3" height="7"  rx="0.5" />
          <rect x="9"    y="2" width="3" height="10" rx="0.5" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" opacity="0.3" />
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <circle cx="8" cy="11" r="1.2" fill={INK} />
          <path d="M4.8 7.8a4.5 4.5 0 0 1 6.4 0" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
          <path d="M2 5a8 8 0 0 1 12 0"          stroke={INK} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
        </svg>
        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21"   height="11" rx="3.5" stroke={INK} strokeOpacity="0.35" />
          <rect x="2"   y="2"   width="17.5" height="8"  rx="2"   fill={INK} />
          <path d="M23 4.5v3" stroke={INK} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" />
        </svg>
      </div>
    </div>
  )
}

// ── Row helpers ────────────────────────────────────────────────────────────

const ROW_LABEL: React.CSSProperties = {
  fontFamily:    'system-ui, sans-serif',
  fontSize:      13,
  color:         MUTED,
  letterSpacing: '0.3px',
  marginBottom:  3,
}
const ROW_VALUE: React.CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  fontSize:   17,
  color:      INK,
}
const ROW_DIVIDER: React.CSSProperties = {
  borderBottom: `1px solid rgba(41,23,21,0.10)`,
  padding:      '16px 0',
}

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

    // Play once — idle → pressing → success (stays)
    after(() => setPhase('pressing'), 900)
    after(() => {
      setPhase('success')
      setConfetti(makeConfetti(DISP_W / 2, DISP_H * 0.32))
    }, 1400)

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

      {/*
        Outer wrapper: establishes position context for confetti.
        No overflow:hidden here — confetti bursts beyond the phone edges.
      */}
      <div style={{
        width:      DISP_W,
        height:     DISP_H,
        position:   'relative',
        flexShrink: 0,
      }}>

        {/* ── Confetti layer — overflows phone frame intentionally ── */}
        {confetti.map(p => (
          <div
            key={p.id}
            style={{
              '--cdx':         p.dx,
              '--cdy':         p.dy,
              '--cdr':         p.rot,
              position:        'absolute',
              left:            p.x,
              top:             p.y,
              width:           p.w,
              height:          p.h,
              borderRadius:    1,
              backgroundColor: p.color,
              animation:       `confettiFly ${p.dur}ms ease-out ${p.delay}ms both`,
              zIndex:          20,
              pointerEvents:   'none',
            } as React.CSSProperties}
          />
        ))}

        {/* ── Phone frame — clips screen content but NOT confetti ── */}
        <div style={{
          position:     'absolute',
          top:          0,
          left:         0,
          width:        DISP_W,
          height:       DISP_H,
          overflow:     'hidden',
          borderRadius: '24px',
          boxShadow:    '0 20px 60px rgba(0,0,0,0.35)',
        }}>

        {/* ── Scaled design canvas (440×951px → 130×281px) ── */}
        <div style={{
          width:           DESIGN_W,
          height:          DESIGN_H,
          position:        'absolute',
          top:             0,
          left:            0,
          transform:       `scale(${SCALE})`,
          transformOrigin: 'top left',
        }}>

          {/* ── Review payment screen ── */}
          <div style={{
            width:         DESIGN_W,
            height:        DESIGN_H,
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
              <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: 22, color: INK }}>
                Review payment
              </span>
            </div>

            {/* Payment amount — centered */}
            <div style={{ textAlign: 'center', padding: '20px 44px 28px' }}>
              <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: 14, color: INK, marginBottom: 6, letterSpacing: '0.25px' }}>
                Payment amount
              </div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 57, color: RED, lineHeight: '64px', letterSpacing: '-0.25px' }}>
                $505.38
              </div>
            </div>

            {/* Detail rows — stacked label / value */}
            <div style={{ padding: '0 44px', flex: 1, display: 'flex', flexDirection: 'column' }}>

              <div style={ROW_DIVIDER}>
                <div style={ROW_LABEL}>Pay to</div>
                <div style={ROW_VALUE}>2021 Jeep Rubicon 1234</div>
              </div>

              <div style={ROW_DIVIDER}>
                <div style={ROW_LABEL}>Pay from</div>
                <div style={ROW_VALUE}>Card ending in 1234</div>
              </div>

              <div style={ROW_DIVIDER}>
                <div style={ROW_LABEL}>When</div>
                <div style={ROW_VALUE}>One time</div>
              </div>

              {/* Payment date — date left, "Earliest" right on value row */}
              <div style={ROW_DIVIDER}>
                <div style={ROW_LABEL}>Payment date</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={ROW_VALUE}>01/28/2025</span>
                  <span style={ROW_VALUE}>Earliest</span>
                </div>
              </div>

              {/* Payment type — label then two sub-rows with amounts */}
              <div style={ROW_DIVIDER}>
                <div style={ROW_LABEL}>Payment type</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={ROW_VALUE}>Minimum payment</span>
                  <span style={ROW_VALUE}>$500.38</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={ROW_VALUE}>Card processing fee</span>
                  <span style={ROW_VALUE}>$5.00</span>
                </div>
              </div>

              <div style={{ flex: 1 }} />

              {/* Submit button */}
              <div style={{ paddingBottom: 52 }}>
                <div style={{
                  height:         56,
                  borderRadius:   100,
                  background:     phase === 'pressing' ? RED_DIM : RED,
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  color:          '#ffffff',
                  fontFamily:     'system-ui, sans-serif',
                  fontSize:       15,
                  fontWeight:     500,
                  letterSpacing:  '0.1px',
                  transform:      phase === 'pressing' ? 'scale(0.97)' : 'scale(1)',
                  transition:     'transform 150ms ease, background 150ms ease',
                }}>
                  Submit payment
                </div>
              </div>
            </div>
          </div>

          {/* ── Success screen ── */}
          <div style={{
            width:          DESIGN_W,
            height:         DESIGN_H,
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
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
              <StatusBar />
            </div>

            {/* Content — centered vertically */}
            <div style={{
              flex:           1,
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              justifyContent: 'center',
              padding:        '0 44px',
              paddingTop:     54 + 40,
              width:          '100%',
            }}>
              {/* Checkmark — stroke only, no background fill */}
              <div style={{ marginBottom: 18 }}>
                <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
                  <circle cx="48" cy="48" r="40" stroke={RED} strokeWidth="4.5" />
                  <path d="M29 49l13 13 25-28" stroke={RED} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div style={{
                fontFamily:   'Georgia, serif',
                fontSize:     24,
                color:        INK,
                textAlign:    'center',
                marginBottom: 8,
              }}>
                Submitted successfully
              </div>

              <div style={{
                fontFamily:    'Georgia, serif',
                fontSize:      57,
                color:         RED,
                lineHeight:    '64px',
                letterSpacing: '-0.25px',
                textAlign:     'center',
                marginBottom:  18,
              }}>
                $505.38
              </div>

              <div style={{
                fontFamily:   'system-ui, sans-serif',
                fontSize:     22,
                fontWeight:   700,
                color:        INK,
                textAlign:    'center',
                marginBottom: 10,
              }}>
                Payment made on time!
              </div>

              <div style={{
                fontFamily:   'system-ui, sans-serif',
                fontSize:     14,
                color:        SUBTLE,
                textAlign:    'center',
                lineHeight:   '22px',
                marginBottom: 28,
                width:        320,
              }}>
                Your payment has been successfully completed. Please allow 1–2 business days for your payment to process.
              </div>

              <div style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize:   15,
                color:      SUBTLE,
                textAlign:  'center',
                lineHeight: '28px',
              }}>
                <div>Payment date: 01/28/2025</div>
                <div>Confirmation code: <strong>1234567890</strong></div>
              </div>
            </div>

            {/* Buttons — Close pill + text link */}
            <div style={{ width: '100%', padding: '0 44px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              <div style={{
                width:          '100%',
                height:         56,
                borderRadius:   100,
                background:     RED,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                color:          '#fff',
                fontFamily:     'system-ui, sans-serif',
                fontSize:       15,
                fontWeight:     500,
                marginBottom:   20,
              }}>
                Close
              </div>
              <div style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize:   15,
                fontWeight: 500,
                color:      RED,
              }}>
                View payment activity
              </div>
            </div>
          </div>

        </div>
        </div> {/* end phone frame */}
      </div>   {/* end outer wrapper */}
    </>
  )
}
