import { useLanguage } from '../../context/LanguageContext'
import contactLeavesBg from '../../assets/images/contactleaves.jpg'

const icons = [Leaf, Heart, Globe, Sparkles]

export default function ValueProps() {
  const { t } = useLanguage()
  const h = t.home

  return (
    <section className="value-props-section" style={{
      position: 'relative',
      backgroundImage: `url(${contactLeavesBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      padding: '4rem 1.5rem',
      overflow: 'hidden',
    }}>
      {/* Dark overlay for text readability */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(10,26,24,0.88) 0%, rgba(20,42,40,0.9) 100%)',
        zIndex: 0
      }} />

      {/* Background soft glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(circle, rgba(61,144,137,0.15) 0%, transparent 60%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
      }} dir={t.dir}>

        {/* Section Label */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2.5rem',
        }}>
          <span style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.65rem',
            fontWeight: 500,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#d4a843',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}>
            <span style={{ display: 'inline-block', width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, #d4a843)' }} />
            {t.home.whyTitle || 'Why Choose Us?'}
            <span style={{ display: 'inline-block', width: '40px', height: '1px', background: 'linear-gradient(270deg, transparent, #d4a843)' }} />
          </span>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 400,
            color: '#faf8f3',
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: '0.01em',
          }}>
            {h.valuesTitle}
          </h2>
          <p style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '1rem',
            fontWeight: 300,
            color: 'rgba(250,248,243,0.7)',
            maxWidth: '500px',
            margin: '0.75rem auto 0',
            lineHeight: 1.6,
          }}>
            {t.home.whySub || 'We believe beautiful living and responsible choices go hand in hand.'}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="value-props-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem',
        }}>
          {h.values.map((item, i) => {
            const Icon = icons[i] || Leaf
            return (
              <div
                key={item.title}
                style={{
                  padding: '2rem 1.5rem',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-10px)'
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)'
                  e.currentTarget.style.border = '1px solid rgba(212, 168, 67, 0.3)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2), 0 0 40px rgba(212, 168, 67, 0.05)'
                  e.currentTarget.querySelector('.icon-wrap').style.transform = 'scale(1.1)'
                  e.currentTarget.querySelector('.icon-wrap').style.backgroundColor = 'rgba(212, 168, 67, 0.15)'
                  e.currentTarget.querySelector('.icon').style.color = '#d4a843'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)'
                  e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)'
                  e.currentTarget.querySelector('.icon-wrap').style.transform = 'scale(1)'
                  e.currentTarget.querySelector('.icon-wrap').style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.querySelector('.icon').style.color = '#3d9089'
                }}
              >
                {/* Subtle top glow line */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '20%',
                  right: '20%',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(212, 168, 67, 0.5), transparent)',
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                }} className="card-glow" />

                {/* Icon */}
                <div
                  className="icon-wrap"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    transition: 'all 0.4s ease',
                  }}
                >
                  <Icon
                    className="icon"
                    size={24}
                    strokeWidth={1.5}
                    color="#3d9089"
                    style={{ transition: 'color 0.4s ease' }}
                  />
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.6rem',
                  fontWeight: 500,
                  color: '#faf8f3',
                  marginBottom: '1rem',
                  letterSpacing: '0.02em',
                }}>
                  {item.title}
                </h3>

                {/* Desc */}
                <p style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '0.9rem',
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: 'rgba(250,248,243,0.7)',
                  margin: 0,
                }}>
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}