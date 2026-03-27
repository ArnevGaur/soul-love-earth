import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ProductCard from '../components/ui/ProductCard'
import { fetchProducts, fetchCategories } from '../services/opencart'
import { useLanguage } from '../context/LanguageContext'
import { Search, SlidersHorizontal, X } from 'lucide-react'

const HOSPITALITY_CATEGORIES = ['7', '8', '9', '10', '11']

export default function HospitalityPage() {
  const { t, lang } = useLanguage()
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
  const [sortIdx,    setSortIdx]    = useState(0)
  const [filtersOpen, setFiltersOpen] = useState(false)

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
      .then(data => {
        const allCats = Array.isArray(data) ? data : data.categories || []
        // Filter strictly for hospitality categories
        setCategories(allCats.filter(c => HOSPITALITY_CATEGORIES.includes(c.category_id)))
      })
      .catch(() => setCategories([]))
  }, [])

  // Load products when filters change
  const loadProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const sort = SORT_OPTIONS[sortIdx]
      // Fetch all products matching search/sort criteria, ignore categoryId here
      let data = await fetchProducts({
        search,
        sort:  sort.value,
        order: sort.order,
      })
      
      let allProducts = Array.isArray(data) ? data : data.products || []
      
      // Strict filter for Hospitality products
      allProducts = allProducts.filter(p => HOSPITALITY_CATEGORIES.includes(p.category_id))
      
      // Apply sub-category filter if selected
      if (categoryId) {
        allProducts = allProducts.filter(p => p.category_id === String(categoryId))
      }
      
      setProducts(allProducts)
    } catch (err) {
      setError('Could not load products. Please try again.')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [categoryId, search, sortIdx])

  useEffect(() => { loadProducts() }, [loadProducts])

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(searchInput)
    setSearchParams({ q: searchInput, cat: categoryId })
  }

  const handleCategory = (id) => {
    setCategoryId(id)
    setSearchParams({ q: search, cat: id })
    setFiltersOpen(false)
  }

  const handleSort = (e) => setSortIdx(Number(e.target.value))

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#faf8f3', minHeight: '100vh', paddingTop: '80px', direction: t?.dir }}>

        {/* Page Header */}
        <div style={{
          backgroundColor: '#1a2e2c',
          padding: '3.5rem 2rem',
          textAlign: 'center',
        }}>
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
          }}>
            <span style={{ width: '32px', height: '1px', backgroundColor: '#d4a843', display: 'inline-block' }} />
            {lang === 'ar' ? 'مجموعة الضيافة' : 'HOSPITALITY COLLECTION'}
            <span style={{ width: '32px', height: '1px', backgroundColor: '#d4a843', display: 'inline-block' }} />
          </span>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 300,
            color: '#faf8f3',
            lineHeight: 1.1,
          }}>
            {lang === 'ar' ? 'الرفاهية المعروضة' : 'Sustainable Luxury'}
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
              <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
                <Search size={15} strokeWidth={1.5} style={{
                  position: 'absolute', 
                  [lang === 'ar' ? 'right' : 'left']: '0.875rem', 
                  top: '50%',
                  transform: 'translateY(-50%)', color: '#3d9089',
                }} />
                <input
                  type="text"
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  placeholder={t.nav.search}
                  style={{
                    width: '100%',
                    padding: lang === 'ar' ? '0.7rem 2.5rem 0.7rem 1rem' : '0.7rem 1rem 0.7rem 2.5rem',
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '0.82rem',
                    fontWeight: 300,
                    border: '1px solid rgba(61,144,137,0.3)',
                    backgroundColor: 'white',
                    outline: 'none',
                    color: '#2c2c2c',
                  }}
                />
              </div>
            </form>

            {/* Filter toggle (mobile) */}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.7rem 1.25rem',
                backgroundColor: filtersOpen ? '#3d9089' : 'white',
                color: filtersOpen ? 'white' : '#3d9089',
                border: '1px solid rgba(61,144,137,0.3)',
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.75rem', fontWeight: 500,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              <SlidersHorizontal size={14} strokeWidth={1.5} />
              {s.sortBy.split(' ')[0]} {/* Approximate "Filters" if needed */}
            </button>

            {/* Sort */}
            <select
              value={sortIdx}
              onChange={handleSort}
              style={{
                padding: '0.7rem 1.25rem',
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.78rem', fontWeight: 400,
                border: '1px solid rgba(61,144,137,0.3)',
                backgroundColor: 'white', color: '#2c2c2c',
                outline: 'none', cursor: 'pointer',
                marginInlineStart: 'auto',
              }}
            >
              {SORT_OPTIONS.map((opt, i) => (
                <option key={i} value={i}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Active filters */}
          {(categoryId || search) && (
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {search && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.3rem 0.75rem',
                  backgroundColor: 'rgba(61,144,137,0.1)',
                  fontFamily: 'Jost, sans-serif', fontSize: '0.72rem',
                  color: '#3d9089', border: '1px solid rgba(61,144,137,0.2)',
                }}>
                  "{search}"
                  <X size={11} style={{ cursor: 'pointer' }} onClick={() => { setSearch(''); setSearchInput('') }} />
                </span>
              )}
              {categoryId && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.3rem 0.75rem',
                  backgroundColor: 'rgba(61,144,137,0.1)',
                  fontFamily: 'Jost, sans-serif', fontSize: '0.72rem',
                  color: '#3d9089', border: '1px solid rgba(61,144,137,0.2)',
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
              width: '220px',
              flexShrink: 0,
              display: filtersOpen ? 'block' : 'none',
            }}
              className="shop-sidebar"
            >
              <div style={{
                backgroundColor: 'white',
                border: '1px solid rgba(61,144,137,0.15)',
                padding: '1.5rem',
              }}>
                <h3 style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '0.65rem', fontWeight: 600,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#d4a843', marginBottom: '1rem',
                  textAlign: lang === 'ar' ? 'right' : 'left'
                }}>{s.allCategories}</h3>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>
                    <button
                      onClick={() => handleCategory('')}
                      style={{
                        width: '100%', textAlign: lang === 'ar' ? 'right' : 'left',
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
                  {categories.map(cat => (
                    <li key={cat.category_id}>
                      <button
                        onClick={() => handleCategory(cat.category_id)}
                        style={{
                          width: '100%', textAlign: lang === 'ar' ? 'right' : 'left',
                          padding: '0.5rem 0',
                          fontFamily: 'Jost, sans-serif',
                          fontSize: '0.82rem',
                          fontWeight: categoryId === cat.category_id ? 500 : 300,
                          color: categoryId === cat.category_id ? '#3d9089' : '#2c2c2c',
                          background: 'none', border: 'none', cursor: 'pointer',
                          borderBottom: categoryId === cat.category_id ? '1px solid #d4a843' : '1px solid transparent',
                          transition: 'color 0.2s',
                        }}
                      >
                        {cat.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Products Grid */}
            <div style={{ flex: 1 }}>
              {loading && (
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

              {!loading && !error && products.length > 0 && (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        @keyframes shimmer {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.8; }
        }
        @media (min-width: 769px) {
          .shop-sidebar { display: block !important; }
        }
      `}</style>
    </>
  )
}
