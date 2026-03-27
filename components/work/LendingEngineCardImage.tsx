/**
 * Empty laptop/browser placeholder for the lending engine card.
 */
export default function LendingEngineCardImage() {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        padding: '20px',
      }}
    >
      {/* Browser frame */}
      <div
        style={{
          width: '88%',
          height: '82%',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 12px 40px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.08)',
          transform: 'perspective(800px) rotateY(-2deg) rotateX(1deg)',
          background: '#1C1C1C',
        }}
      >
        {/* Browser chrome */}
        <div
          style={{
            height: '24px',
            background: '#2A2A2A',
            display: 'flex',
            alignItems: 'center',
            padding: '0 10px',
            gap: '5px',
            borderBottom: '0.5px solid rgba(255,255,255,0.06)',
          }}
        >
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#28c840' }} />
        </div>

        {/* Empty screen */}
        <div
          style={{
            width: '100%',
            height: 'calc(100% - 24px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-outfit), system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.2)',
            }}
          >
            Coming soon
          </span>
        </div>
      </div>
    </div>
  )
}
