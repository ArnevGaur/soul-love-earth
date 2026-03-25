import { useEffect } from 'react'
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export default function BlogPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#faf8f3', minHeight: '100vh', paddingTop: '80px', paddingBottom: '6rem' }}>
        
        {/* Article Header / Hero Image */}
        <article style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
          
          <div style={{ marginTop: '3rem', marginBottom: '2rem' }}>
            <Link to="/" style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem', 
              fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-teal-600)', 
              textDecoration: 'none', transition: 'color 0.2s',
              marginBottom: '2rem'
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-teal-800)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-teal-600)'}
            >
              <ArrowLeft size={16} /> Back to Home
            </Link>

            <span className="section-label animate-fade-up" style={{ display: 'block', marginBottom: '1rem' }}>
              Events & Exhibitions
            </span>
            
            <h1 className="animate-fade-up delay-100" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: 'var(--color-charcoal)',
              lineHeight: 1.15,
              marginBottom: '1.5rem'
            }}>
              Soul Love and Earth at The Hotel Show Dubai 2025 – Showcasing Sustainable Elegance for Modern Hospitality
            </h1>

            <div className="animate-fade-up delay-200" style={{ 
              display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap',
              fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#666',
              borderBottom: '1px solid rgba(61, 144, 137, 0.15)',
              paddingBottom: '2rem', marginBottom: '3rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={16} color="var(--color-gold-400)" />
                June 15, 2025
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={16} color="var(--color-gold-400)" />
                By Editorial Team
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--color-teal-600)' }}>
                <Share2 size={16} /> Share Article
              </div>
            </div>
          </div>

          {/* Actual Event Photo */}
          <img 
            className="animate-fade-up delay-300" 
            src="/hotel-show-collage.jpg" 
            alt="Soul Love and Earth at The Hotel Show Dubai"
            style={{
              width: '100%',
              maxHeight: '550px',
              objectFit: 'cover',
              borderRadius: '4px',
              border: '1px solid rgba(61, 144, 137, 0.15)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              marginBottom: '4rem',
              display: 'block'
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          {/* Fallback if image not immediately available in public folder */}
          <div className="fallback-hero" style={{ 
            display: 'none', 
            width: '100%', height: '200px', 
            backgroundColor: 'var(--color-stone)', 
            alignItems: 'center', justifyContent: 'center', 
            marginBottom: '4rem', color: '#888', fontStyle: 'italic'
          }}>
            Please save the photo as 'hotel-show-collage.jpg' in your 'public' folder.
          </div>

          {/* Article Content */}
          <div className="animate-fade-up delay-400 blog-content" style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: '#444',
            maxWidth: '760px',
            margin: '0 auto'
          }}>
            <p style={{ fontSize: '1.25rem', color: 'var(--color-teal-800)', lineHeight: 1.6, marginBottom: '2.5rem', fontStyle: 'italic' }}>
              We are thrilled to announce that Soul Love and Earth will be participating in The Hotel Show Dubai 2025, bringing our curated collection of sustainable, artisan-crafted amenities and décor to the forefront of the region's hospitality industry.
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
              As the hospitality landscape evolves, there is a growing demand for spaces that not only offer luxury but also demonstrate a profound respect for our planet. At Soul Love and Earth, we believe that true elegance lies in conscious choices. Our entry into The Hotel Show 2025 marks a significant milestone in our journey to redefine luxury through sustainability.
            </p>

            <h2 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '2rem', 
              color: 'var(--color-charcoal)', 
              marginTop: '3.5rem', 
              marginBottom: '1.5rem' 
            }}>
              What to Expect at Our Pavilion
            </h2>

            <p style={{ marginBottom: '1.5rem' }}>
              Visitors to our stand will experience a sensory journey through our core collections, each thoughtfully designed to elevate the guest experience while minimizing environmental impact:
            </p>

            <ul style={{ marginBottom: '2.5rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li>
                <strong style={{ color: 'var(--color-teal-700)' }}>Artisan-Crafted Copperware:</strong> Transform dining and refreshment experiences with our pure, intentionally crafted copper vessels that naturally purify and alkalize water.
              </li>
              <li>
                <strong style={{ color: 'var(--color-teal-700)' }}>Earthen Room Amenities:</strong> Discover our range of clay and ceramic accents that add a grounding, earthy touch to luxury suites, stepping away from mass-produced plastics.
              </li>
              <li>
                <strong style={{ color: 'var(--color-teal-700)' }}>Sustainable Textiles & Footwear:</strong> Experience the unmatched comfort of our breathable, organic cotton woven goods and handmade spa footwear.
              </li>
            </ul>

            <blockquote style={{
              borderLeft: '3px solid var(--color-gold-400)',
              padding: '1.5rem 2rem',
              margin: '3rem 0',
              backgroundColor: 'white',
              boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
            }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-charcoal)', margin: 0, fontStyle: 'italic', lineHeight: 1.5 }}>
                "Our vision is to help visionary hoteliers create spaces where guests can reconnect with nature without sacrificing the premium comforts of modern hospitality."
              </p>
            </blockquote>

            <p style={{ marginBottom: '1.5rem' }}>
              We invite hoteliers, interior designers, and procurement managers to join us and explore partnership opportunities. Let us work together to bring authentic soul, profound love, and a deep reverence for the earth into every guest's stay.
            </p>

            <p style={{ marginBottom: '4rem' }}>
              <strong>Stay tuned for more updates, and register your interest to receive a personalized invitation to our exclusive showcase events during the exhibition.</strong>
            </p>

            {/* Tags */}
            <div style={{ 
              display: 'flex', gap: '0.75rem', flexWrap: 'wrap',
              borderTop: '1px solid rgba(61, 144, 137, 0.15)',
              paddingTop: '2rem'
            }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--color-charcoal)', alignSelf: 'center', marginRight: '0.5rem' }}>TAGS:</span>
              {['Exhibitions', 'Hospitality', 'Dubai 2025', 'Sustainability'].map(tag => (
                <span key={tag} style={{
                  padding: '0.4rem 1rem',
                  backgroundColor: 'white',
                  border: '1px solid rgba(61, 144, 137, 0.2)',
                  fontSize: '0.75rem',
                  color: 'var(--color-teal-700)',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'var(--color-teal-50)'
                  e.currentTarget.style.borderColor = 'var(--color-teal-400)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'white'
                  e.currentTarget.style.borderColor = 'rgba(61, 144, 137, 0.2)'
                }}
                >
                  {tag}
                </span>
              ))}
            </div>

          </div>
        </article>

      </main>
      <Footer />
    </>
  )
}
