import React from 'react'
import { useConfig } from '../context'
import type { ModuleSystem } from '../types'

const OPTIONS: { id: ModuleSystem; label: string }[] = [
  { id: 'esm', label: 'ESM' },
  { id: 'cjs', label: 'CommonJS' },
]

export default function ModulePicker() {
  const { config, update } = useConfig()

  return (
    <section style={{
      background: '#121419',
      border: '1px solid #1e2127',
      borderRadius: 16,
      padding: 22,
    }}>
      <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, margin: '0 0 14px' }}>
        Module system
      </h2>
      <div style={{ display: 'flex', gap: 8 }}>
        {OPTIONS.map(opt => {
          const active = config.moduleSystem === opt.id
          return (
            <button
              key={opt.id}
              onClick={() => update({ moduleSystem: opt.id })}
              style={{
                flex: 1,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 600,
                padding: '10px 0',
                borderRadius: 9,
                border: active ? 'none' : '1px solid #25282f',
                background: active ? '#c5f82a' : '#0c0d10',
                color: active ? '#0a0b0d' : '#9aa0a8',
                cursor: 'pointer',
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </section>
  )
}
