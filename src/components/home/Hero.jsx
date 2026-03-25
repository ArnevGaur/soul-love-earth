import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

export default function Hero() {
  const { t, lang } = useLanguage()
  const h = t?.home || {}
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section style={{
      position: 'relative',
      height: '100vh',
      minHeight: '640px',
      overflow: 'hidden',
      backgroundColor: '#1a2e2c',
      display: 'flex',
      alignItems: 'center',
    }}>

      {/* Background image with overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        transform: 'scale(1.04)',
        transition: 'transform 8s ease-out',
        ...(loaded && { transform: 'scale(1)' }),
      }} />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(105deg, rgba(20,42,40,0.82) 0%, rgba(20,42,40,0.45) 55%, rgba(20,42,40,0.15) 100%)',
      }} />

      {/* Decorative vertical line */}
      <div style={{
        position: 'absolute',
        left: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '1px',
        height: loaded ? '140px' : '0px',
        backgroundColor: '#d4a843',
        opacity: 0.6,
        transition: 'height 1.2s ease 0.8s',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 2rem',
        width: '100%',
        paddingLeft: 'clamp(2rem, 6vw, 6rem)',
        direction: t?.dir,
      }}>

        {/* Label */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.7s ease 0.2s',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          <div style={{ width: '32px', height: '1px', backgroundColor: '#d4a843' }} />
          <span style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.65rem',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#d4a843',
          }}>
            {lang === 'ar' ? 'حياة واعية' : 'Conscious Living'}
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(3rem, 7vw, 6.5rem)',
          fontWeight: 300,
          lineHeight: 1.08,
          color: '#faf8f3',
          marginBottom: '1.5rem',
          maxWidth: '720px',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.9s ease 0.35s',
          whiteSpace: 'pre-line',
        }}>
          {h?.heroTitle?.split('\n')[0]}<br />
          <em style={{ fontStyle: 'italic', color: '#a3dbd3' }}>{h?.heroTitle?.split('\n')[1]}</em>
        </h1>

        {/* Subtext */}
        <p style={{
          fontFamily: 'Jost, sans-serif',
          fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
          fontWeight: 300,
          lineHeight: 1.75,
          color: 'rgba(250,248,243,0.75)',
          maxWidth: '420px',
          marginBottom: '2.5rem',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.9s ease 0.5s',
        }}>
          {h.heroSub}
        </p>

        {/* CTAs */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.9s ease 0.65s',
        }}>
          <Link
            to="/shop"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.85rem 2.25rem',
              backgroundColor: '#3d9089',
              color: 'white',
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'background-color 0.3s ease, transform 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#317570'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#3d9089'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {h?.shopNow} <ArrowRight size={14} strokeWidth={2} style={{ transform: t?.dir === 'rtl' ? 'rotate(180deg)' : 'none' }} />
          </Link>

          <Link
            to="/story"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.85rem 2.25rem',
              backgroundColor: 'transparent',
              color: '#faf8f3',
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              border: '1px solid rgba(250,248,243,0.45)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#d4a843'
              e.currentTarget.style.color = '#d4a843'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(250,248,243,0.45)'
              e.currentTarget.style.color = '#faf8f3'
            }}
          >
            {h.ourStory}
          </Link>
        </div>

      </div>

      {/* Bottom scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.4rem',
        opacity: loaded ? 0.6 : 0,
        transition: 'opacity 1s ease 1.2s',
      }}>
        <span style={{
          fontFamily: 'Jost, sans-serif',
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#faf8f3',
        }}>{lang === 'ar' ? 'قم بالتمرير' : 'Scroll'}</span>
        <div style={{
          width: '1px',
          height: '40px',
          backgroundColor: '#d4a843',
          animation: 'scrollPulse 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50%       { opacity: 1;   transform: scaleY(0.6); }
        }
      `}</style>
    </section>
  )
}