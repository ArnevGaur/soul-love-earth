import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, ShoppingBag, Search, Loader2 } from 'lucide-react'
import { fetchProducts } from '../../services/opencart'

const navLinks = [
  { label: 'Home',       href: '/' },
  { label: 'Shop',       href: '/shop' },
  { label: 'Our Story',  href: '/story' },
  { label: 'Offers',     href: '/offers' },
  { label: 'Blog',       href: '/blog' },
  { label: 'Contact',    href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && searchOpen) setSearchOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [searchOpen])

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }
    setIsSearching(true)
    const timer = setTimeout(async () => {
      try {
        const results = await fetchProducts({ search: searchQuery.trim() })
        setSearchResults(results.slice(0, 5))
      } catch (err) {
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

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
          padding: scrolled ? '0.75rem 2rem' : '0.875rem 2rem',
        }}
      >
        <nav style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <img
              src="/logo.png"
              alt="Soul Love & Earth"
              style={{ height: scrolled ? '40px' : '52px', transition: 'height 0.4s ease', width: 'auto' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>
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
                    color: '#0f1f1e',
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
                    e.target.style.color = '#0f1f1e'
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
               onClick={() => setSearchOpen(!searchOpen)}
               style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0f1f1e', padding: '4px', transition: 'color 0.2s' }}
               onMouseEnter={e => e.currentTarget.style.color = '#3d9089'}
               onMouseLeave={e => e.currentTarget.style.color = '#0f1f1e'}
             >
              {searchOpen ? <X size={18} strokeWidth={1.5} /> : <Search size={18} strokeWidth={1.5} />}
            </button>

            <button
              aria-label="Cart"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0f1f1e', padding: '4px', position: 'relative', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#3d9089'}
              onMouseLeave={e => e.currentTarget.style.color = '#0f1f1e'}
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
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0f1f1e', padding: '4px', display: 'none' }}
              className="show-mobile"
            >
              {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>

          {/* Dropdown Search Widget */}
          {searchOpen && (
            <div 
              className="search-dropdown"
              style={{
                position: 'absolute',
                top: 'calc(100% + 15px)',
                right: '0',
                width: '380px',
                maxWidth: 'calc(100vw - 40px)',
                backgroundColor: 'white',
                borderRadius: '4px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                border: '1px solid rgba(61, 144, 137, 0.1)',
                overflow: 'hidden',
                zIndex: 1000,
              }}
            >
              {/* Search Input */}
              <form onSubmit={handleSearchSubmit} style={{ borderBottom: '1px solid rgba(61, 144, 137, 0.1)', display: 'flex', alignItems: 'center' }}>
                <Search size={18} color="var(--color-teal-500)" style={{ margin: '0 0.5rem 0 1rem', flexShrink: 0 }} />
                <input 
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '1.2rem 1rem 1.2rem 0.5rem',
                    border: 'none',
                    outline: 'none',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    color: 'var(--color-charcoal)',
                  }}
                />
                {isSearching && (
                  <Loader2 size={16} color="var(--color-gold-400)" style={{ marginRight: '1rem', animation: 'spin 1s linear infinite', flexShrink: 0 }} />
                )}
              </form>

              {/* Search Results */}
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {searchResults.length > 0 ? (
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {searchResults.map((product) => (
                      <li key={product.product_id} style={{ borderBottom: '1px solid #f2ede4' }}>
                        <button 
                          onClick={() => {
                            navigate(`/shop?q=${encodeURIComponent(product.name)}`)
                            setSearchOpen(false)
                            setSearchQuery('')
                          }}
                          className="search-result-item"
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '1rem',
                            background: 'none',
                            border: 'none',
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                            textDecoration: 'none'
                          }}
                        >
                          <img 
                            src={product.thumb} 
                            alt={product.name} 
                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '2px' }} 
                          />
                          <div style={{ flex: 1 }}>
                            <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-charcoal)', marginBottom: '0.2rem', fontWeight: 500 }}>
                              {product.name}
                            </h4>
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-teal-600)' }}>
                              {product.special ? product.special : product.price}
                            </span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : searchQuery.trim() && !isSearching ? (
                  <div style={{ padding: '2rem 1rem', textAlign: 'center', color: '#999', fontSize: '0.85rem' }}>
                    No products found for "{searchQuery}"
                  </div>
                ) : !searchQuery.trim() ? (
                  <div style={{ padding: '1.5rem 1rem', textAlign: 'center', color: '#999', fontSize: '0.8rem', fontStyle: 'italic' }}>
                    Start typing to see products...
                  </div>
                ) : null}
              </div>
              
              {searchResults.length > 0 && (
                <button 
                  onClick={handleSearchSubmit}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: 'var(--color-stone)',
                    border: 'none',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1rem',
                    textTransform: 'uppercase',
                    color: 'var(--color-teal-800)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-gold-100)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-stone)'}
                >
                  View All Results
                </button>
              )}

            </div>
          )}
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
              color: '#0f1f1e',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'color 0.2s',
              animationDelay: `${i * 0.06}s`,
            }}
            onMouseEnter={e => e.target.style.color = '#3d9089'}
            onMouseLeave={e => e.target.style.color = '#0f1f1e'}
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
        
        .search-dropdown {
          transform-origin: top right;
          animation: dropDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes dropDown {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .search-result-item:hover {
          background-color: rgba(61, 144, 137, 0.05);
        }
      `}</style>

    </>
  )
}