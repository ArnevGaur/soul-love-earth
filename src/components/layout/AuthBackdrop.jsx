import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function AuthBackdrop() {
  const location = useLocation()
  const [bgLoaded, setBgLoaded] = useState(false)
  
  // Only show on login and register
  const isAuthPage = ['/login', '/register'].includes(location.pathname)

  if (!isAuthPage) return null

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      top: 0,
      backgroundColor: '#1a2e2c', // Matches backdrop dark tones
      zIndex: 0,
      overflow: 'hidden',
      pointerEvents: 'none' // Don't block clicks to elements behind if any
    }}>
      <img 
        src="/register-backdrop.jpg" 
        alt="" 
        onLoad={() => setBgLoaded(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: bgLoaded ? 1 : 0,
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'block',
          imageRendering: '-webkit-optimize-contrast'
        }}
      />
    </div>
  )
}
