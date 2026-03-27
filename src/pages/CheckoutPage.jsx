import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { ArrowLeft, CheckCircle2, Lock, ShoppingBag, CreditCard, Smartphone, Building2, ShieldCheck, Leaf, RotateCcw, Check } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

// Brand hex (matches src/index.css @theme: --color-teal-500, --color-gold-400, --color-teal-700)
const BRAND_TEAL = '#3d9089'
const BRAND_GOLD = '#d4a843'
const MID_DARK_GREEN = '#275e5a'
const REQUIRED_ASTERISK_RED = '#dc2626'

// ── Inline SVG payment logos (no external URLs needed) ──────────────────────
const VisaLogo = ({ h = 22, greyed }) => (
  <svg height={h} viewBox="0 0 750 471" xmlns="http://www.w3.org/2000/svg" style={{ opacity: greyed ? 0.45 : 1, filter: greyed ? 'grayscale(100%)' : 'none' }}>
    <rect width="750" height="471" rx="40" fill="#1A1F71"/>
    <text x="375" y="320" fontFamily="Arial,sans-serif" fontSize="210" fontWeight="bold" fill="white" textAnchor="middle">VISA</text>
  </svg>
)
const MastercardLogo = ({ h = 22, greyed }) => (
  <svg height={h} viewBox="0 0 131.39 86.9" xmlns="http://www.w3.org/2000/svg" style={{ opacity: greyed ? 0.45 : 1, filter: greyed ? 'grayscale(100%)' : 'none' }}>
    <circle cx="43.35" cy="43.45" r="43.35" fill="#EB001B"/>
    <circle cx="88.04" cy="43.45" r="43.35" fill="#F79E1B"/>
    <path d="M65.7 13.73a43.32 43.32 0 0 1 0 59.44 43.32 43.32 0 0 1 0-59.44z" fill="#FF5F00"/>
  </svg>
)
const AmexLogo = ({ h = 22, greyed }) => (
  <svg height={h} viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg" style={{ opacity: greyed ? 0.45 : 1, filter: greyed ? 'grayscale(100%)' : 'none' }}>
    <rect width="100" height="30" rx="4" fill="#2E77BC"/>
    <text x="50" y="21" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle" letterSpacing="1">AMEX</text>
  </svg>
)
const PayPalLogo = ({ h = 28, greyed }) => (
  <svg height={h} viewBox="0 0 124 33" xmlns="http://www.w3.org/2000/svg" style={{ opacity: greyed ? 0.45 : 1, filter: greyed ? 'grayscale(100%)' : 'none' }}>
    <text x="0" y="25" fontFamily="Arial,sans-serif" fontSize="22" fontWeight="bold" fill={greyed ? '#888' : '#003087'}>Pay</text>
    <text x="42" y="25" fontFamily="Arial,sans-serif" fontSize="22" fontWeight="bold" fill={greyed ? '#888' : '#009CDE'}>Pal</text>
  </svg>
)
const StripeLogo = ({ h = 24, greyed }) => (
  <svg height={h} viewBox="0 0 100 24" xmlns="http://www.w3.org/2000/svg" style={{ opacity: greyed ? 0.45 : 1, filter: greyed ? 'grayscale(100%)' : 'none' }}>
    <text x="0" y="18" fontFamily="Arial,sans-serif" fontSize="18" fontWeight="bold" fill={greyed ? '#888' : '#635BFF'} letterSpacing="-0.5">stripe</text>
  </svg>
)
// ─────────────────────────────────────────────────────────────────────────────

const paymentMethods = [
  {
    id: 'card',
    label: 'Credit / Debit Card',
    icon: <CreditCard size={18} strokeWidth={1.5} />,
    logos: (greyed) => <><VisaLogo greyed={greyed} /> <MastercardLogo greyed={greyed} /> <AmexLogo greyed={greyed} /></>
  },
  {
    id: 'paypal',
    label: 'PayPal',
    icon: <Smartphone size={18} strokeWidth={1.5} />,
    logos: (greyed) => <PayPalLogo greyed={greyed} />
  },
  {
    id: 'stripe',
    label: 'Stripe',
    icon: <Building2 size={18} strokeWidth={1.5} />,
    logos: (greyed) => <StripeLogo greyed={greyed} />
  },
]

const CARD_DIGITS_MAX = 16
const CVV_DIGITS_MAX = 3
const EXPIRY_DIGITS_MAX = 4

