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
  const addToCartText = t?.product?.addToCart?.replace('{price}', product.special ? product.special : product.price) || 'Add to Cart'

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
          e.currentTarget.style.boxShadow = '0 12px 36px rgba(33,78,65,0.08)'
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.querySelector('.pc-img').style.transform = 'scale(1.05)'
          e.currentTarget.querySelector('.pc-btn').style.opacity = '1'
          e.currentTarget.querySelector('.pc-btn').style.transform = 'translateY(0)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(33,78,65,0.04)'
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.querySelector('.pc-img').style.transform = 'scale(1)'
          e.currentTarget.querySelector('.pc-btn').style.opacity = '0'
          e.currentTarget.querySelector('.pc-btn').style.transform = 'translateY(8px)'
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

          {/* Add to cart overlay */}
          <button
            className="pc-btn"
            onClick={e => { 
              e.preventDefault()
              e.stopPropagation()
              addToCart(product)
            }}
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '0.75rem',
              backgroundColor: '#2c635a', color: 'white',
              fontFamily: 'Jost, sans-serif', fontSize: '0.72rem',
              fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              opacity: 0, transform: 'translateY(8px)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#d4a843'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2c635a'}
          >
            <ShoppingBag size={13} strokeWidth={1.5} />
            Add to Cart
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
        <div style={{ padding: '1rem' }}>
          <h3 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.1rem', fontWeight: 500,
            color: '#2c2c2c', marginBottom: '0.35rem',
            lineHeight: 1.3,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {product.name}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {product.special ? (
              <>
                <span style={{
                  fontFamily: 'Jost, sans-serif', fontSize: '0.9rem',
                  fontWeight: 500, color: '#2c635a',
                }}>{product.special}</span>
                <span style={{
                  fontFamily: 'Jost, sans-serif', fontSize: '0.78rem',
                  fontWeight: 300, color: '#999', textDecoration: 'line-through',
                }}>{product.price}</span>
              </>
            ) : (
              <span style={{
                fontFamily: 'Jost, sans-serif', fontSize: '0.9rem',
                fontWeight: 600, color: '#2c635a',
              }}>{product.price}</span>
            )}
          </div>
        </div>

        {/* Signature gradient line */}
        <div style={{
          height: '4px',
          background: 'linear-gradient(90deg, #d4a843, #3d9089)',
          opacity: 0.6,
        }} />
      </div>
    </Link>
  )
}