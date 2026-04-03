import { useEffect, useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { Heart, Globe, Leaf, Palette, ArrowRight } from 'lucide-react'
import contactLeavesBg from '../assets/images/contactleaves.jpg'

export default function StoryPage() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    window.scrollTo(0, 0)
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const logoElements = [
    {
      icon: <Globe size={24} />,
      title: 'The Earth',
      description: 'The centerpiece of our logo features a stylized representation of the Earth, symbolizing our dedication to environmental stewardship. It serves as a reminder of the interconnectedness of all living beings and our responsibility to protect our shared home.'
    },
    {
      icon: <Heart size={24} />,
      title: 'The Heart',
      description: 'The impression of our home, the Earth, is contained in a heart-shaped icon. This signifies our commitment and symbolizes our intention to unite hearts for sustainable living and a better world.'
    },
    {
      icon: <Leaf size={24} />,
      title: 'Sustainability',
      description: 'Nestled within the Earth is an icon that signifies sustainability. It represents the three pillars of sustainability - environmental, social, and economic. This icon embodies our unwavering commitment to balance and responsible practices.'
    },
    {
      icon: <Palette size={24} />,
      title: 'Vibrant Colors',
      description: 'Our logo features vibrant, nature-inspired colors that evoke feelings of vitality, growth, and harmony with the environment. The prime colors are inspired by mother nature\'s beauty and aura, inspiring us to create positive change.'
    }
  ]

  const whatWeDo = [
    {
      title: 'Sustainable Homeware',
      description: 'Discover ethically sourced furniture and eco-decor that transform your spaces while treading lightly on our planet.'
    },
    {
      title: 'Green Kitchen Essentials',
      description: 'Make meals sustainably with our eco-friendly kitchenware, honoring both taste and the environment.'
    },
    {
      title: 'Ethical Fashion',
      description: 'Unite style and values through our sustainable fashion line, from attire to accessories.'
    },
    {
      title: 'Conscious Beauty',
      description: 'Experience beauty that\'s kind to you and the Earth with our eco-friendly cosmetics and skincare.'
    },
    {
      title: 'Organic Herbs',
      description: 'Explore nature\'s remedies with our sustainably grown, vibrant herbs for your well-being.'
    },
    {
      title: 'Eco-Friendly Gifts',
      description: 'Share the joy of sustainable living with thoughtfully curated gift sets that inspire conscious choices.'
    }
  ]

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#faf8f3', minHeight: '100vh' }}>
        
        {/* Hero Section */}
        <section className="story-page-hero" style={{
          position: 'relative',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${contactLeavesBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden',
          padding: '6rem 2rem'
        }}>
          {/* Dark overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(10,26,24,0.7) 0%, rgba(26,46,44,0.65) 100%)',
            zIndex: 1
          }} />

          {/* Decorative elements */}
          <div style={{
            position: 'absolute',
            top: '15%',
            right: '8%',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,168,67,0.15) 0%, transparent 70%)',
            opacity: mounted ? 0.6 : 0,
            transition: 'opacity 1.5s ease',
            zIndex: 2
          }} />

          {/* Content */}
          <div style={{
            position: 'relative',
            zIndex: 3,
            textAlign: 'center',
            maxWidth: '900px',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease'
          }}>
            {/* Label */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              marginBottom: '2.5rem'
            }}>
              <div style={{ 
                width: '50px', 
                height: '1px', 
                background: 'linear-gradient(90deg, transparent, var(--color-gold-400), transparent)',
                opacity: 0.8 
              }} />
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--color-gold-400)'
              }}>
                About Us
              </span>
              <div style={{ 
                width: '50px', 
                height: '1px', 
                background: 'linear-gradient(90deg, transparent, var(--color-gold-400), transparent)',
                opacity: 0.8 
              }} />
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              fontWeight: 200,
              color: '#ffffff',
              marginBottom: '1.5rem',
              lineHeight: 1.05,
              letterSpacing: '0.01em',
              textShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}>
              Embracing Earth's
              <br />
              <span style={{ color: 'var(--color-gold-400)' }}>Essence</span>
            </h1>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.25rem',
              fontWeight: 300,
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '650px',
              margin: '0 auto',
              lineHeight: 1.7
            }}>
              Our story reflects the belief that every narrative gains significance when it finds listeners willing to pass it on to future generations.
            </p>
          </div>
        </section>

        {/* Our Logo Story */}
        <section className="story-page-logo-section" style={{ padding: '8rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--color-gold-400)', opacity: 0.6 }} />
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-gold-400)'
              }}>
                Our Identity
              </span>
              <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--color-gold-400)', opacity: 0.6 }} />
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
              color: 'var(--color-charcoal)',
              marginBottom: '1rem',
              fontWeight: 300
            }}>
              Our Logo Tells Our Story
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.1rem',
              color: '#666',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: 1.7
            }}>
              At Soul Love and Earth, a unit of Marvel Deals LLC, our product selection underscores the advantages of a natural lifestyle and inspires the youth to embrace it in the latest and most contemporary manner.
            </p>
          </div>

          <div className="story-page-logo-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            alignItems: 'stretch'
          }}>
            {logoElements.map((item, index) => (
              <div
                key={item.title}
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.6s ease',
                  transitionDelay: `${0.1 * index}s`,
                  display: 'flex'
                }}
              >
                {/* Glassmorphism Card */}
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '20px',
                  padding: '2.5rem',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  minHeight: '320px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = '0 25px 60px rgba(0,0,0,0.12)'
                  e.currentTarget.style.border = '1px solid rgba(212, 168, 67, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)'
                  e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.3)'
                }}
                >
                  {/* Icon */}
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-teal-50)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    color: 'var(--color-teal-600)'
                  }}>
                    {item.icon}
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.6rem',
                    color: 'var(--color-charcoal)',
                    marginBottom: '1rem',
                    fontWeight: 400
                  }}>
                    {item.title}
                  </h3>

                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    color: '#666'
                  }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Narrative Quote */}
        <section className="story-page-quote-section" style={{
          position: 'relative',
          backgroundColor: '#1a3a36',
          padding: '8rem 2rem',
          textAlign: 'center',
          overflow: 'hidden'
        }}>

          {/* Decorative quote marks */}
          <div style={{
            position: 'absolute',
            top: '2rem',
            left: '5%',
            fontFamily: 'var(--font-display)',
            fontSize: '15rem',
            color: 'rgba(212,168,67,0.1)',
            lineHeight: 1,
            zIndex: 2
          }}>
            "
          </div>

          <div style={{
            position: 'relative',
            zIndex: 3,
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: 300,
              lineHeight: 1.5,
              color: '#faf8f3',
              fontStyle: 'italic',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
              "We take pride in our story, where each product embodies cultural and traditional richness, promoting the reduction of chemicals and plastic in daily routines for a healthier and happier life. Together, we're crafting a tale of harmony, sustainability, and a brighter future for all."
            </p>
          </div>
        </section>

        {/* What We Do */}
        <section className="story-page-mission-section" style={{ padding: '8rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--color-gold-400)', opacity: 0.6 }} />
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-gold-400)'
              }}>
                Our Mission
              </span>
              <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--color-gold-400)', opacity: 0.6 }} />
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
              color: 'var(--color-charcoal)',
              marginBottom: '1rem',
              fontWeight: 300
            }}>
              What We Do
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.1rem',
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.7
            }}>
              Welcome to Soul Love and Earth, your source for conscious living. We curate eco-friendly products that blend style and sustainability, empowering better choices.
            </p>
          </div>

          <div className="story-page-mission-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            alignItems: 'stretch',
            justifyItems: 'center'
          }}>
            {whatWeDo.map((item, index) => (
              <div
                key={item.title}
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.6s ease',
                  transitionDelay: `${0.1 * index}s`,
                  display: 'flex',
                  width: '100%'
                }}
              >
                <div style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(61, 144, 137, 0.15)',
                  borderRadius: '20px',
                  padding: '2.5rem',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  minHeight: '220px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = '0 25px 60px rgba(0,0,0,0.12)'
                  e.currentTarget.style.border = '1px solid rgba(212, 168, 67, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)'
                  e.currentTarget.style.border = '1px solid rgba(61, 144, 137, 0.15)'
                }}
                >
                  <h4 style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.2rem',
                    color: 'var(--color-teal-700)',
                    marginBottom: '1rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em'
                  }}>
                    {item.title}
                  </h4>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: '#666',
                    lineHeight: 1.7
                  }}>
                    {item.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginTop: '1.5rem',
                    color: 'var(--color-teal-600)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
                  }}>
                    Explore
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Commitment Section */}
        <section className="story-page-commitment" style={{
          backgroundColor: '#ffffff',
          padding: '6rem 2rem',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              color: 'var(--color-teal-800)',
              marginBottom: '2rem',
              fontWeight: 300
            }}>
              Our Sustainability Promise
            </h3>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.1rem',
              color: 'var(--color-charcoal)',
              lineHeight: 1.8,
              marginBottom: '2rem'
            }}>
              We uphold strict eco-friendly standards, collaborating with ethical suppliers to uplift communities. We offer not just products, but knowledge for a greener lifestyle. Become part of our community, driving positive change for a sustainable future.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.2rem',
              color: 'var(--color-gold-600)',
              fontWeight: 500,
              fontStyle: 'italic'
            }}>
              Let's journey towards a better, more conscious world together.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="story-page-cta" style={{
          padding: '6rem 2rem',
          textAlign: 'center',
          background: 'linear-gradient(180deg, #faf8f3 0%, #f5f3ee 100%)'
        }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 3vw, 2.8rem)',
              color: 'var(--color-charcoal)',
              marginBottom: '1.5rem',
              fontWeight: 300
            }}>
              Ready to Begin Your
              <br />
              <span style={{ color: 'var(--color-teal-600)' }}>Conscious Journey?</span>
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.1rem',
              color: '#666',
              lineHeight: 1.7,
              marginBottom: '2rem'
            }}>
              Explore our curated collection of sustainable products designed for mindful living.
            </p>
            <a
              href="/shop"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2.5rem',
                backgroundColor: 'var(--color-teal-600)',
                color: '#ffffff',
                borderRadius: '30px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(61,144,137,0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-teal-700)'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(61,144,137,0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-teal-600)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(61,144,137,0.3)'
              }}
            >
              Explore Our Shop
              <ArrowRight size={18} />
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
