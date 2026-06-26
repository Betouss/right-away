import { useState } from 'react'
import { useConfig } from '../context'
import { CATALOG } from '../data'

function depMeta(id: string) {
  for (const g of CATALOG) {
    const f = g.items.find(i => i.id === id)
    if (f) return { ...f, group: g.group }
  }
  return null
}

export default function DependencySection({ onOpenPanel }: { onOpenPanel: () => void }) {
  const { config, update } = useConfig()
  const [hoveredAdd, setHoveredAdd] = useState(false)
  const [hoveredRemove, setHoveredRemove] = useState<string | null>(null)

  const selectedDeps = config.dependencies
    .map(id => depMeta(id))
    .filter(Boolean) as { id: string; name: string; desc: string; group: string }[]

  const removeDep = (id: string) => {
    update({ dependencies: config.dependencies.filter(d => d !== id) })
  }

  return (
    <section style={{
      background: '#121419',
      border: '1px solid #1e2127',
      borderRadius: 16,
      padding: 22,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, margin: 0 }}>
            Dependencies
          </h2>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: '#0a0b0d',
            background: '#c5f82a',
            padding: '1px 7px',
            borderRadius: 100,
            fontWeight: 600,
          }}>
            {config.dependencies.length}
          </span>
        </div>
        <button
          onClick={onOpenPanel}
          onMouseEnter={() => setHoveredAdd(true)}
          onMouseLeave={() => setHoveredAdd(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: '#1b1e24',
            border: hoveredAdd ? '1px solid #c5f82a' : '1px solid #2a2e36',
            color: hoveredAdd ? '#c5f82a' : '#e8eaed',
            fontSize: 12.5,
            fontWeight: 600,
            padding: '7px 12px',
            borderRadius: 8,
            cursor: 'pointer',
            transition: 'border-color 0.15s, color 0.15s',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
          Add
        </button>
      </div>

      {selectedDeps.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {selectedDeps.map(d => (
            <div
              key={d.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
                background: '#0c0d10',
                border: '1px solid #22252c',
                borderRadius: 9,
                padding: '10px 12px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
                <span style={{ fontWeight: 600, fontSize: 13 }}>{d.name}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: '#6b7280' }}>
                  {d.group}
                </span>
              </div>
              <button
                onClick={() => removeDep(d.id)}
                onMouseEnter={() => setHoveredRemove(d.id)}
                onMouseLeave={() => setHoveredRemove(null)}
                style={{
                  flexShrink: 0,
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: hoveredRemove === d.id ? '#2a1416' : 'transparent',
                  border: 'none',
                  color: hoveredRemove === d.id ? '#ff6b6b' : '#6b7280',
                  cursor: 'pointer',
                  borderRadius: 6,
                  transition: 'background 0.15s, color 0.15s',
                  padding: 0,
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '26px 12px',
          border: '1px dashed #25282f',
          borderRadius: 11,
        }}>
          <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 4px', fontWeight: 500 }}>
            No dependencies yet
          </p>
          <p style={{ fontSize: 12, color: '#4d535c', margin: 0 }}>
            Add ORMs, auth, validation, testing & more.
          </p>
        </div>
      )}
    </section>
  )
}
