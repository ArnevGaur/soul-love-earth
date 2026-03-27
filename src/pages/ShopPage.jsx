import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ProductCard from '../components/ui/ProductCard'
import { fetchProducts, fetchCategories } from '../services/opencart'
import { useLanguage } from '../context/LanguageContext'
import { Search, SlidersHorizontal, X, Filter, ChevronDown } from 'lucide-react'
import FilterPane from '../components/shop/FilterPane'
import { useRef } from 'react'

export default function ShopPage() {
  const { t } = useLanguage()
  const s = t.shop

  const SORT_OPTIONS = [
    { label: s.sortDefault,   value: 'p.date_added', order: 'DESC' },
    { label: s.sortPriceAsc,  value: 'p.price', order: 'ASC'  },
    { label: s.sortPriceDesc, value: 'p.price', order: 'DESC' },
    { label: s.sortNameAz,    value: 'pd.name',      order: 'ASC'  },
  ]

  const [searchParams, setSearchParams] = useSearchParams()

  const [products,   setProducts]   = useState([])
  const [categories, setCategories] = useState([])
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState(null)

  const [search,     setSearch]     = useState(searchParams.get('q') || '')
  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '')
  const [categoryId, setCategoryId] = useState(searchParams.get('cat') || '')
  
  // Advanced Filter States
  const defaultFilters = {
    minPrice: '', maxPrice: '',
    inStock: false, outOfStock: false,
    color: '', sizes: { '10': false, '14': false }
  }
  const [filters, setFilters] = useState(defaultFilters)
  
  const [sortIdx,    setSortIdx]    = useState(0)
  const [sortOpen,   setSortOpen]   = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [isFilterPaneOpen, setIsFilterPaneOpen] = useState(false)

  // Search suggestion state
  const [suggestions, setSuggestions]     = useState([])
  const [showSuggest, setShowSuggest]     = useState(false)
  const searchRef = useRef(null)

  // Sync state with URL params
  useEffect(() => {
    const q = searchParams.get('q') || ''
    const cat = searchParams.get('cat') || ''
    setSearch(q)
    setSearchInput(q)
    setCategoryId(cat)
  }, [searchParams])

  // Load categories once
  useEffect(() => {
    fetchCategories()
      .then(data => setCategories(Array.isArray(data) ? data : data.categories || []))
      .catch(() => setCategories([]))
  }, [])

  // Load products when filters change
  const loadProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const sort = SORT_OPTIONS[sortIdx]
      const data = await fetchProducts({
        categoryId,
        search,
        sort:  sort.value,
        order: sort.order,
        filters
      })
      setProducts(Array.isArray(data) ? data : data.products || [])
    } catch (err) {
      setError('Could not load products. Please try again.')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [categoryId, search, sortIdx, filters])

  useEffect(() => { loadProducts() }, [loadProducts])

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(searchInput)
    setSortIdx(0)
    setSearchParams({ q: searchInput, cat: categoryId })
  }

  const handleCategory = (id) => {
    setCategoryId(id)
    setSortIdx(0)
    setSearchParams({ q: search, cat: id })
    setFiltersOpen(false)
  }

  const handleSort = (e) => setSortIdx(Number(e.target.value))

  // Live suggestions as user types
  useEffect(() => {
    if (!searchInput.trim()) { setSuggestions([]); return }
    const timer = setTimeout(async () => {
      try {
        const data = await fetchProducts({ search: searchInput.trim() })
        const list = Array.isArray(data) ? data : data.products || []
        setSuggestions(list.slice(0, 6))
      } catch { setSuggestions([]) }
    }, 200)
    return () => clearTimeout(timer)
  }, [searchInput])

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#faf8f3', minHeight: '100vh' }}>

        {/* Page Header */}
        <div style={{
          position: 'relative',
          backgroundImage: 'url(/public/contactleaves.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '6rem 2rem 4rem',
          textAlign: 'center',
          overflow: 'hidden'
        }}>
          {/* Dark overlay for text readability - brighter */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(10,26,24,0.75) 0%, rgba(26,46,44,0.7) 100%)',
            zIndex: 1
          }} />
          
          <span style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.65rem',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#d4a843',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '0.75rem',
            position: 'relative',
            zIndex: 2
          }}>
            <span style={{ width: '32px', height: '1px', backgroundColor: '#d4a843', display: 'inline-block' }} />
            {s.title}
            <span style={{ width: '32px', height: '1px', backgroundColor: '#d4a843', display: 'inline-block' }} />
          </span>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 300,
            color: '#faf8f3',
            lineHeight: 1.1,
            position: 'relative',
            zIndex: 2,
            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}>
            {s.sub}
          </h1>
        </div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 2rem' }}>

          {/* Toolbar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem',
            flexWrap: 'wrap',
          }}>
            {/* Search */}
            <form onSubmit={handleSearch} style={{ flex: 1, minWidth: '200px', display: 'flex' }}>
              <div ref={searchRef} style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
                <Search size={15} strokeWidth={2} style={{
                  position: 'absolute', left: '1.25rem', top: '50%',
                  transform: 'translateY(-50%)', color: '#214e41', zIndex: 1,
                }} />
                <input
                  type="text"
                  value={searchInput}
                  onChange={e => { setSearchInput(e.target.value); setShowSuggest(true) }}
                  placeholder={t.nav.search}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 2.8rem',
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '0.85rem',
                    fontWeight: 400,
                    border: '1px solid rgba(33,78,65,0.15)',
                    borderRadius: showSuggest && suggestions.length > 0 ? '20px 20px 0 0' : '30px',
                    backgroundColor: '#ffffff',
                    boxShadow: 'inset 0 2px 6px rgba(33,78,65,0.03)',
                    outline: 'none',
                    color: '#214e41',
                    transition: 'border-color 0.3s, box-shadow 0.3s'
                  }}
                  onFocus={e => { setShowSuggest(true); e.target.style.borderColor = '#d4a843'; e.target.style.boxShadow = '0 0 0 3px rgba(212,168,67,0.1)'; }}
                  onBlur={e => { setTimeout(() => setShowSuggest(false), 150); e.target.style.borderColor = 'rgba(33,78,65,0.15)'; e.target.style.boxShadow = 'inset 0 2px 6px rgba(33,78,65,0.03)'; }}
                />

                {/* Suggestion dropdown */}
                {showSuggest && suggestions.length > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0, right: 0,
                    backgroundColor: '#ffffff',
                    border: '1px solid #d4a843',
                    borderTop: 'none',
                    borderRadius: '0 0 20px 20px',
                    boxShadow: '0 16px 40px rgba(33,78,65,0.1)',
                    zIndex: 200,
                    overflow: 'hidden',
                  }}>
                    {suggestions.map((p, i) => (
                      <div
                        key={p.product_id}
                        onMouseDown={() => {
                          setSearchInput(p.name)
                          setSearch(p.name)
                          setSortIdx(0)
                          setSearchParams({ q: p.name, cat: categoryId })
                          setShowSuggest(false)
                        }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.75rem',
                          padding: '0.6rem 1.25rem',
                          cursor: 'pointer',
                          borderTop: i > 0 ? '1px solid rgba(33,78,65,0.06)' : 'none',
                          transition: 'background 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#faf8f3'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <img
                          src={p.thumb}
                          alt={p.name}
                          style={{ width: '38px', height: '38px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
                          onError={e => e.target.style.display = 'none'}
                        />
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                          <div style={{
                            fontFamily: 'Jost, sans-serif', fontSize: '0.83rem', fontWeight: 500,
                            color: '#214e41', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                          }}>{p.name}</div>
                          <div style={{
                            fontFamily: 'Jost, sans-serif', fontSize: '0.75rem', fontWeight: 400,
                            color: p.special ? '#3d9089' : '#888'
                          }}>{p.special || p.price}</div>
                        </div>
                        <Search size={12} color="#d4a843" strokeWidth={2} style={{ flexShrink: 0 }} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </form>


            {/* Categories toggle (mobile) & Right Filter Toggle (always visible) */}
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.75rem 1.75rem',
                  backgroundColor: filtersOpen ? '#214e41' : '#ffffff',
                  color: filtersOpen ? '#ffffff' : '#214e41',
                  border: '1px solid rgba(33,78,65,0.15)',
                  borderRadius: '30px',
                  boxShadow: '0 4px 12px rgba(33,78,65,0.05)',
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '0.75rem', fontWeight: 600,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'all 0.3s ease',
                }}
                className="categories-mobile-btn"
              >
                <SlidersHorizontal size={14} strokeWidth={2} />
                CATEGORIES
              </button>

              <button
                onClick={() => setIsFilterPaneOpen(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.75rem 1.75rem',
                  backgroundColor: '#ffffff',
                  color: '#214e41',
                  border: '1px solid rgba(33,78,65,0.15)',
                  borderRadius: '30px',
                  boxShadow: '0 4px 12px rgba(33,78,65,0.05)',
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '0.75rem', fontWeight: 600,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#faf8f3'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ffffff'}
              >
                <Filter size={14} strokeWidth={2} />
                FILTER
              </button>
            </div>

            {/* Custom Sort Dropdown */}
            <div style={{ position: 'relative', marginLeft: 'auto' }}>
              <button
                onClick={() => setSortOpen(!sortOpen)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  width: '210px',
                  padding: '0.75rem 1.5rem',
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '0.85rem', fontWeight: 500, color: '#214e41',
                  backgroundColor: '#ffffff',
                  border: sortOpen ? '1px solid #d4a843' : '1px solid rgba(33,78,65,0.15)',
                  borderRadius: '30px',
                  boxShadow: '0 4px 12px rgba(33,78,65,0.05)',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                {SORT_OPTIONS[sortIdx].label}
                <ChevronDown size={14} strokeWidth={2} color={sortOpen ? '#d4a843' : '#214e41'} style={{ transition: 'transform 0.3s', transform: sortOpen ? 'rotate(180deg)' : 'none' }} />
              </button>

              {sortOpen && (
                <>
                  <div 
                    onClick={() => setSortOpen(false)}
                    style={{ position: 'fixed', inset: 0, zIndex: 40 }}
                  />
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0,
                    backgroundColor: '#ffffff', border: '1px solid rgba(33,78,65,0.1)',
                    borderRadius: '20px', zIndex: 50,
                    boxShadow: '0 12px 36px rgba(33,78,65,0.12)',
                    overflow: 'hidden', padding: '0.5rem 0'
                  }}>
                    {SORT_OPTIONS.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => { setSortIdx(i); setSortOpen(false); handleSort({ target: { value: i } }); }}
                        style={{
                          display: 'block', width: '100%', textAlign: 'left',
                          padding: '0.7rem 1.5rem',
                          fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', fontWeight: 500,
                          color: sortIdx === i ? '#d4a843' : '#214e41',
                          backgroundColor: 'transparent', border: 'none',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#faf8f3'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Active filters */}
          {(categoryId || search) && (
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {search && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.4rem 1rem',
                  backgroundColor: 'rgba(33,78,65,0.06)',
                  fontFamily: 'Jost, sans-serif', fontSize: '0.72rem',
                  color: '#214e41', border: '1px solid rgba(33,78,65,0.15)',
                  borderRadius: '20px'
                }}>
                  "{search}"
                  <X size={11} style={{ cursor: 'pointer' }} onClick={() => { setSearch(''); setSearchInput('') }} />
                </span>
              )}
              {categoryId && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.4rem 1rem',
                  backgroundColor: 'rgba(33,78,65,0.06)',
                  fontFamily: 'Jost, sans-serif', fontSize: '0.72rem',
                  color: '#214e41', border: '1px solid rgba(33,78,65,0.15)',
                  borderRadius: '20px'
                }}>
                  {categories.find(c => c.category_id === categoryId)?.name || 'Category'}
                  <X size={11} style={{ cursor: 'pointer' }} onClick={() => setCategoryId('')} />
                </span>
              )}
            </div>
          )}

          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>

            {/* Sidebar — Categories */}
            <aside style={{
              width: '250px',
              flexShrink: 0,
              display: filtersOpen ? 'block' : 'none',
            }}
              className="shop-sidebar"
            >
              <div style={{
                position: 'sticky', top: '2rem',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(33,78,65,0.08)',
                borderRadius: '24px',
                boxShadow: '0 4px 24px rgba(33,78,65,0.04)',
                padding: '1.75rem',
              }}>
                <h3 style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '0.75rem', fontWeight: 600,
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: '#214e41', marginBottom: '1.5rem',
                  borderBottom: '1px solid rgba(33,78,65,0.1)',
                  paddingBottom: '0.5rem'
                }}>{s.allCategories}</h3>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>
                    <button
                      onClick={() => handleCategory('')}
                      style={{
                        width: '100%', textAlign: 'left',
                        padding: '0.5rem 0',
                        fontFamily: 'Jost, sans-serif',
                        fontSize: '0.82rem', fontWeight: categoryId === '' ? 500 : 300,
                        color: categoryId === '' ? '#3d9089' : '#2c2c2c',
                        background: 'none', border: 'none', cursor: 'pointer',
                        borderBottom: categoryId === '' ? '1px solid #d4a843' : '1px solid transparent',
                        transition: 'color 0.2s',
                      }}
                    >
                      {s.allCategories}
                    </button>
                  </li>
                  {categories.map(cat => {
                    const isOpen = categoryId === cat.category_id || categoryId.startsWith(`${cat.category_id}-`);
                    return (
                    <li key={cat.category_id}>
                      <button
                        onClick={() => handleCategory(cat.category_id)}
                        style={{
                          width: '100%', textAlign: 'left',
                          padding: '0.5rem 0',
                          fontFamily: 'Jost, sans-serif',
                          fontSize: '0.82rem',
                          fontWeight: categoryId === cat.category_id ? 500 : 300,
                          color: isOpen ? '#3d9089' : '#2c2c2c',
                          background: 'none', border: 'none', cursor: 'pointer',
                          borderBottom: isOpen ? '1px solid rgba(212,168,67,0.3)' : '1px solid transparent',
                          transition: 'color 0.3s ease-out, border-color 0.3s ease-out',
                        }}
                      >
                        {cat.name}
                      </button>

                      {cat.subcategories && (
                        <div style={{
                          display: 'grid',
                          gridTemplateRows: isOpen ? '1fr' : '0fr',
                          transition: 'grid-template-rows 0.35s ease-out, opacity 0.3s ease-out',
                          opacity: isOpen ? 1 : 0,
                          overflow: 'hidden',
                        }}>
                          <div style={{ minHeight: 0 }}>
                            <ul style={{ listStyle: 'none', padding: '0 0 0 1rem', margin: '0.25rem 0 0.5rem 0' }}>
                              {cat.subcategories.map(sub => (
                                <li key={sub.category_id}>
                                  <button
                                    onClick={() => handleCategory(sub.category_id)}
                                    style={{
                                      width: '100%', textAlign: 'left',
                                      padding: '0.35rem 0',
                                      fontFamily: 'Jost, sans-serif',
                                      fontSize: '0.75rem',
                                      fontWeight: categoryId === sub.category_id ? 500 : 300,
                                      color: categoryId === sub.category_id ? '#3d9089' : '#666',
                                      background: 'none', border: 'none', cursor: 'pointer',
                                      transition: 'color 0.2s',
                                    }}
                                  >
                                    {sub.name}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </li>
                  )})}
                </ul>
              </div>
            </aside>

            {/* Products Grid */}
            <div style={{ flex: 1 }}>
              {loading && products.length === 0 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: '1.5rem',
                }}>
                  {[...Array(8)].map((_, i) => (
                    <div key={i} style={{
                      backgroundColor: '#e8f5f3',
                      aspectRatio: '3/4',
                      animation: 'shimmer 1.5s ease-in-out infinite',
                    }} />
                  ))}
                </div>
              )}

              {error && (
                <div style={{
                  textAlign: 'center', padding: '4rem 2rem',
                  fontFamily: 'Jost, sans-serif', fontSize: '0.88rem',
                  color: '#666',
                }}>
                  {error}
                  <br /><br />
                  <button onClick={loadProducts} style={{
                    padding: '0.75rem 2rem',
                    backgroundColor: '#3d9089', color: 'white',
                    border: 'none', cursor: 'pointer',
                    fontFamily: 'Jost, sans-serif', fontSize: '0.75rem',
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                  }}>Try Again</button>
                </div>
              )}

              {!loading && !error && products.length === 0 && (
                <div style={{
                  textAlign: 'center', padding: '4rem 2rem',
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.5rem', color: '#999',
                }}>
                  {s.noProducts}
                </div>
              )}

              {!error && products.length > 0 && (
                <div style={{
                  opacity: loading ? 0.4 : 1,
                  pointerEvents: loading ? 'none' : 'auto',
                  transition: 'opacity 0.2s',
                }}>
                  <p style={{
                    fontFamily: 'Jost, sans-serif', fontSize: '0.75rem',
                    color: '#999', marginBottom: '1.25rem', fontWeight: 300,
                  }}>
                    {s.results.replace('{n}', products.length)}
                  </p>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                    gap: '1.5rem',
                  }}>
                    {products.map(product => (
                      <ProductCard key={product.product_id} product={product} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Interactive Right Filter Slider */}
      <FilterPane 
        isOpen={isFilterPaneOpen} 
        onClose={() => setIsFilterPaneOpen(false)} 
        filters={filters}
        setFilters={setFilters}
        onClear={() => setFilters(defaultFilters)}
      />

      <style>{`
        @keyframes shimmer {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.8; }
        }
        @media (min-width: 769px) {
          .shop-sidebar { display: block !important; }
          .categories-mobile-btn { display: none !important; }
        }
      `}</style>
    </>
  )
}