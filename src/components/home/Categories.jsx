import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const categories = [
  { labelEn: 'Kitchenware', labelAr: 'أدوات المطبخ', subtextEn: 'Hand-hammered copper & ceramics', subtextAr: 'نحاس مطروق يدوياً وسيراميك', href: '/shop?cat=kitchenware', image: '/images/Categories/kitchenware.jpg' },
  { labelEn: 'Home Decor', labelAr: 'ديكور المنزل', subtextEn: 'Organic textures for sanctuary', subtextAr: 'أنسجة عضوية للملاذ', href: '/shop?cat=home-decor', image: '/images/Categories/home-decor.jpg' },
  { labelEn: 'Fashion', labelAr: 'أزياء', subtextEn: 'Timeless, ethical silhouettes', subtextAr: 'تصاميم خالدة وأخلاقية', href: '/shop?cat=fashion', image: '/images/Categories/fashion.jpg' },
  { labelEn: 'Beauty & Health', labelAr: 'الصحة والجمال', subtextEn: 'Botanical extracts & natural care', subtextAr: 'مستخلصات نباتية وعناية طبيعية', href: '/shop?cat=beauty-health', image: '/images/Categories/beauty.png' },
  { labelEn: 'Gifts', labelAr: 'هدايا', subtextEn: 'Thoughtful curations for loved ones', subtextAr: 'تنسيقات مدروسة لمن تحب', href: '/shop?cat=gifts', image: '/images/Categories/gifts.jpg' },
  { labelEn: 'Bags', labelAr: 'حقائب', subtextEn: 'Handcrafted sustainable carry', subtextAr: 'حقائب مستدامة مصنوعة يدوياً', href: '/shop?cat=bags', image: '/images/Categories/bags.png' },
  { labelEn: 'Bath Linen', labelAr: 'بياضات الحمام', subtextEn: 'Luxuriously soft organic cotton', subtextAr: 'قطن عضوي ناعم وفاخر', href: '/shop?cat=bath-linen', image: '/images/Categories/linen.jpg' },
  { labelEn: 'Hospitality', labelAr: 'مستلزمات الضيافة', subtextEn: 'Premium amenities for guests', subtextAr: 'وسائل راحة فاخرة للضيوف', href: '/shop?cat=hospitality', image: '/images/Categories/hospitality.jpg' },
]

export default function Categories() {
  const { t, lang } = useLanguage()
  const dir = t?.dir || 'ltr'

  return (
    <section id="categories" style={{ padding: '4rem 1.5rem', background: '#faf8f3' }}>
      {/* Header */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '3rem', direction: dir }}>
        <span style={{
          fontFamily: 'Jost, sans-serif',
          fontSize: '0.75rem',
          fontWeight: 500,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#d4a843',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          marginBottom: '1rem',
        }}>
          <span style={{ width: '40px', height: '1px', backgroundColor: '#d4a843', opacity: 0.6 }} />
          {t?.home?.collectionsSub || 'Explore'}
          <span style={{ width: '40px', height: '1px', backgroundColor: '#d4a843', opacity: 0.6 }} />
        </span>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 400,
          color: '#3d9089',
          margin: 0,
          letterSpacing: '0.01em',
          lineHeight: 1.1,
        }}>
          {t?.home?.collectionsTitle || 'Shop by Category'}
        </h2>
      </div>

      <style>{`
        .category-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          grid-auto-rows: 240px;
          gap: 2rem;
          max-width: 960px;
          margin: 0 auto;
        }

        /* 
          Desktop (5 columns): Alternating 60% / 40%
          Row 1: [0: span 3], [1: span 2]
          Row 2: [2: span 2], [3: span 3]
          Row 3: [4: span 3], [5: span 2]
          Row 4: [6: span 2], [7: span 3]
        */
        .cat-item-0 { grid-column: span 3; }
        .cat-item-1 { grid-column: span 2; }
        .cat-item-2 { grid-column: span 2; }
        .cat-item-3 { grid-column: span 3; }
        .cat-item-4 { grid-column: span 3; }
        .cat-item-5 { grid-column: span 2; }
        .cat-item-6 { grid-column: span 2; }
        .cat-item-7 { grid-column: span 3; }

        .cat-card {
          border-radius: 1.5rem;
          overflow: hidden;
          position: relative;
          height: 100%;
          width: 100%;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }

        .cat-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cat-card:hover .cat-img {
          transform: scale(1.05);
        }

        @media (max-width: 1024px) {
          .category-grid {
            grid-auto-rows: 210px;
          }
        }

        @media (max-width: 768px) {
          .category-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: 250px;
          }
          .cat-item-[class^="cat-item-"], .category-grid > a {
            grid-column: span 1 !important;
          }
        }
      `}</style>
      
      {/* Grid */}
      <div className="category-grid" dir={dir}>
        {categories.map((cat, i) => (
          <Link key={cat.labelEn} to={cat.href} className={`cat-item-${i}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
            <div className="cat-card">
              <img className="cat-img" src={cat.image} alt={lang === 'ar' ? cat.labelAr : cat.labelEn} />
              
              {/* Gradient Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 60%)',
                zIndex: 2,
                pointerEvents: 'none',
              }} />

              {/* Text Content */}
              <div style={{
                position: 'absolute',
                bottom: '1.5rem',
                [dir === 'rtl' ? 'right' : 'left']: '1.75rem',
                zIndex: 3,
                color: '#ffffff',
                maxWidth: '85%',
              }}>
                <h3 style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                  fontWeight: 600,
                  margin: '0 0 0.25rem',
                  letterSpacing: '0.01em',
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                }}>
                  {lang === 'ar' ? cat.labelAr : cat.labelEn}
                </h3>
                <p style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '0.85rem',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.95)',
                  margin: 0,
                  letterSpacing: '0.02em',
                }}>
                  {lang === 'ar' ? cat.subtextAr : cat.subtextEn}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}