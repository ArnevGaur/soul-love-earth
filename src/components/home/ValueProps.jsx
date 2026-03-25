import { Leaf, Heart, Globe, Sparkles } from 'lucide-react'

const values = [
  {
    icon: Leaf,
    title: 'Eco-Conscious',
    desc: 'Every product is thoughtfully crafted with sustainability at its core — from raw material to your doorstep.',
  },
  {
    icon: Heart,
    title: 'Artisan Made',
    desc: 'We partner with skilled craftspeople to bring you handmade goods that carry soul, story, and tradition.',
  },
  {
    icon: Globe,
    title: 'Ethically Sourced',
    desc: 'Responsible sourcing that supports local communities, fair wages, and regenerative practices.',
  },
  {
    icon: Sparkles,
    title: 'Mindful Living',
    desc: 'Curated for homes, hospitality, and everyday rituals — beauty that aligns with your values.',
  },
]

export default function ValueProps() {
  return (
    <section style={{
      backgroundColor: '#e8f5f3',
      padding: '5rem 2rem',
      borderTop: '1px solid rgba(61,144,137,0.25)',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
      }}>

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
            Why Soul Love &amp; Earth
            <span style={{ display: 'inline-block', width: '32px', height: '1px', backgroundColor: '#d4a843' }} />
          </span>
        </div>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '0',
        }}>
          {values.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                style={{
                  padding: '2.5rem 2rem',
                  borderLeft: i === 0 ? '1px solid rgba(61,144,137,0.4)' : 'none',
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