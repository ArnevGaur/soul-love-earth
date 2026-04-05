import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Check, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'
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

  const [loginFieldErrors, setLoginFieldErrors] = useState({})
  const [regFieldErrors, setRegFieldErrors] = useState({})

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email)
  const validatePhone = (phone) => phone.replace(/\D/g, '').length === 12 // 971 + 9 digits

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
    setLoginFieldErrors({})
    
    let errors = {}
    if (!loginEmail.trim()) {
      errors.email = lang === 'ar' ? 'يرجى إدخال البريد الإلكتروني' : 'Email is required'
    } else if (!validateEmail(loginEmail)) {
      errors.email = lang === 'ar' ? 'بريد إلكتروني غير صالح' : 'Invalid email format'
    }

    if (!loginPassword.trim()) {
      errors.password = lang === 'ar' ? 'يرجى إدخال كلمة المرور' : 'Password is required'
    }

    if (Object.keys(errors).length > 0) {
      setLoginFieldErrors(errors)
      alert(Object.values(errors).join('\n'))
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
    setRegFieldErrors({})

    let errors = {}
    if (!regForm.firstName.trim()) errors.firstName = lang === 'ar' ? 'مطلوب' : 'Required'
    
    if (!regForm.email.trim()) {
      errors.email = lang === 'ar' ? 'مطلوب' : 'Required'
    } else if (!validateEmail(regForm.email)) {
      errors.email = lang === 'ar' ? 'غير صالح' : 'Invalid format'
    }

    if (!validatePhone(regForm.phone)) {
      errors.phone = lang === 'ar' ? 'رقم غير صالح' : 'Invalid phone number'
    }

    if (!regForm.password) {
      errors.password = lang === 'ar' ? 'مطلوب' : 'Required'
    } else if (regForm.password.length < 8) {
      errors.password = lang === 'ar' ? 'الحد الأدنى 8 أحرف' : 'Minimum 8 characters'
    }

    if (regForm.password !== regForm.confirmPassword) {
      errors.confirmPassword = lang === 'ar' ? 'لا يتطابق' : 'Passwords do not match'
    }

    if (Object.keys(errors).length > 0) {
      setRegFieldErrors(errors)
      alert(Object.values(errors).join('\n'))
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
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          background: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(25px)',
          WebkitBackdropFilter: 'blur(25px)',
          isolation: 'isolate',
          border: 'none'
        }}
        dir={ltr ? 'ltr' : 'rtl'}
      >
        
        {/* Sign In form container */}
        <div className="form-container sign-in-container">
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <h1 className="auth-title">{a.loginTitle}</h1>
            
            {/* Social Buttons block (dummy for exact visual match described) */}
            <div className="social-container">
              <a href="https://www.facebook.com/Soullovenearth/" target="_blank" rel="noopener noreferrer" className="social-icon"><Facebook size={18} /></a>
              <a href="https://www.instagram.com/soullovenearth/" target="_blank" rel="noopener noreferrer" className="social-icon"><Instagram size={18} /></a>
              <a href="https://www.linkedin.com/company/soullovenearth/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="social-icon"><Linkedin size={18} /></a>
              <a href="https://www.youtube.com/@Soullovenearth" target="_blank" rel="noopener noreferrer" className="social-icon"><Youtube size={18} /></a>
            </div>
            
            <span className="auth-sub">{lang === 'ar' ? 'سجل الدخول لحسابك في Soul Love & Earth' : 'Sign in to your Soul Love & Earth account'}</span>
            
            {loginError && <div className="form-error">{loginError}</div>}
            
            <div className="input-group">
              <Mail size={15} className="input-icon" />
              <input type="email" placeholder=" " value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} style={{ borderColor: (loginFieldErrors.email || (loginEmail && !validateEmail(loginEmail))) ? '#c21807' : (loginEmail && validateEmail(loginEmail) ? '#22c55e' : '') }} required />
              <span className="fake-placeholder">{a.email || 'Email'} <span style={{ color: '#c21807' }}>*</span></span>
              {(loginFieldErrors.email || (loginEmail && !validateEmail(loginEmail))) && <div style={{ color: '#c21807', fontSize: '0.75rem', marginTop: '4px', textAlign: ltr ? 'left' : 'right', fontWeight: 600 }}>{loginFieldErrors.email || (lang === 'ar' ? 'نموذج غير صالح' : 'Invalid format')}</div>}
              {loginEmail && validateEmail(loginEmail) && <Check size={18} color="#22c55e" style={{ position: 'absolute', top: '21px', transform: 'translateY(-50%)', [ltr ? 'right' : 'left']: '12px', pointerEvents: 'none' }} />}
            </div>
            
            <div className="input-group">
              <Lock size={15} className="input-icon" />
              <input type={loginShowPwd ? 'text' : 'password'} placeholder=" " value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} style={{ borderColor: loginFieldErrors.password ? '#fca5a5' : '' }} required />
              <span className="fake-placeholder">{a.password || 'Password'} <span style={{ color: '#c21807' }}>*</span></span>
              <button type="button" className="pwd-toggle" onClick={() => setLoginShowPwd(!loginShowPwd)}>
                {loginShowPwd ? <Eye size={15} /> : <EyeOff size={15} />}
              </button>
              {loginFieldErrors.password && <div style={{ color: '#c21807', fontSize: '0.75rem', marginTop: '4px', textAlign: ltr ? 'left' : 'right', fontWeight: 600 }}>{loginFieldErrors.password}</div>}
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
              <a href="https://www.facebook.com/Soullovenearth/" target="_blank" rel="noopener noreferrer" className="social-icon"><Facebook size={18} /></a>
              <a href="https://www.instagram.com/soullovenearth/" target="_blank" rel="noopener noreferrer" className="social-icon"><Instagram size={18} /></a>
              <a href="https://www.linkedin.com/company/soullovenearth/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="social-icon"><Linkedin size={18} /></a>
              <a href="https://www.youtube.com/@Soullovenearth" target="_blank" rel="noopener noreferrer" className="social-icon"><Youtube size={18} /></a>
            </div>
            
            <span className="auth-sub">{lang === 'ar' ? 'انضم إلى مجتمع Soul Love & Earth الوعي' : 'Join the conscious community of Soul Love & Earth'}</span>
            
            {regError && <div className="form-error">{regError}</div>}
            
            <div className="input-row">
              <div className="input-group">
                <User size={15} className="input-icon" />
                <input type="text" placeholder=" " value={regForm.firstName} onChange={(e) => setRegForm({...regForm, firstName: e.target.value})} style={{ borderColor: regFieldErrors.firstName ? '#fca5a5' : '' }} required />
                <span className="fake-placeholder">{a.firstName || 'First Name'} <span style={{ color: '#c21807' }}>*</span></span>
                {regFieldErrors.firstName && <div style={{ color: '#c21807', fontSize: '0.75rem', marginTop: '4px', textAlign: ltr ? 'left' : 'right', fontWeight: 600 }}>{regFieldErrors.firstName}</div>}
              </div>
              <div className="input-group">
                <User size={15} className="input-icon" />
                <input type="text" placeholder={a.lastName || 'Last Name'} value={regForm.lastName} onChange={(e) => setRegForm({...regForm, lastName: e.target.value})} style={{ borderColor: regFieldErrors.lastName ? '#fca5a5' : '' }} />
                {regFieldErrors.lastName && <div style={{ color: '#c21807', fontSize: '0.75rem', marginTop: '4px', textAlign: ltr ? 'left' : 'right', fontWeight: 600 }}>{regFieldErrors.lastName}</div>}
              </div>
            </div>
            
            <div className="input-group">
              <Mail size={15} className="input-icon" />
              <input type="email" placeholder=" " value={regForm.email} onChange={(e) => setRegForm({...regForm, email: e.target.value})} style={{ borderColor: (regFieldErrors.email || (regForm.email && !validateEmail(regForm.email))) ? '#c21807' : (regForm.email && validateEmail(regForm.email) ? '#22c55e' : '') }} required />
              <span className="fake-placeholder">{a.email || 'Email'} <span style={{ color: '#c21807' }}>*</span></span>
              {(regFieldErrors.email || (regForm.email && !validateEmail(regForm.email))) && <div style={{ color: '#c21807', fontSize: '0.75rem', marginTop: '4px', textAlign: ltr ? 'left' : 'right', fontWeight: 600 }}>{regFieldErrors.email || (lang === 'ar' ? 'نموذج غير صالح' : 'Invalid format')}</div>}
              {regForm.email && validateEmail(regForm.email) && <Check size={18} color="#22c55e" style={{ position: 'absolute', top: '21px', transform: 'translateY(-50%)', [ltr ? 'right' : 'left']: '12px', pointerEvents: 'none' }} />}
            </div>

            <div className="input-group">
              {regForm.phone === '+971 ' && <span style={{ position: 'absolute', top: '12px', [ltr ? 'left' : 'right']: '80px', color: '#c21807', fontSize: '0.9rem', zIndex: 2, pointerEvents: 'none' }}>*</span>}
              <Phone size={15} className="input-icon" />
              <input type="tel" placeholder="+971" value={regForm.phone} onChange={handlePhoneChange} style={{ borderColor: (regFieldErrors.phone || (regForm.phone !== '+971 ' && regForm.phone.length > 5 && !validatePhone(regForm.phone))) ? '#c21807' : (regForm.phone !== '+971 ' && validatePhone(regForm.phone) ? '#22c55e' : '') }} required />
              {(regFieldErrors.phone || (regForm.phone !== '+971 ' && regForm.phone.length > 5 && !validatePhone(regForm.phone))) && <div style={{ color: '#c21807', fontSize: '0.75rem', marginTop: '4px', textAlign: ltr ? 'left' : 'right', fontWeight: 600 }}>{regFieldErrors.phone || (lang === 'ar' ? 'رقم غير صالح' : 'Invalid phone number')}</div>}
              {regForm.phone !== '+971 ' && validatePhone(regForm.phone) && <Check size={18} color="#22c55e" style={{ position: 'absolute', top: '21px', transform: 'translateY(-50%)', [ltr ? 'right' : 'left']: '12px', pointerEvents: 'none' }} />}
            </div>
            
            <div className="input-group">
              <Lock size={15} className="input-icon" />
              <input type={regShowPwd ? 'text' : 'password'} placeholder=" " value={regForm.password} onChange={(e) => setRegForm({...regForm, password: e.target.value})} style={{ borderColor: (regFieldErrors.password || (regForm.password && regForm.password.length < 8)) ? '#fca5a5' : '' }} required />
              <span className="fake-placeholder">{a.password || 'Password'} <span style={{ color: '#c21807' }}>*</span></span>
              <button type="button" className="pwd-toggle" onClick={() => setRegShowPwd(!regShowPwd)}>
                {regShowPwd ? <Eye size={15} /> : <EyeOff size={15} />}
              </button>
              {(regFieldErrors.password || (regForm.password && regForm.password.length < 8)) && <div style={{ color: '#c21807', fontSize: '0.75rem', marginTop: '4px', textAlign: ltr ? 'left' : 'right', fontWeight: 600 }}>{regFieldErrors.password || (lang === 'ar' ? 'الحد الأدنى 8 أحرف' : 'Minimum 8 characters')}</div>}
            </div>

            <div className="input-group">
              <Check size={15} className="input-icon" />
              <input type={regShowPwd ? 'text' : 'password'} placeholder=" " value={regForm.confirmPassword} onChange={(e) => setRegForm({...regForm, confirmPassword: e.target.value})} style={{ borderColor: (regFieldErrors.confirmPassword || (regForm.confirmPassword && regForm.password !== regForm.confirmPassword)) ? '#c21807' : (regForm.confirmPassword && regForm.password === regForm.confirmPassword && regForm.password.length >= 8 ? '#22c55e' : '') }} required />
              <span className="fake-placeholder">{a.confirmPassword || 'Confirm Password'} <span style={{ color: '#c21807' }}>*</span></span>
              {(regFieldErrors.confirmPassword || (regForm.confirmPassword && regForm.password !== regForm.confirmPassword)) && <div style={{ color: '#c21807', fontSize: '0.75rem', marginTop: '4px', textAlign: ltr ? 'left' : 'right', fontWeight: 600 }}>{regFieldErrors.confirmPassword || (lang === 'ar' ? 'لا يتطابق' : 'Passwords do not match')}</div>}
              {regForm.confirmPassword && regForm.password === regForm.confirmPassword && regForm.password.length >= 8 && <Check size={18} color="#22c55e" style={{ position: 'absolute', top: '21px', transform: 'translateY(-50%)', [ltr ? 'right' : 'left']: '12px', pointerEvents: 'none' }} />}
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
        <div className="overlay-container" style={{ 
          backdropFilter: 'blur(25px)', 
          WebkitBackdropFilter: 'blur(25px)', 
          isolation: 'isolate',
          boxShadow: '0 0 40px rgba(0,0,0,0.25)'
        }}>
          <div className="overlay" style={{ background: 'rgba(45, 106, 106, 0.5)' }}>
            
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
