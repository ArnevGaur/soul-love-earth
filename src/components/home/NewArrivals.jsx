import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { useCart } from '../../context/CartContext'
import { ArrowRight, ShoppingBag, Eye, Check } from 'lucide-react'

const products = [
  {
    id: '50',
    name: 'Ramadan Blessings Gift Box',
    price: 'AED 180.00',
    badge: 'New',
    image: '/images/Products/ramadan-1.jpg?v=2',
  },
  {
    id: '51',
    name: 'Ramadan Lantern Gift Box',
    price: 'AED 169.00',
    badge: 'New',
    image: '/images/Products/ramadan-2.jpg?v=2',
  },
  {
    id: '52',
    name: 'Ramadan Serenity Gift Box',
    price: 'AED 175.00',
    badge: 'New',
    image: '/images/Products/ramadan-3.jpg?v=2',
  },
  {
    id: '53',
    name: 'Ramadan Reflection Gift Box',
    price: 'AED 199.00',
    badge: 'New',
    image: '/images/Products/ramadan-4.jpg?v=2',
  },
  {
    id: '54',
    name: 'Ramadan Blessings Gift Box by Soul Love & Earth',
    price: 'AED 199.00',
    badge: 'New',
    image: '/images/Products/ramadan-5.jpg?v=2',
  },
]

