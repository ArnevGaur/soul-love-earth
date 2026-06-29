import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useLanguage } from '../../context/LanguageContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { t } = useLanguage()
  const image = product.thumb
    ? product.thumb
    : 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80'

  const images = product.images?.length > 0 ? product.images : [image]
  const [currentImageIdx, setCurrentImageIdx] = useState(0)
  const currentImage = images[currentImageIdx]
  
  const isWishlisted = isInWishlist(product.product_id)

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
          const img = e.currentTarget.querySelector('.pc-img')
          if (img) img.style.transform = 'scale(1.05)'
          const controls = e.currentTarget.querySelector('.pc-carousel-controls')
          if (controls) controls.style.opacity = '1'
          const btnAdd = e.currentTarget.querySelector('.pc-btn-add')
          if (btnAdd) {
            btnAdd.style.width = '115px'
            btnAdd.style.opacity = '1'
          }
          const btnText = e.currentTarget.querySelector('.pc-btn-add-text')
          if (btnText) {
            btnText.style.opacity = '1'
            btnText.style.transform = 'translateX(0)'
          }
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(33,78,65,0.04)'
          e.currentTarget.style.transform = 'translateY(0)'
          const img = e.currentTarget.querySelector('.pc-img')
          if (img) img.style.transform = 'scale(1)'
          const controls = e.currentTarget.querySelector('.pc-carousel-controls')
          if (controls) controls.style.opacity = '0'
          const btnAdd = e.currentTarget.querySelector('.pc-btn-add')
          if (btnAdd) {
            btnAdd.style.width = '0px'
            btnAdd.style.opacity = '0'
          }
          const btnText = e.currentTarget.querySelector('.pc-btn-add-text')
          if (btnText) {
            btnText.style.opacity = '0'
            btnText.style.transform = 'translateX(-5px)'
          }
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden', flex: 1, backgroundColor: '#f0f9f7', aspectRatio: '1/1', transition: 'all 0.3s ease' }}>
          <img
            className="pc-img"
            src={currentImage}
            alt={product.name}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'block',
            }}
            onError={e => {
              e.target.src = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80'
            }}
          />

          {/* Wishlist Heart */}
          <button
            className="pc-btn-wishlist"
            onClick={e => { 
              e.preventDefault()
              e.stopPropagation()
              toggleWishlist(product)
            }}
            style={{
              position: 'absolute', top: '0.75rem', right: '0.75rem',
              width: '32px', height: '32px', borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.95)', 
              color: isWishlisted ? '#d4a843' : '#2c635a',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'all 0.2s ease',
              zIndex: 10
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.backgroundColor = '#ffffff' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.95)' }}
          >
            <Heart size={16} strokeWidth={isWishlisted ? 0 : 2} fill={isWishlisted ? '#d4a843' : 'none'} />
          </button>

          {/* Carousel Controls */}
          {images.length > 1 && (
            <div 
              className="pc-carousel-controls"
              style={{
                position: 'absolute', top: '50%', left: 0, right: 0,
                transform: 'translateY(-50%)',
                display: 'flex', justifyContent: 'space-between',
                padding: '0 0.5rem',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                zIndex: 10
              }}
            >
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setCurrentImageIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1))
                }}
                style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.85)',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#214e41', boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'background-color 0.2s, transform 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.transform = 'scale(1.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.85)'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <ChevronLeft size={16} strokeWidth={2.5} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setCurrentImageIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1))
                }}
                style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.85)',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#214e41', boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'background-color 0.2s, transform 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.transform = 'scale(1.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.85)'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          )}

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
        <div className="pc-info" style={{ 
          padding: '1rem', 
          backgroundColor: 'white', 
          position: 'relative',
          zIndex: 2,
        }}>
          <h3 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.1rem', fontWeight: 500,
            color: '#2c2c2c', marginBottom: '0.35rem',
            lineHeight: 1.3,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {product.name}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
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

            {/* Add to cart expanding button */}
            <button
              className="pc-btn-add"
              onClick={e => { 
                e.preventDefault()
                e.stopPropagation()
                addToCart(product)
              }}
              style={{
                width: '0px', height: '32px', borderRadius: '16px',
                backgroundColor: '#3d9089', color: 'white',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
                overflow: 'hidden',
                opacity: 0,
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#d4a843'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#3d9089'}
            >
              <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ShoppingBag size={14} strokeWidth={2} />
              </div>
              <span
                className="pc-btn-add-text"
                style={{
                  fontFamily: 'Jost, sans-serif', fontSize: '0.65rem',
                  fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  paddingRight: '14px',
                  opacity: 0,
                  transform: 'translateX(-5px)',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                Add to Cart
              </span>
            </button>
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