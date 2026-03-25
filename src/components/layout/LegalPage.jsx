import Navbar from './Navbar'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function LegalPage({ title, subtitle, sections }) {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#faf8f3', minHeight: '100vh', paddingTop: '90px' }}>

        {/* Hero */}
        <div style={{ background: 'linear-gradient(135deg, #0f1f1e 60%, #1a4040)', padding: '4rem 2rem 3rem', textAlign: 'center' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#d4a843' }}>Legal & Policies</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, color: 'white', margin: '0.75rem 0 0.75rem', lineHeight: 1.2 }}>{title}</h1>
          {subtitle && <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'rgba(255,255,255,0.55)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>{subtitle}</p>}
        </div>

        {/* Breadcrumb */}
        <div style={{ borderBottom: '1px solid rgba(61,144,137,0.12)', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0.85rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#999' }}>
            <Link to="/" style={{ color: '#999', textDecoration: 'none' }} onMouseEnter={e => e.target.style.color = 'var(--color-teal-500)'} onMouseLeave={e => e.target.style.color = '#999'}>Home</Link>
            <ChevronRight size={12} />
            <span style={{ color: 'var(--color-charcoal)' }}>{title}</span>
          </div>
        </div>

        {/* Body */}
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem 6rem' }}>
          {sections.map((section, i) => (
            <div key={i} style={{ marginBottom: '3.5rem' }}>
              {section.heading && (
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', fontWeight: 400, color: 'var(--color-charcoal)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {section.number && (
                    <span style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(61,144,137,0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-teal-600)', flexShrink: 0 }}>
                      {section.number}
                    </span>
                  )}
                  {section.heading}
                </h2>
              )}
              {section.body.map((block, j) => {
                if (block.type === 'p') return (
                  <p key={j} style={{ fontFamily: 'var(--font-body)', fontSize: '0.97rem', color: '#555', lineHeight: 1.85, marginBottom: '1.1rem' }}
                    dangerouslySetInnerHTML={{ __html: block.text }} />
                )
                if (block.type === 'ul') return (
                  <ul key={j} style={{ margin: '0.5rem 0 1.1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {block.items.map((item, k) => (
                      <li key={k} style={{ fontFamily: 'var(--font-body)', fontSize: '0.97rem', color: '#555', lineHeight: 1.75 }}
                        dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                )
                if (block.type === 'highlight') return (
                  <div key={j} style={{ backgroundColor: 'rgba(61,144,137,0.07)', border: '1px solid rgba(61,144,137,0.2)', borderLeft: '4px solid var(--color-teal-500)', borderRadius: '4px', padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-teal-700)', lineHeight: 1.75, margin: 0 }}
                      dangerouslySetInnerHTML={{ __html: block.text }} />
                  </div>
                )
                return null
              })}
              {i < sections.length - 1 && <div style={{ height: '1px', backgroundColor: 'rgba(61,144,137,0.12)', marginTop: '3rem' }} />}
            </div>
          ))}

          {/* Contact CTA */}
          <div style={{ backgroundColor: '#0f1f1e', borderRadius: '12px', padding: '2.5rem', textAlign: 'center', marginTop: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'white', marginBottom: '0.75rem', fontWeight: 300 }}>Have Questions?</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.55)', marginBottom: '1.5rem' }}>Our team is always happy to help with any queries.</p>
            <Link to="/contact" style={{ display: 'inline-block', padding: '0.9rem 2.5rem', backgroundColor: '#d4a843', color: 'white', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', borderRadius: '3px', transition: 'background-color 0.2s' }}
              onMouseEnter={e => e.target.style.backgroundColor = '#b8902e'} onMouseLeave={e => e.target.style.backgroundColor = '#d4a843'}>
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
