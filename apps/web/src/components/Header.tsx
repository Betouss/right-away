import { useState } from 'react'

export default function Header() {
  const [hovered, setHovered] = useState<string | null>(null)

  const navStyle = (id: string): React.CSSProperties => ({
    fontSize: 13,
    fontWeight: 500,
    color: hovered === id ? '#e8eaed' : '#9aa0a8',
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: 8,
    background: hovered === id ? '#16181d' : 'transparent',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    transition: 'color 0.15s, background 0.15s',
    cursor: 'pointer',
  })

  return (
    <header style={{
      flex: '0 0 auto',
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      borderBottom: '1px solid #1a1d22',
      background: 'rgba(10,11,13,0.7)',
      backdropFilter: 'blur(8px)',
      position: 'relative',
      zIndex: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: '#c5f82a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 24px rgba(197,248,42,0.35)',
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M13 2L4.5 13.5H11L10 22L19.5 10H13L13 2Z" fill="#0a0b0d" stroke="#0a0b0d" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 9 }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em' }}>
            right away
          </span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: '#6b7280',
            padding: '2px 7px',
            border: '1px solid #23262d',
            borderRadius: 5,
          }}>
            v1.4
          </span>
        </div>
      </div>

      <nav style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <a
          href="#"
          style={navStyle('templates')}
          onMouseEnter={() => setHovered('templates')}
          onMouseLeave={() => setHovered(null)}
        >
          Templates
        </a>
        <a
          href="#"
          style={navStyle('docs')}
          onMouseEnter={() => setHovered('docs')}
          onMouseLeave={() => setHovered(null)}
        >
          Docs
        </a>
        <a
          href="#"
          style={navStyle('github')}
          onMouseEnter={() => setHovered('github')}
          onMouseLeave={() => setHovered(null)}
        >
          GitHub
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </nav>
    </header>
  )
}
