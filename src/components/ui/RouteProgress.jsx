import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function RouteProgress() {
  const location = useLocation()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const timerRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' })

    // Clear any existing animation
    clearTimeout(timerRef.current)
    cancelAnimationFrame(rafRef.current)

    // Start the bar
    setProgress(0)
    setVisible(true)

    // Quickly ramp to ~80% then wait
    let start = null
    const animate = (ts) => {
      if (!start) start = ts
      const elapsed = ts - start
      // Ease to 80% in ~300ms then slow crawl
      const p = Math.min(80, (elapsed / 300) * 80 + Math.min(10, (elapsed - 300) / 100))
      setProgress(p)
      if (p < 85) rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    // Complete and hide after a brief moment
    timerRef.current = setTimeout(() => {
      setProgress(100)
      setTimeout(() => setVisible(false), 300)
    }, 400)

    return () => {
      clearTimeout(timerRef.current)
      cancelAnimationFrame(rafRef.current)
    }
  }, [location.pathname])

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
      height: '2.5px', pointerEvents: 'none',
    }}>
      <div style={{
        height: '100%',
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #3d9089, #d4a843)',
        transition: progress === 100 ? 'width 0.15s ease, opacity 0.3s ease' : 'width 0.1s linear',
        opacity: progress === 100 ? 0 : 1,
        boxShadow: '0 0 8px rgba(61,144,137,0.6)',
      }} />
    </div>
  )
}