function formatCardDisplay(digits) {
  const d = String(digits).replace(/\D/g, '').slice(0, CARD_DIGITS_MAX)
  return d.replace(/(\d{4})(?=\d)/g, '$1 ').trim()
}

function CardNumberField({ cardDigits, setCardDigits, error, setError }) {
  const [focused, setFocused] = useState(false)
  const displayValue = formatCardDisplay(cardDigits)

  const handleChange = (e) => {
    const next = e.target.value.replace(/\D/g, '').slice(0, CARD_DIGITS_MAX)
    setCardDigits(next)
    if (error && next.length === CARD_DIGITS_MAX) setError('')
  }

  const handleBlur = () => {
    setFocused(false)
    if (cardDigits.length > 0 && cardDigits.length < CARD_DIGITS_MAX) {
      setError(`Card number must be ${CARD_DIGITS_MAX} digits.`)
    } else if (cardDigits.length === CARD_DIGITS_MAX) {
      setError('')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label htmlFor="cardnumber" style={{
        fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600,
        letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555',
      }}>
        Card Number<span style={{ color: REQUIRED_ASTERISK_RED, marginLeft: '3px' }}>*</span>
      </label>
      <input
        id="cardnumber"
        type="text"
        inputMode="numeric"
        autoComplete="cc-number"
        placeholder="1234  5678  9012  3456"
        value={displayValue}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={handleBlur}
        aria-invalid={!!error}
        aria-describedby={error ? 'cardnumber-error' : undefined}
        style={{
          width: '100%', padding: '0.85rem 1rem',
          border: `1.5px solid ${error ? '#dc2626' : focused ? MID_DARK_GREEN : '#ddd'}`,
          borderRadius: '6px',
          fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-charcoal)',
          outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s', backgroundColor: 'white',
          boxShadow: focused && !error ? '0 0 0 3px rgba(39, 94, 90, 0.12)' : 'none',
          boxSizing: 'border-box',
        }}
      />
      {error && (
        <p id="cardnumber-error" role="alert" style={{
          margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#dc2626', fontWeight: 500,
        }}>
          {error}
        </p>
      )}
    </div>
  )
}

function CvvField({ cvvDigits, setCvvDigits, error, setError }) {
  const [focused, setFocused] = useState(false)

  const handleChange = (e) => {
    const next = e.target.value.replace(/\D/g, '').slice(0, CVV_DIGITS_MAX)
    setCvvDigits(next)
    if (error && next.length === CVV_DIGITS_MAX) setError('')
  }

  const handleBlur = () => {
    setFocused(false)
    if (cvvDigits.length > 0 && cvvDigits.length < CVV_DIGITS_MAX) {
      setError(`CVV must be ${CVV_DIGITS_MAX} digits.`)
    } else if (cvvDigits.length === CVV_DIGITS_MAX) {
      setError('')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label htmlFor="cvv" style={{
        fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600,
        letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555',
      }}>
        CVV / Security Code<span style={{ color: REQUIRED_ASTERISK_RED, marginLeft: '3px' }}>*</span>
      </label>
      <input
        id="cvv"
        type="text"
        inputMode="numeric"
        autoComplete="cc-csc"
        placeholder="123"
        value={cvvDigits}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={handleBlur}
        aria-invalid={!!error}
        aria-describedby={error ? 'cvv-error' : undefined}
        style={{
          width: '100%', padding: '0.85rem 1rem',
          border: `1.5px solid ${error ? '#dc2626' : focused ? MID_DARK_GREEN : '#ddd'}`,
          borderRadius: '6px',
          fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-charcoal)',
          outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s', backgroundColor: 'white',
          boxShadow: focused && !error ? '0 0 0 3px rgba(39, 94, 90, 0.12)' : 'none',
          boxSizing: 'border-box',
        }}
      />
      {error && (
        <p id="cvv-error" role="alert" style={{
          margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#dc2626', fontWeight: 500,
        }}>
          {error}
        </p>
      )}
    </div>
  )
}

function formatExpiryDisplay(digits) {
  const d = String(digits).replace(/\D/g, '').slice(0, EXPIRY_DIGITS_MAX)
  if (d.length <= 2) return d
  return `${d.slice(0, 2)}/${d.slice(2)}`
}

function isValidExpiryDigits(digits) {
  if (digits.length !== EXPIRY_DIGITS_MAX) return false
  const month = Number(digits.slice(0, 2))
  return month >= 1 && month <= 12
}

