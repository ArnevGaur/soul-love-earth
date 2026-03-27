import { useCart } from '../../context/CartContext'
import { useLanguage } from '../../context/LanguageContext'
import { Link, useNavigate } from 'react-router-dom'
import { X, Trash2, Plus, Minus } from 'lucide-react'

export default function CartDrawer() {
  const { cartItems, cartDrawerOpen, setCartDrawerOpen, updateQuantity, removeFromCart, cartTotal } = useCart()
  const { t, lang } = useLanguage()
  const c = t?.cart || {}
  const navigate = useNavigate()
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
      <div style={{
        position: 'fixed', top: 0, [isRtl ? 'left' : 'right']: 0, bottom: 0,
        width: '100%', maxWidth: '400px',
        backgroundColor: '#faf8f3',
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
                onClick={() => setCartDrawerOpen(false)}
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
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               {cartItems.map(item => {
                if (!item) return null
                return (
                <li key={item.product_id} style={{ display: 'flex', gap: '1.25rem' }}>
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
                      <button 
                        onClick={() => removeFromCart(item.product_id)} 
                        style={{ background: 'none', border: 'none', color: '#cc3300', cursor: 'pointer', padding: '4px', opacity: 0.6 }}
                        onMouseEnter={e => e.currentTarget.style.opacity = 1}
                        onMouseLeave={e => e.currentTarget.style.opacity = 0.6}
                      >
                        <Trash2 size={14} />
                      </button>
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
                </li>
              )
            })}
            </ul>
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
              <span style={{ fontWeight: 700, color: '#2c635a' }}>AED {cartTotal.toFixed(2)}</span>
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

