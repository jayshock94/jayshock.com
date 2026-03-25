'use client'

import { useEffect, useState } from 'react'

/**
 * Animated payment flow — built from exact Figma specs (nodes 32:32305 and 32:34216).
 *
 * Plays once on mount:
 *   1. Review payment screen (idle)
 *   2. Submit button press at 900ms
 *   3. Fade to success screen at 1400ms + confetti burst from checkmark
 *   4. Stays on success screen permanently
 *
 * Designed at 440px (Figma spec) and scaled to 130×281px display size.
 */

// ── Constants ──────────────────────────────────────────────────────────────

const DESIGN_W = 440
const DISP_W   = 130
const DISP_H   = 281
const SCALE    = DISP_W / DESIGN_W
const DESIGN_H = Math.round(DISP_H / SCALE)  // 951

// Exact Lendmark design tokens from Figma
const PRIMARY      = '#a50011'
const PRIMARY_DIM  = '#7a0008'
const SURFACE      = '#fff8f7'
const ON_SURF      = '#291715'
const ON_SURF_VAR  = '#5e3f3c'
const SUBTLE       = '#534341'

// Exact fonts from Figma spec
const SERIF = "'Source Serif 4', Georgia, serif"
const SANS  = "'Figtree', system-ui, sans-serif"

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

// ── Confetti ───────────────────────────────────────────────────────────────

const CONFETTI_COLORS = [PRIMARY, '#ff4d4d', '#ff9999', '#ffd6cc', '#ffffff', '#ffb3b3']

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

// ── Status bar ─────────────────────────────────────────────────────────────

