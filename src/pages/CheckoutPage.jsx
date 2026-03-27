import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { ArrowLeft, CheckCircle2, Lock, ShoppingBag, CreditCard, Smartphone, Building2 } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

// ── Inline SVG payment logos (no external URLs needed) ──────────────────────
const VisaLogo = ({ h = 22, greyed }) => (
  <svg height={h} viewBox="0 0 750 471" xmlns="http://www.w3.org/2000/svg" style={{ opacity: greyed ? 0.45 : 1, filter: greyed ? 'grayscale(100%)' : 'none' }}>
    <rect width="750" height="471" rx="40" fill="#1A1F71"/>
    <text x="375" y="320" fontFamily="Arial,sans-serif" fontSize="210" fontWeight="bold" fill="white" textAnchor="middle">VISA</text>
  </svg>
)
const MastercardLogo = ({ h = 22, greyed }) => (
  <svg height={h} viewBox="0 0 131.39 86.9" xmlns="http://www.w3.org/2000/svg" style={{ opacity: greyed ? 0.45 : 1, filter: greyed ? 'grayscale(100%)' : 'none' }}>
    <circle cx="43.35" cy="43.45" r="43.35" fill="#EB001B"/>
    <circle cx="88.04" cy="43.45" r="43.35" fill="#F79E1B"/>
    <path d="M65.7 13.73a43.32 43.32 0 0 1 0 59.44 43.32 43.32 0 0 1 0-59.44z" fill="#FF5F00"/>
  </svg>
)
const AmexLogo = ({ h = 22, greyed }) => (
  <svg height={h} viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg" style={{ opacity: greyed ? 0.45 : 1, filter: greyed ? 'grayscale(100%)' : 'none' }}>
    <rect width="100" height="30" rx="4" fill="#2E77BC"/>
    <text x="50" y="21" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle" letterSpacing="1">AMEX</text>
  </svg>
)
const PayPalLogo = ({ h = 28, greyed }) => (
  <svg height={h} viewBox="0 0 124 33" xmlns="http://www.w3.org/2000/svg" style={{ opacity: greyed ? 0.45 : 1, filter: greyed ? 'grayscale(100%)' : 'none' }}>
    <text x="0" y="25" fontFamily="Arial,sans-serif" fontSize="22" fontWeight="bold" fill={greyed ? '#888' : '#003087'}>Pay</text>
    <text x="42" y="25" fontFamily="Arial,sans-serif" fontSize="22" fontWeight="bold" fill={greyed ? '#888' : '#009CDE'}>Pal</text>
  </svg>
)
const StripeLogo = ({ h = 24, greyed }) => (
  <svg height={h} viewBox="0 0 100 24" xmlns="http://www.w3.org/2000/svg" style={{ opacity: greyed ? 0.45 : 1, filter: greyed ? 'grayscale(100%)' : 'none' }}>
    <text x="0" y="18" fontFamily="Arial,sans-serif" fontSize="18" fontWeight="bold" fill={greyed ? '#888' : '#635BFF'} letterSpacing="-0.5">stripe</text>
  </svg>
)
// ─────────────────────────────────────────────────────────────────────────────

const paymentMethods = [
  {
    id: 'card',
    label: 'Credit / Debit Card',
    icon: <CreditCard size={18} strokeWidth={1.5} />,
    logos: (greyed) => <><VisaLogo greyed={greyed} /> <MastercardLogo greyed={greyed} /> <AmexLogo greyed={greyed} /></>
  },
  {
    id: 'paypal',
    label: 'PayPal',
    icon: <Smartphone size={18} strokeWidth={1.5} />,
    logos: (greyed) => <PayPalLogo greyed={greyed} />
  },
  {
    id: 'stripe',
    label: 'Stripe',
    icon: <Building2 size={18} strokeWidth={1.5} />,
    logos: (greyed) => <StripeLogo greyed={greyed} />
  },
]

