import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { useLanguage } from '../context/LanguageContext'
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight } from 'lucide-react'

export default function RegisterPage() {
  const { t, lang } = useLanguage()
  const navigate = useNavigate()
  const a = t.auth
  const ltr = lang !== 'ar'
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

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
      <main style={{ backgroundColor: '#faf8f3', minHeight: '100vh', paddingTop: '72px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
          <div style={{ width: '100%', maxWidth: '520px' }}>

            {/* Logo */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <Link to="/"><img src="/logo.png" alt="Soul Love & Earth" style={{ height: '56px', width: 'auto' }} /></Link>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 300, color: 'var(--color-charcoal)', marginTop: '1.25rem', marginBottom: '0.4rem' }}>{a.registerTitle}</h1>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: '#999' }}>{a.registerSub}</p>
            </div>

            {/* Card */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '2.5rem', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: '1px solid #ece8e0' }}>
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
                    <input type="email" required value={form.email} onChange={update('email')} placeholder="you@example.com"
                      style={{ ...inputStyle, [ltr ? 'paddingLeft' : 'paddingRight']: '2.75rem' }}
                      onFocus={e => e.target.style.borderColor = 'var(--color-teal-500)'}
                      onBlur={e => e.target.style.borderColor = '#ddd'} />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label style={labelStyle}>{a.phone}</label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={15} style={{ position: 'absolute', top: '50%', [ltr ? 'left' : 'right']: '1rem', transform: 'translateY(-50%)', color: '#aaa' }} />
                    <input type="tel" value={form.phone} onChange={update('phone')} placeholder="+971 50 000 0000"
                      style={{ ...inputStyle, [ltr ? 'paddingLeft' : 'paddingRight']: '2.75rem' }}
                      onFocus={e => e.target.style.borderColor = 'var(--color-teal-500)'}
                      onBlur={e => e.target.style.borderColor = '#ddd'} />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label style={labelStyle}>{a.password}</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={15} style={{ position: 'absolute', top: '50%', [ltr ? 'left' : 'right']: '1rem', transform: 'translateY(-50%)', color: '#aaa' }} />
                    <input type={showPwd ? 'text' : 'password'} required value={form.password} onChange={update('password')} placeholder="Min. 8 characters"
                      style={{ ...inputStyle, [ltr ? 'paddingLeft' : 'paddingRight']: '2.75rem', [!ltr ? 'paddingLeft' : 'paddingRight']: '2.75rem' }}
                      onFocus={e => e.target.style.borderColor = 'var(--color-teal-500)'}
                      onBlur={e => e.target.style.borderColor = '#ddd'} />
                    <button type="button" onClick={() => setShowPwd(v => !v)}
                      style={{ position: 'absolute', top: '50%', [ltr ? 'right' : 'left']: '1rem', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', padding: 0 }}>
                      {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label style={labelStyle}>{a.confirmPassword}</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={15} style={{ position: 'absolute', top: '50%', [ltr ? 'left' : 'right']: '1rem', transform: 'translateY(-50%)', color: '#aaa' }} />
                    <input type={showPwd ? 'text' : 'password'} required value={form.confirmPassword} onChange={update('confirmPassword')} placeholder="••••••••"
                      style={{ ...inputStyle, [ltr ? 'paddingLeft' : 'paddingRight']: '2.75rem' }}
                      onFocus={e => e.target.style.borderColor = 'var(--color-teal-500)'}
                      onBlur={e => e.target.style.borderColor = '#ddd'} />
                  </div>
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
