import { useState } from 'react'
import { useConfig } from '../context'
import { FRAMEWORKS } from '../data'
import type { FrameworkId } from '../types'

export default function FrameworkSelector() {
  const { config, update } = useConfig()
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section style={{
      background: '#121419',
      border: '1px solid #1e2127',
      borderRadius: 16,
      padding: 22,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, margin: 0 }}>
          Framework
        </h2>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#6b7280' }}>01</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {FRAMEWORKS.map(fw => {
          const selected = config.framework === fw.id
          const isHovered = hovered === fw.id
          return (
            <div
              key={fw.id}
              onClick={() => update({ framework: fw.id as FrameworkId })}
              onMouseEnter={() => setHovered(fw.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '11px 13px',
                borderRadius: 11,
                border: selected
                  ? '1px solid rgba(197,248,42,0.55)'
                  : isHovered
                  ? '1px solid #2e3138'
                  : '1px solid #1a1d22',
                background: selected
                  ? 'rgba(197,248,42,0.07)'
                  : isHovered
                  ? '#16181d'
                  : '#0c0d10',
                cursor: 'pointer',
                transition: 'border-color 0.15s, background 0.15s',
              }}
            >
              <div style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: fw.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 700,
                color: '#0a0b0d',
                flexShrink: 0,
              }}>
                {fw.mark}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                <span style={{ fontWeight: 600, fontSize: 13.5 }}>{fw.name}</span>
                <span style={{ fontSize: 11.5, color: '#6b7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {fw.desc}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
