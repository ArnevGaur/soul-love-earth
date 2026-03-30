import { useLanguage } from '../../context/LanguageContext'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function BagsCollection() {
  const { lang, t } = useLanguage()
  const dir = t?.dir || 'ltr'
  const isRtl = dir === 'rtl'

  const content = {
    en: {
      title: 'The Bags Collection',
      desc: 'Made from recycled and ethically sourced materials, our stylish bags not only make you look good but also feel good about reducing your environmental impact. Join us in shaping a more sustainable tomorrow through your fashion choices—explore our collection and make a statement that cares for both style and the planet.',
      btn: 'SHOP BAGS'
    },
    ar: {
      title: 'مجموعة الحقائب',
      desc: 'مصنوعة من مواد معاد تدويرها ومصادر أخلاقية، حقائبنا الأنيقة لا تجعلك تبدو جيداً فحسب، بل تجعلك تشعر بالرضا عن تقليل تأثيرك البيئي. انضم إلينا في تشكيل غد أكثر استدامة من خلال اختياراتك للأزياء — استكشف مجموعتنا واتخذ موقفاً يهتم بكل من الأناقة والكوكب.',
      btn: 'تسوّق الحقائب'
    }
  }

  const current = lang === 'ar' ? content.ar : content.en

  return (
    <section className="bags-collection" style={{ padding: '4rem 1.5rem', background: '#ffffff', overflow: 'hidden' }}>
      <div className="bags-collection-grid" style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '4rem',
        direction: dir,
      }}>
        
        {/* Text Content */}
        <div className="bags-collection-item" style={{ flex: '1 1 400px', textAlign: 'center', padding: '0 1rem' }}>
          <h2 className="bags-collection-title" style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
            fontWeight: 400,
            color: '#214e41',
            margin: '0 0 1rem',
            letterSpacing: '0.02em',
          }}>
            {current.title}
          </h2>
          
          <div style={{
            width: '60px',
            height: '2px',
            backgroundColor: '#d4a843', // Brand gold instead of red
            margin: '0 auto 2rem',
          }} />

          <p style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.95rem',
            fontWeight: 300,
            color: '#4a6b68',
            lineHeight: 1.7,
            marginBottom: '3rem',
            maxWidth: '560px',
            margin: '0 auto 2.5rem',
          }}>
            {current.desc}
          </p>

          <Link to="/shop?cat=bags" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.8rem 2rem',
            backgroundColor: '#214e41', // Dark Charcoal/Navy to match image button
            color: '#ffffff',
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            borderRadius: '2px',
            transition: 'all 0.3s ease',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#d4a843'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(212,168,67,0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#214e41'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {current.btn} <ArrowRight size={14} strokeWidth={2} style={{ transform: isRtl ? 'rotate(180deg)' : 'none' }} />
          </Link>
        </div>

        {/* Video Content */}
        <div className="bags-collection-item" style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: '100%',
            maxWidth: '540px',
            aspectRatio: '16/9',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            position: 'relative',
          }}>
            <video
              src="/bag.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
            {/* Subtle inner shadow overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)',
              pointerEvents: 'none',
            }} />
          </div>
        </div>

      </div>
    </section>
  )
}
