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
      <main style={{ backgroundColor: '#faf8f3', minHeight: '100vh', paddingTop: '90px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
          <div style={{ width: '100%', maxWidth: '520px' }}>

            {/* Logo */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <Link to="/"><img src="/logo.png" alt="Soul Love & Earth" style={{ height: '64px', width: 'auto' }} /></Link>
              <h1 style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem',
                fontWeight: 500, color: '#214e41', marginTop: '1.5rem', marginBottom: '0.5rem'
              }}>{a.registerTitle}</h1>
              <p style={{
                fontFamily: 'Jost, sans-serif', fontSize: '0.95rem',
                color: '#888', fontWeight: 400
              }}>{a.registerSub}</p>
            </div>

            {/* Card */}
            <div style={{
              backgroundColor: 'white', borderRadius: '32px', padding: '3rem',
              boxShadow: '0 12px 40px rgba(33,78,65,0.06)', border: '1px solid rgba(33,78,65,0.05)'
            }}>
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
                        onFocus={e => { e.target.style.borderColor = '#d4a843'; e.target.style.boxShadow = '0 0 0 4px rgba(212, 168, 67, 0.1)'; }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(33,78,65,0.1)'; e.target.style.boxShadow = 'none'; }} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>{a.lastName}</label>
                    <div style={{ position: 'relative' }}>
                      <User size={15} style={{ position: 'absolute', top: '50%', [ltr ? 'left' : 'right']: '1rem', transform: 'translateY(-50%)', color: '#aaa' }} />
                      <input type="text" required value={form.lastName} onChange={update('lastName')} placeholder={lang === 'ar' ? 'الأحمد' : 'Smith'}
                        style={{ ...inputStyle, [ltr ? 'paddingLeft' : 'paddingRight']: '2.75rem' }}
                        onFocus={e => { e.target.style.borderColor = '#d4a843'; e.target.style.boxShadow = '0 0 0 4px rgba(212, 168, 67, 0.1)'; }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(33,78,65,0.1)'; e.target.style.boxShadow = 'none'; }} />
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
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.78rem', color: '#999', textAlign: 'center', lineHeight: 1.6, fontWeight: 400 }}>
                  {a.agreeText}{' '}
                  <Link to="/terms" style={{ color: '#d4a843', textDecoration: 'none', fontWeight: 500 }}>{a.terms}</Link>
                  {' '}{a.and}{' '}
                  <Link to="/privacy-policy" style={{ color: '#d4a843', textDecoration: 'none', fontWeight: 500 }}>{a.privacy}</Link>
                </p>

                {/* Submit */}
                <button type="submit" disabled={loading}
                  style={{
                    padding: '1.1rem', backgroundColor: loading ? '#8cbbba' : '#214e41',
                    color: '#faf8f3', border: 'none', borderRadius: '40px',
                    fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', fontWeight: 600,
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                    transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: '0 8px 25px rgba(33,78,65,0.15)'
                  }}
                  onMouseEnter={e => { if (!loading) { e.currentTarget.style.backgroundColor = '#d4a843'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(212,168,67,0.3)'; } }}
                  onMouseLeave={e => { if (!loading) { e.currentTarget.style.backgroundColor = '#214e41'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(33,78,65,0.15)'; } }}>
                  {loading ? <span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> : <ArrowRight size={18} strokeWidth={1.5} />}
                  {loading ? '...' : a.registerBtn}
                </button>
              </form>

              <p style={{ textAlign: 'center', fontFamily: 'Jost, sans-serif', fontSize: '0.92rem', color: '#777', marginTop: '1.5rem', fontWeight: 400 }}>
                {a.hasAccount}{' '}
                <Link to="/login" style={{ color: '#d4a843', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#214e41'} onMouseLeave={e => e.target.style.color = '#d4a843'}>{a.loginLink}</Link>
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

const labelStyle = {
  display: 'block',
  fontFamily: 'Jost, sans-serif', fontSize: '0.75rem', fontWeight: 600,
  letterSpacing: '0.1em', textTransform: 'uppercase', color: '#214e41', opacity: 0.7,
  marginBottom: '0.45rem'
}

const inputStyle = {
  width: '100%', padding: '1rem 1.25rem',
  border: '1.5px solid rgba(33,78,65,0.1)', borderRadius: '12px',
  fontFamily: 'Jost, sans-serif', fontSize: '1rem', color: '#214e41',
  outline: 'none', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  backgroundColor: '#ffffff', boxSizing: 'border-box'
}
