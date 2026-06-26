import React from 'react'

interface ToastProps {
  message: string
  visible: boolean
}

export default function Toast({ message, visible }: ToastProps) {
  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 92,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 60,
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      background: '#16181d',
      border: '1px solid #2a2e36',
      padding: '13px 18px',
      borderRadius: 12,
      boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
      animation: 'raToast 2.6s ease forwards',
      whiteSpace: 'nowrap',
    }}>
      <div style={{
        width: 22,
        height: 22,
        borderRadius: '50%',
        background: '#c5f82a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M5 13L9 17L19 7" stroke="#0a0b0d" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span style={{ fontSize: 13.5, fontWeight: 500 }}>{message}</span>
    </div>
  )
}