function FormField({ label, id, type = 'text', placeholder, required, autoComplete, half }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
      <label htmlFor={id} style={{
        fontFamily: 'Jost, sans-serif', fontSize: '0.75rem', fontWeight: 600,
        letterSpacing: '0.1em', textTransform: 'uppercase', color: '#214e41', opacity: 0.7
      }}>
        {label}{required && <span style={{ color: '#d4a843', marginLeft: '3px' }}>*</span>}
      </label>
      <input
        id={id} type={type} placeholder={placeholder} required={required} autoComplete={autoComplete}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: '100%', padding: '0.95rem 1.25rem',
          border: '1.5px solid',
          borderColor: focused ? '#d4a843' : 'rgba(33,78,65,0.12)',
          borderRadius: '12px',
          fontFamily: 'Jost, sans-serif', fontSize: '1rem', color: '#214e41',
          outline: 'none', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          backgroundColor: '#ffffff',
          boxShadow: focused ? '0 0 0 4px rgba(212, 168, 67, 0.1)' : 'none',
          boxSizing: 'border-box',
        }}
      />
    </div>
  )
}

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState('card')

  const handleCheckout = (e) => {
    e.preventDefault()
    if (cartItems.length === 0) return
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
      clearCart()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 2000)
  }

  if (isSuccess) {
    return (
      <>
        <Navbar />
        <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#faf8f3', padding: '80px 2rem 4rem 2rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '600px' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'rgba(61,144,137,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto' }}>
              <CheckCircle2 size={52} color="var(--color-teal-500)" />
            </div>
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: '#214e41', marginBottom: '1.25rem', fontWeight: 500
            }}>
              Order Confirmed
            </h1>
            <p style={{
              fontFamily: 'Jost, sans-serif', fontSize: '1.1rem',
              color: '#555', marginBottom: '3.5rem', lineHeight: 1.8, fontWeight: 400
            }}>
              Thank you for choosing Soul Love & Earth. Your elegantly crafted pieces are being prepared. A confirmation email is on its way.
            </p>
            <Link to="/shop" style={{
              display: 'inline-block', padding: '1.1rem 3.5rem', backgroundColor: '#214e41', color: '#faf8f3',
              fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
              textDecoration: 'none', borderRadius: '40px', transition: 'all 0.4s ease',
              boxShadow: '0 8px 25px rgba(33,78,65,0.15)'
            }}
              onMouseEnter={e => { e.target.style.backgroundColor = '#d4a843'; e.target.style.boxShadow = '0 12px 30px rgba(212,168,67,0.3)'; }}
              onMouseLeave={e => { e.target.style.backgroundColor = '#214e41'; e.target.style.boxShadow = '0 8px 25px rgba(33,78,65,0.15)'; }}
            >
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const shipping = cartTotal > 0 ? 15.00 : 0
  const finalTotal = cartTotal + shipping
  const selectedMethod = paymentMethods.find(m => m.id === selectedPayment)

  return (
    <>
      <Navbar />
      <style>{`
        .checkout-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
        @media (min-width: 900px) { .checkout-grid { grid-template-columns: 1.1fr 0.9fr; gap: 4rem; } }
        .payment-option { transition: border-color 0.2s, box-shadow 0.2s; }
        .payment-option:hover { border-color: var(--color-teal-500) !important; }
      `}</style>

      <main style={{ backgroundColor: '#faf8f3', minHeight: '100vh', paddingTop: '100px', paddingBottom: '5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>

          {/* Page Header */}
          <div style={{ marginBottom: '3rem' }}>
            <Link to="/shop" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              color: '#d4a843', textDecoration: 'none', fontFamily: 'Jost, sans-serif',
              fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase'
            }}>
              <ArrowLeft size={16} strokeWidth={2.5} /> Back to Shop
            </Link>
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 500, color: '#214e41', marginTop: '1.25rem', marginBottom: 0.5
            }}>
              Secure Checkout
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Lock size={14} color="#d4a843" strokeWidth={2.5} />
              <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: '#888', fontWeight: 400 }}>256-bit SSL encrypted & secure</span>
            </div>
          </div>

          <div className="checkout-grid" style={{ alignItems: 'start' }}>

            {/* LEFT COLUMN: Forms */}
            <form onSubmit={handleCheckout}>

              {/* Step 1: Contact */}
              <div style={cardStyle}>
                <SectionHeader number="1" title="Contact Information" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <FormField id="fname" label="First Name" placeholder="Arjun" required autoComplete="given-name" />
                  <FormField id="lname" label="Last Name" placeholder="Mehta" required autoComplete="family-name" />
                </div>
                <div style={{ marginTop: '1.25rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <FormField id="email" type="email" label="Email Address" placeholder="arjun@example.com" required autoComplete="email" />
                  <FormField id="phone" type="tel" label="Phone Number" placeholder="+971 50 000 0000" required autoComplete="tel" />
                </div>
              </div>

              {/* Step 2: Shipping */}
              <div style={{ ...cardStyle, marginTop: '1.5rem' }}>
                <SectionHeader number="2" title="Shipping Address" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <FormField id="country" label="Country / Region" placeholder="United Arab Emirates" required autoComplete="country-name" />
                  <FormField id="city" label="City" placeholder="Dubai" required autoComplete="address-level2" />
                </div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <FormField id="address1" label="Street Address" placeholder="123 Conscious Living Street" required autoComplete="address-line1" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <FormField id="address2" label="Apartment / Suite (optional)" placeholder="Apt 4B" autoComplete="address-line2" />
                  <FormField id="zip" label="Postal Code" placeholder="00000" required autoComplete="postal-code" />
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div style={{ ...cardStyle, marginTop: '1.5rem' }}>
                <SectionHeader number="3" title="Payment Method" />

                {/* Method selector tabs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                  {paymentMethods.map(method => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedPayment(method.id)}
                      className="payment-option"
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '1.25rem 1.5rem',
                        border: selectedPayment === method.id ? '2px solid #d4a843' : '1.5px solid rgba(33,78,65,0.08)',
                        borderRadius: '16px',
                        backgroundColor: selectedPayment === method.id ? 'rgba(212,168,67,0.04)' : 'white',
                        cursor: 'pointer', width: '100%',
                        boxShadow: selectedPayment === method.id ? '0 4px 15px rgba(212,168,67,0.1)' : 'none',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                          width: '22px', height: '22px', borderRadius: '50%',
                          border: `2px solid ${selectedPayment === method.id ? '#d4a843' : '#ddd'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          transition: 'all 0.2s'
                        }}>
                          {selectedPayment === method.id && <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#d4a843' }} />}
                        </div>
                        <span style={{
                          fontFamily: 'Jost, sans-serif', fontSize: '1rem', color: '#214e41',
                          fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.65rem'
                        }}>
                          <span style={{ color: selectedPayment === method.id ? '#d4a843' : '#aaa', transition: 'color 0.2s' }}>{method.icon}</span>
                          {method.label}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {method.logos(selectedPayment !== method.id)}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Card detail fields (shown only when card is selected) */}
                {selectedPayment === 'card' && (
                  <div style={{
                    display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem',
                    backgroundColor: 'rgba(212,168,67,0.02)', borderRadius: '24px',
                    border: '1.5px dashed rgba(212,168,67,0.2)'
                  }}>
                    <FormField id="cardnumber" label="Card Number" placeholder="1234  5678  9012  3456" required />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                      <FormField id="expiry" label="Expiry Date" placeholder="MM / YY" required />
                      <FormField id="cvv" label="CVV / Security Code" placeholder="123" required />
                    </div>
                    <FormField id="cardholder" label="Name on Card" placeholder="As it appears on card" required autoComplete="cc-name" />
                  </div>
                )}
                {selectedPayment === 'paypal' && (
                  <div style={{
                    textAlign: 'center', padding: '2.5rem', backgroundColor: 'rgba(212,168,67,0.02)',
                    borderRadius: '24px', border: '1.5px dashed rgba(212,168,67,0.2)'
                  }}>
                    <div style={{ marginBottom: '1.25rem' }}><PayPalLogo h={48} /></div>
                    <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.92rem', color: '#666', fontWeight: 400 }}>You will be redirected to PayPal to complete your payment securely.</p>
                  </div>
                )}
                {selectedPayment === 'stripe' && (
                  <div style={{
                    textAlign: 'center', padding: '2.5rem', backgroundColor: 'rgba(212,168,67,0.02)',
                    borderRadius: '24px', border: '1.5px dashed rgba(212,168,67,0.2)'
                  }}>
                    <div style={{ marginBottom: '1.25rem' }}><StripeLogo h={40} /></div>
                    <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.92rem', color: '#666', fontWeight: 400 }}>You will be securely redirected to the Stripe payment portal to complete order.</p>
                  </div>
                )}

                {/* All payment logos row */}
                <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                  <VisaLogo greyed />
                  <MastercardLogo greyed />
                  <AmexLogo greyed />
                  <PayPalLogo greyed />
                  <StripeLogo greyed />
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={isProcessing || cartItems.length === 0}
                style={{
                  width: '100%',
                  marginTop: '1.75rem',
                  padding: '1.25rem',
                  backgroundColor: (isProcessing || cartItems.length === 0) ? '#b0c8c6' : '#214e41',
                  color: '#faf8f3',
                  fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
                  border: 'none', borderRadius: '40px',
                  cursor: (isProcessing || cartItems.length === 0) ? 'not-allowed' : 'pointer',
                  transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                  boxShadow: '0 8px 25px rgba(33,78,65,0.15)'
                }}
                onMouseEnter={e => { if (!isProcessing && cartItems.length > 0) { e.currentTarget.style.backgroundColor = '#d4a843'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(212,168,67,0.3)'; } }}
                onMouseLeave={e => { if (!isProcessing && cartItems.length > 0) { e.currentTarget.style.backgroundColor = '#214e41'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(33,78,65,0.15)'; } }}
              >
                {isProcessing
                  ? <><span style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid white', borderTopColor: 'transparent', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} /> Processing…</>
                  : <><Lock size={16} strokeWidth={1.5} /> Pay AED {finalTotal.toFixed(2)}</>
                }
              </button>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </form>

            {/* RIGHT COLUMN: Order Summary */}
            <div style={{ position: 'sticky', top: '100px' }}>
              <div style={cardStyle}>
                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem',
                  color: '#214e41', marginBottom: '2rem',
                  display: 'flex', alignItems: 'center', gap: '0.85rem', fontWeight: 500
                }}>
                  <ShoppingBag size={24} color="#d4a843" strokeWidth={1.5} />
                  Order Summary
                </h3>

                {cartItems.length === 0 ? (
                  <p style={{ fontFamily: 'Jost, sans-serif', color: '#999', fontStyle: 'italic', fontWeight: 400 }}>Your cart is empty.</p>
                ) : (
                  <>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      {cartItems.map(item => (
                        <li key={item.product_id} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                          <div style={{ position: 'relative', flexShrink: 0 }}>
                            <img src={item.thumb} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '16px', border: '1px solid rgba(33,78,65,0.06)' }} />
                            <span style={{
                              position: 'absolute', top: '-10px', right: '-10px',
                              backgroundColor: '#214e41', color: 'white',
                              width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%',
                              fontFamily: 'Jost, sans-serif', fontSize: '0.75rem', fontWeight: 600,
                              boxShadow: '0 4px 8px rgba(33,78,65,0.2)'
                            }}>{item.quantity}</span>
                          </div>
                          <div style={{ flex: 1 }}>
                            <h4 style={{
                              fontFamily: 'Jost, sans-serif', fontSize: '0.95rem',
                              color: '#214e41', fontWeight: 600, margin: '0 0 0.25rem 0'
                            }}>{item.name}</h4>
                            <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.8rem', color: '#888', fontWeight: 400 }}>Qty {item.quantity}</span>
                          </div>
                          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#214e41', fontWeight: 600 }}>
                            {item.special || item.price}
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div style={{ borderTop: '1.5px solid rgba(33,78,65,0.06)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Jost, sans-serif', fontSize: '0.95rem', color: '#666', fontWeight: 400 }}>
                        <span>Subtotal</span>
                        <span style={{ color: '#214e41', fontWeight: 600 }}>AED {cartTotal.toFixed(2)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Jost, sans-serif', fontSize: '0.95rem', color: '#666', fontWeight: 400 }}>
                        <span>Shipping</span>
                        <span style={{ color: '#214e41', fontWeight: 600 }}>AED {shipping.toFixed(2)}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '2px solid rgba(33,78,65,0.06)' }}>
                      <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '1.1rem', color: '#214e41', fontWeight: 600 }}>Total</span>
                      <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', color: '#214e41', fontWeight: 500 }}>AED {finalTotal.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Trust Badges */}
              <div style={{
                marginTop: '1.5rem', padding: '1.75rem', backgroundColor: '#ffffff',
                borderRadius: '24px', border: '1px solid rgba(33,78,65,0.06)',
                display: 'flex', flexDirection: 'column', gap: '1rem',
                boxShadow: '0 4px 15px rgba(33,78,65,0.02)'
              }}>
                {[
                  { icon: <Lock size={14} />, text: 'Secured by 256-bit SSL encryption' },
                  { icon: <CheckCircle2 size={14} />, text: 'Sustainably packaged & shipped' },
                  { icon: <ArrowLeft size={14} />, text: 'Free returns within 30 days' },
                ].map(({ icon, text }) => (
                  <div key={text} style={{
                    display: 'flex', alignItems: 'center', gap: '0.85rem',
                    fontFamily: 'Jost, sans-serif', fontSize: '0.8rem', color: '#666', fontWeight: 400
                  }}>
                    <span style={{ color: '#d4a843', display: 'flex' }}>{icon}</span><span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

const cardStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '32px',
  padding: '2.5rem',
  border: '1px solid rgba(33,78,65,0.06)',
  boxShadow: '0 8px 32px rgba(33,78,65,0.04)',
}

function SectionHeader({ number, title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
      <div style={{
        width: '32px', height: '32px', borderRadius: '50%',
        backgroundColor: '#d4a843', color: 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', fontWeight: 700, flexShrink: 0,
        boxShadow: '0 4px 10px rgba(212,168,67,0.3)'
      }}>{number}</div>
      <h3 style={{
        fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem',
        color: '#214e41', fontWeight: 500, margin: 0
      }}>{title}</h3>
    </div>
  )
}
