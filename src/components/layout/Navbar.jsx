import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingBag, Search, User, Loader2 } from 'lucide-react'
import { fetchProducts } from '../../services/opencart'
import { useCart } from '../../context/CartContext'
import { useLanguage } from '../../context/LanguageContext'
import CartDrawer from './CartDrawer'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const { cartCount, setCartDrawerOpen } = useCart()
  const { lang, t, toggleLang } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()

  // Force solid navbar on any page that doesn't have a hero image (not homepage)
  const forceScrolled = location.pathname !== '/'
  const isScrolled = scrolled || forceScrolled

  const navLinks = [
    { label: t?.nav?.home || 'HOME', href: '/' },
    { label: t?.nav?.shop || 'SHOP', href: '/#categories' },
    { label: t?.nav?.offers,  href: '/offers' },
    { label: t?.nav?.myOrders, href: '/orders' },
    { label: t?.nav?.contact, href: '/contact' },
  ]


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
          transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          backgroundColor: isScrolled ? '#ffffff' : 'rgba(26, 46, 44, 0.35)',
          backgroundImage: 'none',
          backdropFilter: isScrolled ? 'blur(20px)' : 'blur(12px)',
          WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'blur(12px)',
          borderBottom: isScrolled ? '1px solid rgba(33, 78, 65, 0.08)' : '1px solid rgba(255,255,255,0.05)',
          boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.02)' : 'none',
          padding: isScrolled ? '0.6rem 1.75rem' : '1.1rem 1.75rem',
        }}
      >
        <nav style={{ 
          position: 'relative', 
          maxWidth: '1700px', 
          margin: '0 auto', 
          display: 'grid', 
          gridTemplateColumns: '1fr auto 1fr', 
          alignItems: 'center' 
        }}>

          {/* Logo Section */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', textDecoration: 'none' }}>
              <img
                src="/logo.png"
                alt="Soul Love & Earth"
                style={{ height: scrolled ? '36px' : '46px', transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)', width: 'auto' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                <span style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: scrolled ? '1.15rem' : '1.4rem',
                  fontWeight: 500,
                  color: isScrolled ? '#1a2e2c' : '#ffffff',
                  transition: 'all 0.45s ease',
                  letterSpacing: '0.01em',
                  whiteSpace: 'nowrap'
                }}>
                  Soul Love & Earth
                </span>
                <span style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '0.6rem',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#d4a843',
                  transition: 'all 0.45s ease',
                  marginTop: '4px',
                  opacity: 0.95
                }}>
                  Conscious Living
                </span>
              </div>
            </Link>
          </div>

          {/* Center Navigation links */}
          <div className="hidden-mobile" style={{ display: 'flex', justifyContent: 'center', marginRight: '2.5rem' }}>
            <ul style={{ display: 'flex', gap: '1.2rem', listStyle: 'none', margin: 0, padding: 0 }}>
              {navLinks.map(link => (
                <li key={link.label} style={{ position: 'relative' }}>
                  <Link
                    to={link.href}
                    onClick={(e) => {
                      if (link.href === '/#categories') {
                        if (window.location.pathname === '/') {
                          // Already on home page, just scroll
                          e.preventDefault()
                          document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })
                        }
                        // If not on homepage, let the Link handle navigation naturally
                        // The browser will handle the hash scroll after page load
                      }
                    }}
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '0.72rem',
                      fontWeight: 500,
                      letterSpacing: '0.12rem',
                      whiteSpace: 'nowrap',
                      textTransform: 'uppercase',
                      color: isScrolled ? '#1a2e2c' : '#ffffff',
                      textDecoration: 'none',
                      padding: '0.75rem 0',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                    onMouseEnter={e => {
                      e.target.style.color = '#d4a843'
                    }}
                    onMouseLeave={e => {
                      e.target.style.color = isScrolled ? '#1a2e2c' : '#ffffff'
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Icons Section */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1.25rem' }}>

            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              title={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
              style={{
                background: isScrolled ? 'none' : 'rgba(255, 255, 255, 0.08)', 
                border: isScrolled ? '1.5px solid rgba(61,144,137,0.35)' : '1.5px solid #d4a843', 
                cursor: 'pointer',
                padding: '0.3rem 0.65rem', borderRadius: '100px',
                fontFamily: lang === 'ar' ? 'Arial, sans-serif' : 'Jost, sans-serif',
                fontSize: lang === 'ar' ? '0.85rem' : '0.7rem',
                fontWeight: 600, letterSpacing: lang === 'ar' ? 0 : '0.08em',
                color: isScrolled ? '#3d9089' : '#d4a843', transition: 'all 0.25s ease',
                lineHeight: 1.2,
              }}
              onMouseEnter={e => { 
                e.currentTarget.style.backgroundColor = isScrolled ? 'rgba(61,144,137,0.1)' : 'rgba(255,255,255,0.15)'; 
                e.currentTarget.style.borderColor = isScrolled ? '#3d9089' : '#ffffff' 
              }}
              onMouseLeave={e => { 
                e.currentTarget.style.backgroundColor = 'transparent'; 
                e.currentTarget.style.borderColor = isScrolled ? 'rgba(61,144,137,0.35)' : 'rgba(255,255,255,0.4)' 
              }}
            >
              {lang === 'en' ? 'عربي' : 'EN'}
            </button>

            {/* Login / Register — desktop only */}
            <div className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Link
                to="/login"
                style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: isScrolled ? '#0f1f1e' : '#ffffff', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#d4a843'}
                onMouseLeave={e => e.target.style.color = isScrolled ? '#0f1f1e' : '#ffffff'}
              >{t?.nav?.login}</Link>

              <Link
                to="/register"
                style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.45rem 1rem', backgroundColor: isScrolled ? '#3d9089' : 'rgba(255, 255, 255, 0.2)', border: isScrolled ? 'none' : '1px solid rgba(255,255,255,0.4)', color: 'white', textDecoration: 'none', borderRadius: '4px', transition: 'all 0.3s ease', backdropFilter: isScrolled ? 'none' : 'blur(4px)' }}
                onMouseEnter={e => e.target.style.backgroundColor = isScrolled ? '#2d7070' : 'rgba(255, 255, 255, 0.35)'}
                onMouseLeave={e => e.target.style.backgroundColor = isScrolled ? '#3d9089' : 'rgba(255, 255, 255, 0.2)'}
              >{t?.nav?.register}</Link>
            </div>

            {/* Search */}
            <button
               aria-label="Search"
               onClick={() => setSearchOpen(!searchOpen)}
               style={{ background: 'none', border: 'none', cursor: 'pointer', color: isScrolled ? '#0f1f1e' : '#ffffff', padding: '4px', transition: 'all 0.2s' }}
               onMouseEnter={e => e.currentTarget.style.color = '#d4a843'}
               onMouseLeave={e => e.currentTarget.style.color = isScrolled ? '#0f1f1e' : '#ffffff'}
             >
              {searchOpen ? <X size={20} strokeWidth={1.5} /> : <Search size={20} strokeWidth={1.5} />}
            </button>

            <button
              aria-label="Cart"
              onClick={() => setCartDrawerOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: isScrolled ? '#0f1f1e' : '#ffffff', padding: '4px', position: 'relative', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#d4a843'}
              onMouseLeave={e => e.currentTarget.style.color = isScrolled ? '#0f1f1e' : '#ffffff'}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: '#47b5a4',
                color: 'white',
                fontSize: '0.55rem',
                fontFamily: 'Jost, sans-serif',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>{cartCount}</span>
            </button>

            {/* Mobile hamburger */}
            <button
              aria-label="Menu"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: isScrolled ? '#0f1f1e' : '#ffffff', padding: '4px', display: 'none' }}
              className="show-mobile"
            >
              {menuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
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

      <CartDrawer />

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
          <div key={link.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Link
              to={link.href}
              onClick={(e) => {
                setMenuOpen(false)
                if (link.href === '/#categories') {
                  if (window.location.pathname === '/') {
                    // Already on home page, just scroll
                    e.preventDefault()
                    setTimeout(() => {
                      document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })
                    }, 100)
                  }
                  // If not on homepage, let the Link handle navigation naturally
                  // The browser will handle the hash scroll after page load
                }
              }}
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
          </div>
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
        
        @keyframes dropdownFadeIn {
          from { opacity: 0; transform: translateY(-8px) scaleY(0.95); }
          to { opacity: 1; transform: translateY(0) scaleY(1); }
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