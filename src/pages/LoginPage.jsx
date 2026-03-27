import { useState } from 'react'
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
      <main style={{ backgroundColor: '#faf8f3', minHeight: '100vh', paddingTop: '72px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
          <div style={{ width: '100%', maxWidth: '460px' }}>

            {/* Logo */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <Link to="/"><img src="/logo.png" alt="Soul Love & Earth" style={{ height: '56px', width: 'auto' }} /></Link>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 300, color: 'var(--color-charcoal)', marginTop: '1.25rem', marginBottom: '0.4rem' }}>{a.loginTitle}</h1>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: '#999' }}>{a.loginSub}</p>
            </div>

            {/* Card */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '2.5rem', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: '1px solid #ece8e0' }}>
              {error && (
                <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '6px', padding: '0.85rem 1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#dc2626' }}>{error}</div>
              )}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                {/* Email */}
                <div>
                  <label style={labelStyle}>{a.email}</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={15} style={{ position: 'absolute', top: '50%', [lang === 'ar' ? 'right' : 'left']: '1rem', transform: 'translateY(-50%)', color: '#aaa' }} />
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                      style={{ ...inputStyle, [lang === 'ar' ? 'paddingRight' : 'paddingLeft']: '2.75rem' }}
                      onFocus={e => e.target.style.borderColor = 'var(--color-teal-500)'}
                      onBlur={e => e.target.style.borderColor = '#ddd'} />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <label style={labelStyle}>{a.password}</label>
                    <Link to="#" style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#214e41', textDecoration: 'none' }}>{a.forgotPassword}</Link>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Lock size={15} style={{ position: 'absolute', top: '50%', [lang === 'ar' ? 'right' : 'left']: '1rem', transform: 'translateY(-50%)', color: '#aaa' }} />
                    <input type={showPwd ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
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
                <div style={{ flex: 1, height: '1px', backgroundColor: '#eee' }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#ccc' }}>OR</span>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#eee' }} />
              </div>

              <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: '#777' }}>
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
