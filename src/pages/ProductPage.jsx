import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { fetchProduct } from '../services/opencart'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ProductCard from '../components/ui/ProductCard'
import { ArrowLeft, ShoppingBag, Star, Shield, Leaf, Package, Minus, Plus, ChevronRight, Send } from 'lucide-react'

function StarRow({ rating, setRating, interactive = false }) {
  const [hover, setHover] = useState(0)
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[1,2,3,4,5].map(i => (
        <Star
          key={i}
          size={interactive ? 24 : 14}
          fill={(hover || rating) >= i ? '#d4a843' : 'none'}
          color={(hover || rating) >= i ? '#d4a843' : '#e0e0e0'}
          strokeWidth={1.5}
          style={{ cursor: interactive ? 'pointer' : 'default', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
          onMouseEnter={() => interactive && setHover(i)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && setRating && setRating(i)}
        />
      ))}
    </div>
  )
}

function ReviewCard({ review }) {
  return (
    <div style={{
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '24px',
      border: '1px solid rgba(33,78,65,0.08)',
      boxShadow: '0 4px 20px rgba(33,78,65,0.03)',
      transition: 'transform 0.3s ease',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
        <div>
          <div style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '1rem', fontWeight: 500,
            color: '#214e41', marginBottom: '0.35rem'
          }}>{review.author}</div>
          <StarRow rating={review.rating} />
        </div>
        <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.78rem', color: '#888', fontWeight: 400 }}>{review.date}</span>
      </div>
      <p style={{
        fontFamily: 'Jost, sans-serif',
        fontSize: '0.92rem', color: '#555',
        lineHeight: 1.7, margin: 0,
        fontWeight: 400
      }}>{review.text}</p>
    </div>
  )
}
export default function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { t } = useLanguage()
  const p = t.product
  const l = t.common

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  // Review form state
  const [reviews, setReviews] = useState([])
  const [reviewName, setReviewName] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  useEffect(() => {
    setLoading(true)
    setActiveImg(0)
    fetchProduct(id).then(data => {
      if (!data) navigate('/shop')
      setProduct(data)
      setReviews(data?.reviews || [])
      setLoading(false)
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  const handleAddToCart = () => {
    if (!product) return
    addToCart(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    if (!reviewRating || !reviewText.trim() || !reviewName.trim()) return
    const newReview = {
      author: reviewName.trim(),
      rating: reviewRating,
      date: new Date().toLocaleDateString('en-AE', { month: 'long', year: 'numeric' }),
      text: reviewText.trim(),
    }
    setReviews(prev => [newReview, ...prev])
    setReviewName('')
    setReviewText('')
    setReviewRating(0)
    setReviewSubmitted(true)
    setTimeout(() => setReviewSubmitted(false), 3500)
  }

  const displayPrice = product?.special || product?.price
  const originalPrice = product?.special ? product.price : null
  const allImages = product?.images?.length ? product.images : product?.thumb ? [product.thumb] : []

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null

  return (
    <>
      <Navbar />
      <style>{`
        .product-grid { display: grid; grid-template-columns: 1fr; gap: 3rem; }
        @media (min-width: 900px) { .product-grid { grid-template-columns: 1fr 1fr; gap: 5rem; } }
        .related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.5rem; }
        .reviews-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
        @media (min-width: 700px) { .reviews-grid { grid-template-columns: 1fr 1fr; } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        @keyframes shimmer { 0%,100%{opacity:0.4;}50%{opacity:0.8;} }
        .shimmer { animation: shimmer 1.4s ease-in-out infinite; background:#e8f5f3; }
        .thumb-btn { transition: all 0.2s; }
        .thumb-btn:hover { opacity: 1 !important; transform: scale(1.04); }
        textarea { resize: vertical; }
      `}</style>

      <main style={{ backgroundColor: '#faf8f3', minHeight: '100vh', paddingTop: '90px' }}>

        {/* Breadcrumb - more minimalist */}
        <div style={{ borderBottom: '1px solid rgba(61,144,137,0.08)', backgroundColor: '#ffffff' }}>
          <div style={{
            maxWidth: '1280px', margin: '0 auto', padding: '0.9rem 2rem',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            fontFamily: 'Jost, sans-serif', fontSize: '0.78rem', color: '#888'
          }} dir={t.dir}>
            <Link to="/" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#d4a843'} onMouseLeave={e => e.target.style.color = '#888'}>{l.home}</Link>
            <ChevronRight size={11} strokeWidth={1.5} style={{ transform: t.dir === 'rtl' ? 'rotate(180deg)' : 'none', opacity: 0.5 }} />
            <Link to="/shop" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#d4a843'} onMouseLeave={e => e.target.style.color = '#888'}>{t.nav.shop}</Link>
            {product?.category && (
              <>
                <ChevronRight size={11} strokeWidth={1.5} style={{ transform: t.dir === 'rtl' ? 'rotate(180deg)' : 'none', opacity: 0.5 }} />
                <span style={{ fontWeight: 400 }}>{product.category.name}</span>
              </>
            )}
          </div>
        </div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 2rem' }}>

          {loading ? (
            <div className="product-grid">
              <div className="shimmer" style={{ aspectRatio:'1/1', borderRadius:'4px' }} />
              <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
                {[200,100,60,80,40].map((w,i) => <div key={i} className="shimmer" style={{ height:'24px', width:`${w}px`, borderRadius:'4px' }} />)}
              </div>
            </div>
          ) : product ? (
            <>
              <div className="product-grid fade-up">

                {/* LEFT: Image Gallery */}
                <div>
                  <div style={{ position: 'sticky', top: '110px' }}>
                    {/* Main image */}
                    <div style={{
                      overflow: 'hidden',
                      borderRadius: '24px',
                      backgroundColor: '#ffffff',
                      lineHeight: 0,
                      marginBottom: '1rem',
                      position: 'relative',
                      boxShadow: '0 8px 30px rgba(33,78,65,0.08)',
                      border: '1px solid rgba(33,78,65,0.05)'
                    }}>
                      {product.special && (
                        <span style={{
                          position: 'absolute', top: '1.25rem', [t.dir === 'rtl' ? 'right' : 'left']: '1.25rem',
                          backgroundColor: '#d4a843', color: 'white',
                          fontFamily: 'Jost, sans-serif', fontSize: '0.65rem', fontWeight: 700,
                          letterSpacing: '0.15em', textTransform: 'uppercase',
                          padding: '0.35rem 1rem', zIndex: 1, borderRadius: '20px'
                        }}>
                          {p.sale}
                        </span>
                      )}
                      <img
                        src={allImages[activeImg]}
                        alt={product.name}
                        style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', transition: 'all 0.5s ease' }}
                        onError={e => e.target.src = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80'}
                      />
                    </div>

                    {/* Thumbnail strip */}
                    {allImages.length > 1 && (
                      <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', padding: '0.2rem 0.2rem 0.5rem' }}>
                        {allImages.map((img, i) => (
                          <button
                            key={i}
                            className="thumb-btn"
                            onClick={() => setActiveImg(i)}
                            style={{
                              flexShrink: 0, width: '70px', height: '70px', padding: 0, border: 'none', cursor: 'pointer',
                              borderRadius: '12px', overflow: 'hidden', lineHeight: 0,
                              outline: activeImg === i ? '2.5px solid #d4a843' : '1px solid rgba(33,78,65,0.08)',
                              outlineOffset: '2px', opacity: activeImg === i ? 1 : 0.6,
                              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                              boxShadow: activeImg === i ? '0 4px 12px rgba(212,168,67,0.2)' : 'none'
                            }}
                          >
                            <img src={img} alt={`View ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.src = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=80'} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT: Product Details */}
                <div dir={t.dir}>
                  <Link to={`/shop?cat=${product.category_id}`} style={{
                    fontFamily: 'Jost, sans-serif', fontSize: '0.72rem', fontWeight: 600,
                    letterSpacing: '0.15em', textTransform: 'uppercase', color: '#d4a843', textDecoration: 'none'
                  }}>
                    {product.category?.name}
                  </Link>

                  <h1 style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                    fontWeight: 500, color: '#214e41',
                    margin: '0.75rem 0 1rem 0', lineHeight: 1.1
                  }}>
                    {product.name}
                  </h1>

                  {/* Rating summary */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.75rem' }}>
                    <StarRow rating={Math.round(avgRating || 4)} />
                    <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: '#666', fontWeight: 400 }}>
                      <span style={{ color: '#214e41', fontWeight: 600 }}>{avgRating || '4.8'}</span> · {p.reviewsOf.replace('{n}', reviews.length)}
                    </span>
                  </div>

                  {/* Price */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.85rem', marginBottom: '2rem' }}>
                    <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.4rem', color: '#214e41', fontWeight: 500 }}>{displayPrice}</span>
                    {originalPrice && <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '1.2rem', color: '#bbb', textDecoration: 'line-through', fontWeight: 300 }}>{originalPrice}</span>}
                  </div>

                  <p style={{
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '1rem', color: '#555',
                    lineHeight: 1.8, marginBottom: '2.25rem',
                    fontWeight: 400
                  }}>{product.description}</p>

                  {/* Tags */}
                  {product.tags && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2.5rem' }}>
                      {product.tags.map(tag => (
                        <span key={tag} style={{
                          fontFamily: 'Jost, sans-serif', fontSize: '0.72rem', fontWeight: 500,
                          padding: '0.4rem 1rem', border: '1px solid rgba(33,78,65,0.12)',
                          color: '#214e41', borderRadius: '30px', backgroundColor: 'rgba(33,78,65,0.03)'
                        }}>{tag}</span>
                      ))}
                    </div>
                  )}

                  <div style={{ height: '2px', background: 'linear-gradient(90deg, #d4a843, #3d9089)', opacity: 0.15, marginBottom: '2.5rem' }} />

                  {/* Quantity & Add to Cart */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      <span style={{
                        fontFamily: 'Jost, sans-serif', fontSize: '0.75rem', fontWeight: 600,
                        letterSpacing: '0.12em', textTransform: 'uppercase', color: '#214e41', opacity: 0.6
                      }}>{p.quantity}</span>
                      <div style={{
                        display: 'flex', alignItems: 'center',
                        border: '1.5px solid rgba(33,78,65,0.12)', borderRadius: '30px',
                        overflow: 'hidden', backgroundColor: '#ffffff', boxShadow: 'inset 0 2px 4px rgba(33,78,65,0.03)'
                      }}>
                        <button
                          onClick={() => setQty(q => Math.max(1, q - 1))}
                          style={{
                            background: 'none', border: 'none', padding: '0.75rem 1.25rem',
                            cursor: 'pointer', color: '#214e41', display: 'flex', alignItems: 'center',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(33,78,65,0.05)'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        ><Minus size={14} strokeWidth={2.5} /></button>
                        <span style={{
                          fontFamily: 'Jost, sans-serif', fontSize: '1rem', fontWeight: 600,
                          width: '2.5rem', textAlign: 'center', color: '#214e41'
                        }}>{qty}</span>
                        <button
                          onClick={() => setQty(q => q + 1)}
                          style={{
                            background: 'none', border: 'none', padding: '0.75rem 1.25rem',
                            cursor: 'pointer', color: '#214e41', display: 'flex', alignItems: 'center',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(33,78,65,0.05)'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        ><Plus size={14} strokeWidth={2.5} /></button>
                      </div>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      style={{
                        width: '100%', padding: '1.1rem',
                        backgroundColor: added ? '#1a5c5c' : '#214e41',
                        color: '#faf8f3', border: 'none', cursor: 'pointer', borderRadius: '40px',
                        fontFamily: 'Jost, sans-serif', fontSize: '0.82rem', fontWeight: 600,
                        letterSpacing: '0.15em', textTransform: 'uppercase',
                        transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.85rem',
                        boxShadow: '0 8px 25px rgba(33,78,65,0.15)',
                      }}
                      onMouseEnter={e => { if (!added) { e.currentTarget.style.backgroundColor = '#d4a843'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(212,168,67,0.3)'; } }}
                      onMouseLeave={e => { if (!added) { e.currentTarget.style.backgroundColor = '#214e41'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(33,78,65,0.15)'; } }}
                    >
                      <ShoppingBag size={18} strokeWidth={1.5} />
                      {added ? p.added : p.addToCart.replace('{price}', displayPrice)}
                    </button>
                  </div>

                  {/* Trust signals */}
                  <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem 1.5rem',
                    marginTop: '2rem', padding: '1.75rem', backgroundColor: '#ffffff',
                    borderRadius: '20px', border: '1px solid rgba(33,78,65,0.06)',
                    boxShadow: '0 4px 15px rgba(33,78,65,0.02)'
                  }}>
                    {[
                      { icon: <Shield size={15} />, label: p.trustQuality },
                      { icon: <Leaf size={15} />, label: p.trustEthical },
                      { icon: <Package size={15} />, label: p.trustEco },
                      { icon: <ShoppingBag size={15} />, label: p.trustReturn }
                    ].map(({ icon, label }) => (
                      <div key={label} style={{
                        display: 'flex', alignItems: 'center', gap: '0.65rem',
                        fontFamily: 'Jost, sans-serif', fontSize: '0.78rem', color: '#555', fontWeight: 400
                      }}>
                        <span style={{ color: '#d4a843', display: 'flex' }}>{icon}</span>{label}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* ── Reviews Section ─────────────────────────────────────── */}
              <div style={{ marginTop: '5rem' }}>
                <div style={{ height:'1px', backgroundColor:'rgba(61,144,137,0.15)', marginBottom:'3.5rem' }} />

                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(320px,1fr))', gap:'4rem', alignItems:'start' }}>

                  {/* Existing reviews */}
                  <div dir={t.dir}>
                    <h2 style={{
                      fontFamily: 'Cormorant Garamond, serif', fontSize: '2.4rem',
                      fontWeight: 500, color: '#214e41', marginBottom: '0.5rem'
                    }}>
                      {p.reviews}
                    </h2>
                    {avgRating && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3.5rem', color: '#214e41', lineHeight: 1 }}>{avgRating}</span>
                        <div>
                          <StarRow rating={Math.round(avgRating)} />
                          <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: '#888', fontWeight: 400 }}>{p.reviewsOf.replace('{n}', reviews.length)}</span>
                        </div>
                      </div>
                    )}
                    {reviews.length > 0 ? (
                      <div className="reviews-grid">
                        {reviews.map((r, i) => <ReviewCard key={i} review={r} />)}
                      </div>
                    ) : (
                      <p style={{ fontFamily:'var(--font-body)', color:'#bbb', fontStyle:'italic' }}>{p.noReviews}</p>
                    )}
                  </div>

                  {/* Write a review */}
                  <div style={{
                    backgroundColor: 'white', borderRadius: '24px', padding: '2.5rem',
                    border: '1px solid rgba(33,78,65,0.08)', boxShadow: '0 8px 30px rgba(33,78,65,0.04)'
                  }} dir={t.dir}>
                    <h3 style={{
                      fontFamily: 'Cormorant Garamond, serif', fontSize: '1.75rem',
                      fontWeight: 500, color: '#214e41', marginBottom: '1.5rem'
                    }}>
                      {p.writeReview}
                    </h3>
                    {reviewSubmitted && (
                      <div style={{ backgroundColor:'rgba(61,144,137,0.1)', border:'1px solid rgba(61,144,137,0.3)', borderRadius:'6px', padding:'1rem', marginBottom:'1.5rem', fontFamily:'var(--font-body)', fontSize:'0.88rem', color:'var(--color-teal-700)' }}>
                        {p.thankYou}
                      </div>
                    )}
                    <form onSubmit={handleReviewSubmit} style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
                      <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem' }}>
                        <label style={labelStyle}>{p.ratingLabel}</label>
                        <StarRow rating={reviewRating} setRating={setReviewRating} interactive />
                        {reviewRating === 0 && <span style={{ fontFamily:'var(--font-body)', fontSize:'0.72rem', color:'#bbb' }}>{p.clickStar}</span>}
                      </div>
                      <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem' }}>
                        <label style={labelStyle}>{p.nameLabel}</label>
                        <input
                          value={reviewName} onChange={e=>setReviewName(e.target.value)} required placeholder={t.dir === 'rtl' ? 'الاسم...' : 'e.g. Priya M.'}
                          style={inputStyle}
                          onFocus={e => e.target.style.borderColor='var(--color-teal-500)'}
                          onBlur={e => e.target.style.borderColor='#ddd'}
                        />
                      </div>
                      <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem' }}>
                        <label style={labelStyle}>{p.reviewLabel}</label>
                        <textarea
                          value={reviewText} onChange={e=>setReviewText(e.target.value)} required placeholder={p.reviewPlaceholder}
                          rows={5}
                          style={{ ...inputStyle, resize:'vertical' }}
                          onFocus={e => e.target.style.borderColor='var(--color-teal-500)'}
                          onBlur={e => e.target.style.borderColor='#ddd'}
                        />
                      </div>
                      <button
                        type="submit"
                        style={{
                          padding:'1rem', backgroundColor:'var(--color-teal-600)', color:'white', border:'none', borderRadius:'4px',
                          fontFamily:'var(--font-body)', fontSize:'0.82rem', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', cursor:'pointer',
                          display:'flex', alignItems:'center', justifyContent:'center', gap:'0.6rem', transition:'background-color 0.2s'
                        }}
                        onMouseEnter={e=>e.currentTarget.style.backgroundColor='#2d7070'}
                        onMouseLeave={e=>e.currentTarget.style.backgroundColor='var(--color-teal-600)'}
                      >
                        <Send size={14} style={{ transform: t.dir === 'rtl' ? 'rotate(180deg)' : 'none' }} /> {p.submitReview}
                      </button>
                    </form>
                  </div>

                </div>
              </div>

              {/* Related Products */}
              {product.related?.length > 0 && (
                <div style={{ marginTop:'5rem' }}>
                  <div style={{ height:'1px', backgroundColor:'rgba(61,144,137,0.15)', marginBottom:'3.5rem' }} />
                  <div style={{ textAlign: 'center', marginBottom: '4rem' }} dir={t.dir}>
                    <span style={{
                      fontFamily: 'Jost, sans-serif', fontSize: '0.72rem', fontWeight: 600,
                      letterSpacing: '0.25em', textTransform: 'uppercase', color: '#d4a843'
                    }}>{p.relatedSub}</span>
                    <h2 style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 'clamp(2rem, 5vw, 3rem)',
                      fontWeight: 500, color: '#214e41', marginTop: '0.75rem'
                    }}>
                      {p.relatedTitle}
                    </h2>
                  </div>
                  <div className="related-grid">
                    {product.related.map(p => <ProductCard key={p.product_id} product={p} />)}
                  </div>
                </div>
              )}
            </>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  )
}

const labelStyle = {
  fontFamily: 'Jost, sans-serif', fontSize: '0.75rem', fontWeight: 600,
  letterSpacing: '0.1em', textTransform: 'uppercase', color: '#214e41', opacity: 0.7,
}

const inputStyle = {
  width: '100%', padding: '1rem 1.25rem',
  border: '1.5px solid rgba(33,78,65,0.1)', borderRadius: '12px',
  fontFamily: 'Jost, sans-serif', fontSize: '1rem', color: '#214e41',
  outline: 'none', transition: 'all 0.3s ease', backgroundColor: '#ffffff',
  boxSizing: 'border-box',
}
