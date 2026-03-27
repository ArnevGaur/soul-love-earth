import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { fetchProduct } from '../services/opencart'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ProductCard from '../components/ui/ProductCard'
import { ArrowLeft, ShoppingBag, Star, Shield, Leaf, Package, Minus, Plus, ChevronLeft, ChevronRight, Send } from 'lucide-react'

function StarRow({ rating, setRating, interactive = false }) {
  const [hover, setHover] = useState(0)
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[1,2,3,4,5].map(i => (
        <Star
          key={i}
          size={interactive ? 22 : 14}
          fill={(hover || rating) >= i ? '#d4a843' : 'none'}
          color="#d4a843"
          strokeWidth={1.2}
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
      backgroundColor: '#ffffff', 
      borderRadius: '24px', 
      border: '1px solid rgba(33,78,65,0.06)',
      boxShadow: '0 8px 30px rgba(33,78,65,0.03)',
      transition: 'transform 0.3s ease',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <div style={{ 
            fontFamily: 'Jost, sans-serif', 
            fontSize: '1rem', 
            fontWeight: 600, 
            color: '#214e41', 
            marginBottom: '0.4rem' 
          }}>{review.author}</div>
          <StarRow rating={review.rating} />
        </div>
        <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.75rem', color: '#999', letterSpacing: '0.05em' }}>{review.date}</span>
      </div>
      <p style={{ 
        fontFamily: 'Jost, sans-serif', 
        fontSize: '0.95rem', 
        color: '#555', 
        lineHeight: 1.8, 
        margin: 0,
        fontWeight: 300
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

      <main style={{ backgroundColor: '#faf8f3', minHeight: '100vh', paddingTop: '72px' }}>

        {/* Breadcrumb */}
        <div style={{ borderBottom: '1px solid rgba(33,78,65,0.08)', backgroundColor: '#fcfbf8' }}>
          <div style={{ 
            maxWidth: '1280px', margin:'0 auto', padding:'0.85rem 2rem', 
            display:'flex', alignItems:'center', gap:'0.75rem', 
            fontFamily:'Jost, sans-serif', fontSize:'0.7rem', fontWeight: 600,
            color:'#214e41', letterSpacing: '0.12rem', textTransform: 'uppercase' 
          }} dir={t.dir}>
            <Link to="/" style={{ color:'#214e41', textDecoration:'none', transition: 'all 0.2s ease', opacity: 0.75 }} onMouseEnter={e=>e.target.style.color='#d4a843'} onMouseLeave={e=>e.target.style.color='#214e41'}>{l.home}</Link>
            <span style={{ fontSize: '0.6rem', color: '#d1d1d1' }}>/</span>
            <Link to="/shop" style={{ color:'#214e41', textDecoration:'none', transition: 'all 0.2s ease', opacity: 0.75 }} onMouseEnter={e=>e.target.style.color='#d4a843'} onMouseLeave={e=>e.target.style.color='#214e41'}>{t.nav.shop}</Link>
            {product?.category && (
              <>
                <span style={{ fontSize: '0.6rem', color: '#d1d1d1' }}>/</span>
                <Link to={`/shop?cat=${product.category_id}`} style={{ color:'#214e41', textDecoration:'none', transition: 'all 0.2s ease', opacity: 0.75 }} onMouseEnter={e=>e.target.style.color='#d4a843'} onMouseLeave={e=>e.target.style.color='#214e41'}>{product.category.name}</Link>
              </>
            )}
            {product && (
              <>
                <span style={{ fontSize: '0.6rem', color: '#d1d1d1' }}>/</span>
                <span style={{ color:'#3d9089', fontWeight: 700 }}>{product.name}</span>
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
                      overflow:'hidden', 
                      borderRadius:'24px', 
                      backgroundColor:'#f8f6f2', 
                      lineHeight:0, 
                      marginBottom:'1.25rem', 
                      position:'relative',
                      boxShadow: '0 10px 40px rgba(33,78,65,0.06)'
                    }}>
                      {product.special && (
                        <span style={{ 
                          position:'absolute', 
                          top:'1.5rem', 
                          [t.dir === 'rtl' ? 'right' : 'left']:'1.5rem', 
                          backgroundColor:'#d4a843', 
                          color:'white', 
                          fontFamily:'Jost, sans-serif', 
                          fontSize:'0.65rem', 
                          fontWeight:700, 
                          letterSpacing:'0.15em', 
                          textTransform:'uppercase', 
                          padding:'0.4rem 1rem', 
                          borderRadius: '20px',
                          zIndex: 1 
                        }}>
                          {p.sale}
                        </span>
                      )}
                        {allImages.length > 1 && (
                          <>
                            <button 
                              onClick={() => setActiveImg(prev => (prev - 1 + allImages.length) % allImages.length)}
                              style={{
                                position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)',
                                width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.8)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer',
                                transition: 'all 0.3s ease', zIndex: 2, color: '#317570',
                                backdropFilter: 'blur(4px)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                              }}
                              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'white'}
                              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)'}
                            >
                              <ChevronLeft size={20} />
                            </button>
                            <button 
                              onClick={() => setActiveImg(prev => (prev + 1) % allImages.length)}
                              style={{
                                position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)',
                                width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.8)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer',
                                transition: 'all 0.3s ease', zIndex: 2, color: '#317570',
                                backdropFilter: 'blur(4px)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                              }}
                              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'white'}
                              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)'}
                            >
                              <ChevronRight size={20} />
                            </button>
                          </>
                        )}
                        <div style={{ 
                          display: 'flex', 
                          width: '100%', 
                          transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
                          transform: `translateX(${t.dir === 'rtl' ? activeImg * 100 : -activeImg * 100}%)`,
                        }}>
                          {allImages.map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              alt={`${product.name} ${i+1}`}
                              style={{ width:'100%', aspectRatio:'1/1', objectFit:'cover', flexShrink: 0 }}
                              onError={e => e.target.src='https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80'}
                            />
                          ))}
                        </div>
                    </div>
 
                    {/* Thumbnail strip */}
                    {allImages.length > 1 && (
                      <div style={{ display:'flex', gap:'1rem', overflowX:'auto', padding:'0.5rem 0.2rem 1rem 0.2rem' }}>
                        {allImages.map((img, i) => (
                          <button
                            key={i}
                            className="thumb-btn"
                            onClick={() => setActiveImg(i)}
                            style={{
                              flexShrink: 0, width:'84px', height:'84px', padding:0, border:'none', cursor:'pointer',
                              borderRadius:'16px', overflow:'hidden', lineHeight:0,
                              border: activeImg === i ? '2.5px solid #d4a843' : '2.5px solid transparent',
                              opacity: activeImg === i ? 1 : 0.6,
                              backgroundColor: 'white',
                              boxShadow: activeImg === i ? '0 4px 12px rgba(212,168,67,0.2)' : 'none',
                              transition: 'all 0.3s ease'
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
                <div dir={t.dir} style={{ paddingTop: '1rem' }}>
                  <Link to={`/shop?cat=${product.category_id}`} style={{ fontFamily:'Jost, sans-serif', fontSize:'0.75rem', fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase', color:'#d4a843', textDecoration:'none', transition: 'color 0.3s' }} onMouseEnter={e=>e.target.style.color='#214e41'}>
                    {product.category?.name}
                  </Link>
 
                  <h1 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(2.5rem,5vw,3.5rem)', fontWeight:600, color:'#2c635a', margin:'1rem 0 1.5rem 0', lineHeight:1.1 }}>
                    {product.name}
                  </h1>
 
                  {/* Rating summary */}
                  <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'2rem' }}>
                    <StarRow rating={Math.round(avgRating || 4)} />
                    <span style={{ fontFamily:'Jost, sans-serif', fontSize:'0.85rem', color:'#777', fontWeight: 400 }}>
                      <strong style={{ color: '#3d9089', fontWeight: 600 }}>{avgRating || '4.0'}</strong> / 5.0 · {p.reviewsOf.replace('{n}', reviews.length)}
                    </span>
                  </div>
 
                  {/* Price */}
                  <div style={{ display:'flex', alignItems:'baseline', gap:'1rem', marginBottom:'2.5rem' }}>
                    <span style={{ fontFamily:'Jost, sans-serif', fontSize:'2.25rem', color:'#2c635a', fontWeight:600, letterSpacing:'-0.01em' }}>{displayPrice}</span>
                    {originalPrice && <span style={{ fontFamily:'Jost, sans-serif', fontSize:'1.2rem', color:'#bbb', textDecoration:'line-through', fontWeight: 300 }}>{originalPrice}</span>}
                  </div>
 
                  <p style={{ fontFamily:'Jost, sans-serif', fontSize:'1.05rem', color:'#555', lineHeight:1.8, marginBottom:'2.5rem', fontWeight: 300 }}>{product.description}</p>
 
                  {/* Tags */}
                  {product.tags && (
                    <div style={{ display:'flex', flexWrap:'wrap', gap:'0.6rem', marginBottom:'3rem' }}>
                      {product.tags.map(tag => (
                        <span key={tag} style={{ fontFamily:'Jost, sans-serif', fontSize:'0.75rem', fontWeight: 500, padding:'0.4rem 1.2rem', border:'1.2px solid rgba(61,144,137,0.15)', color:'#3d9089', borderRadius:'30px', backgroundColor: 'white' }}>{tag}</span>
                      ))}
                    </div>
                  )}
 
                  <div style={{ height:'1px', backgroundColor:'rgba(33,78,65,0.08)', marginBottom:'2.5rem' }} />
 
                  {/* Quantity & CTA Wrapper */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'2rem' }}>
                      <span style={{ fontFamily:'Jost, sans-serif', fontSize:'0.75rem', fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase', color:'#2c635a' }}>{p.quantity}</span>
                      <div style={{ 
                        display:'flex', alignItems:'center', 
                        backgroundColor:'white', 
                        borderRadius: '30px',
                        border: '1px solid rgba(61,144,137,0.1)',
                        padding: '2px'
                      }}>
                        <button onClick={() => setQty(q=>Math.max(1,q-1))} style={{ background:'none', border:'none', width:'40px', height:'40px', cursor:'pointer', color:'#3d9089', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'50%' }}><Minus size={14} /></button>
                        <span style={{ fontFamily:'Jost, sans-serif', fontSize:'1rem', fontWeight: 600, width:'2rem', textAlign:'center', color:'#3d9089' }}>{qty}</span>
                        <button onClick={() => setQty(q=>q+1)} style={{ background:'none', border:'none', width:'40px', height:'40px', cursor:'pointer', color:'#3d9089', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'50%' }}><Plus size={14} /></button>
                      </div>
                    </div>
 
                    {/* Add to Cart */}
                    <button
                      onClick={handleAddToCart}
                      style={{
                        width:'100%', padding:'1.25rem',
                        backgroundColor: added ? '#214e41' : '#2c635a',
                        color:'white', border:'none', cursor:'pointer', borderRadius:'40px',
                        fontFamily:'Jost, sans-serif', fontSize:'0.85rem', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase',
                        transition:'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)', display:'flex', alignItems:'center', justifyContent:'center', gap:'0.75rem',
                        boxShadow: '0 8px 25px rgba(44, 99, 90, 0.15)',
                      }}
                      onMouseEnter={e => { 
                        if(!added) {
                          e.currentTarget.style.backgroundColor='#d4a843'
                          e.currentTarget.style.transform='translateY(-3px)'
                          e.currentTarget.style.boxShadow='0 12px 30px rgba(212,168,67,0.3)'
                        }
                      }}
                      onMouseLeave={e => { 
                        if(!added) {
                          e.currentTarget.style.backgroundColor='#2c635a'
                          e.currentTarget.style.transform='translateY(0)'
                          e.currentTarget.style.boxShadow='0 8px 25px rgba(44, 99, 90, 0.15)'
                        }
                      }}
                    >
                      <ShoppingBag size={18} />
                      {added ? p.added : p.addToCart.replace('{price}', displayPrice)}
                    </button>
                  </div>
 
                  {/* Trust signals */}
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.25rem', padding: '1.5rem', backgroundColor: 'rgba(33,78,65,0.03)', borderRadius: '24px' }}>
                    {[{icon:<Shield size={16}/>,label:p.trustQuality},{icon:<Leaf size={16}/>,label:p.trustEthical},{icon:<Package size={16}/>,label:p.trustEco},{icon:<ShoppingBag size={16}/>,label:p.trustReturn}].map(({icon,label})=>(
                      <div key={label} style={{ display:'flex', alignItems:'center', gap:'0.75rem', fontFamily:'Jost, sans-serif', fontSize:'0.78rem', color:'#555', fontWeight: 400 }}>
                        <span style={{ color:'#d4a843' }}>{icon}</span>{label}
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
                    <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'2.5rem', fontWeight:600, color:'#2c635a', marginBottom:'0.5rem' }}>
                       {p.reviews}
                     </h2>
                    {avgRating && (
                      <div style={{ display:'flex', alignItems:'center', gap:'1.25rem', marginBottom:'2.5rem' }}>
                        <span style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'4rem', color:'#d4a843', lineHeight:1, fontWeight: 500 }}>{avgRating}</span>
                        <div>
                          <StarRow rating={Math.round(avgRating)} />
                          <span style={{ fontFamily:'Jost, sans-serif', fontSize:'0.85rem', color:'#999', marginTop: '0.4rem', display: 'block' }}>{p.reviewsOf.replace('{n}', reviews.length)}</span>
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
                  <div style={{ backgroundColor:'white', borderRadius:'32px', padding:'2.5rem', border:'1px solid rgba(61,144,137,0.06)', boxShadow:'0 15px 45px rgba(61,144,137,0.04)' }} dir={t.dir}>
                    <h3 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.8rem', fontWeight:600, color:'#2c635a', marginBottom:'1.5rem' }}>
                      {p.writeReview}
                    </h3>
                    {reviewSubmitted && (
                      <div style={{ backgroundColor:'rgba(61,144,137,0.05)', border:'1px solid rgba(61,144,137,0.1)', borderRadius:'12px', padding:'1.25rem', marginBottom:'2rem', fontFamily:'Jost, sans-serif', fontSize:'0.9rem', color:'#3d9089', fontWeight: 500 }}>
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
                          onFocus={e => {
                            e.target.style.borderColor='#3d9089'
                            e.target.style.boxShadow='0 0 0 4px rgba(61,144,137,0.05)'
                          }}
                          onBlur={e => {
                            e.target.style.borderColor='rgba(61,144,137,0.1)'
                            e.target.style.boxShadow='none'
                          }}
                        />
                      </div>
                      <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem' }}>
                        <label style={labelStyle}>{p.reviewLabel}</label>
                        <textarea
                          value={reviewText} onChange={e=>setReviewText(e.target.value)} required placeholder={p.reviewPlaceholder}
                          rows={5}
                          style={{ ...inputStyle, resize:'vertical', borderRadius: '18px' }}
                          onFocus={e => {
                            e.target.style.borderColor='#3d9089'
                            e.target.style.boxShadow='0 0 0 4px rgba(61,144,137,0.05)'
                          }}
                          onBlur={e => {
                            e.target.style.borderColor='rgba(61,144,137,0.1)'
                            e.target.style.boxShadow='none'
                          }}
                        />
                      </div>
                      <button
                        type="submit"
                        style={{
                          marginTop: '0.5rem',
                          padding:'1.1rem', backgroundColor:'#3d9089', color:'white', border:'none', borderRadius:'30px',
                          fontFamily:'Jost, sans-serif', fontSize:'0.85rem', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', cursor:'pointer',
                          display:'flex', alignItems:'center', justifyContent:'center', gap:'0.8rem', transition:'all 0.3s ease',
                          boxShadow: '0 8px 20px rgba(61,144,137,0.1)'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.backgroundColor='#d4a843'
                          e.currentTarget.style.transform='translateY(-2px)'
                          e.currentTarget.style.boxShadow='0 10px 25px rgba(212,168,67,0.2)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.backgroundColor='#3d9089'
                          e.currentTarget.style.transform='translateY(0)'
                          e.currentTarget.style.boxShadow='0 8px 20px rgba(61,144,137,0.1)'
                        }}
                      >
                        <Send size={15} style={{ transform: t.dir === 'rtl' ? 'rotate(180deg)' : 'none' }} /> {p.submitReview}
                      </button>
                    </form>
                  </div>

                </div>
              </div>

              {/* Related Products */}
              {product.related?.length > 0 && (
                <div style={{ marginTop:'5rem' }}>
                  <div style={{ height:'1px', backgroundColor:'rgba(61,144,137,0.15)', marginBottom:'3.5rem' }} />
                  <div style={{ textAlign:'center', marginBottom:'4rem' }} dir={t.dir}>
                    <span style={{ fontFamily:'Jost, sans-serif', fontSize:'0.7rem', fontWeight: 600, letterSpacing:'0.3em', textTransform:'uppercase', color:'#d4a843' }}>{p.relatedSub}</span>
                    <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.75rem', fontWeight:600, color:'#2c635a', marginTop:'0.75rem' }}>
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
  letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2c635a',
  marginBottom: '0.2rem'
}
 
const inputStyle = {
  width: '100%', padding: '1rem 1.25rem',
  border: '1.5px solid rgba(61,144,137,0.1)', borderRadius: '30px',
  fontFamily: 'Jost, sans-serif', fontSize: '0.95rem', color: '#2c635a',
  outline: 'none', transition: 'all 0.3s ease', backgroundColor: '#fcfbf8',
  boxSizing: 'border-box',
}
