import { Link, useLocation } from 'react-router-dom'
import { Check, Package, Truck, CalendarDays } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const BRAND_TEAL = '#3d9089'
const BRAND_GOLD = '#d4a843'
const MID_DARK_GREEN = '#275e5a'

function formatDeliveryRange(placedAt) {
  const start = new Date(placedAt)
  const end = new Date(placedAt)
  start.setDate(start.getDate() + 3)
  end.setDate(end.getDate() + 6)

  const options = { weekday: 'short', month: 'short', day: 'numeric' }
  const startText = start.toLocaleDateString('en-US', options)
  const endText = end.toLocaleDateString('en-US', options)
  return `${startText} - ${endText}`
}

function formatPlacedDate(placedAt) {
  return new Date(placedAt).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function OrderPlacedPage() {
  const { state } = useLocation()
  const customerName = state?.customerName || 'Valued Customer'
  const total = Number(state?.total || 0)
  const itemCount = Number(state?.itemCount || 0)
  const placedAt = Number(state?.placedAt || Date.now())
  const orderRef = `SLE-${String(placedAt).slice(-6)}`
  const arrivalWindow = formatDeliveryRange(placedAt)

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '4rem', background: 'linear-gradient(180deg, #faf8f3 0%, #f2ede4 100%)' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto', padding: '0 1.5rem' }}>
          <style>{`
            .order-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
            .order-card { background-color: rgba(255,255,255,0.94); border: 1px solid rgba(44,44,44,0.08); border-radius: 18px; box-shadow: 0 16px 40px rgba(0,0,0,0.05); }
            .tick-wrap { width: 108px; height: 108px; border-radius: 999px; margin: 0 auto 1.25rem; display: flex; align-items: center; justify-content: center; background: rgba(61,144,137,0.12); border: 2px solid rgba(61,144,137,0.22); animation: popIn 0.45s ease-out forwards; box-shadow: 0 10px 26px rgba(61,144,137,0.15); }
            .tick-icon { color: #3d9089; transform: scale(0.3); opacity: 0; animation: tickDraw 0.45s ease-out 0.25s forwards; }
            .step-line { width: 2px; height: 20px; background: rgba(61, 144, 137, 0.24); margin-left: 8px; }
            .order-card-soft { background: linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(252,248,240,0.86) 100%); border: 1px solid rgba(212,168,67,0.22); }
            .order-divider { height: 1px; background: linear-gradient(90deg, rgba(212,168,67,0) 0%, rgba(212,168,67,0.55) 50%, rgba(212,168,67,0) 100%); margin: 1.2rem 0; }
            @keyframes popIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            @keyframes tickDraw { from { transform: scale(0.3); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            @media (min-width: 900px) { .order-grid { grid-template-columns: 1.1fr 0.9fr; } }
          `}</style>

          <section className="order-card order-card-soft" style={{ padding: '2.3rem 1.6rem', textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ marginBottom: '0.9rem' }}>
              <span className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem' }}>
                <span style={{ width: '24px', height: '1px', backgroundColor: BRAND_GOLD }} />
                Order Complete
                <span style={{ width: '24px', height: '1px', backgroundColor: BRAND_GOLD }} />
              </span>
            </div>
            <div className="tick-wrap">
              <Check className="tick-icon" size={46} strokeWidth={2.5} />
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 400, color: MID_DARK_GREEN, margin: 0 }}>
              Thank you for your order, {customerName}
            </h1>
            <p style={{ marginTop: '0.9rem', color: '#666', fontFamily: 'var(--font-body)', fontSize: '0.95rem', maxWidth: '640px', marginInline: 'auto' }}>
              Your payment was successful and your order is now being prepared.
            </p>
            <div className="order-divider" />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7a6a4a' }}>
              A confirmation email is on the way
            </p>
          </section>

          <section className="order-grid">
            <div className="order-card" style={{ padding: '1.6rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', fontWeight: 400, color: '#2c2c2c', marginBottom: '1rem' }}>
                Delivery Estimate
              </h2>
              <div style={{ border: '1px solid rgba(61,144,137,0.2)', borderRadius: '12px', background: 'linear-gradient(180deg, rgba(61,144,137,0.08) 0%, rgba(61,144,137,0.03) 100%)', padding: '1rem 1.1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: MID_DARK_GREEN, fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.04em' }}>
                  <Truck size={18} />
                  Arriving
                </div>
                <p style={{ marginTop: '0.5rem', fontFamily: 'var(--font-body)', fontSize: '1.04rem', fontWeight: 500, color: '#1f4a47', letterSpacing: '0.01em' }}>
                  {arrivalWindow}
                </p>
              </div>

              <div style={{ display: 'grid', gap: '0.2rem' }}>
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                  <CalendarDays size={16} color={BRAND_TEAL} style={{ marginTop: '0.2rem' }} />
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: '#555' }}>
                    Ordered on {formatPlacedDate(placedAt)}
                  </div>
                </div>
                <div className="step-line" />
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                  <Package size={16} color={BRAND_TEAL} style={{ marginTop: '0.2rem' }} />
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: '#555' }}>
                    Tracking updates will be shared by email
                  </div>
                </div>
              </div>
            </div>

            <div className="order-card order-card-soft" style={{ padding: '1.6rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', fontWeight: 400, marginBottom: '1rem', color: '#2c2c2c' }}>
                Order Summary
              </h3>
              <div style={{ display: 'grid', gap: '0.7rem', fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: '#666' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Order reference</span>
                  <strong style={{ color: MID_DARK_GREEN }}>{orderRef}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Items</span>
                  <strong style={{ color: '#2c2c2c' }}>{itemCount}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #eee', paddingTop: '0.7rem' }}>
                  <span>Total paid</span>
                  <strong style={{ color: MID_DARK_GREEN }}>AED {total.toFixed(2)}</strong>
                </div>
              </div>

              <Link
                to="/shop"
                style={{
                  marginTop: '1.25rem',
                  display: 'inline-block',
                  width: '100%',
                  textAlign: 'center',
                  textDecoration: 'none',
                  padding: '0.95rem 1rem',
                  borderRadius: '8px',
                  backgroundColor: BRAND_TEAL,
                  color: 'white',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = BRAND_GOLD }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = BRAND_TEAL }}
              >
                Continue Shopping
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}

