import { useEffect, useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { useLanguage } from '../context/LanguageContext'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { t } = useLanguage()
  const c = t.contact

  useEffect(() => {
    window.scrollTo(0, 0)
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

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh', paddingTop: '80px', paddingBottom: '5rem' }}>
        
        {/* Page Header */}
        <section style={{
          backgroundColor: '#1a2e2c',
          padding: '5rem 2rem',
          textAlign: 'center',
          color: 'var(--color-cream)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative Elements */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '-10%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(61,144,137,0.15) 0%, rgba(26,46,44,0) 70%)',
            zIndex: 0
          }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
            <span className="section-label animate-fade-up" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ width: '32px', height: '1px', backgroundColor: 'var(--color-gold-400)' }} />
              {c.title}
              <span style={{ width: '32px', height: '1px', backgroundColor: 'var(--color-gold-400)' }} />
            </span>
            <h1 className="animate-fade-up delay-100" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 300,
              lineHeight: 1.1,
            }}>
              {c.sub}
            </h1>
            <p className="animate-fade-up delay-200" style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.1rem',
              fontWeight: 300,
              maxWidth: '600px',
              margin: '1.5rem auto 0',
              color: 'rgba(250, 248, 243, 0.85)'
            }}>
              Whether you have a question about our artisans, need assistance with your order, or simply want to share your conscious living journey.
            </p>
          </div>
        </section>

        {/* Contact Content Grid */}
        <section style={{ maxWidth: '1280px', margin: '-3rem auto 0', padding: '0 2rem', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '3rem',
            alignItems: 'stretch'
          }}>
            
            {/* Contact Information Cards */}
            <div className="animate-fade-up delay-300" style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1.5rem'
            }}>
              
              {/* Card 1 */}
              <div style={{
                backgroundColor: 'white',
                padding: '2.5rem',
                border: '1px solid rgba(61, 144, 137, 0.08)',
                boxShadow: '0 10px 30px -5px rgba(0,0,0,0.05), 0 4px 10px -2px rgba(0,0,0,0.02)',
                display: 'flex',
                gap: '1.5rem',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                borderRadius: '16px',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(61,144,137,0.12)';
                e.currentTarget.style.borderColor = 'var(--color-gold-300)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px -5px rgba(0,0,0,0.05), 0 4px 10px -2px rgba(0,0,0,0.02)';
                e.currentTarget.style.borderColor = 'rgba(61, 144, 137, 0.08)';
              }}>
                <div style={{ 
                  width: '50px', height: '50px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--color-teal-50)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <MapPin color="var(--color-teal-600)" size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-charcoal)', marginBottom: '0.5rem' }}>Our Headquarters</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: '#666', lineHeight: 1.6 }}>
                    Building A5, Office 121<br/>
                    Dubai South HQ, U.A.E.<br/>
                    PO Box 12345
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div style={{
                backgroundColor: 'white',
                padding: '2.5rem',
                border: '1px solid rgba(61, 144, 137, 0.08)',
                boxShadow: '0 10px 30px -5px rgba(0,0,0,0.05), 0 4px 10px -2px rgba(0,0,0,0.02)',
                display: 'flex',
                gap: '1.5rem',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                borderRadius: '16px',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(61,144,137,0.12)';
                e.currentTarget.style.borderColor = 'var(--color-gold-300)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px -5px rgba(0,0,0,0.05), 0 4px 10px -2px rgba(0,0,0,0.02)';
                e.currentTarget.style.borderColor = 'rgba(61, 144, 137, 0.08)';
              }}>
                <div style={{ 
                  width: '50px', height: '50px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--color-teal-50)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Phone color="var(--color-teal-600)" size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-charcoal)', marginBottom: '0.5rem' }}>Call Us</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: '#666', lineHeight: 1.6 }}>
                    Retail: +971 56 750 7224<br/>
                    Hospitality: +971 58 852 5146
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div style={{
                backgroundColor: 'white',
                padding: '2.5rem',
                border: '1px solid rgba(61, 144, 137, 0.08)',
                boxShadow: '0 10px 30px -5px rgba(0,0,0,0.05), 0 4px 10px -2px rgba(0,0,0,0.02)',
                display: 'flex',
                gap: '1.5rem',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                borderRadius: '16px',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(61,144,137,0.12)';
                e.currentTarget.style.borderColor = 'var(--color-gold-300)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px -5px rgba(0,0,0,0.05), 0 4px 10px -2px rgba(0,0,0,0.02)';
                e.currentTarget.style.borderColor = 'rgba(61, 144, 137, 0.08)';
              }}>
                <div style={{ 
                  width: '50px', height: '50px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--color-teal-50)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Mail color="var(--color-teal-600)" size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-charcoal)', marginBottom: '0.5rem' }}>Email Us</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: '#666', lineHeight: 1.6 }}>
                    General: contact@soullovenearth.com<br/>
                    Support: support@soullovenearth.com
                  </p>
                </div>
              </div>

            </div>

            <div className="animate-fade-up delay-400" style={{
              backgroundColor: 'white',
              padding: '0',
              border: '1px solid rgba(61, 144, 137, 0.08)',
              boxShadow: '0 10px 30px -5px rgba(0,0,0,0.05), 0 4px 10px -2px rgba(0,0,0,0.02)',
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}>
              <div style={{ padding: '2rem 2.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--color-charcoal)', marginBottom: '0.25rem', lineHeight: 1.2 }}>
                  {c.title}
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: '#666', marginBottom: '1.5rem' }}>
                  {c.sub}
                </p>

              {submitted ? (
                <div className="animate-fade-in" style={{
                  padding: '2rem',
                  backgroundColor: 'var(--color-teal-50)',
                  border: '1px solid var(--color-teal-200)',
                  textAlign: 'center',
                  borderRadius: '4px'
                }}>
                  <div style={{
                    width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--color-teal-500)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem'
                  }}>
                    <Send color="white" size={24} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--color-teal-800)', marginBottom: '0.5rem' }}>{c.sent}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-teal-700)' }}></p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }} dir={t.dir}>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="contact-form-grid">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label htmlFor="name" style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.05em', color: 'var(--color-charcoal)' }}>{c.yourName.toUpperCase()}</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        value={formData.name}
                        onChange={handleChange}
                        style={{
                          width: '100%', padding: '0.8rem 1rem', fontFamily: 'var(--font-body)', fontSize: '0.95rem',
                          border: '1px solid #e0e0e0', backgroundColor: '#fafafa', outline: 'none', transition: 'border-color 0.3s ease'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--color-teal-400)'}
                        onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label htmlFor="email" style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.05em', color: 'var(--color-charcoal)' }}>{c.email.toUpperCase()}</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        value={formData.email}
                        onChange={handleChange}
                        style={{
                          width: '100%', padding: '0.8rem 1rem', fontFamily: 'var(--font-body)', fontSize: '0.95rem',
                          border: '1px solid #e0e0e0', backgroundColor: '#fafafa', outline: 'none', transition: 'border-color 0.3s ease'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--color-teal-400)'}
                        onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="subject" style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.05em', color: 'var(--color-charcoal)' }}>{c.subject.toUpperCase()}</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      style={{
                        width: '100%', padding: '0.8rem 1rem', fontFamily: 'var(--font-body)', fontSize: '0.95rem',
                        border: '1px solid #e0e0e0', backgroundColor: '#fafafa', outline: 'none', transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--color-teal-400)'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    <label htmlFor="message" style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.05em', color: 'var(--color-charcoal)' }}>{c.message.toUpperCase()}</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="4" 
                      required 
                      value={formData.message}
                      onChange={handleChange}
                      style={{
                        width: '100%', padding: '0.8rem 1rem', fontFamily: 'var(--font-body)', fontSize: '0.95rem',
                        border: '1px solid #e0e0e0', backgroundColor: '#fafafa', outline: 'none', resize: 'vertical', transition: 'border-color 0.3s ease',
                        flex: 1
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--color-teal-400)'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="btn-primary" 
                    disabled={isSubmitting}
                    style={{ 
                      marginTop: '1rem', 
                      justifyContent: 'center', 
                      padding: '1rem', 
                      opacity: isSubmitting ? 0.7 : 1,
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {isSubmitting ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="spinner" style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                        {c.sending.toUpperCase()}
                      </span>
                    ) : c.send.toUpperCase()}
                  </button>
                </form>
              )}
              </div>
            </div>

          </div>
        </section>
        
        {/* CSS for responsive components */}
        <style dangerouslySetInnerHTML={{__html: `
          @media (max-width: 600px) {
            .contact-form-grid {
              grid-template-columns: 1fr !important;
            }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}} />

      </main>
      <Footer />
    </>
  )
}