function ExpiryField({ expiryDigits, setExpiryDigits, error, setError }) {
  const [focused, setFocused] = useState(false)
  const displayValue = formatExpiryDisplay(expiryDigits)

  const handleChange = (e) => {
    const next = e.target.value.replace(/\D/g, '').slice(0, EXPIRY_DIGITS_MAX)
    setExpiryDigits(next)
    if (error && isValidExpiryDigits(next)) setError('')
  }

  const handleBlur = () => {
    setFocused(false)
    if (expiryDigits.length > 0 && !isValidExpiryDigits(expiryDigits)) {
      setError('Expiry must be in MM/YY format.')
    } else if (isValidExpiryDigits(expiryDigits)) {
      setError('')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label htmlFor="expiry" style={{
        fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600,
        letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555',
      }}>
        Expiry Date<span style={{ color: REQUIRED_ASTERISK_RED, marginLeft: '3px' }}>*</span>
      </label>
      <input
        id="expiry"
        type="text"
        inputMode="numeric"
        autoComplete="cc-exp"
        placeholder="MM/YY"
        value={displayValue}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={handleBlur}
        aria-invalid={!!error}
        aria-describedby={error ? 'expiry-error' : undefined}
        style={{
          width: '100%', padding: '0.85rem 1rem',
          border: `1.5px solid ${error ? '#dc2626' : focused ? MID_DARK_GREEN : '#ddd'}`,
          borderRadius: '6px',
          fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-charcoal)',
          outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s', backgroundColor: 'white',
          boxShadow: focused && !error ? '0 0 0 3px rgba(39, 94, 90, 0.12)' : 'none',
          boxSizing: 'border-box',
        }}
      />
      {error && (
        <p id="expiry-error" role="alert" style={{
          margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#dc2626', fontWeight: 500,
        }}>
          {error}
        </p>
      )}
    </div>
  )
}

function CardholderField({ cardholderName, setCardholderName }) {
  const [focused, setFocused] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label htmlFor="cardholder" style={{
        fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600,
        letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555',
      }}>
        Name on Card<span style={{ color: REQUIRED_ASTERISK_RED, marginLeft: '3px' }}>*</span>
      </label>
      <input
        id="cardholder"
        type="text"
        required
        autoComplete="cc-name"
        placeholder="AS IT APPEARS ON CARD"
        value={cardholderName}
        onChange={(e) => setCardholderName(e.target.value.toUpperCase())}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%', padding: '0.85rem 1rem',
          border: `1.5px solid ${focused ? MID_DARK_GREEN : '#ddd'}`,
          borderRadius: '6px',
          fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-charcoal)',
          outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s', backgroundColor: 'white',
          boxShadow: focused ? '0 0 0 3px rgba(39, 94, 90, 0.12)' : 'none',
          boxSizing: 'border-box',
          textTransform: 'uppercase',
        }}
      />
    </div>
  )
}

