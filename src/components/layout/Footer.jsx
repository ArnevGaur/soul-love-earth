import { Link } from 'react-router-dom'
import { Instagram, Facebook, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { useState } from 'react'

const footerLinks = {
  Shop: [
    { label: 'Earthen Cookware', href: '/shop?cat=1' },
    { label: 'Copperware', href: '/shop?cat=2' },
    { label: 'Home Décor', href: '/shop?cat=3' },
    { label: 'Hotel Amenities', href: '/shop?cat=4' },
    { label: 'Handmade Footwear', href: '/shop?cat=5' },
    { label: 'Wellness', href: '/shop?cat=6' },
  ],
  Company: [
    { label: 'Our Story', href: '/story' },
    { label: 'Offers', href: '/offers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact Us', href: '/contact' },
  ],
  'Legal & Privacy': [
    { label: 'Pricing & Delivery', href: '/pricing-delivery' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Return Policy', href: '/return-policy' },
    { label: 'Report a Scam', href: '/report-scam' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Review Terms', href: '/review-terms' },
  ],
}

const socials = [
  { icon: Instagram, href: 'https://www.instagram.com/soullovenearth/', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/Soullovenearth/', label: 'Facebook' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/94155329', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://www.youtube.com/@Soullovenearth', label: 'YouTube' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer style={{ backgroundColor: '#0f1f1e', color: '#faf8f3' }}>

      {/* Newsletter Banner */}
      <div style={{
        backgroundColor: '#3d9089',
        padding: '3rem 2rem',
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
          flexWrap: 'wrap',
        }}>
          <div>
            <h3 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.75rem',
              fontWeight: 400,
              color: 'white',
              marginBottom: '0.3rem',
            }}>
              Join the Conscious Community
            </h3>
            <p style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.82rem',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.8)',
            }}>
              Get eco tips, new arrivals, and artisan stories delivered to your inbox.
            </p>
          </div>

          {subscribed ? (
            <div style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.82rem',
              color: 'white',
              backgroundColor: 'rgba(255,255,255,0.15)',
              padding: '0.85rem 1.5rem',
              letterSpacing: '0.05em',
            }}>
              ✓ Thank you for subscribing!
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              style={{ display: 'flex', gap: '0', flexShrink: 0 }}
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                style={{
                  padding: '0.85rem 1.25rem',
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '0.82rem',
                  fontWeight: 300,
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: 'white',
                  width: '260px',
                  backdropFilter: 'blur(4px)',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '0.85rem 1.5rem',
                  backgroundColor: '#d4a843',
                  color: 'white',
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b8902e'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#d4a843'}
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '4rem 2rem 3rem',
        display: 'grid',
        gridTemplateColumns: '1.8fr 1fr 1fr 1.2fr',
        gap: '2.5rem',
      }}
        className="footer-grid"
      >

        {/* Brand Column */}
        <div>
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '1.25rem' }}>
            <img src="/logo.png" alt="Soul Love & Earth" style={{ height: '52px', width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
          </Link>
          <p style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.82rem',
            fontWeight: 300,
            lineHeight: 1.85,
            color: 'rgba(250,248,243,0.55)',
            marginBottom: '1.75rem',
            maxWidth: '280px',
          }}>
            A sustainability-focused lifestyle brand dedicated to eco-conscious living through thoughtfully curated products for homes and hospitality.
          </p>

          {/* Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.75rem' }}>
            {[
              { icon: Mail, text: 'hospitality@soullovenearth.com' },
              { icon: Mail, text: 'customersupport@soullovenearth.com' },
              { icon: Phone, text: '+971 56 750 7224 | +971 58 852 5146' },
              { icon: MapPin, text: 'Building A5, Office 121, Dubai South HQ, U.A.E.' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Icon size={13} strokeWidth={1.5} color="#d4a843" />
                <span style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '0.78rem',
                  fontWeight: 300,
                  color: 'rgba(250,248,243,0.55)',
                }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Socials */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width: '34px',
                  height: '34px',
                  border: '1px solid rgba(250,248,243,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(250,248,243,0.55)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#d4a843'
                  e.currentTarget.style.color = '#d4a843'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(250,248,243,0.15)'
                  e.currentTarget.style.color = 'rgba(250,248,243,0.55)'
                }}
              >
                <Icon size={14} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Link Columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <h4 style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#d4a843',
              marginBottom: '1.25rem',
            }}>
              {heading}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {links.map(link => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '0.82rem',
                      fontWeight: 300,
                      color: 'rgba(250,248,243,0.55)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.target.style.color = '#faf8f3'}
                    onMouseLeave={e => e.target.style.color = 'rgba(250,248,243,0.55)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: '1px solid rgba(250,248,243,0.08)',
        padding: '1.25rem 2rem',
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}>
          <span style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.72rem',
            fontWeight: 300,
            color: 'rgba(250,248,243,0.35)',
          }}>
            © {new Date().getFullYear()} Soul Love &amp; Earth. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {[
              { label: 'Privacy Policy', to: '/privacy-policy' },
              { label: 'Terms', to: '/terms' },
              { label: 'Return Policy', to: '/return-policy' },
            ].map(item => (
              <Link
                key={item.label}
                to={item.to}
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '0.72rem',
                  fontWeight: 300,
                  color: 'rgba(250,248,243,0.35)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = 'rgba(250,248,243,0.7)'}
                onMouseLeave={e => e.target.style.color = 'rgba(250,248,243,0.35)'}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
        input::placeholder { color: rgba(255,255,255,0.5); }
      `}</style>
    </footer>
  )
}