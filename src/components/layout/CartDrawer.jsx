import { useCart } from '../../context/CartContext'
import { useLanguage } from '../../context/LanguageContext'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { X, Trash2, Plus, Minus, ShoppingBag, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CartDrawer() {
  const { cartItems, cartDrawerOpen, setCartDrawerOpen, updateQuantity, removeFromCart, cartTotal, wishlistItems, toggleWishlist, addToCart } = useCart()
  const { t, lang } = useLanguage()
  const c = t?.cart || {}
  const navigate = useNavigate()
  const location = useLocation()
  const isRtl = lang === 'ar'

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={() => setCartDrawerOpen(false)}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(21, 46, 43, 0.4)', // Soul Love Dark Green tint
          backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
          zIndex: 1001,
          opacity: cartDrawerOpen ? 1 : 0,
          pointerEvents: cartDrawerOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Drawer — slides in from right (LTR) or left (RTL) */}
      <div className="cart-drawer" style={{
        position: 'fixed', top: 0, [isRtl ? 'left' : 'right']: 0, bottom: 0,
        width: '100%', maxWidth: '400px',
        backgroundColor: 'rgba(250, 248, 243, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        zIndex: 1002,
        boxShadow: isRtl ? '20px 0 80px rgba(33,78,65,0.15)' : '-20px 0 80px rgba(33,78,65,0.15)',
        transform: cartDrawerOpen ? 'translateX(0)' : isRtl ? 'translateX(-100%)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex', flexDirection: 'column',
        direction: t.dir,
        borderTopLeftRadius: !isRtl ? '32px' : 0,
        borderBottomLeftRadius: !isRtl ? '32px' : 0,
        borderTopRightRadius: isRtl ? '32px' : 0,
        borderBottomRightRadius: isRtl ? '32px' : 0,
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem 2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid rgba(33,78,65,0.08)',
        }}>
          <h2 style={{ 
            fontFamily: 'Cormorant Garamond, serif', 
            fontSize: '1.4rem', 
            fontWeight: 600,
            color: '#214e41', 
            margin: 0,
            paddingBottom: '0.2rem',
            borderBottom: '2px solid #d4a843'
          }}>
            {c.title}
          </h2>
          <button 
            onClick={() => setCartDrawerOpen(false)} 
            style={{ 
              background: 'rgba(33,78,65,0.05)', 
              border: 'none', 
              cursor: 'pointer', 
              color: '#214e41', 
              width: '32px', height: '32px',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(33,78,65,0.1)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(33,78,65,0.05)'}
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#999', marginTop: '4rem', fontFamily: 'Jost, sans-serif' }}>
              <div style={{ marginBottom: '1.5rem', opacity: 0.3 }}>
                <ShoppingBag size={48} style={{ margin: '0 auto' }} />
              </div>
              <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>{c.empty}</p>
              <button 
                onClick={() => {
                  setCartDrawerOpen(false)
                  navigate('/shop')
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                style={{
                  padding: '0.8rem 2rem', backgroundColor: '#214e41', color: 'white', border: 'none',
                  fontFamily: 'Jost, sans-serif', fontSize: '0.75rem', fontWeight: 600,
                  letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer',
                  borderRadius: '30px', transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#d4a843'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#214e41'}
              >{c.continueShopping}</button>
            </div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column' }}>
              <AnimatePresence initial={false}>
               {cartItems.map(item => {
                if (!item) return null
                return (
                <motion.li 
                  layout
                  key={item.product_id} 
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: '1.5rem' }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: 'hidden' }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{ display: 'flex', gap: '1.25rem' }}
                >
                  <div style={{ flexShrink: 0 }}>
                    <img 
                      src={item.thumb} 
                      alt={item.name} 
                      style={{ 
                        width: '80px', height: '100px', objectFit: 'cover', 
                        backgroundColor: '#f5f5f5', borderRadius: '14px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                      }} 
                    />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ 
                        fontFamily: 'Jost, sans-serif', fontSize: '0.95rem', fontWeight: 600,
                        color: '#214e41', margin: '0 0 0.4rem 0' 
                      }}>{item.name}</h4>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button 
                          title="Move to Wishlist"
                          onClick={() => {
                            const isLast = cartItems.length === 1
                            removeFromCart(item.product_id)
                            if (!wishlistItems?.some(w => w.product_id === item.product_id)) {
                              toggleWishlist(item)
                            }
                            if (isLast && location.pathname === '/checkout') navigate(-1)
                          }} 
                          style={{ background: 'none', border: 'none', color: '#2c635a', cursor: 'pointer', padding: '4px', opacity: 0.6, transition: 'all 0.2s ease' }}
                          onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.transform = 'scale(1.1)'; }}
                          onMouseLeave={e => { e.currentTarget.style.opacity = 0.6; e.currentTarget.style.transform = 'scale(1)'; }}
                        >
                          <Heart size={14} />
                        </button>
                        <button 
                          title="Remove from Cart"
                          onClick={() => {
                            const isLast = cartItems.length === 1
                            removeFromCart(item.product_id)
                            if (isLast && location.pathname === '/checkout') navigate(-1)
                          }} 
                          style={{ background: 'none', border: 'none', color: '#cc3300', cursor: 'pointer', padding: '4px', opacity: 0.6, transition: 'all 0.2s ease' }}
                          onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.transform = 'scale(1.1)'; }}
                          onMouseLeave={e => { e.currentTarget.style.opacity = 0.6; e.currentTarget.style.transform = 'scale(1)'; }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div style={{ 
                      fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', fontWeight: 600,
                      color: '#2c635a', marginBottom: '0.75rem' 
                    }}>
                      {item.special ? item.special : item.price}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ 
                        display: 'flex', alignItems: 'center', 
                        backgroundColor: 'white', border: '1px solid rgba(33,78,65,0.1)',
                        borderRadius: '20px', padding: '2px 4px'
                      }}>
                        <button 
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)} 
                          style={{ 
                            background: 'none', border: 'none', padding: '6px', cursor: 'pointer', 
                            color: '#214e41', display: 'flex', alignItems: 'center'
                          }}
                        ><Minus size={12} /></button>
                        <span style={{ 
                          fontFamily: 'Jost, sans-serif', fontSize: '0.8rem', fontWeight: 600,
                          width: '24px', textAlign: 'center', color: '#214e41' 
                        }}>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)} 
                          style={{ 
                            background: 'none', border: 'none', padding: '6px', cursor: 'pointer', 
                            color: '#214e41', display: 'flex', alignItems: 'center'
                          }}
                        ><Plus size={12} /></button>
                      </div>
                    </div>
                  </div>
                </motion.li>
              )
            })}
              </AnimatePresence>
            </ul>
          )}

          {/* Wishlist Section */}
          {wishlistItems && wishlistItems.length > 0 && (
            <div style={{ marginTop: '3rem' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                borderBottom: '1px solid rgba(33,78,65,0.08)',
                paddingBottom: '0.75rem', marginBottom: '1.5rem'
              }}>
                <Heart size={16} fill="#d4a843" stroke="#d4a843" />
                <h3 style={{ 
                  fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', 
                  fontWeight: 600, color: '#214e41', margin: 0 
                }}>
                  Your Wishlist
                </h3>
              </div>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column' }}>
                <AnimatePresence initial={false}>
                {wishlistItems.map(item => {
                  if (!item) return null
                  return (
                    <motion.li 
                      layout
                      key={item.product_id} 
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 0.9, height: 'auto', marginBottom: '1.5rem' }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: 'hidden' }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ display: 'flex', gap: '1.25rem' }}
                    >
                      <div style={{ flexShrink: 0, position: 'relative' }}>
                        <img 
                          src={item.thumb} 
                          alt={item.name} 
                          style={{ 
                            width: '60px', height: '75px', objectFit: 'cover', 
                            backgroundColor: '#f5f5f5', borderRadius: '10px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                          }} 
                        />
                        <button 
                          onClick={() => toggleWishlist(item)}
                          style={{
                            position: 'absolute', top: '-6px', right: '-6px',
                            background: 'white', border: '1px solid #eee', color: '#cc3300',
                            width: '20px', height: '20px', borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                          }}
                        >
                          <X size={10} strokeWidth={3} />
                        </button>
                      </div>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h4 style={{ 
                          fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', fontWeight: 500,
                          color: '#214e41', margin: '0 0 0.3rem 0',
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px'
                        }}>{item.name}</h4>
                        <div style={{ 
                          fontFamily: 'Jost, sans-serif', fontSize: '0.8rem', fontWeight: 600,
                          color: '#2c635a', marginBottom: '0.5rem' 
                        }}>
                          {item.special ? item.special : item.price}
                        </div>
                        <button
                          onClick={() => {
                            addToCart(item)
                            toggleWishlist(item) // remove from wishlist when adding to cart
                          }}
                          style={{
                            padding: '0.4rem 0.8rem', backgroundColor: 'transparent',
                            color: '#2c635a', border: '1px solid #2c635a',
                            fontFamily: 'Jost, sans-serif', fontSize: '0.7rem', fontWeight: 600,
                            letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer',
                            borderRadius: '20px', transition: 'all 0.2s ease', alignSelf: 'flex-start'
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = '#2c635a'
                            e.currentTarget.style.color = 'white'
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = 'transparent'
                            e.currentTarget.style.color = '#2c635a'
                          }}
                        >
                          Move to Cart
                        </button>
                      </div>
                    </motion.li>
                  )
                })}
                </AnimatePresence>
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{ 
            padding: '2rem', 
            backgroundColor: 'white', 
            borderTop: '1px solid rgba(33,78,65,0.08)',
            boxShadow: '0 -10px 40px rgba(33,78,65,0.05)'
          }}>
            <div style={{ 
              display: 'flex', justifyContent: 'space-between', 
              marginBottom: '1.25rem', fontFamily: 'Jost, sans-serif', 
              fontSize: '1rem', color: '#214e41' 
            }}>
              <span style={{ fontWeight: 400 }}>{c.subtotal}</span>
              <span style={{ fontWeight: 700, color: '#2c635a' }}>AED {(cartTotal || 0).toFixed(2)}</span>
            </div>
            <p style={{ 
              fontFamily: 'Jost, sans-serif', fontSize: '0.72rem', 
              color: '#999', marginBottom: '1.5rem', textAlign: 'center',
              letterSpacing: '0.02em'
            }}>
              {c.shipping}
            </p>
            <button 
              onClick={() => { setCartDrawerOpen(false); navigate('/checkout') }}
              style={{
                width: '100%', padding: '1.1rem', backgroundColor: '#2c635a', color: 'white', border: 'none',
                fontFamily: 'Jost, sans-serif', fontSize: '0.8rem', fontWeight: 600, 
                letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer',
                borderRadius: '40px', transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(44, 99, 90, 0.15)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#d4a843'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(212,168,67,0.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#2c635a'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(44, 99, 90, 0.15)'
              }}
            >
              {c.checkout}
            </button>
          </div>
        )}
      </div>
    </>
  )
}

