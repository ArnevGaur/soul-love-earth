import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Gift, Truck } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const OFFERS = [
  {
    id: 1,
    title: 'Spring Awakening',
    subtitle: 'Earthen Cookware Collection',
    description: 'Embrace the art of natural cooking with handcrafted earthenware that connects you to timeless traditions.',
    discount: '20% OFF',
    code: 'SPRING20',
    validUntil: 'Valid until April 30, 2026',
    type: 'Seasonal',
    icon: <Gift size={20} />,
    link: '/shop?cat=1',
    gradient: 'from-teal-600 to-teal-700'
  },
  {
    id: 2,
    title: 'Wellness Bundle',
    subtitle: 'Organic Herbs Collection',
    description: 'Curated selection of premium organic herbs to elevate your daily wellness rituals and nourish your body naturally.',
    discount: 'BUY 3 GET 1',
    code: 'AUTO APPLIED',
    validUntil: 'Ongoing Offer',
    type: 'Bundle',
    icon: <Gift size={20} />,
    link: '/shop?cat=6',
    gradient: 'from-gold-500 to-gold-600'
  },
  {
    id: 3,
    title: 'Welcome Journey',
    subtitle: 'First Order Exclusive',
    description: 'Begin your conscious living journey with us and enjoy exclusive savings on your first sustainable choice.',
    discount: '15% OFF',
    code: 'WELCOME15',
    validUntil: 'First Purchase Only',
    type: 'Welcome',
    icon: <Gift size={20} />,
    link: '/shop',
    gradient: 'from-teal-500 to-teal-600'
  },
  {
    id: 4,
    title: 'Conscious Delivery',
    subtitle: 'Sustainable Shipping',
    description: 'We offset the carbon footprint of every delivery, bringing your sustainable choices to your doorstep responsibly.',
    discount: 'FREE SHIPPING',
    code: 'AUTO APPLIED',
    validUntil: 'Orders over $150',
    type: 'Service',
    icon: <Truck size={20} />,
    link: '/shop',
    gradient: 'from-stone to-stone/80'
  }
]

