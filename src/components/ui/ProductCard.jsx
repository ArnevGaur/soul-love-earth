import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useLanguage } from '../../context/LanguageContext'

const BASE_URL = import.meta.env.VITE_OPENCART_URL

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { t } = useLanguage()
  const image = product.thumb
    ? (product.thumb.startsWith('http') ? product.thumb : `${BASE_URL}/${product.thumb}`)
    : 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80'

  // Format "Add to Bag — <price>" based on language context
  const addToCartText = t.product.addToCart.replace('{price}', product.special ? product.special : product.price)

  return (
    <Link to={`/product/${product.product_id}`} style={{ textDecoration: 'none' }}>
      <div
        style={{ 
          backgroundColor: 'white', 
          cursor: 'pointer',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(33,78,65,0.04)',
          border: '1px solid rgba(33,78,65,0.06)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = '0 15px 45px rgba(33,78,65,0.1)'
          e.currentTarget.style.transform = 'translateY(-6px)'
          e.currentTarget.querySelector('.pc-img').style.transform = 'scale(1.08)'
          const btn = e.currentTarget.querySelector('.pc-btn')
          if (btn) {
            btn.style.opacity = '1'
            btn.style.transform = 'translate(-50%, -20px)'
          }
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(33,78,65,0.05)'
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.querySelector('.pc-img').style.transform = 'scale(1)'
          const btn = e.currentTarget.querySelector('.pc-btn')
          if (btn) {
            btn.style.opacity = '0'
            btn.style.transform = 'translate(-50%, 0)'
          }
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1/1', backgroundColor: '#f0f9f7' }}>
          <img
            className="pc-img"
            src={image}
            alt={product.name}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 0.5s ease',
              display: 'block',
            }}
            onError={e => {
              e.target.src = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80'
            }}
          />

          {/* Add to cart overlay — Pill Shape floating */}
          <button
            className="pc-btn"
            onClick={e => { 
              e.preventDefault()
              e.stopPropagation()
              addToCart(product)
            }}
            style={{
              position: 'absolute', bottom: '1.5rem', left: '50%',
              transform: 'translate(-50%, 0)',
              padding: '0.85rem 1.75rem',
              backgroundColor: '#214e41', color: '#faf8f3',
              fontFamily: 'Jost, sans-serif', fontSize: '0.75rem',
              fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
              border: 'none', borderRadius: '40px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem',
              opacity: 0,
              transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 8px 25px rgba(33,78,65,0.2)',
              whiteSpace: 'nowrap',
              zIndex: 10
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#d4a843'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(212,168,67,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#214e41'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(33,78,65,0.2)'; }}
          >
            <ShoppingBag size={14} strokeWidth={2} />
            {t.product.addToCartBtn || 'Add to Cart'}
          </button>

          {/* Sale badge */}
          {product.special && (
            <span style={{
              position: 'absolute', top: '0.75rem', left: '0.75rem',
              backgroundColor: '#d4a843', color: 'white',
              fontFamily: 'Jost, sans-serif', fontSize: '0.6rem',
              fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
              padding: '0.25rem 0.6rem',
            }}>Sale</span>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '1.5rem', textAlign: 'center' }}>
          <h3 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.25rem', fontWeight: 500,
            color: '#214e41', marginBottom: '0.5rem',
            lineHeight: 1.2,
            overflow: 'hidden', textOverflow: 'ellipsis',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'
          }}>
            {product.name}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            {product.special ? (
              <>
                <span style={{
                  fontFamily: 'Jost, sans-serif', fontSize: '1rem',
                  fontWeight: 600, color: '#d4a843',
                }}>{product.special}</span>
                <span style={{
                  fontFamily: 'Jost, sans-serif', fontSize: '0.85rem',
                  fontWeight: 400, color: '#999', textDecoration: 'line-through',
                }}>{product.price}</span>
              </>
            ) : (
              <span style={{
                fontFamily: 'Jost, sans-serif', fontSize: '1rem',
                fontWeight: 600, color: '#214e41',
              }}>{product.price}</span>
            )}
          </div>
        </div>

        {/* Signature gold line at bottom */}
        <div style={{
          height: '3px',
          background: '#d4a843',
          width: '100%',
          opacity: 0.8,
        }} />
      </div>
    </Link>
  )
}