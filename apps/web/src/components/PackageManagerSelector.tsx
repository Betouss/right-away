import { useState } from 'react'
import { useConfig } from '../context'
import { PACKAGE_MANAGERS } from '../data'
import type { PackageManagerId } from '../types'

export default function PackageManagerSelector() {
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
          Package manager
        </h2>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#6b7280' }}>02</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {PACKAGE_MANAGERS.map(pm => {
          const selected = config.packageManager === pm.id
          const isHovered = hovered === pm.id
          return (
            <div
              key={pm.id}
              onClick={() => update({ packageManager: pm.id as PackageManagerId })}
              onMouseEnter={() => setHovered(pm.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  background: pm.color,
                  flexShrink: 0,
                  display: 'inline-block',
                }} />
                <span style={{ fontWeight: 600, fontSize: 13.5 }}>{pm.name}</span>
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: '#6b7280' }}>
                {pm.cmd}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
