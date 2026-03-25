import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const OFFERS = [
  {
    id: 1,
    title: 'Spring Awakening Sale',
    description: 'Refresh your kitchen with 20% off all Earthen Cookware. Embrace the natural way of cooking.',
    discount: '20% OFF',
    code: 'SPRING20',
    validUntil: 'Valid until April 30',
    type: 'Earthen Cookware',
    link: '/shop?cat=1'
  },
  {
    id: 2,
    title: 'Bundle & Save',
    description: 'Elevate your wellness routine. Buy any 3 Organic Herbs and get 1 absolutely free.',
    discount: 'BUY 3 GET 1',
    code: 'AUTO APPLIED',
    validUntil: 'Ongoing Offer',
    type: 'Organic Herbs',
    link: '/shop?cat=6'
  },
  {
    id: 3,
    title: 'Welcome to Conscious Living',
    description: 'Start your journey with us. Enjoy 15% off your very first order across all categories.',
    discount: '15% OFF',
    code: 'WELCOME15',
    validUntil: 'First Purchase Only',
    type: 'Storewide',
    link: '/shop'
  },
  {
    id: 4,
    title: 'Complimentary Shipping',
    description: 'We cover the transit footprint for you. Free shipping worldwide on all orders over $150.',
    discount: 'FREE SHIPPING',
    code: 'AUTO APPLIED',
    validUntil: 'Ongoing Offer',
    type: 'Shipping',
    link: '/shop'
  }
]

export default function OffersPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#faf8f3', minHeight: '100vh', paddingTop: '80px' }}>
        
        {/* Page Header */}
        <section style={{
          backgroundColor: '#1a2e2c',
          padding: '5rem 2rem',
          textAlign: 'center',
          color: '#faf8f3',
        }}>
          <span className="section-label animate-fade-up" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{ width: '32px', height: '1px', backgroundColor: 'var(--color-gold-400)' }} />
            Exclusive Offers
            <span style={{ width: '32px', height: '1px', backgroundColor: 'var(--color-gold-400)' }} />
          </span>
          <h1 className="animate-fade-up delay-100" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 300,
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 1.1,
          }}>
            Curated Savings For You
          </h1>
          <p className="animate-fade-up delay-200" style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.05rem',
            fontWeight: 300,
            maxWidth: '500px',
            margin: '1.5rem auto 0',
            color: 'rgba(250, 248, 243, 0.8)'
          }}>
            Explore our latest promotions and bundles designed to bring more sustainable choices into your home.
          </p>
        </section>

        {/* Offers Grid */}
        <section style={{ padding: '5rem 2rem', maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
          }}>
            {OFFERS.map((offer, index) => (
              <div 
                key={offer.id} 
                className="animate-fade-up" 
                style={{ 
                  animationDelay: `${0.1 * index}s`,
                  backgroundColor: 'white',
                  border: '1px solid rgba(61, 144, 137, 0.15)',
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Decorative background accent */}
                <div style={{
                  position: 'absolute',
                  top: '-30px',
                  right: '-30px',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(212, 168, 67, 0.05)',
                  zIndex: 0
                }} />

                <div style={{ position: 'relative', zIndex: 1, flex: 1 }}>
                  <span style={{ 
                    fontFamily: 'var(--font-body)', 
                    fontSize: '0.7rem', 
                    fontWeight: 600, 
                    letterSpacing: '0.15em', 
                    textTransform: 'uppercase', 
                    color: 'var(--color-teal-500)',
                    display: 'block',
                    marginBottom: '1rem'
                  }}>
                    {offer.type}
                  </span>
                  
                  <h2 style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: '2rem', 
                    color: 'var(--color-charcoal)',
                    marginBottom: '0.5rem',
                    lineHeight: 1.2
                  }}>
                    {offer.discount}
                  </h2>
                  
                  <h3 style={{ 
                    fontFamily: 'var(--font-body)', 
                    fontSize: '1.1rem', 
                    fontWeight: 500,
                    color: 'var(--color-teal-800)',
                    marginBottom: '1rem'
                  }}>
                    {offer.title}
                  </h3>
                  
                  <p style={{ 
                    fontFamily: 'var(--font-body)', 
                    fontSize: '0.95rem', 
                    color: '#666', 
                    lineHeight: 1.6,
                    marginBottom: '2rem'
                  }}>
                    {offer.description}
                  </p>
                </div>

                <div style={{ position: 'relative', zIndex: 1, marginTop: 'auto' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid rgba(61, 144, 137, 0.1)'
                  }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.7rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Use Code
                      </span>
                      <strong style={{ fontFamily: 'var(--font-body)', color: 'var(--color-charcoal)', letterSpacing: '0.05em' }}>
                        {offer.code}
                      </strong>
                    </div>
                    
                    <Link to={offer.link} className="btn-outline" style={{ padding: '0.5rem 1.25rem', fontSize: '0.7rem' }}>
                      Shop Now
                    </Link>
                  </div>
                  
                  <div style={{ 
                    marginTop: '1.5rem', 
                    fontSize: '0.75rem', 
                    color: '#999', 
                    fontStyle: 'italic',
                    fontFamily: 'var(--font-display)' 
                  }}>
                    * {offer.validUntil}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
