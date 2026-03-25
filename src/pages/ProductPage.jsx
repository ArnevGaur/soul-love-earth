import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { fetchProduct } from '../services/opencart'
import { useCart } from '../context/CartContext'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ProductCard from '../components/ui/ProductCard'
import { ArrowLeft, ShoppingBag, Star, Shield, Leaf, Package, Minus, Plus, ChevronRight, Send } from 'lucide-react'

function StarRow({ rating, setRating, interactive = false }) {
  const [hover, setHover] = useState(0)
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {[1,2,3,4,5].map(i => (
        <Star
          key={i}
          size={interactive ? 22 : 14}
          fill={(hover || rating) >= i ? '#d4a843' : 'none'}
          color="#d4a843"
          strokeWidth={1.5}
          style={{ cursor: interactive ? 'pointer' : 'default', transition: 'fill 0.15s' }}
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
    <div style={{ padding: '1.75rem', backgroundColor: 'white', borderRadius: '10px', border: '1px solid #ece8e0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-charcoal)', marginBottom: '0.25rem' }}>{review.author}</div>
          <StarRow rating={review.rating} />
        </div>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#bbb' }}>{review.date}</span>
      </div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: '#666', lineHeight: 1.7, margin: 0 }}>{review.text}</p>
    </div>
  )
}

