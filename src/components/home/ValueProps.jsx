import { Leaf, Heart, Globe, Sparkles } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const icons = [Leaf, Heart, Globe, Sparkles]

export default function ValueProps() {
  const { t } = useLanguage()
  const h = t.home

  return (
    <section style={{
      backgroundColor: '#e8f5f3',
      padding: '5rem 2rem',
      borderTop: '1px solid rgba(61,144,137,0.25)',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
      }} dir={t.dir}>

        {/* Section Label */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3.5rem',
        }}>
          <span style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.65rem',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#d4a843',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
          }}>
            <span style={{ display: 'inline-block', width: '32px', height: '1px', backgroundColor: '#d4a843' }} />
            {h.valuesTitle}
            <span style={{ display: 'inline-block', width: '32px', height: '1px', backgroundColor: '#d4a843' }} />
          </span>
        </div>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '0',
        }}>
          {h.values.map((item, i) => {
            const Icon = icons[i] || Leaf
            return (
              <div
                key={item.title}
                style={{
                  padding: '2.5rem 2rem',
                  borderLeft: i === 0 && t.dir === 'ltr' ? '1px solid rgba(61,144,137,0.4)' : t.dir === 'rtl' ? '1px solid rgba(61,144,137,0.4)' : 'none',
                  borderRight: '1px solid rgba(61,144,137,0.4)',
                  borderTop: '1px solid rgba(61,144,137,0.4)',
                  borderBottom: '1px solid rgba(61,144,137,0.4)',
                  backgroundColor: 'rgba(255,255,255,0.6)',
                  transition: 'background-color 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#d1ede9'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.6)'}
              >
                {/* Icon */}
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(61,144,137,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}>
                  <Icon size={18} strokeWidth={1.5} color="#3d9089" />
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.4rem',
                  fontWeight: 500,
                  color: '#2c2c2c',
                  marginBottom: '0.65rem',
                  letterSpacing: '0.01em',
                }}>
                  {item.title}
                </h3>

                {/* Desc */}
                <p style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '0.82rem',
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: '#444',
                }}>
                  {item.desc}
                </p>

                {/* Bottom accent line */}
                <div style={{
                  marginTop: '1.5rem',
                  width: '24px',
                  height: '2px',
                  backgroundColor: '#d4a843',
                  opacity: 0.6,
                }} />
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}