function StatusBar() {
  return (
    <div style={{
      height: 54, display: 'flex', alignItems: 'flex-end',
      justifyContent: 'space-between', padding: '0 16px 10px',
      flexShrink: 0,
    }}>
      <span style={{ fontFamily: SANS, fontSize: 17, fontWeight: 600, color: ON_SURF }}>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <svg width="17" height="12" viewBox="0 0 17 12" fill={ON_SURF}>
          <rect x="0"    y="8" width="3" height="4"  rx="0.5" />
          <rect x="4.5"  y="5" width="3" height="7"  rx="0.5" />
          <rect x="9"    y="2" width="3" height="10" rx="0.5" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" opacity="0.3" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <circle cx="8" cy="11" r="1.2" fill={ON_SURF} />
          <path d="M4.8 7.8a4.5 4.5 0 0 1 6.4 0" stroke={ON_SURF} strokeWidth="1.4" strokeLinecap="round" />
          <path d="M2 5a8 8 0 0 1 12 0"          stroke={ON_SURF} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21"   height="11" rx="3.5" stroke={ON_SURF} strokeOpacity="0.35" />
          <rect x="2"   y="2"   width="17.5" height="8"  rx="2"   fill={ON_SURF} />
          <path d="M23 4.5v3" stroke={ON_SURF} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" />
        </svg>
      </div>
    </div>
  )
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

    // Play once: idle → pressing → success (stays permanently)
    after(() => setPhase('pressing'), 900)
    after(() => {
      setPhase('success')
      // Confetti origin: checkmark center in display coords (~79px from top)
      setConfetti(makeConfetti(DISP_W / 2, DISP_H * 0.28))
    }, 1400)

    return () => { alive = false; timers.forEach(clearTimeout) }
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400&display=swap');
        @keyframes confettiFly {
          0%   { transform: translate(0,0) rotate(0deg); opacity: 1; }
          100% { transform: translate(var(--cdx), var(--cdy)) rotate(var(--cdr)); opacity: 0; }
        }
      `}</style>

      {/* Outer wrapper — no overflow:hidden so confetti escapes phone edges */}
      <div style={{
        width:      DISP_W,
        height:     DISP_H,
        position:   'relative',
        flexShrink: 0,
      }}>

        {/* ── Confetti — bursts beyond phone frame ── */}
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

        {/* ── Phone frame — clips screen content only ── */}
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

          {/* ── Scaled design canvas (440×951 → 130×281) ── */}
          <div style={{
            width:           DESIGN_W,
            height:          DESIGN_H,
            position:        'absolute',
            top:             0,
            left:            0,
            transform:       `scale(${SCALE})`,
            transformOrigin: 'top left',
          }}>

            {/* ──────────────────────────────────────────────────────────────
                SCREEN 1: Review payment
            ────────────────────────────────────────────────────────────── */}
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

              {/* Top app bar */}
              <div style={{
                height:      64,
                display:     'flex',
                alignItems:  'center',
                paddingLeft: 8,
                flexShrink:  0,
                background:  SURFACE,
              }}>
                <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18l-6-6 6-6" stroke={ON_SURF} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span style={{ fontFamily: SANS, fontSize: 22, fontWeight: 400, color: ON_SURF, lineHeight: '28px' }}>
                  Review payment
                </span>
              </div>

              {/* Content container */}
              <div style={{
                flex:           1,
                display:        'flex',
                flexDirection:  'column',
                alignItems:     'center',
                justifyContent: 'space-between',
                paddingTop:     32,
                paddingBottom:  48,
              }}>

                {/* Inner content: 400px wide, 24px h-padding → 352px effective */}
                <div style={{ width: 400, padding: '0 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>

                  {/* Payment amount */}
                  <div style={{ marginBottom: 24 }}>
                    <p style={{
                      fontFamily:    SANS,
                      fontSize:      14,
                      fontWeight:    400,
                      color:         ON_SURF,
                      lineHeight:    '20px',
                      letterSpacing: '0.25px',
                      textAlign:     'center',
                      marginBottom:  4,
                    }}>
                      Payment amount
                    </p>
                    <p style={{
                      fontFamily:    SERIF,
                      fontSize:      57,
                      fontWeight:    400,
                      color:         PRIMARY,
                      lineHeight:    '64px',
                      letterSpacing: '-0.25px',
                      textAlign:     'center',
                    }}>
                      $505.38
                    </p>
                  </div>

                  {/* Detail rows — no dividers, matching Figma spacing */}
                  <div>

                    {/* Pay to */}
                    <div style={{ minHeight: 64, padding: '8px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <p style={{ fontFamily: SANS, fontSize: 12, fontWeight: 500, color: ON_SURF_VAR, lineHeight: '16px', letterSpacing: '0.5px', marginBottom: 4 }}>
                        Pay to
                      </p>
                      <p style={{ fontFamily: SANS, fontSize: 16, fontWeight: 400, color: ON_SURF, lineHeight: '24px', letterSpacing: '0.5px' }}>
                        2021 Jeep Rubicon 1234
                      </p>
                    </div>

                    {/* Pay from */}
                    <div style={{ minHeight: 64, padding: '8px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <p style={{ fontFamily: SANS, fontSize: 12, fontWeight: 500, color: ON_SURF_VAR, lineHeight: '16px', letterSpacing: '0.5px', marginBottom: 4 }}>
                        Pay from
                      </p>
                      <p style={{ fontFamily: SANS, fontSize: 16, fontWeight: 400, color: ON_SURF, lineHeight: '24px', letterSpacing: '0.5px' }}>
                        Card ending in 1234
                      </p>
                    </div>

                    {/* When */}
                    <div style={{ padding: '12px 0', display: 'flex', flexDirection: 'column' }}>
                      <p style={{ fontFamily: SANS, fontSize: 12, fontWeight: 500, color: ON_SURF_VAR, lineHeight: '16px', letterSpacing: '0.5px', marginBottom: 4 }}>
                        When
                      </p>
                      <p style={{ fontFamily: SANS, fontSize: 16, fontWeight: 400, color: ON_SURF, lineHeight: '24px', letterSpacing: '0.5px' }}>
                        One time
                      </p>
                    </div>

                    {/* Payment date */}
                    <div style={{ padding: '12px 0', display: 'flex', flexDirection: 'column' }}>
                      <p style={{ fontFamily: SANS, fontSize: 12, fontWeight: 500, color: ON_SURF_VAR, lineHeight: '16px', letterSpacing: '0.5px', marginBottom: 4 }}>
                        Payment date
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontFamily: SANS, fontSize: 16, fontWeight: 400, color: ON_SURF, lineHeight: '24px', letterSpacing: '0.5px' }}>01/28/2025</p>
                        <p style={{ fontFamily: SANS, fontSize: 16, fontWeight: 400, color: ON_SURF, lineHeight: '24px', letterSpacing: '0.5px' }}>Earliest</p>
                      </div>
                    </div>

                    {/* Payment type */}
                    <div style={{ minHeight: 72, padding: '8px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <p style={{ fontFamily: SANS, fontSize: 12, fontWeight: 500, color: ON_SURF_VAR, lineHeight: '16px', letterSpacing: '0.5px', marginBottom: 4 }}>
                        Payment type
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontFamily: SANS, fontSize: 16, fontWeight: 400, color: ON_SURF, lineHeight: '24px', letterSpacing: '0.5px' }}>Minimum payment</p>
                        <p style={{ fontFamily: SANS, fontSize: 16, fontWeight: 400, color: ON_SURF, lineHeight: '24px', letterSpacing: '0.5px' }}>$500.38</p>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontFamily: SANS, fontSize: 16, fontWeight: 400, color: ON_SURF, lineHeight: '24px', letterSpacing: '0.5px' }}>Card processing fee</p>
                        <p style={{ fontFamily: SANS, fontSize: 16, fontWeight: 400, color: ON_SURF, lineHeight: '24px', letterSpacing: '0.5px' }}>$5.00</p>
                      </div>
                    </div>

                  </div>

                  <div style={{ flex: 1 }} />
                </div>

                {/* Submit button */}
                <div style={{ width: 352 }}>
                  <div style={{
                    height:         56,
                    borderRadius:   100,
                    background:     phase === 'pressing' ? PRIMARY_DIM : PRIMARY,
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    transform:      phase === 'pressing' ? 'scale(0.97)' : 'scale(1)',
                    transition:     'transform 150ms ease, background 150ms ease',
                  }}>
                    <p style={{ fontFamily: SANS, fontSize: 14, fontWeight: 500, color: '#fff', lineHeight: '20px', letterSpacing: '0.1px' }}>
                      Submit payment
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* ──────────────────────────────────────────────────────────────
                SCREEN 2: Success
            ────────────────────────────────────────────────────────────── */}
            <div style={{
              width:         DESIGN_W,
              height:        DESIGN_H,
              background:    SURFACE,
              display:       'flex',
              flexDirection: 'column',
              position:      'absolute',
              top:           0,
              left:          0,
              opacity:       phase === 'success' ? 1 : 0,
              transition:    'opacity 300ms ease',
            }}>
              <StatusBar />

              {/* Outer container: fills rest, py-48 */}
              <div style={{
                flex:           1,
                display:        'flex',
                flexDirection:  'column',
                alignItems:     'center',
                paddingTop:     48,
                paddingBottom:  48,
              }}>

                {/* Inner container: px-24, holds main content + buttons */}
                <div style={{
                  flex:          1,
                  display:       'flex',
                  flexDirection: 'column',
                  alignItems:    'center',
                  width:         '100%',
                  padding:       '0 24px',
                }}>

                  {/* Main content — centered vertically in remaining space */}
                  <div style={{
                    flex:           1,
                    display:        'flex',
                    flexDirection:  'column',
                    alignItems:     'center',
                    justifyContent: 'center',
                    gap:            32,
                    width:          '100%',
                  }}>

                    {/* Top group: icon + title + amount + tagline + body */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, width: '100%' }}>

                      {/* Icon + "Submitted successfully" + amount */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, width: '100%' }}>

                        {/* Icon + "Submitted successfully" */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                          {/* Checkmark — SVG recreated from Figma 86×86 icon spec */}
                          <svg width="86" height="86" viewBox="0 0 86 86" fill="none">
                            <circle cx="43" cy="43" r="38" stroke={PRIMARY} strokeWidth="4.5" />
                            <path d="M24 44L37 57L63 27" stroke={PRIMARY} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <p style={{
                            fontFamily: SERIF,
                            fontSize:   24,
                            fontWeight: 400,
                            color:      ON_SURF,
                            lineHeight: '32px',
                            textAlign:  'center',
                            width:      '100%',
                          }}>
                            Submitted successfully
                          </p>
                        </div>

                        {/* Amount */}
                        <p style={{
                          fontFamily:    SERIF,
                          fontSize:      57,
                          fontWeight:    400,
                          color:         PRIMARY,
                          lineHeight:    '64px',
                          letterSpacing: '-0.25px',
                          textAlign:     'center',
                        }}>
                          $505.38
                        </p>
                      </div>

                      {/* "Payment made on time!" + body — Figma: Figtree Regular, not bold */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: '100%' }}>
                        <p style={{
                          fontFamily: SANS,
                          fontSize:   22,
                          fontWeight: 400,
                          color:      ON_SURF,
                          lineHeight: '28px',
                          textAlign:  'center',
                          width:      '100%',
                        }}>
                          Payment made on time!
                        </p>
                        <p style={{
                          fontFamily:    SANS,
                          fontSize:      16,
                          fontWeight:    400,
                          color:         SUBTLE,
                          lineHeight:    '24px',
                          letterSpacing: '0.5px',
                          textAlign:     'center',
                          width:         308,
                        }}>
                          Your payment has been successfully completed. Please allow 1-2 business days for your payment to process.
                        </p>
                      </div>
                    </div>

                    {/* Confirmation details */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start', width: 352 }}>
                      <p style={{
                        fontFamily:    SANS,
                        fontSize:      16,
                        fontWeight:    400,
                        color:         SUBTLE,
                        lineHeight:    '24px',
                        letterSpacing: '0.5px',
                        width:         352,
                        textAlign:     'center',
                      }}>
                        Payment date: 01/28/2025
                      </p>
                      <p style={{
                        fontFamily:    SANS,
                        fontSize:      16,
                        fontWeight:    400,
                        color:         SUBTLE,
                        lineHeight:    '24px',
                        letterSpacing: '0.5px',
                        width:         352,
                        textAlign:     'center',
                      }}>
                        {'Confirmation code: '}
                        <strong style={{ fontFamily: SANS, fontWeight: 700 }}>1234567890</strong>
                      </p>
                    </div>
                  </div>

                  {/* Buttons — bottom of inner container */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
                    {/* Close */}
                    <div style={{
                      width:          352,
                      height:         56,
                      borderRadius:   100,
                      background:     PRIMARY,
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                    }}>
                      <p style={{ fontFamily: SANS, fontSize: 14, fontWeight: 500, color: '#fff', lineHeight: '20px', letterSpacing: '0.1px' }}>
                        Close
                      </p>
                    </div>
                    {/* View payment activity — text button */}
                    <div style={{
                      width:          352,
                      height:         56,
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                    }}>
                      <p style={{ fontFamily: SANS, fontSize: 14, fontWeight: 500, color: PRIMARY, lineHeight: '20px', letterSpacing: '0.1px' }}>
                        View payment activity
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