export default function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

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

        {/* Breadcrumb */}
        <div style={{ borderBottom: '1px solid rgba(61,144,137,0.12)', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1280px', margin:'0 auto', padding:'0.85rem 2rem', display:'flex', alignItems:'center', gap:'0.5rem', fontFamily:'var(--font-body)', fontSize:'0.78rem', color:'#999' }}>
            <Link to="/" style={{ color:'#999', textDecoration:'none' }} onMouseEnter={e=>e.target.style.color='var(--color-teal-500)'} onMouseLeave={e=>e.target.style.color='#999'}>Home</Link>
            <ChevronRight size={12} />
            <Link to="/shop" style={{ color:'#999', textDecoration:'none' }} onMouseEnter={e=>e.target.style.color='var(--color-teal-500)'} onMouseLeave={e=>e.target.style.color='#999'}>Shop</Link>
            {product?.category && <><ChevronRight size={12} /><span>{product.category.name}</span></>}
            {product && <><ChevronRight size={12} /><span style={{ color:'var(--color-charcoal)' }}>{product.name}</span></>}
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
                    <div style={{ overflow:'hidden', borderRadius:'6px', backgroundColor:'#f0f9f7', lineHeight:0, marginBottom:'0.75rem', position:'relative' }}>
                      {product.special && (
                        <span style={{ position:'absolute', top:'1rem', left:'1rem', backgroundColor:'#d4a843', color:'white', fontFamily:'var(--font-body)', fontSize:'0.62rem', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', padding:'0.3rem 0.8rem', zIndex:1 }}>
                          Sale
                        </span>
                      )}
                      <img
                        src={allImages[activeImg]}
                        alt={product.name}
                        style={{ width:'100%', aspectRatio:'1/1', objectFit:'cover', transition:'opacity 0.3s ease' }}
                        onError={e => e.target.src='https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80'}
                      />
                    </div>

                    {/* Thumbnail strip */}
                    {allImages.length > 1 && (
                      <div style={{ display:'flex', gap:'0.6rem', overflowX:'auto', paddingBottom:'4px' }}>
                        {allImages.map((img, i) => (
                          <button
                            key={i}
                            className="thumb-btn"
                            onClick={() => setActiveImg(i)}
                            style={{
                              flexShrink: 0, width:'72px', height:'72px', padding:0, border:'none', cursor:'pointer',
                              borderRadius:'4px', overflow:'hidden', lineHeight:0,
                              outline: activeImg === i ? '2px solid var(--color-teal-500)' : '2px solid transparent',
                              outlineOffset: '2px', opacity: activeImg === i ? 1 : 0.55,
                            }}
                          >
                            <img src={img} alt={`View ${i+1}`} style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e => e.target.src='https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=80'} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT: Product Details */}
                <div>
                  <Link to={`/shop?cat=${product.category_id}`} style={{ fontFamily:'var(--font-body)', fontSize:'0.72rem', fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--color-teal-500)', textDecoration:'none' }}>
                    {product.category?.name}
                  </Link>

                  <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:300, color:'var(--color-charcoal)', margin:'0.75rem 0 1.25rem 0', lineHeight:1.15 }}>
                    {product.name}
                  </h1>

                  {/* Rating summary */}
                  <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1.5rem' }}>
                    <StarRow rating={Math.round(avgRating || 4)} />
                    <span style={{ fontFamily:'var(--font-body)', fontSize:'0.82rem', color:'#666' }}>
                      {avgRating ? `${avgRating} / 5` : '— '} · {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Price */}
                  <div style={{ display:'flex', alignItems:'baseline', gap:'0.75rem', marginBottom:'2rem' }}>
                    <span style={{ fontFamily:'var(--font-display)', fontSize:'2rem', color:'var(--color-teal-600)', fontWeight:400 }}>{displayPrice}</span>
                    {originalPrice && <span style={{ fontFamily:'var(--font-body)', fontSize:'1.1rem', color:'#aaa', textDecoration:'line-through' }}>{originalPrice}</span>}
                  </div>

                  <p style={{ fontFamily:'var(--font-body)', fontSize:'0.95rem', color:'#666', lineHeight:1.8, marginBottom:'2rem' }}>{product.description}</p>

                  {/* Tags */}
                  {product.tags && (
                    <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', marginBottom:'2.5rem' }}>
                      {product.tags.map(tag => (
                        <span key={tag} style={{ fontFamily:'var(--font-body)', fontSize:'0.72rem', padding:'0.3rem 0.75rem', border:'1px solid rgba(61,144,137,0.3)', color:'var(--color-teal-600)', borderRadius:'100px' }}>{tag}</span>
                      ))}
                    </div>
                  )}

                  <div style={{ height:'1px', backgroundColor:'rgba(61,144,137,0.12)', marginBottom:'2rem' }} />

                  {/* Quantity */}
                  <div style={{ display:'flex', alignItems:'center', gap:'1.5rem', marginBottom:'1.5rem' }}>
                    <span style={{ fontFamily:'var(--font-body)', fontSize:'0.78rem', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'#555' }}>Quantity</span>
                    <div style={{ display:'flex', alignItems:'center', border:'1px solid rgba(61,144,137,0.25)', backgroundColor:'white' }}>
                      <button onClick={() => setQty(q=>Math.max(1,q-1))} style={{ background:'none', border:'none', padding:'0.75rem 1rem', cursor:'pointer', color:'var(--color-charcoal)', display:'flex', alignItems:'center' }}><Minus size={14} /></button>
                      <span style={{ fontFamily:'var(--font-body)', fontSize:'1rem', width:'2.5rem', textAlign:'center', color:'var(--color-charcoal)' }}>{qty}</span>
                      <button onClick={() => setQty(q=>q+1)} style={{ background:'none', border:'none', padding:'0.75rem 1rem', cursor:'pointer', color:'var(--color-charcoal)', display:'flex', alignItems:'center' }}><Plus size={14} /></button>
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    style={{
                      width:'100%', padding:'1.2rem',
                      backgroundColor: added ? '#1a5c5c' : 'var(--color-teal-600)',
                      color:'white', border:'none', cursor:'pointer', borderRadius:'4px',
                      fontFamily:'var(--font-body)', fontSize:'0.85rem', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase',
                      transition:'all 0.3s ease', display:'flex', alignItems:'center', justifyContent:'center', gap:'0.75rem', marginBottom:'1rem',
                    }}
                    onMouseEnter={e => { if(!added) e.currentTarget.style.backgroundColor='#2d7070' }}
                    onMouseLeave={e => { if(!added) e.currentTarget.style.backgroundColor='var(--color-teal-600)' }}
                  >
                    <ShoppingBag size={16} />
                    {added ? '✓  Added to Cart' : `Add to Bag — ${displayPrice}`}
                  </button>

                  {/* Trust signals */}
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem', marginTop:'2rem' }}>
                    {[{icon:<Shield size={14}/>,label:'Quality Guaranteed'},{icon:<Leaf size={14}/>,label:'Ethically Sourced'},{icon:<Package size={14}/>,label:'Eco Packaging'},{icon:<ShoppingBag size={14}/>,label:'Free Returns'}].map(({icon,label})=>(
                      <div key={label} style={{ display:'flex', alignItems:'center', gap:'0.5rem', fontFamily:'var(--font-body)', fontSize:'0.75rem', color:'#777' }}>
                        <span style={{ color:'var(--color-teal-500)' }}>{icon}</span>{label}
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
                  <div>
                    <h2 style={{ fontFamily:'var(--font-display)', fontSize:'2rem', fontWeight:300, color:'var(--color-charcoal)', marginBottom:'0.5rem' }}>
                      Customer Reviews
                    </h2>
                    {avgRating && (
                      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'2rem' }}>
                        <span style={{ fontFamily:'var(--font-display)', fontSize:'3rem', color:'var(--color-teal-600)', lineHeight:1 }}>{avgRating}</span>
                        <div>
                          <StarRow rating={Math.round(avgRating)} />
                          <span style={{ fontFamily:'var(--font-body)', fontSize:'0.78rem', color:'#999' }}>{reviews.length} reviews</span>
                        </div>
                      </div>
                    )}
                    {reviews.length > 0 ? (
                      <div className="reviews-grid">
                        {reviews.map((r, i) => <ReviewCard key={i} review={r} />)}
                      </div>
                    ) : (
                      <p style={{ fontFamily:'var(--font-body)', color:'#bbb', fontStyle:'italic' }}>No reviews yet. Be the first!</p>
                    )}
                  </div>

                  {/* Write a review */}
                  <div style={{ backgroundColor:'white', borderRadius:'12px', padding:'2rem', border:'1px solid #e8e4de', boxShadow:'0 2px 12px rgba(0,0,0,0.04)' }}>
                    <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.5rem', fontWeight:400, color:'var(--color-charcoal)', marginBottom:'1.5rem' }}>
                      Write a Review
                    </h3>
                    {reviewSubmitted && (
                      <div style={{ backgroundColor:'rgba(61,144,137,0.1)', border:'1px solid rgba(61,144,137,0.3)', borderRadius:'6px', padding:'1rem', marginBottom:'1.5rem', fontFamily:'var(--font-body)', fontSize:'0.88rem', color:'var(--color-teal-700)' }}>
                        ✓ Thank you! Your review has been posted.
                      </div>
                    )}
                    <form onSubmit={handleReviewSubmit} style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
                      <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem' }}>
                        <label style={labelStyle}>Your Rating *</label>
                        <StarRow rating={reviewRating} setRating={setReviewRating} interactive />
                        {reviewRating === 0 && <span style={{ fontFamily:'var(--font-body)', fontSize:'0.72rem', color:'#bbb' }}>Click a star to rate</span>}
                      </div>
                      <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem' }}>
                        <label style={labelStyle}>Your Name *</label>
                        <input
                          value={reviewName} onChange={e=>setReviewName(e.target.value)} required placeholder="e.g. Priya M."
                          style={inputStyle}
                          onFocus={e => e.target.style.borderColor='var(--color-teal-500)'}
                          onBlur={e => e.target.style.borderColor='#ddd'}
                        />
                      </div>
                      <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem' }}>
                        <label style={labelStyle}>Your Review *</label>
                        <textarea
                          value={reviewText} onChange={e=>setReviewText(e.target.value)} required placeholder="Share your honest experience with this product..."
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
                        <Send size={14} /> Submit Review
                      </button>
                    </form>
                  </div>

                </div>
              </div>

              {/* Related Products */}
              {product.related?.length > 0 && (
                <div style={{ marginTop:'5rem' }}>
                  <div style={{ height:'1px', backgroundColor:'rgba(61,144,137,0.15)', marginBottom:'3.5rem' }} />
                  <div style={{ textAlign:'center', marginBottom:'3rem' }}>
                    <span style={{ fontFamily:'var(--font-body)', fontSize:'0.68rem', letterSpacing:'0.25em', textTransform:'uppercase', color:'var(--color-gold-400)' }}>Explore More</span>
                    <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:300, color:'var(--color-charcoal)', marginTop:'0.5rem' }}>
                      From the Same Collection
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
  fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600,
  letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555',
}

const inputStyle = {
  width: '100%', padding: '0.85rem 1rem',
  border: '1.5px solid #ddd', borderRadius: '6px',
  fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-charcoal)',
  outline: 'none', transition: 'border-color 0.2s', backgroundColor: '#faf8f3',
  boxSizing: 'border-box',
}
