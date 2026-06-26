import React, { useState } from 'react'
import { useConfig } from '../context'
import { CATALOG } from '../data'

export default function DependencyPanel({ onClose }: { onClose: () => void }) {
  const { config, update } = useConfig()
  const [query, setQuery] = useState('')
  const [hoveredDone, setHoveredDone] = useState(false)

  const q = query.trim().toLowerCase()

  const filteredGroups = CATALOG
    .map(g => ({
      ...g,
      items: g.items.filter(
        it => !q || it.name.toLowerCase().includes(q) || it.desc.toLowerCase().includes(q)
      ),
    }))
    .filter(g => g.items.length > 0)

  const noResults = q.length > 0 && filteredGroups.length === 0

  const toggleDep = (id: string) => {
    const deps = config.dependencies.includes(id)
      ? config.dependencies.filter(d => d !== id)
      : [...config.dependencies, id]
    update({ dependencies: deps })
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', justifyContent: 'flex-end' }}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(5,6,8,0.72)',
          animation: 'raFade 0.18s ease',
        }}
      />

      {/* Panel */}
      <div style={{
        position: 'relative',
        width: 460,
        maxWidth: '90vw',
        height: '100%',
        background: '#101216',
        borderLeft: '1px solid #1e2127',
        display: 'flex',
        flexDirection: 'column',
        animation: 'raSlideIn 0.24s cubic-bezier(0.4,0,0.2,1)',
      }}>
        {/* Header */}
        <div style={{ padding: '20px 22px 16px', borderBottom: '1px solid #1e2127' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 600, margin: 0 }}>
              Add dependencies
            </h3>
            <button
              onClick={onClose}
              style={{
                width: 30,
                height: 30,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#1b1e24',
                border: '1px solid #2a2e36',
                borderRadius: 8,
                color: '#9aa0a8',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            >
              <circle cx="11" cy="11" r="7" stroke="#6b7280" strokeWidth="2"/>
              <path d="M21 21L17 17" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search dependencies…"
              autoFocus
              style={{
                width: '100%',
                background: '#0c0d10',
                border: '1px solid #25282f',
                borderRadius: 10,
                padding: '11px 13px 11px 38px',
                color: '#e8eaed',
                fontSize: 14,
              }}
              onFocus={e => (e.target.style.borderColor = '#c5f82a')}
              onBlur={e => (e.target.style.borderColor = '#25282f')}
            />
          </div>
        </div>

        {/* List */}
        <div style={{ flex: '1 1 auto', overflowY: 'auto', padding: '8px 14px 22px' }}>
          {noResults ? (
            <div style={{ textAlign: 'center', padding: '40px 12px', color: '#6b7280', fontSize: 13 }}>
              No dependencies match "{query}"
            </div>
          ) : (
            filteredGroups.map(g => (
              <div key={g.group} style={{ marginTop: 16 }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10.5,
                  fontWeight: 600,
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  margin: '0 6px 8px',
                }}>
                  {g.group}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {g.items.map(it => {
                    const selected = config.dependencies.includes(it.id)
                    return (
                      <DepRow
                        key={it.id}
                        name={it.name}
                        desc={it.desc}
                        selected={selected}
                        onToggle={() => toggleDep(it.id)}
                      />
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div style={{
          flexShrink: 0,
          padding: '14px 22px',
          borderTop: '1px solid #1e2127',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: 13, color: '#9aa0a8' }}>
            {config.dependencies.length} selected
          </span>
          <button
            onClick={onClose}
            onMouseEnter={() => setHoveredDone(true)}
            onMouseLeave={() => setHoveredDone(false)}
            style={{
              background: hoveredDone ? '#d4ff4a' : '#c5f82a',
              border: 'none',
              color: '#0a0b0d',
              fontSize: 13.5,
              fontWeight: 700,
              padding: '10px 20px',
              borderRadius: 9,
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

function DepRow({
  name,
  desc,
  selected,
  onToggle,
}: {
  name: string
  desc: string
  selected: boolean
  onToggle: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 12px',
        borderRadius: 10,
        border: selected ? '1px solid rgba(197,248,42,0.3)' : '1px solid transparent',
        background: selected
          ? 'rgba(197,248,42,0.05)'
          : hovered
          ? '#16181d'
          : 'transparent',
        cursor: 'pointer',
        transition: 'background 0.12s, border-color 0.12s',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0, paddingRight: 10 }}>
        <span style={{ fontWeight: 600, fontSize: 13.5 }}>{name}</span>
        <span style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.35 }}>{desc}</span>
      </div>
      <div style={{
        flexShrink: 0,
        width: 20,
        height: 20,
        borderRadius: 6,
        border: selected ? 'none' : '1.5px solid #3a3f48',
        background: selected ? '#c5f82a' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.12s, border-color 0.12s',
      }}>
        {selected && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M5 13L9 17L19 7" stroke="#0a0b0d" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
    </div>
  )
}
