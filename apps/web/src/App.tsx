import React, { useState, useCallback } from 'react'
import { ConfigProvider } from './context'
import Header from './components/Header'
import FrameworkSelector from './components/FrameworkSelector'
import LanguagePicker from './components/LanguagePicker'
import ModulePicker from './components/ModulePicker'
import PackageManagerSelector from './components/PackageManagerSelector'
import MetadataForm from './components/MetadataForm'
import DependencySection from './components/DependencySection'
import DependencyPanel from './components/DependencyPanel'
import ProjectTree from './components/ProjectTree'
import ActionBar from './components/ActionBar'
import Toast from './components/Toast'

function AppInner() {
  const [showPanel, setShowPanel] = useState(false)
  const [toast, setToast] = useState<{ message: string; key: number } | null>(null)

  const showToast = useCallback((msg: string) => {
    setToast({ message: msg, key: Date.now() })
    setTimeout(() => setToast(null), 2700)
  }, [])

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      background: 'radial-gradient(1200px 600px at 80% -10%, rgba(197,248,42,0.06), transparent 60%), #0a0b0d',
    }}>
      <Header />

      {/* Scrollable main */}
      <div style={{ flex: '1 1 auto', overflowY: 'auto' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 28px 28px' }}>

          {/* Hero */}
          <div style={{ marginBottom: 32 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: '#c5f82a',
              background: 'rgba(197,248,42,0.08)',
              border: '1px solid rgba(197,248,42,0.2)',
              padding: '5px 11px',
              borderRadius: 100,
              marginBottom: 18,
            }}>
              <span style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#c5f82a',
                animation: 'raPulse 1.8s infinite',
                display: 'inline-block',
              }} />
              PROJECT GENERATOR
            </div>
            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              margin: '0 0 8px',
              lineHeight: 1.1,
            }}>
              Spin up a configured Node.js<br />project — right away.
            </h1>
            <p style={{ fontSize: 15, color: '#9aa0a8', margin: 0, maxWidth: 540, lineHeight: 1.5 }}>
              Pick your framework, package manager and dependencies. Download a ready-to-run project or copy the CLI command. No boilerplate, no setup.
            </p>
          </div>

          {/* 2-column layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.55fr 1fr',
            gap: 22,
            alignItems: 'start',
          }}>
            {/* Left column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              <FrameworkSelector />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
                <LanguagePicker />
                <ModulePicker />
              </div>
              <PackageManagerSelector />
              <MetadataForm />
            </div>

            {/* Right column — sticky */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22, position: 'sticky', top: 0 }}>
              <DependencySection onOpenPanel={() => setShowPanel(true)} />
              <ProjectTree />
            </div>
          </div>
        </div>
      </div>

      <ActionBar onToast={showToast} />

      {showPanel && <DependencyPanel onClose={() => setShowPanel(false)} />}

      {toast && <Toast key={toast.key} message={toast.message} visible={true} />}
    </div>
  )
}

export default function App() {
  return (
    <ConfigProvider>
      <AppInner />
    </ConfigProvider>
  )
}
