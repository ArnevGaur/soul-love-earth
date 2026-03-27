import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { useLanguage } from '../context/LanguageContext'
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const { t, lang } = useLanguage()
  const navigate = useNavigate()
  const a = t.auth
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10)
    return () => clearTimeout(timer)
  }, [])

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleEmailChange = (e) => {
    const val = e.target.value
    setEmail(val)
    if (val && !validateEmail(val)) {
      setEmailError(lang === 'ar' ? 'بريد غير صحيح' : 'Invalid email.')
    } else {
      setEmailError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    // Simulate auth
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    // For now just redirect to home (replace with real auth later)
    navigate('/')
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '100px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        

        <div style={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '2rem 1.5rem',
          position: 'relative', 
          zIndex: 2 
        }}>
          <div style={{ width: '100%', maxWidth: '480px' }}>

            {/* Glassmorphism Card */}
            <div style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.5)', 
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: '20px', 
              padding: '3.5rem 2.5rem', 
              boxShadow: '0 15px 50px rgba(0,0,0,0.18)', 
              border: '1px solid rgba(255,255,255,0.4)',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(15px)',
              transition: 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
              
              {/* Branding Header */}
              <div style={{ 
                textAlign: 'center',
                marginBottom: '3rem'
              }}>
                <h1 style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: 'clamp(2.2rem, 6vw, 2.6rem)', 
                  fontWeight: 300, 
                  color: '#1a2e2c', 
                  margin: 0,
                  lineHeight: 1.1,
                  letterSpacing: '0.04em'
                }}>
                  {a.loginTitle}
                </h1>
                <p style={{ 
                  fontFamily: 'var(--font-body)', 
                  fontSize: '1rem', 
                  color: '#444',
                  marginTop: '1rem',
                  marginBottom: 0,
                  fontWeight: 300,
                  letterSpacing: '0.01em',
                  lineHeight: 1.5
                }}>
                  {a.loginSub}
                </p>
              </div>

              {error && (
                <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '6px', padding: '0.85rem 1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#dc2626' }}>{error}</div>
              )}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                {/* Email */}
                <div>
                  <label style={labelStyle}>{a.email}</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={15} style={{ position: 'absolute', top: '50%', [lang === 'ar' ? 'right' : 'left']: '1rem', transform: 'translateY(-50%)', color: '#aaa' }} />
                    <input type="email" name="email" autoComplete="username" required value={email} onChange={handleEmailChange} placeholder="you@example.com"
                      style={{ ...inputStyle, [lang === 'ar' ? 'paddingRight' : 'paddingLeft']: '2.75rem', [lang === 'ar' ? 'paddingLeft' : 'paddingRight']: (email && !emailError) ? '2.5rem' : '1rem', borderColor: emailError ? '#dc2626' : (email && !emailError) ? '#22c55e' : '#ddd' }}
                      onFocus={e => e.target.style.borderColor = emailError ? '#dc2626' : 'var(--color-teal-500)'}
                      onBlur={e => e.target.style.borderColor = emailError ? '#dc2626' : (email && !emailError) ? '#22c55e' : '#ddd'} />
                    {email && !emailError && (
                      <Check size={16} style={{ position: 'absolute', top: '50%', [lang === 'ar' ? 'left' : 'right']: '0.85rem', transform: 'translateY(-50%)', color: '#22c55e' }} />
                    )}
                  </div>
                  {emailError && (
                    <div style={{ color: '#dc2626', fontSize: '0.65rem', marginTop: '0.3rem', fontWeight: 600 }}>{emailError}</div>
                  )}
                </div>

                {/* Password */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <label style={labelStyle}>{a.password}</label>
                    <Link to="#" style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#214e41', textDecoration: 'none' }}>{a.forgotPassword}</Link>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Lock size={15} style={{ position: 'absolute', top: '50%', [lang === 'ar' ? 'right' : 'left']: '1rem', transform: 'translateY(-50%)', color: '#aaa' }} />
                    <input type={showPwd ? 'text' : 'password'} name="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                      style={{ ...inputStyle, [lang === 'ar' ? 'paddingRight' : 'paddingLeft']: '2.75rem', [lang === 'ar' ? 'paddingLeft' : 'paddingRight']: '2.75rem' }}
                      onFocus={e => e.target.style.borderColor = 'var(--color-teal-500)'}
                      onBlur={e => e.target.style.borderColor = '#ddd'} />
                    <button type="button" onClick={() => setShowPwd(v => !v)}
                      style={{ position: 'absolute', top: '50%', [lang === 'ar' ? 'left' : 'right']: '1rem', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', padding: 0 }}>
                      {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button type="submit" disabled={loading}
                  style={{ marginTop: '0.5rem', padding: '1.1rem', backgroundColor: loading ? '#8cbbba' : '#214e41', color: 'white', border: 'none', borderRadius: '6px', fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', transition: 'background-color 0.2s' }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = '#2d7070' }}
                  onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = '#214e41' }}>
                  {loading ? <span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> : <ArrowRight size={16} />}
                  {loading ? '...' : a.loginBtn}
                </button>
              </form>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.75rem 0' }}>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(0,0,0,0.08)' }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#999' }}>OR</span>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(0,0,0,0.08)' }} />
              </div>

              <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: '#666' }}>
                {a.noAccount}{' '}
                <Link to="/register" style={{ color: '#214e41', fontWeight: 600, textDecoration: 'none' }}>{a.registerLink}</Link>
              </p>
            </div>
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </main>
      <Footer />
    </>
  )
}

const labelStyle = { display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: '0.4rem' }
const inputStyle = { width: '100%', padding: '0.9rem 1rem', border: '1.5px solid #ddd', borderRadius: '6px', fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-charcoal)', outline: 'none', transition: 'border-color 0.2s', backgroundColor: '#faf8f3', boxSizing: 'border-box' }
