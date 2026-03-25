import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ShoppingBag, Search } from 'lucide-react'

const navLinks = [
  { label: 'Home',       href: '/' },
  { label: 'Shop',       href: '/shop' },
  { label: 'Our Story',  href: '/story' },
  { label: 'Wholesale',  href: '/wholesale' },
  { label: 'Contact',    href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.4s ease',
          backgroundColor: scrolled ? 'rgba(250, 248, 243, 0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(61, 144, 137, 0.15)' : '1px solid transparent',
          padding: scrolled ? '0.75rem 2rem' : '1.5rem 2rem',
        }}
      >
        <nav style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <img
              src="/logo.png"
              alt="Soul Love & Earth"
              style={{ height: scrolled ? '40px' : '52px', transition: 'height 0.4s ease', width: 'auto' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: scrolled ? '1.1rem' : '1.3rem',
                fontWeight: 500,
                color: '#3d9089',
                transition: 'font-size 0.4s ease',
                letterSpacing: '0.02em',
              }}>
                Soul Love & Earth
              </span>
              <span style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.6rem',
                fontWeight: 400,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#d4a843',
                opacity: scrolled ? 0 : 1,
                transition: 'opacity 0.3s ease',
              }}>
                Conscious Living
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0 }}
              className="hidden-mobile">
            {navLinks.map(link => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  style={{
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#ffffff',
                    textDecoration: 'none',
                    paddingBottom: '2px',
                    borderBottom: '1px solid transparent',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.target.style.color = '#3d9089'
                    e.target.style.borderBottomColor = '#d4a843'
                  }}
                  onMouseLeave={e => {
                    e.target.style.color = '#ffffff'
                    e.target.style.borderBottomColor = 'transparent'
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <button
              aria-label="Search"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ffffff', padding: '4px', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#3d9089'}
              onMouseLeave={e => e.currentTarget.style.color = '#ffffff'}
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            <button
              aria-label="Cart"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ffffff', padding: '4px', position: 'relative', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#3d9089'}
              onMouseLeave={e => e.currentTarget.style.color = '#ffffff'}
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: '#d4a843',
                color: 'white',
                fontSize: '0.55rem',
                fontFamily: 'Jost, sans-serif',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>0</span>
            </button>

            {/* Mobile hamburger */}
            <button
              aria-label="Menu"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ffffff', padding: '4px', display: 'none' }}
              className="show-mobile"
            >
              {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#faf8f3',
        zIndex: 99,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2rem',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {navLinks.map((link, i) => (
          <Link
            key={link.label}
            to={link.href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '2.5rem',
              fontWeight: 400,
              color: '#ffffff',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'color 0.2s',
              animationDelay: `${i * 0.06}s`,
            }}
            onMouseEnter={e => e.target.style.color = '#3d9089'}
            onMouseLeave={e => e.target.style.color = '#ffffff'}
          >
            {link.label}
          </Link>
        ))}
        <span style={{
          fontFamily: 'Jost, sans-serif',
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#d4a843',
          marginTop: '1rem',
        }}>
          Conscious Living
        </span>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  )
}