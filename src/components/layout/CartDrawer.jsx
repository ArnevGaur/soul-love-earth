import { useCart } from '../../context/CartContext'
import { useLanguage } from '../../context/LanguageContext'
import { Link, useNavigate } from 'react-router-dom'
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'

export default function CartDrawer() {
  const { cartItems, cartDrawerOpen, setCartDrawerOpen, updateQuantity, removeFromCart, cartTotal } = useCart()
  const { t, lang } = useLanguage()
  const c = t.cart
  const navigate = useNavigate()
  const isRtl = lang === 'ar'

  return (
    <>
      {/* Backdrop — frosted glass like FilterPane */}
      <div
        onClick={() => setCartDrawerOpen(false)}
        style={{
          position: 'fixed', inset: 0,
          backgroundColor: 'rgba(26,47,44,0.3)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          zIndex: 1001,
          opacity: cartDrawerOpen ? 1 : 0,
          pointerEvents: cartDrawerOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, [isRtl ? 'left' : 'right']: 0, bottom: 0,
        width: '100%', maxWidth: '400px',
        backgroundColor: '#faf8f3',
        zIndex: 1002,
        transform: cartDrawerOpen ? 'translateX(0)' : isRtl ? 'translateX(-100%)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex', flexDirection: 'column',
        boxShadow: '-20px 0 80px rgba(33,78,65,0.15)',
        borderTopLeftRadius: '32px',
        borderBottomLeftRadius: '32px',
        overflow: 'hidden',
        direction: t.dir,
      }}>

        {/* Header */}
        <div style={{
          padding: '1.75rem 1.75rem 1.25rem',
          background: '#214e41',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShoppingBag size={18} strokeWidth={1.5} color="#d4a843" />
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.4rem', fontWeight: 500,
              color: '#faf8f3', margin: 0,
              letterSpacing: '0.02em'
            }}>{c.title}</h2>
            {cartItems.length > 0 && (
              <span style={{
                fontFamily: 'Jost, sans-serif', fontSize: '0.65rem', fontWeight: 600,
                letterSpacing: '0.1em',
                backgroundColor: '#d4a843', color: '#214e41',
                borderRadius: '20px', padding: '0.15rem 0.6rem',
              }}>{cartItems.length}</span>
            )}
          </div>
          <button
            onClick={() => setCartDrawerOpen(false)}
            style={{
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '50%', width: '34px', height: '34px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#faf8f3', transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(212,168,67,0.25)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
          >
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Gradient separator */}
        <div style={{ height: '3px', background: 'linear-gradient(90deg, #d4a843, #3d9089)', opacity: 0.7 }} />

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
              <ShoppingBag size={48} strokeWidth={1} color="rgba(33,78,65,0.2)" style={{ marginBottom: '1rem' }} />
              <p style={{
                fontFamily: 'Jost, sans-serif', fontSize: '0.9rem',
                color: 'rgba(33,78,65,0.5)', marginBottom: '2rem'
              }}>{c.empty}</p>
              <button
                onClick={() => setCartDrawerOpen(false)}
                style={{
                  padding: '0.75rem 2rem',
                  backgroundColor: '#214e41', color: '#faf8f3',
                  border: 'none', borderRadius: '30px',
                  fontFamily: 'Jost, sans-serif', fontSize: '0.72rem',
                  fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#d4a843'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#214e41'}
              >{c.continueShopping}</button>
            </div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cartItems.map(item => (
                <li key={item.product_id} style={{
                  display: 'flex', gap: '1rem',
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '0.85rem',
                  border: '1px solid rgba(33,78,65,0.07)',
                  boxShadow: '0 2px 10px rgba(33,78,65,0.04)'
                }}>
                  <img
                    src={item.thumb} alt={item.name}
                    style={{ width: '72px', height: '88px', objectFit: 'cover', borderRadius: '10px', backgroundColor: '#f0f9f7', flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <h4 style={{
                        fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', fontWeight: 500,
                        color: '#214e41', margin: '0 0 0.25rem 0',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                      }}>{item.name}</h4>
                      <button
                        onClick={() => removeFromCart(item.product_id)}
                        style={{
                          background: 'none', border: 'none', color: 'rgba(33,78,65,0.3)',
                          cursor: 'pointer', flexShrink: 0, transition: 'color 0.2s', padding: '2px'
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#c0392b'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(33,78,65,0.3)'}
                      >
                        <Trash2 size={14} strokeWidth={1.5} />
                      </button>
                    </div>
                    <span style={{
                      fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', fontWeight: 500,
                      color: item.special ? '#3d9089' : '#214e41', marginBottom: 'auto'
                    }}>
                      {item.special ? item.special : item.price}
                    </span>
                    {/* Quantity stepper */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.6rem' }}>
                      <div style={{
                        display: 'flex', alignItems: 'center',
                        border: '1px solid rgba(33,78,65,0.15)', borderRadius: '20px',
                        overflow: 'hidden', backgroundColor: '#faf8f3'
                      }}>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          style={{
                            background: 'none', border: 'none', padding: '5px 10px',
                            cursor: 'pointer', color: '#214e41', transition: 'background 0.2s'
                          }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(33,78,65,0.08)'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        ><Minus size={11} strokeWidth={2} /></button>
                        <span style={{
                          fontFamily: 'Jost, sans-serif', fontSize: '0.8rem', fontWeight: 600,
                          color: '#214e41', width: '22px', textAlign: 'center'
                        }}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          style={{
                            background: 'none', border: 'none', padding: '5px 10px',
                            cursor: 'pointer', color: '#214e41', transition: 'background 0.2s'
                          }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(33,78,65,0.08)'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        ><Plus size={11} strokeWidth={2} /></button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '1.5rem 1.75rem',
            backgroundColor: '#ffffff',
            borderTop: '1px solid rgba(33,78,65,0.08)',
          }}>
            {/* Gradient line */}
            <div style={{ height: '2px', background: 'linear-gradient(90deg, #d4a843, #3d9089)', opacity: 0.5, marginBottom: '1.25rem', borderRadius: '2px' }} />

            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              marginBottom: '0.5rem'
            }}>
              <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(33,78,65,0.5)' }}>{c.subtotal}</span>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: 500, color: '#214e41' }}>AED {cartTotal.toFixed(2)}</span>
            </div>
            <p style={{
              fontFamily: 'Jost, sans-serif', fontSize: '0.72rem',
              color: 'rgba(33,78,65,0.4)', marginBottom: '1.25rem', textAlign: 'center'
            }}>{c.shipping}</p>

            <button
              onClick={() => { setCartDrawerOpen(false); navigate('/checkout') }}
              style={{
                width: '100%', padding: '1rem',
                backgroundColor: '#214e41', color: '#faf8f3',
                border: 'none', borderRadius: '30px',
                fontFamily: 'Jost, sans-serif', fontSize: '0.75rem',
                fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'all 0.3s ease',
                boxShadow: '0 4px 16px rgba(33,78,65,0.2)'
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#d4a843'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(212,168,67,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#214e41'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(33,78,65,0.2)' }}
            >
              {c.checkout}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
