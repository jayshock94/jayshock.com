/**
 * LegacyLoanApp — Server component
 *
 * Mobile representation of the old "Time Financing Service" desktop web app.
 * This is intentionally dense and dated — it is the "before" state in the
 * EraserReveal component. Inline styles are used throughout because this is
 * a self-contained UI mock that deliberately does not use portfolio tokens.
 */

const FONT_SYSTEM = 'Arial, Helvetica, sans-serif'

const COLORS = {
  canvas:       '#f0f0f0',
  headerBg:     '#F5A800',
  headerText:   '#000000',
  navBg:        '#ffffff',
  navLink:      '#0066cc',
  navBorder:    '#cccccc',
  btnPayBg:     '#F5C200',
  btnPayText:   '#000000',
  btnLoanBg:    '#e0e0e0',
  btnLoanText:  '#000000',
  sectionTitle: '#003399',
  colHeaderBg:  '#d8d8d8',
  colHeaderText:'#333333',
  rowAlt:       '#ffffff',
  rowPastDue:   '#ffe0e0',
  rowPastText:  '#cc0000',
  rowText:      '#000000',
  borderCell:   '#cccccc',
  footerText:   '#888888',
} as const

export default function LegacyLoanApp() {
  return (
    <div
      style={{
        fontFamily:      FONT_SYSTEM,
        backgroundColor: COLORS.canvas,
        fontSize:        '13px',
        minHeight:       '100%',
        display:         'flex',
        flexDirection:   'column',
      }}
    >
      {/* Amber/gold header bar */}
      <div
        style={{
          backgroundColor: COLORS.headerBg,
          padding:         '8px 12px',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'space-between',
        }}
      >
        <span style={{ fontWeight: 'bold', fontSize: '13px', color: COLORS.headerText }}>
          TIME FINANCING SERVICE
        </span>
        <span
          style={{
            fontSize:   '12px',
            color:      COLORS.navLink,
            textDecoration: 'underline',
            cursor:     'pointer',
          }}
        >
          Logout
        </span>
      </div>

      {/* Horizontal scrollable nav row */}
      <div
        style={{
          backgroundColor: COLORS.navBg,
          borderBottom:    `1px solid ${COLORS.navBorder}`,
          overflowX:       'auto',
          whiteSpace:      'nowrap',
          padding:         '6px 12px',
          display:         'flex',
          gap:             '16px',
        }}
      >
        {['Dashboard', 'Apply', 'Payment', 'Profile', 'Messages'].map((item, i) => (
          <span
            key={item}
            style={{
              color:          i === 0 ? COLORS.headerBg : COLORS.navLink,
              textDecoration: 'underline',
              fontSize:       '12px',
              fontWeight:     i === 0 ? 'bold' : 'normal',
              cursor:         'pointer',
              flexShrink:     0,
            }}
          >
            {item}
          </span>
        ))}
      </div>

      {/* CTA buttons — stacked vertically */}
      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {/* Make Payment button */}
        <button
          style={{
            backgroundColor: COLORS.btnPayBg,
            color:           COLORS.btnPayText,
            border:          '1px solid #c8a000',
            padding:         '8px 12px',
            fontSize:        '13px',
            fontWeight:      'bold',
            fontFamily:      FONT_SYSTEM,
            cursor:          'pointer',
            display:         'flex',
            alignItems:      'center',
            gap:             '6px',
            width:           '100%',
          }}
          type="button"
        >
          {/* Card icon */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <rect x="1" y="3" width="12" height="8" rx="1" stroke={COLORS.btnPayText} strokeWidth="1.2" fill="none" />
            <rect x="1" y="6" width="12" height="2" fill={COLORS.btnPayText} />
          </svg>
          Make Payment
        </button>

        {/* Apply For A Loan button */}
        <button
          style={{
            backgroundColor: COLORS.btnLoanBg,
            color:           COLORS.btnLoanText,
            border:          '1px solid #aaaaaa',
            padding:         '8px 12px',
            fontSize:        '13px',
            fontWeight:      'bold',
            fontFamily:      FONT_SYSTEM,
            cursor:          'pointer',
            display:         'flex',
            alignItems:      'center',
            gap:             '6px',
            width:           '100%',
          }}
          type="button"
        >
          {/* Dollar icon */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="6" stroke={COLORS.btnLoanText} strokeWidth="1.2" fill="none" />
            <text x="7" y="11" textAnchor="middle" fontSize="9" fontWeight="bold" fill={COLORS.btnLoanText} fontFamily={FONT_SYSTEM}>$</text>
          </svg>
          Apply For A Loan
        </button>
      </div>

      {/* Loan Accounts section */}
      <div style={{ padding: '0 12px 12px' }}>
        {/* Section header */}
        <p
          style={{
            color:        COLORS.sectionTitle,
            fontWeight:   'bold',
            fontSize:     '11px',
            textTransform:'uppercase',
            letterSpacing:'0.05em',
            marginBottom: '4px',
          }}
        >
          Loan Accounts
        </p>

        {/* Table */}
        <table
          style={{
            width:           '100%',
            borderCollapse:  'collapse',
            fontSize:        '11px',
            tableLayout:     'fixed',
          }}
        >
          {/* Column headers */}
          <thead>
            <tr style={{ backgroundColor: COLORS.colHeaderBg }}>
              {['Account No.', 'Description', 'Due Date', 'Amount Due'].map(col => (
                <th
                  key={col}
                  style={{
                    color:       COLORS.colHeaderText,
                    fontWeight:  'bold',
                    padding:     '4px 6px',
                    textAlign:   'left',
                    border:      `1px solid ${COLORS.borderCell}`,
                    fontSize:    '10px',
                    whiteSpace:  'nowrap',
                    overflow:    'hidden',
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Row 1 — PAST DUE */}
            <tr style={{ backgroundColor: COLORS.rowPastDue }}>
              <td style={{ padding: '4px 6px', border: `1px solid ${COLORS.borderCell}`, color: COLORS.rowText, fontSize: '10px' }}>
                0009-028879-9
              </td>
              <td style={{ padding: '4px 6px', border: `1px solid ${COLORS.borderCell}`, color: COLORS.rowText, fontSize: '10px' }}>
                Loan #1
                <span
                  style={{
                    display:         'inline-block',
                    marginLeft:      '4px',
                    backgroundColor: COLORS.rowPastText,
                    color:           '#ffffff',
                    fontSize:        '8px',
                    padding:         '1px 3px',
                    fontWeight:      'bold',
                  }}
                >
                  PAST DUE
                </span>
              </td>
              <td style={{ padding: '4px 6px', border: `1px solid ${COLORS.borderCell}`, color: COLORS.rowText, fontSize: '10px' }}>
                05/12/2021
              </td>
              <td style={{ padding: '4px 6px', border: `1px solid ${COLORS.borderCell}`, color: COLORS.rowPastText, fontWeight: 'bold', fontSize: '10px' }}>
                $103.00
              </td>
            </tr>

            {/* Row 2 */}
            <tr style={{ backgroundColor: COLORS.rowAlt }}>
              <td style={{ padding: '4px 6px', border: `1px solid ${COLORS.borderCell}`, color: COLORS.rowText, fontSize: '10px' }}>
                0009-028880-1
              </td>
              <td style={{ padding: '4px 6px', border: `1px solid ${COLORS.borderCell}`, color: COLORS.rowText, fontSize: '10px' }}>
                Loan #2
              </td>
              <td style={{ padding: '4px 6px', border: `1px solid ${COLORS.borderCell}`, color: COLORS.rowText, fontSize: '10px' }}>
                06/01/2024
              </td>
              <td style={{ padding: '4px 6px', border: `1px solid ${COLORS.borderCell}`, color: COLORS.rowText, fontSize: '10px' }}>
                $245.00
              </td>
            </tr>

            {/* Row 3 */}
            <tr style={{ backgroundColor: COLORS.colHeaderBg }}>
              <td style={{ padding: '4px 6px', border: `1px solid ${COLORS.borderCell}`, color: COLORS.rowText, fontSize: '10px' }}>
                0009-028881-3
              </td>
              <td style={{ padding: '4px 6px', border: `1px solid ${COLORS.borderCell}`, color: COLORS.rowText, fontSize: '10px' }}>
                Loan #3
              </td>
              <td style={{ padding: '4px 6px', border: `1px solid ${COLORS.borderCell}`, color: COLORS.rowText, fontSize: '10px' }}>
                06/15/2024
              </td>
              <td style={{ padding: '4px 6px', border: `1px solid ${COLORS.borderCell}`, color: COLORS.rowText, fontSize: '10px' }}>
                $178.50
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 'auto', padding: '8px 12px', textAlign: 'center' }}>
        <p style={{ fontSize: '10px', color: COLORS.footerText }}>
          © 2024 Time Financing Service. All rights reserved.
        </p>
      </div>
    </div>
  )
}