export default function NewArrivals() {
  const [current, setCurrent] = useState(0)
  const { t, lang } = useLanguage()
  const dir = t?.dir || 'ltr'
  const isRtl = dir === 'rtl'

  // Responsive visible card count
  const [visibleCount, setVisibleCount] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1)
      else if (window.innerWidth < 1024) setVisibleCount(2)
      else setVisibleCount(3)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(0, products.length - visibleCount)
  const prev = () => setCurrent(c => Math.max(c - 1, 0))
  const next = () => setCurrent(c => Math.min(c + 1, maxIndex))

  return (
    <section className="new-arrivals-section" style={{ padding: '5rem 1.5rem', background: '#f9f9f7', position: 'relative' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }} dir={dir}>

        {/* Header row */}
        <div className="new-arrivals-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#d4a843',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            marginBottom: '1rem',
          }}>
            <span style={{ width: '40px', height: '1px', backgroundColor: '#d4a843', opacity: 0.6 }} />
            {lang === 'ar' ? 'وصل حديثاً' : 'Just Arrived'}
            <span style={{ width: '40px', height: '1px', backgroundColor: '#d4a843', opacity: 0.6 }} />
          </span>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 400,
            color: '#2d6b66',
            margin: '0 0 1rem',
            letterSpacing: '0.01em',
            lineHeight: 1.1,
          }}>
            {lang === 'ar' ? 'أحدث المنتجات' : 'New Arrivals'}
          </h2>
          <p style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.95rem',
            fontWeight: 300,
            color: '#6b8f8c',
            maxWidth: '600px',
            lineHeight: 1.6,
            margin: 0,
          }}>
            {lang === 'ar' 
              ? 'نقدم لكم أحدث منتجاتنا — صناديق هدايا منسقة بعناية لإضافة الدفء والأناقة لكل مناسبة.'
              : 'Introducing our latest arrivals — thoughtfully curated gift boxes designed to bring warmth, elegance, and meaning to every occasion.'}
          </p>
        </div>

        {/* Sliding Carousel with Sidebar Arrows */}
        <div style={{ position: 'relative', margin: '0 -15px', padding: '15px' }}>
          
          {/* Left Arrow - Completely outside the cards track */}
          <button
            onClick={prev}
            disabled={current === 0}
            style={{
              position: 'absolute',
              top: '50%',
              left: '0px', // Exact edge of the outer container
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '50px', height: '50px',
              borderRadius: '50%',
              border: '1px solid rgba(61,144,137,0.2)',
              background: '#faf8f3', // Matches page background perfectly
              color: current === 0 ? 'rgba(61,144,137,0.3)' : '#3d9089',
              cursor: current === 0 ? 'not-allowed' : 'pointer',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: current === 0 ? 0 : 1,
              pointerEvents: current === 0 ? 'none' : 'auto',
            }}
            onMouseEnter={e => { 
              e.currentTarget.style.color = '#ffffff'; 
              e.currentTarget.style.background = '#d4a843';
              e.currentTarget.style.borderColor = '#d4a843';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; 
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(212,168,67,0.3)';
            }}
            onMouseLeave={e => { 
              e.currentTarget.style.color = '#3d9089'; 
              e.currentTarget.style.background = '#faf8f3';
              e.currentTarget.style.borderColor = 'rgba(61,144,137,0.2)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; 
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <ArrowRight size={22} strokeWidth={1.5} style={{ transform: isRtl ? 'none' : 'rotate(180deg)' }} />
          </button>

          {/* Cards Wrapper */}
          <div className="new-arrivals-cards-wrapper" style={{ padding: '0 65px' }}>
            <div className="new-arrivals-overflow-hidden" style={{ overflow: 'hidden', padding: '10px 0' }}>
              <div className="new-arrivals-track" style={{
                display: 'flex',
                gap: '2rem',
                transform: `translateX(calc(${isRtl ? '' : '-'}${current * (100 / visibleCount)}% ${isRtl ? '+' : '-'} ${current * (2 * 16 / visibleCount)}px))`,
                transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                willChange: 'transform',
              }}>
                {products.map(product => (
                  <div key={product.id} className="new-arrivals-card-container" style={{ 
                    flex: `0 0 calc(${100 / visibleCount}% - ${(visibleCount - 1) * 2 / visibleCount}rem)`, 
                    minWidth: visibleCount === 1 ? '100%' : '260px', 
                  }}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={next}
            disabled={current === maxIndex}
            style={{
              position: 'absolute',
              top: '50%',
              right: '0px',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '50px', height: '50px',
              borderRadius: '50%',
              border: '1px solid rgba(61,144,137,0.2)',
              background: '#faf8f3',
              color: current === maxIndex ? 'rgba(61,144,137,0.3)' : '#3d9089',
              cursor: current === maxIndex ? 'not-allowed' : 'pointer',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: current === maxIndex ? 0 : 1,
              pointerEvents: current === maxIndex ? 'none' : 'auto',
            }}
            onMouseEnter={e => { 
              e.currentTarget.style.color = '#ffffff'; 
              e.currentTarget.style.background = '#d4a843';
              e.currentTarget.style.borderColor = '#d4a843';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; 
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(212,168,67,0.3)';
            }}
            onMouseLeave={e => { 
              e.currentTarget.style.color = '#3d9089'; 
              e.currentTarget.style.background = '#faf8f3';
              e.currentTarget.style.borderColor = 'rgba(61,144,137,0.2)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; 
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <ArrowRight size={22} strokeWidth={1.5} style={{ transform: isRtl ? 'rotate(180deg)' : 'none' }} />
          </button>
        </div>

        {/* Dots (Indicator) and Action Button */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '3.5rem', gap: '3rem' }}>
          {/* Dots */}
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: i === current ? '36px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  border: 'none',
                  background: i === current ? '#d4a843' : 'rgba(61,144,137,0.15)',
                  cursor: 'pointer',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* View All */}
          <a href="/shop?cat=gifts" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.8rem',
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#1a3532',
            textDecoration: 'none',
            padding: '0.8rem 2rem',
            border: '1px solid rgba(26,53,50,0.15)',
            borderRadius: '100px',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#1a3532'
              e.currentTarget.style.color = '#ffffff'
              e.currentTarget.style.borderColor = '#1a3532'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#1a3532'
              e.currentTarget.style.borderColor = 'rgba(26,53,50,0.15)'
            }}
          >
            {lang === 'ar' ? 'تصفح المجموعة بأكملها' : 'Explore Entire Collection'} <ArrowRight size={14} strokeWidth={2} style={{ transform: isRtl ? 'rotate(180deg)' : 'none' }} />
          </a>
        </div>
      </div>
    </section>
  )
}

function ProductCard({ product }) {
  const { lang, t } = useLanguage()
  const { addToCart } = useCart()
  const isRtl = t?.dir === 'rtl'
  const [added, setAdded] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Add to cart with product data
    addToCart({
      product_id: product.id,
      name: product.name,
      price: product.price.replace(/[^0-9.]/g, ''),
      thumb: product.image,
      quantity: 1
    })
    
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Link 
      to={`/product/${product.id}`}
      style={{
        borderRadius: '8px',
        overflow: 'hidden',
        background: '#ffffff',
        border: '1px solid rgba(61,144,137,0.06)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-8px)'
        e.currentTarget.style.boxShadow = '0 24px 48px rgba(61,144,137,0.1)'
        e.currentTarget.style.borderColor = 'rgba(61,144,137,0.15)'
        e.currentTarget.querySelector('.prod-img').style.transform = 'scale(1.08)'
        e.currentTarget.querySelector('.overlay').style.backgroundColor = 'rgba(20,42,40,0.08)'
        e.currentTarget.querySelector('.btn-bg').style.transform = isRtl ? 'translateX(0)' : 'translateX(0)'
        e.currentTarget.querySelector('.btn-text').style.color = '#ffffff'
        e.currentTarget.querySelector('.btn-icon').style.color = '#ffffff'
        e.currentTarget.querySelector('.btn-container').style.borderColor = '#d4a843'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.03)'
        e.currentTarget.style.borderColor = 'rgba(61,144,137,0.06)'
        e.currentTarget.querySelector('.prod-img').style.transform = 'scale(1)'
        e.currentTarget.querySelector('.overlay').style.backgroundColor = 'transparent'
        e.currentTarget.querySelector('.btn-bg').style.transform = isRtl ? 'translateX(101%)' : 'translateX(-101%)'
        e.currentTarget.querySelector('.btn-text').style.color = '#3d9089'
        e.currentTarget.querySelector('.btn-icon').style.color = '#3d9089'
        e.currentTarget.querySelector('.btn-container').style.borderColor = 'rgba(61,144,137,0.15)'
      }}
    >
      {/* Badge */}
      {product.badge && (
        <div style={{
          position: 'absolute', top: '1.25rem', left: isRtl ? 'auto' : '1.25rem', right: isRtl ? '1.25rem' : 'auto',
          zIndex: 3,
          background: '#d4a843',
          color: '#ffffff',
          fontFamily: 'Jost, sans-serif',
          fontSize: '0.65rem',
          fontWeight: 500,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          padding: '0.35rem 1rem',
          borderRadius: '2px',
          boxShadow: '0 4px 12px rgba(212, 168, 67, 0.2)',
        }}>
          {lang === 'ar' && product.badge === 'New' ? 'جديد' : product.badge}
        </div>
      )}

      {/* Image Container */}
      <div style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden', position: 'relative' }}>
        <img
          className="prod-img"
          src={product.image}
          alt={product.name}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
        <div className="overlay" style={{
          position: 'absolute',
          inset: 0,
          transition: 'background-color 0.5s ease',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Info */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '1.15rem',
          fontWeight: 400,
          color: '#1a3532',
          margin: '0 0 0.35rem',
          letterSpacing: '0.02em',
          lineHeight: 1.3,
        }}>{product.name}</h3>

        <div style={{
          fontFamily: 'Jost, sans-serif',
          fontSize: '0.95rem',
          fontWeight: 400,
          color: '#6b8f8c',
          letterSpacing: '0.04em',
          marginBottom: '1.25rem',
          flex: 1,
        }}>{product.price}</div>

        <button className="btn-container" style={{
          width: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.6rem',
          padding: '0.9rem',
          border: '1px solid rgba(61,144,137,0.15)',
          background: 'transparent',
          borderRadius: '4px',
          cursor: 'pointer',
          overflow: 'hidden',
          transition: 'border-color 0.4s ease',
        }}
          onClick={handleAddToCart}
        >
          <div className="btn-bg" style={{
            position: 'absolute',
            inset: 0,
            background: added ? '#3d9089' : '#d4a843',
            transform: isRtl ? 'translateX(101%)' : 'translateX(-101%)',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 0,
          }} />
          {added ? (
            <Check className="btn-icon" size={15} strokeWidth={1.5} color="#3d9089" style={{ position: 'relative', zIndex: 1, transition: 'color 0.4s ease' }} />
          ) : (
            <ShoppingBag className="btn-icon" size={15} strokeWidth={1.5} color="#3d9089" style={{ position: 'relative', zIndex: 1, transition: 'color 0.4s ease' }} />
          )}
          <span className="btn-text" style={{
            position: 'relative', zIndex: 1,
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.72rem',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#3d9089',
            transition: 'color 0.4s ease',
          }}>
            {added 
              ? (lang === 'ar' ? 'تمت الإضافة' : 'Added!') 
              : (lang === 'ar' ? 'أضف للسلة' : 'Add to Bag')
            }
          </span>
        </button>
      </div>

      <div style={{
        height: '2px',
        background: 'linear-gradient(90deg, #d4a843, #3d9089)',
        opacity: 0.6,
      }} />
    </Link>
  )
}
