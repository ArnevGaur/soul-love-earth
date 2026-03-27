import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { useLanguage } from '../context/LanguageContext'
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Check } from 'lucide-react'

export default function RegisterPage() {
  const { t, lang } = useLanguage()
  const navigate = useNavigate()
  const a = t.auth
  const ltr = lang !== 'ar'
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [matchError, setMatchError] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 20)
    return () => clearTimeout(timer)
  }, [])

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handlePhoneChange = (e) => {
    const value = e.target.value
    // If they type a letter, show inline error and block
    if (/[a-zA-Z]/.test(value)) {
      setPhoneError(lang === 'ar' ? 'يرجى إدخال أرقام فقط' : 'Please enter numbers only.')
      return
    }
    
    setPhoneError('') // Clear error if input is valid or empty
    
    // Allow digits, spaces, plus, minus, and parens
    if (value === '' || /^[\d\s+\-()]*$/.test(value)) {
      setForm(f => ({ ...f, phone: value }))
    }
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleEmailChange = (e) => {
    const val = e.target.value
    setForm(f => ({ ...f, email: val }))
    if (val && !validateEmail(val)) {
      setEmailError(lang === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address.')
    } else {
      setEmailError('')
    }
  }

  const handlePasswordChange = (e) => {
    const val = e.target.value
    setForm(f => ({ ...f, password: val }))
    
    // Length check
    if (val && val.length < 8) {
      setPasswordError(lang === 'ar' ? 'يجب أن تكون كلمة المرور 8 أحرف على الأقل' : 'Minimum 8 characters required.')
    } else {
      setPasswordError('')
    }

    // Refresh match check if confirm exists
    if (form.confirmPassword) {
      if (val !== form.confirmPassword) {
        setMatchError(lang === 'ar' ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match.')
      } else {
        setMatchError('')
      }
    }
  }

  const handleConfirmPasswordChange = (e) => {
    const val = e.target.value
    setForm(f => ({ ...f, confirmPassword: val }))
    if (val && val !== form.password) {
      setMatchError(lang === 'ar' ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match.')
    } else {
      setMatchError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) {
      setError(lang === 'ar' ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match.')
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1400))
    setLoading(false)
    navigate('/')
  }

  const field = (key, type, icon, ph, val) => (
    <div>
      <label style={labelStyle}>{a[key]}</label>
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', top: '50%', [ltr ? 'left' : 'right']: '1rem', transform: 'translateY(-50%)', color: '#aaa', display: 'flex' }}>{icon}</span>
        <input type={type} required value={val} onChange={update(key === 'confirmPassword' ? 'confirmPassword' : key === 'firstName' ? 'firstName' : key === 'lastName' ? 'lastName' : key === 'phone' ? 'phone' : key === 'email' ? 'email' : 'password')}
          placeholder={ph}
          style={{ ...inputStyle, [ltr ? 'paddingLeft' : 'paddingRight']: '2.75rem', [!ltr ? 'paddingLeft' : 'paddingRight']: type === 'password' ? '2.75rem' : '1rem' }}
          onFocus={e => e.target.style.borderColor = 'var(--color-teal-500)'}
          onBlur={e => e.target.style.borderColor = '#ddd'} />
        {type === 'password' && (
          <button type="button" onClick={() => setShowPwd(v => !v)}
            style={{ position: 'absolute', top: '50%', [ltr ? 'right' : 'left']: '1rem', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', padding: 0 }}>
            {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
    </div>
  )

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
          <div style={{ width: '100%', maxWidth: '520px' }}>

            {/* Card with Branding inside */}
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
                  {a.registerTitle}
                </h1>
                <p style={{ 
                  fontFamily: 'var(--font-body)', 
                  fontSize: '1rem', 
                  color: '#444',
                  marginTop: '1rem',
                  marginBottom: 0,
                  fontWeight: 300,
                  letterSpacing: '0.01em',
                  lineHeight: 1.5,
                  maxWidth: '400px',
                  margin: '1rem auto 0'
                }}>
                  {a.registerSub}
                </p>
              </div>

              {error && (
                <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '6px', padding: '0.85rem 1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#dc2626' }}>{error}</div>
              )}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} dir={lang === 'ar' ? 'rtl' : 'ltr'}>

                {/* Name row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>{a.firstName}</label>
                    <div style={{ position: 'relative' }}>
                      <User size={15} style={{ position: 'absolute', top: '50%', [ltr ? 'left' : 'right']: '1rem', transform: 'translateY(-50%)', color: '#aaa' }} />
                      <input type="text" required value={form.firstName} onChange={update('firstName')} placeholder={lang === 'ar' ? 'محمد' : 'John'}
                        style={{ ...inputStyle, [ltr ? 'paddingLeft' : 'paddingRight']: '2.75rem' }}
                        onFocus={e => e.target.style.borderColor = 'var(--color-teal-500)'}
                        onBlur={e => e.target.style.borderColor = '#ddd'} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>{a.lastName}</label>
                    <div style={{ position: 'relative' }}>
                      <User size={15} style={{ position: 'absolute', top: '50%', [ltr ? 'left' : 'right']: '1rem', transform: 'translateY(-50%)', color: '#aaa' }} />
                      <input type="text" required value={form.lastName} onChange={update('lastName')} placeholder={lang === 'ar' ? 'الأحمد' : 'Smith'}
                        style={{ ...inputStyle, [ltr ? 'paddingLeft' : 'paddingRight']: '2.75rem' }}
                        onFocus={e => e.target.style.borderColor = 'var(--color-teal-500)'}
                        onBlur={e => e.target.style.borderColor = '#ddd'} />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label style={labelStyle}>{a.email}</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={15} style={{ position: 'absolute', top: '50%', [ltr ? 'left' : 'right']: '1rem', transform: 'translateY(-50%)', color: '#aaa' }} />
                    <input type="email" name="email" autoComplete="username" required value={form.email} onChange={handleEmailChange} placeholder="you@example.com"
                      style={{ ...inputStyle, [ltr ? 'paddingLeft' : 'paddingRight']: '2.75rem', [ltr ? 'paddingRight' : 'paddingLeft']: (form.email && !emailError) ? '2.5rem' : '1rem', borderColor: emailError ? '#dc2626' : (form.email && !emailError) ? '#22c55e' : '#ddd' }}
                      onFocus={e => e.target.style.borderColor = emailError ? '#dc2626' : 'var(--color-teal-500)'}
                      onBlur={e => e.target.style.borderColor = emailError ? '#dc2626' : (form.email && !emailError) ? '#22c55e' : '#ddd'} />
                    {form.email && !emailError && (
                      <Check size={16} style={{ position: 'absolute', top: '50%', [ltr ? 'right' : 'left']: '0.85rem', transform: 'translateY(-50%)', color: '#22c55e' }} />
                    )}
                  </div>
                  {emailError && (
                    <div style={{ color: '#dc2626', fontSize: '0.65rem', marginTop: '0.3rem', fontWeight: 600, letterSpacing: '0.02em' }}>{emailError}</div>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label style={labelStyle}>{a.phone}</label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={15} style={{ position: 'absolute', top: '50%', [ltr ? 'left' : 'right']: '1rem', transform: 'translateY(-50%)', color: '#aaa' }} />
                    <input type="tel" name="phone" value={form.phone} onChange={handlePhoneChange} placeholder="+971 50 000 0000"
                      style={{ ...inputStyle, [ltr ? 'paddingLeft' : 'paddingRight']: '2.75rem', [ltr ? 'paddingRight' : 'paddingLeft']: (form.phone && !phoneError && form.phone.length > 5) ? '2.5rem' : '1rem', borderColor: phoneError ? '#dc2626' : (form.phone && !phoneError && form.phone.length > 5) ? '#22c55e' : '#ddd' }}
                      onNameFocus={e => e.target.style.borderColor = phoneError ? '#dc2626' : 'var(--color-teal-500)'}
                      onBlur={e => e.target.style.borderColor = phoneError ? '#dc2626' : (form.phone && !phoneError && form.phone.length > 5) ? '#22c55e' : '#ddd'} />
                    {form.phone && !phoneError && form.phone.length > 5 && (
                      <Check size={16} style={{ position: 'absolute', top: '50%', [ltr ? 'right' : 'left']: '0.85rem', transform: 'translateY(-50%)', color: '#22c55e' }} />
                    )}
                  </div>
                  {phoneError && (
                    <div style={{ color: '#dc2626', fontSize: '0.65rem', marginTop: '0.3rem', fontWeight: 600, letterSpacing: '0.02em' }}>{phoneError}</div>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label style={labelStyle}>{a.password}</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={15} style={{ position: 'absolute', top: '50%', [ltr ? 'left' : 'right']: '1rem', transform: 'translateY(-50%)', color: '#aaa' }} />
                    <input type={showPwd ? 'text' : 'password'} name="password" autoComplete="new-password" required value={form.password} onChange={handlePasswordChange} placeholder="Min. 8 characters"
                      style={{ ...inputStyle, [ltr ? 'paddingLeft' : 'paddingRight']: '2.75rem', [!ltr ? 'paddingLeft' : 'paddingRight']: '2.75rem', borderColor: passwordError ? '#dc2626' : (form.password && form.password.length >= 8) ? '#22c55e' : '#ddd' }}
                      onFocus={e => e.target.style.borderColor = passwordError ? '#dc2626' : 'var(--color-teal-500)'}
                      onBlur={e => e.target.style.borderColor = passwordError ? '#dc2626' : (form.password && form.password.length >= 8) ? '#22c55e' : '#ddd'} />
                    <button type="button" onClick={() => setShowPwd(v => !v)}
                      style={{ position: 'absolute', top: '50%', [ltr ? 'right' : 'left']: '1rem', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', padding: 0 }}>
                      {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                    {form.password && !passwordError && form.password.length >= 8 && (
                      <Check size={16} style={{ position: 'absolute', top: '50%', [ltr ? 'right' : 'left']: '3rem', transform: 'translateY(-50%)', color: '#22c55e' }} />
                    )}
                  </div>
                  {passwordError && (
                    <div style={{ color: '#dc2626', fontSize: '0.65rem', marginTop: '0.3rem', fontWeight: 600, letterSpacing: '0.02em' }}>{passwordError}</div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label style={labelStyle}>{a.confirmPassword}</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={15} style={{ position: 'absolute', top: '50%', [ltr ? 'left' : 'right']: '1rem', transform: 'translateY(-50%)', color: '#aaa' }} />
                    <input type={showPwd ? 'text' : 'password'} name="confirm-password" autoComplete="new-password" required value={form.confirmPassword} onChange={handleConfirmPasswordChange} placeholder="••••••••"
                      style={{ ...inputStyle, [ltr ? 'paddingLeft' : 'paddingRight']: '2.75rem', [ltr ? 'paddingRight' : 'paddingLeft']: (form.confirmPassword && !matchError) ? '2.5rem' : '1rem', borderColor: matchError ? '#dc2626' : (form.confirmPassword && !matchError) ? '#22c55e' : '#ddd' }}
                      onFocus={e => e.target.style.borderColor = matchError ? '#dc2626' : 'var(--color-teal-500)'}
                      onBlur={e => e.target.style.borderColor = matchError ? '#dc2626' : (form.confirmPassword && !matchError) ? '#22c55e' : '#ddd'} />
                    {form.confirmPassword && !matchError && (
                      <Check size={16} style={{ position: 'absolute', top: '50%', [ltr ? 'right' : 'left']: '0.85rem', transform: 'translateY(-50%)', color: '#22c55e' }} />
                    )}
                  </div>
                  {matchError && (
                    <div style={{ color: '#dc2626', fontSize: '0.65rem', marginTop: '0.3rem', fontWeight: 600, letterSpacing: '0.02em' }}>{matchError}</div>
                  )}
                </div>

                {/* Terms */}
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#999', textAlign: 'center', lineHeight: 1.6 }}>
                  {a.agreeText}{' '}
                  <Link to="/terms" style={{ color: 'var(--color-teal-600)', textDecoration: 'none' }}>{a.terms}</Link>
                  {' '}{a.and}{' '}
                  <Link to="/privacy-policy" style={{ color: 'var(--color-teal-600)', textDecoration: 'none' }}>{a.privacy}</Link>
                </p>

                {/* Submit */}
                <button type="submit" disabled={loading}
                  style={{ padding: '1.1rem', backgroundColor: loading ? '#8cbbba' : '#214e41', color: 'white', border: 'none', borderRadius: '6px', fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', transition: 'background-color 0.2s' }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = '#2d7070' }}
                  onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = '#214e41' }}>
                  {loading ? <span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> : <ArrowRight size={16} />}
                  {loading ? '...' : a.registerBtn}
                </button>
              </form>

              <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: '#777', marginTop: '1.5rem' }}>
                {a.hasAccount}{' '}
                <Link to="/login" style={{ color: '#214e41', fontWeight: 600, textDecoration: 'none' }}>{a.loginLink}</Link>
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