export default function OffersPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Navbar />
      <main style={{ 
        minHeight: '100vh', 
        backgroundColor: 'var(--color-cream)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Hero Section */}
        <section style={{
          position: 'relative',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a2e2c 0%, #2d4f4d 50%, #1a2e2c 100%)',
          overflow: 'hidden'
        }}>
          
          {/* Decorative Elements */}
          <div style={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,168,67,0.1) 0%, transparent 70%)',
            opacity: mounted ? 0.6 : 0,
            transition: 'opacity 1.2s ease 0.5s'
          }} />
          
          <div style={{
            position: 'absolute',
            bottom: '15%',
            left: '5%',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(61,144,137,0.08) 0%, transparent 70%)',
            opacity: mounted ? 0.5 : 0,
            transition: 'opacity 1.2s ease 0.7s'
          }} />

          {/* Content */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            padding: '2rem',
            maxWidth: '900px',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease 0.3s'
          }}>
            {/* Label */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{ 
                width: '40px', 
                height: '1px', 
                backgroundColor: 'var(--color-gold-400)',
                opacity: 0.8
              }} />
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                fontWeight: 500,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-gold-400)'
              }}>
                Exclusive Offers
              </span>
              <div style={{ 
                width: '40px', 
                height: '1px', 
                backgroundColor: 'var(--color-gold-400)',
                opacity: 0.8
              }} />
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 300,
              color: '#ffffff',
              marginBottom: '1.5rem',
              lineHeight: 1.1,
              letterSpacing: '0.02em'
            }}>
              Curated Savings
              <br />
              <span style={{ color: 'var(--color-gold-400)' }}>For Conscious Living</span>
            </h1>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.1rem',
              fontWeight: 300,
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Thoughtfully selected promotions designed to enhance your sustainable lifestyle 
              and bring mindful choices into your home.
            </p>
          </div>
        </section>

        {/* Offers Grid */}
        <section style={{ 
          padding: '6rem 2rem',
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative'
        }}>
          
          {/* Decorative line */}
          <div style={{
            position: 'absolute',
            left: '2rem',
            top: '3rem',
            width: '1px',
            height: mounted ? '80px' : '0px',
            backgroundColor: 'var(--color-gold-400)',
            opacity: 0.3,
            transition: 'height 1.2s ease 0.5s'
          }} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '2.5rem',
            position: 'relative',
            zIndex: 1
          }}>
            {OFFERS.map((offer, index) => (
              <div 
                key={offer.id} 
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: `${0.15 * index}s`
                }}
              >
                {/* Glassmorphism Card */}
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '20px',
                  padding: '3rem',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = '0 25px 60px rgba(0,0,0,0.12)'
                  e.currentTarget.style.border = '1px solid rgba(212, 168, 67, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.08)'
                  e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.3)'
                }}
                >
                  {/* Decorative background gradient */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${offer.gradient.includes('teal') ? 'var(--color-teal-500)' : offer.gradient.includes('gold') ? 'var(--color-gold-400)' : 'var(--color-stone)'}, ${offer.gradient.includes('teal') ? 'var(--color-teal-600)' : offer.gradient.includes('gold') ? 'var(--color-gold-500)' : 'var(--color-charcoal)'})`
                  }} />

                  {/* Subtle background accent */}
                  <div style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '-40px',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${offer.gradient.includes('teal') ? 'rgba(61,144,137,0.05)' : offer.gradient.includes('gold') ? 'rgba(212,168,67,0.05)' : 'rgba(44,44,44,0.03)'} 0%, transparent 70%)`
                  }} />

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Type and Icon */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '1.5rem'
                    }}>
                      <div style={{
                        color: offer.gradient.includes('teal') ? 'var(--color-teal-500)' : offer.gradient.includes('gold') ? 'var(--color-gold-400)' : 'var(--color-charcoal)',
                        opacity: 0.7
                      }}>
                        {offer.icon}
                      </div>
                      <span style={{ 
                        fontFamily: 'var(--font-body)', 
                        fontSize: '0.65rem', 
                        fontWeight: 600, 
                        letterSpacing: '0.15em', 
                        textTransform: 'uppercase', 
                        color: offer.gradient.includes('teal') ? 'var(--color-teal-600)' : offer.gradient.includes('gold') ? 'var(--color-gold-500)' : 'var(--color-charcoal)',
                        opacity: 0.8
                      }}>
                        {offer.type}
                      </span>
                    </div>
                    
                    {/* Discount Badge */}
                    <div style={{
                      display: 'inline-block',
                      background: `linear-gradient(135deg, ${offer.gradient.includes('teal') ? 'var(--color-teal-500)' : offer.gradient.includes('gold') ? 'var(--color-gold-400)' : 'var(--color-charcoal)'} 0%, ${offer.gradient.includes('teal') ? 'var(--color-teal-600)' : offer.gradient.includes('gold') ? 'var(--color-gold-500)' : 'var(--color-charcoal)'} 100%)`,
                      color: 'white',
                      padding: '0.4rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginBottom: '1.5rem',
                      fontFamily: 'var(--font-body)'
                    }}>
                      {offer.discount}
                    </div>
                    
                    <h2 style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontSize: '1.8rem', 
                      color: 'var(--color-charcoal)',
                      marginBottom: '0.5rem',
                      lineHeight: 1.2,
                      fontWeight: 400
                    }}>
                      {offer.title}
                    </h2>
                    
                    <h3 style={{ 
                      fontFamily: 'var(--font-body)', 
                      fontSize: '1rem', 
                      fontWeight: 400,
                      color: '#666',
                      marginBottom: '1.5rem',
                      fontStyle: 'italic'
                    }}>
                      {offer.subtitle}
                    </h3>
                    
                    <p style={{ 
                      fontFamily: 'var(--font-body)', 
                      fontSize: '0.95rem', 
                      color: '#555', 
                      lineHeight: 1.7,
                      marginBottom: '2rem'
                    }}>
                      {offer.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid rgba(61, 144, 137, 0.1)',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    <div>
                      <div style={{ 
                        fontSize: '0.65rem', 
                        color: '#999', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.1em',
                        marginBottom: '0.25rem',
                        fontFamily: 'var(--font-body)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}>
                        <Clock size={12} />
                        Use Code
                      </div>
                      <strong style={{ 
                        fontFamily: 'var(--font-body)', 
                        color: 'var(--color-charcoal)', 
                        letterSpacing: '0.05em',
                        fontSize: '0.9rem'
                      }}>
                        {offer.code}
                      </strong>
                    </div>
                    
                    <Link 
                      to={offer.link}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem 1.5rem',
                        backgroundColor: offer.gradient.includes('teal') ? 'var(--color-teal-500)' : offer.gradient.includes('gold') ? 'var(--color-gold-400)' : 'var(--color-charcoal)',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '25px',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        fontFamily: 'var(--font-body)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateX(2px)'
                        e.currentTarget.style.backgroundColor = offer.gradient.includes('teal') ? 'var(--color-teal-600)' : offer.gradient.includes('gold') ? 'var(--color-gold-500)' : '#1a1a1a'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateX(0)'
                        e.currentTarget.style.backgroundColor = offer.gradient.includes('teal') ? 'var(--color-teal-500)' : offer.gradient.includes('gold') ? 'var(--color-gold-400)' : 'var(--color-charcoal)'
                      }}
                    >
                      Shop Now
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                  
                  <div style={{ 
                    marginTop: '1.5rem', 
                    fontSize: '0.75rem', 
                    color: '#999', 
                    fontStyle: 'italic',
                    fontFamily: 'var(--font-display)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Clock size={12} />
                    {offer.validUntil}
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
