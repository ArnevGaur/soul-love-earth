import { useEffect, useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, Building2, Globe } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { useLanguage } from '../context/LanguageContext'
import contactLeavesBg from '../assets/images/contactleaves.jpg'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { t } = useLanguage()
  const c = t.contact

  useEffect(() => {
    window.scrollTo(0, 0)
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    }, 1500)
  }

  const contactInfo = [
    {
      icon: <Building2 size={20} />,
      title: 'Our Headquarters',
      details: [
        'Building A5, Office 121',
        'Dubai South HQ, U.A.E.',
        'PO Box 12345'
      ],
      color: 'teal'
    },
    {
      icon: <Phone size={20} />,
      title: 'Call Us',
      details: [
        'Retail: +971 56 750 7224',
        'Hospitality: +971 58 852 5146'
      ],
      color: 'gold'
    },
    {
      icon: <Mail size={20} />,
      title: 'Email Us',
      details: [
        'General: contact@soullovenearth.com',
        'Support: support@soullovenearth.com'
      ],
      color: 'teal'
    },
    {
      icon: <Clock size={20} />,
      title: 'Business Hours',
      details: [
        'Monday - Friday: 9:00 AM - 6:00 PM',
        'Saturday & Sunday: Closed'
      ],
      color: 'gold'
    }
  ]

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
        <section className="contact-hero" style={{
          position: 'relative',
          minHeight: '55vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${contactLeavesBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden',
          paddingTop: '2rem'
        }}>
          
          {/* Dark overlay for text readability */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(10,26,24,0.85) 0%, rgba(15,31,30,0.75) 50%, rgba(26,58,54,0.85) 100%)',
            zIndex: 1
          }} />
          
          {/* Subtle texture overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(212,168,67,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(61,144,137,0.04) 0%, transparent 50%)',
            opacity: mounted ? 1 : 0,
            transition: 'opacity 2s ease 0.3s',
            zIndex: 2
          }} />

          {/* Elegant accent elements */}
          <div style={{
            position: 'absolute',
            top: '20%',
            right: '8%',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,168,67,0.08) 0%, transparent 70%)',
            opacity: mounted ? 0.6 : 0,
            transition: 'opacity 1.5s ease 0.5s',
            zIndex: 2
          }} />
          
          <div style={{
            position: 'absolute',
            bottom: '25%',
            left: '6%',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(61,144,137,0.06) 0%, transparent 70%)',
            opacity: mounted ? 0.5 : 0,
            transition: 'opacity 1.5s ease 0.7s',
            zIndex: 2
          }} />

          {/* Content */}
          <div className="contact-hero-content" style={{
            position: 'relative',
            zIndex: 3,
            textAlign: 'center',
            padding: '2rem',
            maxWidth: '850px',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease 0.4s'
          }}>
            {/* Refined label */}
            <div style={{
              marginBottom: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem'
            }}>
              <div style={{ 
                width: '40px', 
                height: '1px', 
                background: 'linear-gradient(90deg, transparent, var(--color-gold-400), transparent)',
                opacity: 0.8
              }} />
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--color-gold-400)',
                opacity: 1,
                textShadow: '0 1px 2px rgba(0,0,0,0.2)'
              }}>
                Get in Touch
              </span>
              <div style={{ 
                width: '40px', 
                height: '1px', 
                background: 'linear-gradient(90deg, transparent, var(--color-gold-400), transparent)',
                opacity: 0.8
              }} />
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 6vw, 4.5rem)',
              fontWeight: 200,
              color: '#ffffff',
              marginBottom: '2rem',
              lineHeight: 1.02,
              letterSpacing: '0.005em',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              Connect With
              <br />
              <span style={{ 
                color: 'var(--color-gold-400)',
                fontWeight: 300,
                letterSpacing: '0.02em',
                textShadow: '0 2px 6px rgba(212,168,67,0.2)'
              }}>
                Soul Love & Earth
              </span>
            </h1>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.15rem',
              fontWeight: 300,
              color: 'rgba(255, 255, 255, 0.92)',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.75,
              letterSpacing: '0.008em',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>
              Whether you have questions about our artisans, need assistance with your order, 
              or simply want to share your conscious living journey with us.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="contact-content" style={{ 
          padding: '6rem 2rem',
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative'
        }}>

          <div className="contact-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '3rem',
            position: 'relative',
            zIndex: 1,
            alignItems: 'stretch'
          }}>
            
            {/* Contact Information Cards */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1.5rem'
            }}>
              {contactInfo.map((info, index) => (
                <div
                  key={info.title}
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: '0s'
                  }}
                >
                  {/* Bright White Card */}
                  <div className="contact-info-card" style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(61, 144, 137, 0.15)',
                    borderRadius: '20px',
                    padding: '2.5rem',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    cursor: 'pointer',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)'
                    e.currentTarget.style.boxShadow = '0 25px 60px rgba(0,0,0,0.15)'
                    e.currentTarget.style.border = '1px solid rgba(212, 168, 67, 0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)'
                    e.currentTarget.style.border = '1px solid rgba(61, 144, 137, 0.15)'
                  }}
                  >

                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '1.5rem' }}>
                      <div style={{ 
                        width: '50px', 
                        height: '50px', 
                        borderRadius: '50%', 
                        backgroundColor: info.color === 'teal' ? 'var(--color-teal-50)' : 'var(--color-gold-50)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        flexShrink: 0,
                        color: info.color === 'teal' ? 'var(--color-teal-600)' : 'var(--color-gold-600)'
                      }}>
                        {info.icon}
                      </div>
                      <div>
                        <h3 style={{ 
                          fontFamily: 'var(--font-display)', 
                          fontSize: '1.4rem', 
                          color: 'var(--color-charcoal)', 
                          marginBottom: '0.75rem',
                          fontWeight: 400
                        }}>
                          {info.title}
                        </h3>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: '#666', lineHeight: 1.6 }}>
                          {info.details.map((detail, i) => (
                            <div key={i} style={{ marginBottom: i < info.details.length - 1 ? '0.25rem' : '0' }}>
                              {detail}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '0s',
                display: 'flex',
                height: '100%'
              }}
            >
              {/* Bright White Card */}
              <div className="contact-form-card" style={{
                backgroundColor: '#ffffff',
                border: '1px solid rgba(61, 144, 137, 0.15)',
                borderRadius: '20px',
                padding: '0',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                width: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 25px 60px rgba(0,0,0,0.15)'
                e.currentTarget.style.border = '1px solid rgba(212, 168, 67, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)'
                e.currentTarget.style.border = '1px solid rgba(61, 144, 137, 0.15)'
              }}
              >

                <div style={{ padding: '3rem', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h2 style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: '2.2rem', 
                    color: 'var(--color-charcoal)', 
                    marginBottom: '0.5rem', 
                    lineHeight: 1.2,
                    fontWeight: 400
                  }}>
                    Send Us a Message
                  </h2>
                  <p style={{ 
                    fontFamily: 'var(--font-body)', 
                    fontSize: '1rem', 
                    color: '#666', 
                    marginBottom: '2rem',
                    fontStyle: 'italic'
                  }}>
                    We'd love to hear from you and respond within 24 hours.
                  </p>

                  {submitted ? (
                    <div style={{
                      padding: '2.5rem',
                      backgroundColor: 'rgba(61, 144, 137, 0.1)',
                      border: '1px solid rgba(61, 144, 137, 0.2)',
                      textAlign: 'center',
                      borderRadius: '16px',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <div style={{
                        width: '60px', 
                        height: '60px', 
                        borderRadius: '50%', 
                        backgroundColor: 'var(--color-teal-500)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        margin: '0 auto 1.5rem'
                      }}>
                        <Send color="white" size={24} />
                      </div>
                      <h3 style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontSize: '1.6rem', 
                        color: 'var(--color-teal-800)', 
                        marginBottom: '0.5rem',
                        fontWeight: 400
                      }}>
                        Message Sent!
                      </h3>
                      <p style={{ 
                        fontFamily: 'var(--font-body)', 
                        fontSize: '0.95rem', 
                        color: 'var(--color-teal-700)' 
                      }}>
                        Thank you for reaching out. We'll get back to you soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }} dir={t.dir}>
                      
                      <div className="contact-form-grid" style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr', 
                        gap: '1.5rem',
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        transitionDelay: '0s'
                      }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          <label htmlFor="name" style={{ 
                            fontFamily: 'var(--font-body)', 
                            fontSize: '0.75rem', 
                            fontWeight: 600, 
                            letterSpacing: '0.1em', 
                            textTransform: 'uppercase',
                            color: 'var(--color-charcoal)'
                          }}>
                            Your Name
                          </label>
                          <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            required 
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            style={{
                              width: '100%', 
                              padding: '1rem', 
                              fontFamily: 'var(--font-body)', 
                              fontSize: '0.95rem',
                              border: '1.5px solid rgba(61, 144, 137, 0.2)', 
                              backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                              borderRadius: '12px',
                              outline: 'none', 
                              transition: 'all 0.3s ease',
                              backdropFilter: 'blur(10px)'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = 'var(--color-teal-500)'
                              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgba(61, 144, 137, 0.2)'
                              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'
                            }}
                          />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          <label htmlFor="email" style={{ 
                            fontFamily: 'var(--font-body)', 
                            fontSize: '0.75rem', 
                            fontWeight: 600, 
                            letterSpacing: '0.1em', 
                            textTransform: 'uppercase',
                            color: 'var(--color-charcoal)'
                          }}>
                            Email Address
                          </label>
                          <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            required 
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            style={{
                              width: '100%', 
                              padding: '1rem', 
                              fontFamily: 'var(--font-body)', 
                              fontSize: '0.95rem',
                              border: '1.5px solid rgba(61, 144, 137, 0.2)', 
                              backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                              borderRadius: '12px',
                              outline: 'none', 
                              transition: 'all 0.3s ease',
                              backdropFilter: 'blur(10px)'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = 'var(--color-teal-500)'
                              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgba(61, 144, 137, 0.2)'
                              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'
                            }}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <label htmlFor="subject" style={{ 
                          fontFamily: 'var(--font-body)', 
                          fontSize: '0.75rem', 
                          fontWeight: 600, 
                          letterSpacing: '0.1em', 
                          textTransform: 'uppercase',
                          color: 'var(--color-charcoal)'
                        }}>
                          Subject
                        </label>
                        <input 
                          type="text" 
                          id="subject" 
                          name="subject" 
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="How can we help you?"
                          style={{
                            width: '100%', 
                            padding: '1rem', 
                            fontFamily: 'var(--font-body)', 
                            fontSize: '0.95rem',
                            border: '1.5px solid rgba(61, 144, 137, 0.2)', 
                            backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                            borderRadius: '12px',
                            outline: 'none', 
                            transition: 'all 0.3s ease',
                            backdropFilter: 'blur(10px)'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = 'var(--color-teal-500)'
                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(61, 144, 137, 0.2)'
                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'
                          }}
                        />
                      </div>

                      <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '0.75rem',
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        transitionDelay: '0s'
                      }}>
                        <label htmlFor="message" style={{ 
                          fontFamily: 'var(--font-body)', 
                          fontSize: '0.75rem', 
                          fontWeight: 600, 
                          letterSpacing: '0.1em', 
                          textTransform: 'uppercase',
                          color: 'var(--color-charcoal)'
                        }}>
                          Message
                        </label>
                        <textarea 
                          id="message" 
                          name="message" 
                          rows="5" 
                          required 
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us more about your inquiry..."
                          style={{
                            width: '100%', 
                            padding: '1rem', 
                            fontFamily: 'var(--font-body)', 
                            fontSize: '0.95rem',
                            border: '1.5px solid rgba(61, 144, 137, 0.2)', 
                            backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                            borderRadius: '12px',
                            outline: 'none', 
                            resize: 'vertical', 
                            transition: 'all 0.3s ease',
                            backdropFilter: 'blur(10px)'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = 'var(--color-teal-500)'
                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(61, 144, 137, 0.2)'
                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'
                          }}
                        ></textarea>
                      </div>

                      <div style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        transitionDelay: '0s',
                        marginTop: 'auto'
                      }}>
                        <button 
                        type="submit" 
                        disabled={isSubmitting}
                        style={{ 
                          padding: '1.25rem 2rem',
                          backgroundColor: 'var(--color-teal-500)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          cursor: isSubmitting ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.75rem',
                          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                          opacity: isSubmitting ? 0.7 : 1,
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                          if (!isSubmitting) {
                            e.currentTarget.style.backgroundColor = 'var(--color-teal-600)'
                            e.currentTarget.style.transform = 'translateY(-2px)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSubmitting) {
                            e.currentTarget.style.backgroundColor = 'var(--color-teal-500)'
                            e.currentTarget.style.transform = 'translateY(0)'
                          }
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <span style={{ 
                              display: 'inline-block', 
                              width: '16px', 
                              height: '16px', 
                              border: '2px solid rgba(255,255,255,0.3)', 
                              borderTopColor: 'white', 
                              borderRadius: '50%', 
                              animation: 'spin 1s linear infinite' 
                            }} />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send size={16} />
                          </>
                        )}
                      </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CSS for animations and responsive components */}
        <style dangerouslySetInnerHTML={{__html: `
          @media (max-width: 768px) {
            main section {
              padding: 4rem 1.5rem !important;
            }
            .contact-grid {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
            }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 0.6; }
          }
        `}} />

      </main>
      <Footer />
    </>
  )
}
