import React from 'react'
import { useConfig } from '../context'
import { buildTree } from '../utils'

export default function ProjectTree() {
  const { config } = useConfig()
  const lines = buildTree(config)
  const fileCount = lines.filter(l => !l.isDir).length

  return (
    <section style={{
      background: '#121419',
      border: '1px solid #1e2127',
      borderRadius: 16,
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 18px',
        borderBottom: '1px solid #1e2127',
      }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, margin: 0, color: '#9aa0a8' }}>
          Project structure
        </h2>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#6b7280' }}>
          {fileCount} files
        </span>
      </div>
      <div style={{
        padding: '14px 16px',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        lineHeight: 1.7,
        maxHeight: 320,
        overflowY: 'auto',
      }}>
        {lines.map((ln, i) => {
          const indent = ln.depth * 16
          const prefix = ln.depth === 0 ? '' : '  '.repeat(ln.depth - 1) + (ln.isDir ? '┣ ' : '┣ ')
          return (
            <div
              key={i}
              style={{
                paddingLeft: indent,
                color: ln.isDir ? '#c5f82a' : '#8a909a',
                whiteSpace: 'nowrap',
              }}
            >
              {ln.depth > 0 && (
                <span style={{ color: '#3a3f48', marginRight: 4 }}>
                  {'│  '.repeat(Math.max(0, ln.depth - 1))}{'├─ '}
                </span>
              )}
              {ln.text}
            </div>
          )
        })}
      </div>
    </section>
  )
}
