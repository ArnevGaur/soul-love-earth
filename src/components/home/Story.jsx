import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

export default function Story() {
  const { t, lang } = useLanguage()
  const h = t.home

  return (
    <section style={{
      backgroundColor: '#1a2e2c',
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '400px 1fr',
      }}
        className="story-grid"
        dir={t.dir}
      >

        {/* Left — Image */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          minHeight: 0,
        }}>
          <img
            src="/images/sustainability-story.png"
            alt="Sustainable Earth"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 8s ease',
            }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          />
          {/* Teal tint overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(61,144,137,0.15)',
          }} />

          {/* Floating stat card */}
          <div style={{
            position: 'absolute',
            bottom: '2rem',
            right: '-1px',
            backgroundColor: '#d4a843',
            padding: '1.5rem 2rem',
          }}>
            <div style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '2.5rem',
              fontWeight: 300,
              color: 'white',
              lineHeight: 1,
            }}>{h.yearsOfCraft.split(' ')[0]}</div>
            <div style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.65rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.85)',
              marginTop: '0.25rem',
            }}>{h.yearsOfCraft.split(' ').slice(1).join(' ')}</div>
          </div>
        </div>

        {/* Right — Content (Now Horizontal for Band Layout) */}
        <div style={{
          padding: '2rem 3rem',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '3rem',
        }}>

          {/* Text Left Column */}
          <div style={{ flex: '1 1 auto', maxWidth: '600px' }}>
            {/* Label */}
            <span style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.65rem',
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#d4a843',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem',
            }}>
              <span style={{ width: '32px', height: '1px', backgroundColor: '#d4a843', display: 'inline-block' }} />
              {h.storySub}
            </span>

            {/* Headline */}
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 300,
              color: '#faf8f3',
              lineHeight: 1.15,
              marginBottom: '1rem',
              whiteSpace: 'pre-line',
            }}>
              {h.storyTitle.split('\n')[0]}<br />
              <em style={{ fontStyle: 'italic', color: '#a3dbd3' }}>{h.storyTitle.split('\n')[1] || ''}</em>
            </h2>

            {/* Body */}
            <p style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.88rem',
              fontWeight: 300,
              lineHeight: 1.9,
              color: 'rgba(250,248,243,0.7)',
              marginBottom: '0.5rem',
            }}>
              {h.storyP1}
            </p>
            <p style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.88rem',
              fontWeight: 300,
              lineHeight: 1.9,
              color: 'rgba(250,248,243,0.7)',
              margin: '0',
            }}>
              {h.storyP2}
            </p>
          </div>

          {/* Stats Right Column */}
          <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

          {/* Stats row */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            marginBottom: '1.5rem',
            borderBottom: '1px solid rgba(250,248,243,0.1)',
            paddingBottom: '1.25rem',
          }}>
            {h.stats.map(stat => (
              <div key={stat.label}>
                <div style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '2rem',
                  fontWeight: 400,
                  color: '#a3dbd3',
                  lineHeight: 1,
                }}>{stat.num}</div>
                <div style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '0.65rem',
                  fontWeight: 400,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(250,248,243,0.5)',
                  marginTop: '0.3rem',
                }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
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
              border: '1px solid rgba(250,248,243,0.3)',
              alignSelf: 'flex-start',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#d4a843'
              e.currentTarget.style.color = '#d4a843'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(250,248,243,0.3)'
              e.currentTarget.style.color = '#faf8f3'
            }}
          >
            {h.readStory} <ArrowRight size={14} strokeWidth={2} style={{ transform: t.dir === 'rtl' ? 'rotate(180deg)' : 'none' }} />
          </Link>

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .story-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}