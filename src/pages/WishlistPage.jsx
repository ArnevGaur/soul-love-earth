import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ProductCard from '../components/ui/ProductCard'
import { useLanguage } from '../context/LanguageContext'

export default function WishlistPage() {
  const { wishlistItems } = useWishlist()
  const { t } = useLanguage()

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#faf8f3', minHeight: '80vh', paddingTop: '100px', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ 
              fontFamily: 'Cormorant Garamond, serif', 
              fontSize: '2.5rem', 
              fontWeight: 600, 
              color: '#2c635a', 
              marginBottom: '1rem' 
            }}>
              Your Wishlist
            </h1>
            <p style={{ 
              fontFamily: 'Jost, sans-serif', 
              fontSize: '1rem', 
              color: '#555' 
            }}>
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>

          {wishlistItems.length > 0 ? (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: '2rem' 
            }}>
              {wishlistItems.map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))}
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '4rem 2rem', 
              backgroundColor: 'white', 
              borderRadius: '24px',
              border: '1px solid rgba(61,144,137,0.1)'
            }}>
              <Heart size={48} strokeWidth={1} color="#bbb" style={{ margin: '0 auto 1.5rem auto' }} />
              <h2 style={{ 
                fontFamily: 'Cormorant Garamond, serif', 
                fontSize: '1.8rem', 
                fontWeight: 500, 
                color: '#2c635a',
                marginBottom: '1rem' 
              }}>
                Your wishlist is empty
              </h2>
              <p style={{ 
                fontFamily: 'Jost, sans-serif', 
                fontSize: '1rem', 
                color: '#777',
                marginBottom: '2rem' 
              }}>
                Looks like you haven't saved any items yet.
              </p>
              <Link 
                to="/shop"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#2c635a',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '1rem 2.5rem',
                  borderRadius: '30px',
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  transition: 'background-color 0.3s'
                }}
                onMouseEnter={e => e.target.style.backgroundColor = '#d4a843'}
                onMouseLeave={e => e.target.style.backgroundColor = '#2c635a'}
              >
                Explore Collection
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
