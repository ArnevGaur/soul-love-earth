import { useCart } from '../../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'
import { X, Trash2, Plus, Minus } from 'lucide-react'

export default function CartDrawer() {
  const { cartItems, cartDrawerOpen, setCartDrawerOpen, updateQuantity, removeFromCart, cartTotal } = useCart()
  const navigate = useNavigate()

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={() => setCartDrawerOpen(false)}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 31, 30, 0.4)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          zIndex: 1001,
          opacity: cartDrawerOpen ? 1 : 0,
          pointerEvents: cartDrawerOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: '100%', maxWidth: '420px',
        backgroundColor: '#faf8f3',
        zIndex: 1002,
        boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
        transform: cartDrawerOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem', borderBottom: '1px solid rgba(61, 144, 137, 0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backgroundColor: 'white'
        }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#1a2e2c', margin: 0 }}>Your Cart</h2>
          <button onClick={() => setCartDrawerOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1a2e2c', padding: '4px' }}>
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#999', marginTop: '3rem', fontFamily: 'var(--font-body)' }}>
              Your cart is empty.<br /><br />
              <button 
                onClick={() => setCartDrawerOpen(false)}
                style={{
                  padding: '0.8rem 2rem', backgroundColor: 'var(--color-teal-500)', color: 'white', border: 'none',
                  fontFamily: 'var(--font-body)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer'
                }}
              >Continue Shopping</button>
            </div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {cartItems.map(item => (
                <li key={item.product_id} style={{ display: 'flex', gap: '1rem' }}>
                  <img src={item.thumb} alt={item.name} style={{ width: '80px', height: '100px', objectFit: 'cover', backgroundColor: '#f0f9f7' }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#1a2e2c', margin: '0 0 0.25rem 0' }}>{item.name}</h4>
                      <button onClick={() => removeFromCart(item.product_id)} style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-teal-600)', marginBottom: 'auto' }}>
                      {item.special ? item.special : item.price}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(61, 144, 137, 0.2)', backgroundColor: 'white' }}>
                        <button onClick={() => updateQuantity(item.product_id, item.quantity - 1)} style={{ background: 'none', border: 'none', padding: '6px', cursor: 'pointer', color: '#1a2e2c' }}><Minus size={12} /></button>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product_id, item.quantity + 1)} style={{ background: 'none', border: 'none', padding: '6px', cursor: 'pointer', color: '#1a2e2c' }}><Plus size={12} /></button>
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
          <div style={{ padding: '1.5rem', backgroundColor: 'white', borderTop: '1px solid rgba(61, 144, 137, 0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: '#1a2e2c' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: 500 }}>AED {cartTotal.toFixed(2)}</span>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#999', marginBottom: '1.5rem', textAlign: 'center' }}>
              Shipping & taxes calculated at checkout.
            </p>
            <button 
              onClick={() => {
                setCartDrawerOpen(false)
                navigate('/checkout')
              }}
              style={{
                width: '100%', padding: '1.2rem', backgroundColor: 'var(--color-teal-600)', color: 'white', border: 'none',
                fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer',
                transition: 'background-color 0.2s', display: 'flex', justifyContent: 'center', alignItems: 'center'
              }}
            >
              Secure Checkout
            </button>
          </div>
        )}
      </div>
    </>
  )
}
