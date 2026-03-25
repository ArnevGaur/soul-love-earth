import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const categories = [
  {
    title: 'Earthen Cookware',
    desc: 'Traditional clay pots & pans for healthy, flavourful cooking.',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80',
    href: '/shop/earthen-cookware',
  },
  {
    title: 'Copperware',
    desc: 'Handcrafted copper vessels for wellness and modern aesthetics.',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80',
    href: '/shop/copperware',
  },
  {
    title: 'Home Décor',
    desc: 'Sustainable décor that brings warmth and intention to every space.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    href: '/shop/home-decor',
  },
  {
    title: 'Hotel Amenities',
    desc: 'Biodegradable hospitality supplies for eco-conscious properties.',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    href: '/shop/hotel-amenities',
  },
  {
    title: 'Handmade Footwear',
    desc: 'Artisan-crafted footwear rooted in comfort and natural materials.',
    image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&q=80',
    href: '/shop/footwear',
  },
  {
    title: 'Wellness',
    desc: 'Natural self-care essentials for a mindful daily routine.',
    image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=800&q=80',
    href: '/shop/wellness',
  },
]

export default function Categories() {
  return (
    <section style={{
      backgroundColor: '#faf8f3',
      padding: '6rem 2rem',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '3rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
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
              marginBottom: '0.75rem',
            }}>
              <span style={{ width: '32px', height: '1px', backgroundColor: '#d4a843', display: 'inline-block' }} />
              Collections
            </span>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400,
              color: '#2c2c2c',
              lineHeight: 1.1,
            }}>
              Shop by Category
            </h2>
          </div>

          <Link
            to="/shop"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#3d9089',
              textDecoration: 'none',
              borderBottom: '1px solid #3d9089',
              paddingBottom: '2px',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#d4a843'
              e.currentTarget.style.borderColor = '#d4a843'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#3d9089'
              e.currentTarget.style.borderColor = '#3d9089'
            }}
          >
            View All <ArrowRight size={13} strokeWidth={2} />
          </Link>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {categories.map((cat) => (
            <Link
              key={cat.title}
              to={cat.href}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  aspectRatio: '4/5',
                  backgroundColor: '#e0ebe9',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.querySelector('.cat-img').style.transform = 'scale(1.06)'
                  e.currentTarget.querySelector('.cat-overlay').style.opacity = '1'
                  e.currentTarget.querySelector('.cat-arrow').style.transform = 'translateX(4px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.querySelector('.cat-img').style.transform = 'scale(1)'
                  e.currentTarget.querySelector('.cat-overlay').style.opacity = '0.5'
                  e.currentTarget.querySelector('.cat-arrow').style.transform = 'translateX(0)'
                }}
              >
                {/* Image */}
                <img
                  className="cat-img"
                  src={cat.image}
                  alt={cat.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />

                {/* Gradient overlay */}
                <div
                  className="cat-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(20,42,40,0.85) 0%, rgba(20,42,40,0.2) 50%, transparent 100%)',
                    opacity: 0.5,
                    transition: 'opacity 0.4s ease',
                  }}
                />

                {/* Text */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.75rem',
                }}>
                  <h3 style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    color: '#faf8f3',
                    marginBottom: '0.35rem',
                    letterSpacing: '0.01em',
                  }}>
                    {cat.title}
                  </h3>
                  <p style={{
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 300,
                    color: 'rgba(250,248,243,0.75)',
                    lineHeight: 1.6,
                    marginBottom: '0.75rem',
                  }}>
                    {cat.desc}
                  </p>
                  <span
                    className="cat-arrow"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '0.65rem',
                      fontWeight: 500,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#d4a843',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    Explore <ArrowRight size={11} strokeWidth={2} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}