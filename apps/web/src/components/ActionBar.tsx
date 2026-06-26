import { useState } from 'react'
import { useConfig } from '../context'
import { buildCli } from '../utils'
import { FRAMEWORKS, PACKAGE_MANAGERS } from '../data'

interface ActionBarProps {
  onToast: (msg: string) => void
}

export default function ActionBar({ onToast }: ActionBarProps) {
  const { config } = useConfig()
  const [hoveredCopy, setHoveredCopy] = useState(false)
  const [hoveredZip, setHoveredZip] = useState(false)
  const [copied, setCopied] = useState(false)
  const [generating, setGenerating] = useState(false)

  const fw = FRAMEWORKS.find(f => f.id === config.framework)
  const pm = PACKAGE_MANAGERS.find(p => p.id === config.packageManager)
  const depCount = config.dependencies.length

  const summary = [
    fw?.name,
    config.language === 'ts' ? 'TypeScript' : 'JavaScript',
    pm?.name,
    depCount > 0 ? `${depCount} dep${depCount === 1 ? '' : 's'}` : null,
  ].filter(Boolean).join(' · ')

  const copyCli = async () => {
    try {
      await navigator.clipboard.writeText(buildCli(config))
      setCopied(true)
      onToast('CLI command copied!')
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // fallback: do nothing silently
    }
  }

  const downloadZip = async () => {
    try {
      setGenerating(true)
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      })
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${config.name || 'my-app'}.zip`
      a.click()
      URL.revokeObjectURL(url)
      onToast('Project downloaded!')
    } catch {
      onToast('Failed to generate project')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <footer style={{
      flexShrink: 0,
      borderTop: '1px solid #1a1d22',
      background: 'rgba(12,13,16,0.92)',
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '14px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 18,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: '#6b7280',
          minWidth: 0,
          overflow: 'hidden',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <path d="M13 2L4.5 13.5H11L10 22L19.5 10H13L13 2Z" fill="#c5f82a"/>
          </svg>
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {summary}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <button
            onClick={copyCli}
            onMouseEnter={() => setHoveredCopy(true)}
            onMouseLeave={() => setHoveredCopy(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: '#1b1e24',
              border: hoveredCopy ? '1px solid #3a3f48' : '1px solid #2a2e36',
              color: '#e8eaed',
              fontSize: 13.5,
              fontWeight: 600,
              padding: '11px 16px',
              borderRadius: 10,
              cursor: 'pointer',
              transition: 'border-color 0.15s',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M5 15V5a2 2 0 012-2h10" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {copied ? 'Copied!' : 'Copy CLI'}
          </button>
          <button
            onClick={downloadZip}
            onMouseEnter={() => setHoveredZip(true)}
            onMouseLeave={() => setHoveredZip(false)}
            disabled={generating}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              background: hoveredZip ? '#d4ff4a' : '#c5f82a',
              border: 'none',
              color: '#0a0b0d',
              fontSize: 13.5,
              fontWeight: 700,
              padding: '11px 20px',
              borderRadius: 10,
              cursor: generating ? 'not-allowed' : 'pointer',
              boxShadow: '0 0 26px rgba(197,248,42,0.28)',
              transition: 'background 0.15s',
              opacity: generating ? 0.75 : 1,
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M12 3V15M12 15L7 10M12 15L17 10M5 21H19" stroke="#0a0b0d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {generating ? 'Generating…' : 'Generate .zip'}
          </button>
        </div>
      </div>
    </footer>
  )
}
