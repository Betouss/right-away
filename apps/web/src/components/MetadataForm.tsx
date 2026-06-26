import React, { useState } from 'react'
import { useConfig } from '../context'

const inputBase: React.CSSProperties = {
  background: '#0c0d10',
  border: '1px solid #25282f',
  borderRadius: 9,
  padding: '11px 13px',
  color: '#e8eaed',
  fontSize: 14,
  width: '100%',
}

function TextInput({
  value,
  onChange,
  placeholder,
  mono,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  mono?: boolean
}) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase,
        fontFamily: mono ? "'JetBrains Mono', monospace" : 'inherit',
        borderColor: focused ? '#c5f82a' : '#25282f',
      }}
    />
  )
}

function SelectInput({
  value,
  onChange,
  children,
  mono,
}: {
  value: string
  onChange: (v: string) => void
  children: React.ReactNode
  mono?: boolean
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ position: 'relative' }}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...inputBase,
          fontFamily: mono ? "'JetBrains Mono', monospace" : 'inherit',
          appearance: 'none',
          cursor: 'pointer',
          borderColor: focused ? '#c5f82a' : '#25282f',
        }}
      >
        {children}
      </select>
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
      >
        <path d="M6 9L12 15L18 9" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

function Label({ children, full }: { children: React.ReactNode; full?: boolean }) {
  return (
    <label style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      gridColumn: full ? 'span 2' : undefined,
    }}>
      {children}
    </label>
  )
}

function LabelText({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontSize: 12, fontWeight: 600, color: '#9aa0a8' }}>{children}</span>
  )
}

export default function MetadataForm() {
  const { config, update } = useConfig()

  return (
    <section style={{
      background: '#121419',
      border: '1px solid #1e2127',
      borderRadius: 16,
      padding: 22,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, margin: 0 }}>
          Project metadata
        </h2>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#6b7280' }}>03</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Label full>
          <LabelText>Project name</LabelText>
          <TextInput
            value={config.name}
            onChange={v => update({ name: v })}
            placeholder="my-app"
            mono
          />
        </Label>

        <Label full>
          <LabelText>Description</LabelText>
          <TextInput
            value={config.description}
            onChange={v => update({ description: v })}
            placeholder="A blazing-fast Node.js service"
          />
        </Label>

        <Label>
          <LabelText>Version</LabelText>
          <TextInput
            value={config.version}
            onChange={v => update({ version: v })}
            placeholder="0.1.0"
            mono
          />
        </Label>

        <Label>
          <LabelText>Node version</LabelText>
          <SelectInput
            value={config.nodeVersion}
            onChange={v => update({ nodeVersion: v })}
            mono
          >
            <option>22.x (LTS)</option>
            <option>20.x (LTS)</option>
            <option>18.x</option>
          </SelectInput>
        </Label>

        <Label>
          <LabelText>Author</LabelText>
          <TextInput
            value={config.author}
            onChange={v => update({ author: v })}
            placeholder="your-handle"
          />
        </Label>

        <Label>
          <LabelText>License</LabelText>
          <SelectInput
            value={config.license}
            onChange={v => update({ license: v })}
            mono
          >
            <option>MIT</option>
            <option>Apache-2.0</option>
            <option>GPL-3.0</option>
            <option>ISC</option>
            <option>UNLICENSED</option>
          </SelectInput>
        </Label>
      </div>
    </section>
  )
}
