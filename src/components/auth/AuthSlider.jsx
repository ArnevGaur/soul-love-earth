import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Check } from 'lucide-react'
import './AuthSlider.css'

export default function AuthSlider({ initialMode = 'signIn' }) {
  const { t, lang } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()
  const a = t.auth
  const ltr = lang !== 'ar'

  const [isRightPanelActive, setIsRightPanelActive] = useState(location.pathname === '/register')
  const [mounted, setMounted] = useState(false)

  // Login form state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginShowPwd, setLoginShowPwd] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  // Register form state
  const [regForm, setRegForm] = useState({ firstName: '', lastName: '', email: '', phone: '+971 ', password: '', confirmPassword: '' })
  const [regShowPwd, setRegShowPwd] = useState(false)
  const [regLoading, setRegLoading] = useState(false)
  const [regError, setRegError] = useState('')

  useEffect(() => {
    // Initial mount animation trigger
    const timer = setTimeout(() => setMounted(true), 20)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Sync external path changes (e.g. browser back button) with local state
    if (location.pathname === '/register' && !isRightPanelActive) {
      setIsRightPanelActive(true)
    } else if (location.pathname === '/login' && isRightPanelActive) {
      setIsRightPanelActive(false)
    }
  }, [location.pathname])

  const togglePanel = (mode) => {
    if (mode === 'signUp') {
      setIsRightPanelActive(true)
      window.history.replaceState(null, '', '/register')
    } else {
      setIsRightPanelActive(false)
      window.history.replaceState(null, '', '/login')
    }
  }

  // Common Phone Handler (Same as previously)
  const handlePhoneChange = (e) => {
    let value = e.target.value
    if (!value.startsWith('+971 ')) {
      value = '+971 ' + value.replace(/^\+971\s*/, '')
    }
    const digits = value.replace(/^\+971\s*/, '').replace(/\D/g, '').slice(0, 9)
    const formatPhoneNumber = (d) => {
      if (d.length <= 2) return d
      if (d.length <= 5) return `${d.slice(0, 2)} ${d.slice(2)}`
      return `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}`
    }
    setRegForm(f => ({ ...f, phone: digits.length > 0 ? '+971 ' + formatPhoneNumber(digits) : '+971 ' }))
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setLoginError('')
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError(lang === 'ar' ? 'يرجى إدخال البريد الإلكتروني وكلمة المرور' : 'Please enter your email and password')
      return
    }
    setLoginLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoginLoading(false)
    navigate('/')
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    setRegError('')
    if (!regForm.firstName.trim() || !regForm.email.trim() || !regForm.password.trim()) {
      setRegError(lang === 'ar' ? 'يرجى ملء الحقول المطلوبة' : 'Please fill all required fields')
      return
    }
    if (regForm.password !== regForm.confirmPassword) {
      setRegError(lang === 'ar' ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match')
      return
    }
    setRegLoading(true)
    await new Promise(r => setTimeout(r, 1400))
    setRegLoading(false)
    navigate('/')
  }

  return (
    <div className={`auth-bg ${isRightPanelActive ? 'signUp-mode' : 'signIn-mode'}`}>
      <div 
        className={`auth-container ${isRightPanelActive ? 'right-panel-active' : ''}`}
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        dir={ltr ? 'ltr' : 'rtl'}
      >
        
        {/* Sign In form container */}
        <div className="form-container sign-in-container">
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <h1 className="auth-title">{a.loginTitle}</h1>
            
            {/* Social Buttons block (dummy for exact visual match described) */}
            <div className="social-container">
              <a href="#" className="social-icon">f</a>
              <a href="#" className="social-icon">g+</a>
              <a href="#" className="social-icon">in</a>
            </div>
            
            <span className="auth-sub">{lang === 'ar' ? 'سجل الدخول لحسابك في Soul Love & Earth' : 'Sign in to your Soul Love & Earth account'}</span>
            
            {loginError && <div className="form-error">{loginError}</div>}
            
            <div className="input-group">
              <Mail size={15} className="input-icon" />
              <input type="email" placeholder={a.email} value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
            </div>
            
            <div className="input-group">
              <Lock size={15} className="input-icon" />
              <input type={loginShowPwd ? 'text' : 'password'} placeholder={a.password} value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
              <button type="button" className="pwd-toggle" onClick={() => setLoginShowPwd(!loginShowPwd)}>
                {loginShowPwd ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            
            <Link to="#" className="forgot-pass" style={{ textAlign: !ltr ? 'left' : 'right' }}>{a.forgotPassword}</Link>
            
            <button type="submit" className="main-btn solid-teal" disabled={loginLoading}>
              {loginLoading ? <span className="spinner" /> : <ArrowRight size={16} />}
              {loginLoading ? '...' : a.loginBtn}
            </button>

            {/* Mobile Toggle Link (visible only on small screens via CSS or handled by container size) */}
            <div className="mobile-toggle" style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem' }}>
              <span style={{ color: '#666' }}>{a.noAccount} </span>
              <button type="button" onClick={() => togglePanel('signUp')} style={{ background: 'none', border: 'none', color: '#2d6a6a', fontWeight: 'bold', cursor: 'pointer', padding: 0 }}>
                {a.registerLink}
              </button>
            </div>
          </form>
        </div>

        {/* Sign Up form container */}
        <div className="form-container sign-up-container">
          <form className="auth-form" onSubmit={handleRegisterSubmit}>
            <h1 className="auth-title">{a.registerTitle}</h1>
            
            <div className="social-container">
              <a href="#" className="social-icon">f</a>
              <a href="#" className="social-icon">g+</a>
              <a href="#" className="social-icon">in</a>
            </div>
            
            <span className="auth-sub">{lang === 'ar' ? 'انضم إلى مجتمع Soul Love & Earth الوعي' : 'Join the conscious community of Soul Love & Earth'}</span>
            
            {regError && <div className="form-error">{regError}</div>}
            
            <div className="input-row">
              <div className="input-group">
                <User size={15} className="input-icon" />
                <input type="text" placeholder={a.firstName} value={regForm.firstName} onChange={(e) => setRegForm({...regForm, firstName: e.target.value})} required />
              </div>
            </div>
            
            <div className="input-group">
              <Mail size={15} className="input-icon" />
              <input type="email" placeholder={a.email} value={regForm.email} onChange={(e) => setRegForm({...regForm, email: e.target.value})} required />
            </div>

            <div className="input-group">
              <Phone size={15} className="input-icon" />
              <input type="tel" placeholder="+971" value={regForm.phone} onChange={handlePhoneChange} required />
            </div>
            
            <div className="input-group">
              <Lock size={15} className="input-icon" />
              <input type={regShowPwd ? 'text' : 'password'} placeholder={a.password} value={regForm.password} onChange={(e) => setRegForm({...regForm, password: e.target.value})} required />
              <button type="button" className="pwd-toggle" onClick={() => setRegShowPwd(!regShowPwd)}>
                {regShowPwd ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            
            <button type="submit" className="main-btn solid-teal" disabled={regLoading}>
              {regLoading ? <span className="spinner" /> : <ArrowRight size={16} />}
              {regLoading ? '...' : a.registerBtn}
            </button>

            {/* Mobile Toggle Link */}
            <div className="mobile-toggle" style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem' }}>
              <span style={{ color: '#666' }}>{a.hasAccount} </span>
              <button type="button" onClick={() => togglePanel('signIn')} style={{ background: 'none', border: 'none', color: '#2d6a6a', fontWeight: 'bold', cursor: 'pointer', padding: 0 }}>
                {a.loginLink}
              </button>
            </div>
          </form>
        </div>

        {/* Overlay container handling the sliding panels */}
        <div className="overlay-container">
          <div className="overlay">
            
            <div className="overlay-panel overlay-left">
              <h1 className="overlay-title">{lang === 'ar' ? '!مرحباً بعودتك' : 'Welcome Back!'}</h1>
              <p className="overlay-desc">{lang === 'ar' ? 'للبقاء على اتصال معنا يرجى تسجيل الدخول بمعلوماتك الشخصية' : 'To keep connected with us please login with your personal info'}</p>
              <button className="main-btn outline-white" onClick={() => togglePanel('signIn')}>{a.loginBtn}</button>
            </div>
            
            <div className="overlay-panel overlay-right">
              <h1 className="overlay-title">{lang === 'ar' ? '!أهلاً بك يا صديقي' : 'Hello, Friend!'}</h1>
              <p className="overlay-desc">{lang === 'ar' ? 'أدخل التفاصيل الشخصية الخاصة بك وابدأ رحلة معنا' : 'Enter your personal details and start journey with us'}</p>
              <button className="main-btn outline-white" onClick={() => togglePanel('signUp')}>{a.registerBtn}</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
