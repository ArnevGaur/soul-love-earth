import { useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [cardsToShow, setCardsToShow] = useState(3)
  const { t } = useLanguage()
  const isRtl = t?.dir === 'rtl'
  const testimonials = t?.home?.testimonials || []

  // Responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCardsToShow(1)
      else if (window.innerWidth < 1024) setCardsToShow(2)
      else setCardsToShow(3)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!testimonials.length) return null

  // Restrict bounds
  const maxIndex = Math.max(0, testimonials.length - cardsToShow)
  
  const prev = () => setCurrent(c => Math.max(0, c - 1))
  const next = () => setCurrent(c => Math.min(maxIndex, c + 1))

  return (
    <section style={{
      backgroundColor: '#faf8f3',
      padding: '4rem 2rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background radial soft light */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        height: '80vw',
        background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ maxWidth: '1140px', margin: '0 auto', direction: t.dir, position: 'relative', zIndex: 1 }}>
        
        {/* Header Inline with Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div>
            <span style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.65rem',
              fontWeight: 500,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#d4a843',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem',
            }}>
              <span style={{ display: 'inline-block', width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, #d4a843)' }} />
              {isRtl ? 'أصوات المجتمع' : 'COMMUNITY VOICES'}
            </span>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: 300,
              color: '#214e41',
              margin: 0,
              lineHeight: 1.1,
            }}>
              {t.home.testimonialsTitle}
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={prev} disabled={current === 0} style={{
              width: '40px', height: '40px',
              borderRadius: '50%',
              backgroundColor: current === 0 ? 'rgba(26,53,50,0.1)' : '#214e41',
              color: current === 0 ? 'rgba(26,53,50,0.3)' : '#ffffff',
              border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: current === 0 ? 'default' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }}
            onMouseEnter={e => {
              if (current !== 0) {
                e.currentTarget.style.backgroundColor = '#d4a843'
              }
            }}
            onMouseLeave={e => {
              if (current !== 0) {
                e.currentTarget.style.backgroundColor = '#214e41'
              }
            }}>
              <ArrowLeft strokeWidth={1.5} style={{ transform: isRtl ? 'rotate(180deg)' : 'none' }} />
            </button>
            <button onClick={next} disabled={current === maxIndex} style={{
              width: '40px', height: '40px',
              borderRadius: '50%',
              backgroundColor: current === maxIndex ? 'rgba(26,53,50,0.1)' : '#214e41',
              color: current === maxIndex ? 'rgba(26,53,50,0.3)' : '#ffffff',
              border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: current === maxIndex ? 'default' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }}
            onMouseEnter={e => {
              if (current !== maxIndex) {
                e.currentTarget.style.backgroundColor = '#d4a843'
              }
            }}
            onMouseLeave={e => {
              if (current !== maxIndex) {
                e.currentTarget.style.backgroundColor = '#214e41'
              }
            }}>
              <ArrowRight strokeWidth={1.5} style={{ transform: isRtl ? 'rotate(180deg)' : 'none' }} />
            </button>
          </div>
        </div>

        {/* Carousel Window */}
        <div style={{ overflow: 'hidden', margin: '0 -0.5rem', padding: '0.5rem' }}>
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            transform: isRtl 
              ? `translateX(calc(${current} * (100% / ${cardsToShow} + 1.5rem / ${cardsToShow})))` 
              : `translateX(calc(-${current} * (100% / ${cardsToShow} + 1.5rem / ${cardsToShow})))`,
            transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
          }}>
            {testimonials.map((item) => (
              <div key={item.id} style={{
                flex: `0 0 calc(100% / ${cardsToShow} - (1.5rem * ${cardsToShow - 1} / ${cardsToShow}))`,
                backgroundColor: '#ffffff',
                border: '1px solid rgba(26,53,50,0.06)',
                borderRadius: '12px',
                padding: '1.75rem 1.75rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 8px 30px rgba(0,0,0,0.02)',
              }}>
                <Quote size={24} color="#214e41" style={{ marginBottom: '1rem', opacity: 1 }} />
                
                <p style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: '#214e41',
                  lineHeight: 1.6,
                  flex: 1,
                  marginBottom: '1.5rem',
                }}>
                  {item.text}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  borderTop: '1px solid rgba(26,53,50,0.06)',
                  paddingTop: '1rem',
                }}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '1px solid rgba(212,168,67,0.3)',
                    }}
                  />
                  <span style={{
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#214e41',
                  }}>
                    {item.name.replace('- ', '')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