function PhoneField() {
  const [focused, setFocused] = useState(false)
  const [phoneValue, setPhoneValue] = useState('+971 ')
  const [phoneError, setPhoneError] = useState('')

  const formatPhoneNumber = (digits) => {
    if (digits.length <= 2) return digits
    if (digits.length <= 5) return `${digits.slice(0, 2)} ${digits.slice(2)}`
    return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`
  }

  const handleChange = (e) => {
    let value = e.target.value
    
    // Always start with +971
    if (!value.startsWith('+971 ')) {
      value = '+971 ' + value.replace(/^\+971\s*/, '')
    }
    
    // Extract only digits after +971
    const digitsAfterCountry = value.replace(/^\+971\s*/, '').replace(/\D/g, '')
    
    // Limit to 9 digits after country code
    const limitedDigits = digitsAfterCountry.slice(0, 9)
    
    // Format the phone number with spacing
    if (limitedDigits.length > 0) {
      value = '+971 ' + formatPhoneNumber(limitedDigits)
    } else {
      value = '+971 '
    }
    
    setPhoneValue(value)
    
    // Validation
    if (limitedDigits.length > 0 && limitedDigits.length < 9) {
      setPhoneError('UAE mobile numbers must have 9 digits after +971.')
    } else if (limitedDigits.length === 9) {
      // Check if it starts with valid UAE mobile prefix (5, 3, or 6)
      const firstDigit = limitedDigits.charAt(0)
      if (!['5', '3', '6'].includes(firstDigit)) {
        setPhoneError('UAE mobile numbers must start with 5, 3, or 6 after +971.')
      } else {
        setPhoneError('')
      }
    } else {
      setPhoneError('')
    }
  }

  const isValidPhone = phoneValue.replace(/^\+971\s*/, '').replace(/\D/g, '').length === 9 && !phoneError

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label htmlFor="phone" style={{
        fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600,
        letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555',
      }}>
        Phone Number<span style={{ color: REQUIRED_ASTERISK_RED, marginLeft: '3px' }}>*</span>
      </label>
      <div style={{ position: 'relative' }}>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="+971 50 000 0000"
          value={phoneValue}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-invalid={!!phoneError}
          aria-describedby={phoneError ? 'phone-error' : undefined}
          style={{
            width: '100%', padding: '0.85rem 1rem',
            border: `1.5px solid ${phoneError ? '#dc2626' : focused ? MID_DARK_GREEN : '#ddd'}`,
            borderRadius: '6px',
            fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-charcoal)',
            outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s', backgroundColor: 'white',
            boxShadow: focused && !phoneError ? '0 0 0 3px rgba(39, 94, 90, 0.12)' : 'none',
            boxSizing: 'border-box',
            paddingRight: isValidPhone ? '2.45rem' : '1rem',
          }}
        />
        {isValidPhone && (
          <Check size={16} style={{ position: 'absolute', top: '50%', right: '0.85rem', transform: 'translateY(-50%)', color: '#22c55e' }} />
        )}
      </div>
      {phoneError && (
        <p id="phone-error" role="alert" style={{
          margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#dc2626', fontWeight: 500,
        }}>
          {phoneError}
        </p>
      )}
    </div>
  )
}

function EmailField() {
  const [focused, setFocused] = useState(false)
  const [emailValue, setEmailValue] = useState('')
  const [emailError, setEmailError] = useState('')

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleChange = (e) => {
    const value = e.target.value
    setEmailValue(value)
    if (value && !validateEmail(value)) {
      setEmailError('Please enter a valid email address.')
    } else {
      setEmailError('')
    }
  }

  const isValidEmail = emailValue !== '' && validateEmail(emailValue) && !emailError

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label htmlFor="email" style={{
        fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600,
        letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555',
      }}>
        Email Address<span style={{ color: REQUIRED_ASTERISK_RED, marginLeft: '3px' }}>*</span>
      </label>
      <div style={{ position: 'relative' }}>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="arjun@example.com"
          value={emailValue}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-invalid={!!emailError}
          aria-describedby={emailError ? 'email-error' : undefined}
          style={{
            width: '100%', padding: '0.85rem 1rem',
            border: `1.5px solid ${emailError ? '#dc2626' : focused ? MID_DARK_GREEN : '#ddd'}`,
            borderRadius: '6px',
            fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-charcoal)',
            outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s', backgroundColor: 'white',
            boxShadow: focused && !emailError ? '0 0 0 3px rgba(39, 94, 90, 0.12)' : 'none',
            boxSizing: 'border-box',
            paddingRight: isValidEmail ? '2.45rem' : '1rem',
          }}
        />
        {isValidEmail && (
          <Check size={16} style={{ position: 'absolute', top: '50%', right: '0.85rem', transform: 'translateY(-50%)', color: '#22c55e' }} />
        )}
      </div>
      {emailError && (
        <p id="email-error" role="alert" style={{
          margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#dc2626', fontWeight: 500,
        }}>
          {emailError}
        </p>
      )}
    </div>
  )
}

function FormField({ label, id, type = 'text', placeholder, required, autoComplete, half }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label htmlFor={id} style={{
        fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600,
        letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555',
      }}>
        {label}{required && <span style={{ color: REQUIRED_ASTERISK_RED, marginLeft: '3px' }}>*</span>}
      </label>
      <input
        id={id} name={id} type={type} placeholder={placeholder} required={required} autoComplete={autoComplete}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: '100%', padding: '0.85rem 1rem',
          border: `1.5px solid ${focused ? MID_DARK_GREEN : '#ddd'}`,
          borderRadius: '6px',
          fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-charcoal)',
          outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s', backgroundColor: 'white',
          boxShadow: focused ? '0 0 0 3px rgba(39, 94, 90, 0.12)' : 'none',
          boxSizing: 'border-box',
        }}
      />
    </div>
  )
}

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState('card')
  const [cardDigits, setCardDigits] = useState('')
  const [cardNumberError, setCardNumberError] = useState('')
  const [cardholderName, setCardholderName] = useState('')
  const [expiryDigits, setExpiryDigits] = useState('')
  const [expiryError, setExpiryError] = useState('')
  const [cvvDigits, setCvvDigits] = useState('')
  const [cvvError, setCvvError] = useState('')

  const handleCheckout = (e) => {
    e.preventDefault()
    if (cartItems.length === 0) return
    const formData = new FormData(e.currentTarget)
    const firstName = String(formData.get('fname') || '').trim()
    const lastName = String(formData.get('lname') || '').trim()
    const customerName = `${firstName} ${lastName}`.trim() || 'Valued Customer'

    if (selectedPayment === 'card') {
      if (cardDigits.length !== CARD_DIGITS_MAX) {
        setCardNumberError(`Card number must be ${CARD_DIGITS_MAX} digits.`)
        return
      }
      if (!isValidExpiryDigits(expiryDigits)) {
        setExpiryError('Expiry must be in MM/YY format.')
        return
      }
      if (cvvDigits.length !== CVV_DIGITS_MAX) {
        setCvvError(`CVV must be ${CVV_DIGITS_MAX} digits.`)
        return
      }
      setCardNumberError('')
      setExpiryError('')
      setCvvError('')
    }
    setIsProcessing(true)
    setTimeout(() => {
      if (selectedPayment === 'card') {
        const itemCount = cartItems.reduce((sum, item) => sum + (item?.quantity || 0), 0)
        clearCart()
        navigate('/order-placed', {
          state: {
            customerName,
            total: finalTotal,
            itemCount,
            placedAt: Date.now(),
          },
        })
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      setIsProcessing(false)
      setIsSuccess(true)
      clearCart()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 2000)
  }

  if (isSuccess) {
    return (
      <>
        <Navbar />
        <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#faf8f3', padding: '80px 2rem 4rem 2rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '600px' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'rgba(61,144,137,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto' }}>
              <CheckCircle2 size={52} color="#214e41" />
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--color-charcoal)', marginBottom: '1rem', fontWeight: 300 }}>
              Order Confirmed
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#777', marginBottom: '3rem', lineHeight: 1.7 }}>
              Thank you for choosing Soul Love & Earth. Your elegantly crafted pieces are being prepared. A confirmation email is on its way.
            </p>
            <Link to="/shop" style={{
              display: 'inline-block', padding: '1rem 3rem', backgroundColor: '#214e41', color: 'white',
              fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
              textDecoration: 'none', borderRadius: '4px', transition: 'background-color 0.2s',
            }}
              onMouseEnter={e => e.target.style.backgroundColor = '#2d7070'}
              onMouseLeave={e => e.target.style.backgroundColor = '#214e41'}
            >
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const shipping = cartTotal > 0 ? 15.00 : 0
  const finalTotal = cartTotal + shipping

  return (
    <>
      <Navbar />
      <style>{`
        .checkout-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
        .checkout-two-col { display: grid; grid-template-columns: 1fr; gap: 1rem; }
        .checkout-header-wrap { border-bottom: 1px solid rgba(61, 144, 137, 0.15); padding-bottom: 1.5rem; }
        .payment-option { transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s; }
        .payment-option:hover { border-color: var(--color-teal-500) !important; transform: translateY(-1px); }
        .checkout-trust-card { transition: border-color 0.2s, box-shadow 0.2s; }
        .checkout-trust-card:hover { border-color: rgba(61, 144, 137, 0.28); box-shadow: 0 8px 24px rgba(0,0,0,0.04); }
        .elegant-pill { border: 1px solid rgba(212, 168, 67, 0.55); color: #d4a843; background-color: rgba(212, 168, 67, 0.1); }
        .checkout-main-card { border: 1px solid rgba(44, 44, 44, 0.08); border-radius: 20px; background: rgba(255,255,255,0.9); box-shadow: 0 16px 42px rgba(0,0,0,0.05); }
        .checkout-form-card { backdrop-filter: blur(3px); }
        .summary-price-row { padding: 0.55rem 0; border-bottom: 1px dashed rgba(44,44,44,0.12); }
        .summary-price-row:last-child { border-bottom: none; }
        .checkout-field input { background-color: #fffcf6 !important; border-radius: 10px !important; border-color: rgba(44,44,44,0.14) !important; }
        .checkout-field input:focus { border-color: #7e6b3b !important; box-shadow: 0 0 0 3px rgba(126, 107, 59, 0.1) !important; }
        .checkout-field input[aria-invalid="true"] { border-color: #dc2626 !important; box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.12) !important; }
        .checkout-field input[aria-invalid="true"]:focus { border-color: #dc2626 !important; box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15) !important; }
        .checkout-side-note { border-left: 2px solid rgba(212,168,67,0.45); padding-left: 0.8rem; }
        @media (min-width: 900px) { .checkout-grid { grid-template-columns: 1.1fr 0.9fr; gap: 3rem; } }
        @media (min-width: 700px) { .checkout-two-col { grid-template-columns: 1fr 1fr; gap: 1.25rem; } }
      `}</style>

      <main style={{ background: 'linear-gradient(180deg, #fcfaf5 0%, #f5f0e6 100%)', minHeight: '100vh', paddingTop: '100px', paddingBottom: '5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>

          {/* Page Header */}
          <div className="checkout-header-wrap" style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(44,44,44,0.1)' }}>
            <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-teal-600)', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 500 }}>
              <ArrowLeft size={15} /> Back to Shop
            </Link>
            <div style={{ marginTop: '1rem', marginBottom: '0.6rem' }}>
              <span className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ width: '28px', height: '1px', backgroundColor: 'var(--color-gold-400)' }} />
                Checkout
              </span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.3rem, 4.4vw, 3.3rem)', fontWeight: 400, color: MID_DARK_GREEN, marginTop: 0, marginBottom: 0, letterSpacing: '0.01em' }}>
               Secure Checkout
             </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem' }}>
              <Lock size={13} color={BRAND_TEAL} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#888' }}>256-bit SSL encrypted & secure</span>
            </div>
          </div>

          <section className="checkout-main-card" style={{ marginBottom: '2rem', padding: '1.25rem 1.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.8rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <span className="elegant-pill" style={{ borderRadius: '999px', padding: '0.22rem 0.65rem', fontFamily: 'var(--font-body)', fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>
                  Checkout
                </span>
                <span style={{ width: '24px', height: '1px', backgroundColor: 'rgba(44,44,44,0.28)' }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#6e6655' }}>
                  Crafted pieces reserved for your order
                </span>
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: BRAND_GOLD, fontSize: '1.08rem' }}>
                Soul Love & Earth
              </span>
            </div>
          </section>

          <div className="checkout-grid" style={{ alignItems: 'start' }}>

            {/* LEFT COLUMN: Forms */}
            <form onSubmit={handleCheckout}>

              {/* Step 1: Contact */}
              <div className="checkout-form-card" style={cardStyle}>
                <SectionHeader number="1" title="Contact Information" />
                <div className="checkout-two-col">
                  <div className="checkout-field"><FormField id="fname" label="First Name" placeholder="Arjun" required autoComplete="given-name" /></div>
                  <div className="checkout-field"><FormField id="lname" label="Last Name" placeholder="Mehta" autoComplete="family-name" /></div>
                </div>
                <div className="checkout-two-col" style={{ marginTop: '1.25rem' }}>
                  <div className="checkout-field"><EmailField /></div>
                  <div className="checkout-field"><PhoneField /></div>
                </div>
              </div>

              {/* Step 2: Shipping */}
              <div className="checkout-form-card" style={{ ...cardStyle, marginTop: '1.5rem' }}>
                <SectionHeader number="2" title="Shipping Address" />
                <div className="checkout-two-col" style={{ marginBottom: '1.25rem' }}>
                  <div className="checkout-field"><FormField id="country" label="Country / Region" placeholder="United Arab Emirates" required autoComplete="country-name" /></div>
                  <div className="checkout-field"><FormField id="city" label="City" placeholder="Dubai" required autoComplete="address-level2" /></div>
                </div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <div className="checkout-field"><FormField id="address1" label="Street Address" placeholder="123 Conscious Living Street" required autoComplete="address-line1" /></div>
                </div>
                <div className="checkout-two-col">
                  <div className="checkout-field"><FormField id="address2" label="Apartment / Suite" placeholder="Apt 4B" required autoComplete="address-line2" /></div>
                  <div className="checkout-field"><FormField id="zip" label="Postal Code" placeholder="00000" required autoComplete="postal-code" /></div>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="checkout-form-card" style={{ ...cardStyle, marginTop: '1.5rem' }}>
                <SectionHeader number="3" title="Payment Method" />

                {/* Method selector tabs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                  {paymentMethods.map(method => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => {
                        setSelectedPayment(method.id)
                        if (method.id !== 'card') {
                          setCardNumberError('')
                          setExpiryError('')
                          setCvvError('')
                        }
                      }}
                      className="payment-option"
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '1rem 1.25rem',
                        border: selectedPayment === method.id ? '1.5px solid #7e6b3b' : '1px solid rgba(44,44,44,0.15)',
                        borderRadius: '12px',
                        backgroundColor: selectedPayment === method.id ? 'rgba(212,168,67,0.08)' : 'rgba(255,255,255,0.95)',
                        cursor: 'pointer', width: '100%',
                        boxShadow: selectedPayment === method.id ? '0 0 0 2px rgba(212,168,67,0.12)' : 'none',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          width: '20px', height: '20px', borderRadius: '50%',
                          border: `2px solid ${selectedPayment === method.id ? '#7e6b3b' : '#ccc'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                          {selectedPayment === method.id && <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#7e6b3b' }} />}
                        </div>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-charcoal)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {method.icon} {method.label}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        {method.logos(selectedPayment !== method.id)}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Card detail fields (shown only when card is selected) */}
                {selectedPayment === 'card' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '1.5rem', backgroundColor: '#fdfaf2', borderRadius: '12px', border: '1px dashed rgba(126,107,59,0.35)' }}>
                    <div className="checkout-field">
                      <CardNumberField
                        cardDigits={cardDigits}
                        setCardDigits={setCardDigits}
                        error={cardNumberError}
                        setError={setCardNumberError}
                      />
                    </div>
                    <div className="checkout-two-col">
                      <div className="checkout-field">
                        <ExpiryField
                          expiryDigits={expiryDigits}
                          setExpiryDigits={setExpiryDigits}
                          error={expiryError}
                          setError={setExpiryError}
                        />
                      </div>
                      <div className="checkout-field">
                        <CvvField
                          cvvDigits={cvvDigits}
                          setCvvDigits={setCvvDigits}
                          error={cvvError}
                          setError={setCvvError}
                        />
                      </div>
                    </div>
                    <div className="checkout-field">
                      <CardholderField cardholderName={cardholderName} setCardholderName={setCardholderName} />
                    </div>
                  </div>
                )}
                {selectedPayment === 'paypal' && (
                  <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#fdfaf2', borderRadius: '12px', border: '1px dashed rgba(126,107,59,0.35)' }}>
                    <div style={{ marginBottom: '1rem' }}><PayPalLogo h={44} /></div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: '#777' }}>You will be redirected to PayPal to complete your payment securely.</p>
                  </div>
                )}
                {selectedPayment === 'stripe' && (
                  <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#fdfaf2', borderRadius: '12px', border: '1px dashed rgba(126,107,59,0.35)' }}>
                    <div style={{ marginBottom: '1rem' }}><StripeLogo h={36} /></div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: '#777' }}>You will be securely redirected to the Stripe payment portal to complete your order.</p>
                  </div>
                )}

                {/* All payment logos row */}
                <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                  <VisaLogo greyed />
                  <MastercardLogo greyed />
                  <AmexLogo greyed />
                  <PayPalLogo greyed />
                  <StripeLogo greyed />
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={isProcessing || cartItems.length === 0}
                style={{
                  width: '100%',
                  marginTop: '1.75rem',
                  padding: '1.25rem',
                  backgroundColor: (isProcessing || cartItems.length === 0) ? '#c5d9d6' : BRAND_TEAL,
                  color: 'white',
                  fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
                  border: `1px solid ${(isProcessing || cartItems.length === 0) ? 'rgba(61,144,137,0.2)' : 'rgba(255,255,255,0.2)'}`, borderRadius: '8px',
                  cursor: (isProcessing || cartItems.length === 0) ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                  boxShadow: (isProcessing || cartItems.length === 0) ? 'none' : '0 10px 26px rgba(61, 144, 137, 0.28)',
                }}
                onMouseEnter={e => { if (!isProcessing && cartItems.length > 0) { e.currentTarget.style.backgroundColor = BRAND_GOLD; e.currentTarget.style.boxShadow = '0 12px 30px rgba(212, 168, 67, 0.35)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; } }}
                onMouseLeave={e => { if (!isProcessing && cartItems.length > 0) { e.currentTarget.style.backgroundColor = BRAND_TEAL; e.currentTarget.style.boxShadow = '0 10px 26px rgba(61, 144, 137, 0.28)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; } }}
              >
                {isProcessing
                  ? <><span style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid white', borderTopColor: 'transparent', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} /> Processing…</>
                  : <><Lock size={14} /> Pay AED {(finalTotal || 0).toFixed(2)}</>
                }
              </button>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </form>

            {/* RIGHT COLUMN: Order Summary */}
            <div style={{ position: 'sticky', top: '100px' }}>
              <div className="checkout-form-card" style={cardStyle}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--color-charcoal)', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 400 }}>
                  <ShoppingBag size={22} color="var(--color-gold-400)" />
                  Order Summary
                </h3>

                {cartItems.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '5rem 2rem', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(61,144,137,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto' }}>
                      <ShoppingBag size={32} color="#3d9089" />
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#1a2e2c', marginBottom: '1rem', fontWeight: 400 }}>Your cart is empty</h2>
                    <p style={{ fontFamily: 'var(--font-body)', color: '#777', marginBottom: '2.5rem', maxWidth: '400px', margin: '0 auto 2.5rem auto' }}>Add some of our elegantly crafted pieces to your cart before proceeding to checkout.</p>
                    <Link to="/shop" style={{
                      display: 'inline-block', padding: '1rem 2.5rem', backgroundColor: '#2c635a', color: 'white',
                      fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
                      textDecoration: 'none', borderRadius: '40px', transition: 'all 0.3s ease',
                      boxShadow: '0 8px 25px rgba(44, 99, 90, 0.12)',
                    }}>Return to Shop</Link>
                  </div>
                ) : (
                  <>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      {cartItems.map(item => {
                        if (!item) return null
                        return (
                          <li key={item.product_id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ position: 'relative', flexShrink: 0 }}>
                              <img src={item.thumb} alt={item.name} style={{ width: '72px', height: '72px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #eaeaea' }} />
                              <span style={{
                                position: 'absolute', top: '-8px', right: '-8px',
                                backgroundColor: 'var(--color-charcoal)', color: 'white',
                                width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%',
                                fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600,
                              }}>{item.quantity}</span>
                            </div>
                            <div style={{ flex: 1 }}>
                              <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'var(--color-charcoal)', fontWeight: 600, margin: '0 0 0.2rem 0' }}>{item.name}</h4>
                              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#aaa' }}>Qty {item.quantity}</span>
                            </div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'var(--color-teal-600)', fontWeight: 600 }}>
                              {item.special || item.price}
                            </div>
                          </li>
                        )
                      })}
                    </ul>

                    <div style={{ borderTop: '1px solid #eee', paddingTop: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      <div className="summary-price-row" style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#777' }}>
                        <span>Subtotal</span>
                        <span style={{ color: 'var(--color-charcoal)' }}>AED {(cartTotal || 0).toFixed(2)}</span>
                      </div>
                      <div className="summary-price-row" style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#777' }}>
                        <span>Shipping</span>
                        <span style={{ color: '#2c635a', fontWeight: 500 }}>AED {(shipping || 0).toFixed(2)}</span>
                      </div>
                    </div>
 
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', paddingTop: '1.1rem', borderTop: '2px solid #eee' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--color-charcoal)', fontWeight: 600 }}>Total</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '1.8rem', color: '#2c635a', fontWeight: 700, letterSpacing: '-0.02em' }}>AED {(finalTotal || 0).toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Trust Badges */}
              <div className="checkout-trust-card" style={{ marginTop: '1.5rem', padding: '1.25rem', backgroundColor: 'white', borderRadius: '12px', border: '1px solid rgba(61, 144, 137, 0.16)', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                <div className="checkout-side-note" style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#7a6a4a', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                  Why shop with us
                </div>
                {[
                  { icon: <ShieldCheck size={16} color="var(--color-teal-600)" />, text: 'Secured by 256-bit SSL encryption' },
                  { icon: <Leaf size={16} color="var(--color-teal-600)" />, text: 'Sustainably packaged & shipped' },
                  { icon: <RotateCcw size={16} color="var(--color-teal-600)" />, text: 'Free returns within 30 days' },
                ].map(({ icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#5c5c5c' }}>
                    <span>{icon}</span><span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

const cardStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.94)',
  borderRadius: '20px',
  padding: '2rem',
  border: '1px solid rgba(44, 44, 44, 0.08)',
  boxShadow: '0 16px 40px rgba(0,0,0,0.05)',
}

function SectionHeader({ number, title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
      <div style={{
        width: '32px', height: '32px', borderRadius: '50%',
        background: MID_DARK_GREEN, color: 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 700, flexShrink: 0,
      }}>{number}</div>
      <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.96rem', color: MID_DARK_GREEN, fontWeight: 600, margin: 0, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{title}</h3>
    </div>
  )
}
