import { useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export default function StoryPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#faf8f3', minHeight: '100vh', paddingTop: '80px' }}>
        
        {/* Hero Section */}
        <section style={{
          backgroundColor: '#1a2e2c',
          padding: '6rem 2rem',
          textAlign: 'center',
          color: '#faf8f3',
        }}>
          <span className="section-label animate-fade-up" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ width: '40px', height: '1px', backgroundColor: 'var(--color-gold-400)' }} />
            About Us
            <span style={{ width: '40px', height: '1px', backgroundColor: 'var(--color-gold-400)' }} />
          </span>
          <h1 className="animate-fade-up delay-100" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 300,
            maxWidth: '900px',
            margin: '0 auto',
            lineHeight: 1.1,
          }}>
            Embracing Earth's Essence
          </h1>
          <p className="animate-fade-up delay-200" style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.1rem',
            fontWeight: 300,
            maxWidth: '600px',
            margin: '2rem auto 0',
            color: 'rgba(250, 248, 243, 0.8)'
          }}>
            Our story reflects the belief that every narrative gains significance when it finds listeners willing to pass it on to future generations.
          </p>
        </section>

        {/* The Logo Story */}
        <section style={{ padding: '6rem 2rem', maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="animate-fade-up" style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.5rem',
              color: 'var(--color-teal-800)',
              marginBottom: '1rem'
            }}>
              Our Logo Tells Our Story
            </h2>
            <p className="animate-fade-up delay-100" style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--color-charcoal)',
              maxWidth: '700px',
              margin: '0 auto',
              opacity: 0.8
            }}>
              At Soul Love and Earth, a unit of Marvel Deals LLC, our product selection underscores the advantages of a natural lifestyle and inspires the youth to embrace it in the latest and most contemporary manner.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
          }}>
            {[
              { title: 'The Earth', text: 'The centerpiece of our logo features a stylized representation of the Earth, symbolizing our dedication to environmental stewardship. It serves as a reminder of the interconnectedness of all living beings and our responsibility to protect our shared home.' },
              { title: 'The Heart', text: 'The impression of our home, the Earth, is contained in a heart-shaped icon. This signifies our commitment and symbolizes our intention to unite hearts for sustainable living and a better world.' },
              { title: 'Sustainability Icon', text: 'Nestled within the Earth is an icon that signifies sustainability. It represents the three pillars of sustainability - environmental, social, and economic. This icon embodies our unwavering commitment to balance and responsible practices.' },
              { title: 'Vibrant Colors', text: 'Our logo features vibrant, nature-inspired colors that evoke feelings of vitality, growth, and harmony with the environment. The prime colors are inspired by mother nature’s beauty and aura, inspiring us to create positive change.' }
            ].map((item, index) => (
              <div key={item.title} className="animate-fade-up" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(61, 144, 137, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-teal-500)' }} />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  color: 'var(--color-teal-800)',
                  marginBottom: '1rem'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  lineHeight: 1.8,
                  opacity: 0.8
                }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Narrative Break */}
        <section style={{
          backgroundColor: 'var(--color-stone)',
          padding: '5rem 2rem',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <p className="animate-fade-up" style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.8rem',
              lineHeight: 1.5,
              color: 'var(--color-teal-900)',
            }}>
              "We take pride in our story, where each product embodies cultural and traditional richness, promoting the reduction of chemicals and plastic in daily routines for a healthier and happier life. Together, we're crafting a tale of harmony, sustainability, and a brighter future for all."
            </p>
          </div>
        </section>

        {/* What We Do & What We Offer */}
        <section style={{ padding: '6rem 2rem', maxWidth: '1280px', margin: '0 auto' }}>
          
          {/* What We Do */}
          <div style={{ marginBottom: '6rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '3rem', textAlign: 'center' }}>
              <h2 className="animate-fade-up" style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.5rem',
                color: 'var(--color-teal-800)',
                marginBottom: '1rem'
              }}>
                What We Do
              </h2>
              <p className="animate-fade-up delay-100" style={{ maxWidth: '600px', fontFamily: 'var(--font-body)', opacity: 0.8, lineHeight: 1.6 }}>
                Welcome to Soul Love and Earth, your source for conscious living. We curate eco-friendly products that blend style and sustainability, empowering better choices.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {[
                { label: 'Sustainable Homeware', text: 'Discover ethically sourced furniture and eco-decor that transform your spaces while treading lightly.' },
                { label: 'Green Kitchen Essentials', text: 'Make meals sustainably with our eco-friendly kitchenware, honoring both taste and the planet.' },
                { label: 'Ethical Fashion', text: 'Unite style and values through our sustainable fashion line, from attire to accessories.' },
                { label: 'Conscious Beauty', text: 'Experience beauty that\'s kind to you and the Earth with our eco-friendly cosmetics.' },
                { label: 'Organic Herbs', text: 'Explore nature\'s remedies with our sustainably grown, vibrant herbs.' }
              ].map((item, i) => (
                <div key={i} className="animate-fade-up" style={{
                  padding: '2rem',
                  backgroundColor: 'white',
                  border: '1px solid rgba(61,144,137,0.1)',
                  borderRadius: '2px',
                  animationDelay: `${0.1 * i}s`
                }}>
                  <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--color-teal-700)', marginBottom: '0.75rem', fontWeight: 500 }}>
                    {item.label}
                  </h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#666', lineHeight: 1.6 }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="animate-fade-up delay-500" style={{ marginTop: '3rem', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--color-teal-800)', lineHeight: 1.6, maxWidth: '800px', margin: '0 auto' }}>
                <strong>Our Sustainability Promise:</strong> We uphold strict eco-friendly standards, collaborating with ethical suppliers to uplift communities. We offer not just products, but knowledge for a greener lifestyle. Become part of our community, driving positive change for a sustainable future. Let's journey towards a better, more conscious world together.
              </p>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(61,144,137,0.15)', marginBottom: '6rem' }} />

          {/* What We Offer */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '3rem', textAlign: 'center' }}>
              <h2 className="animate-fade-up" style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.5rem',
                color: 'var(--color-teal-800)',
                marginBottom: '1rem'
              }}>
                What We Offer
              </h2>
              <p className="animate-fade-up delay-100" style={{ maxWidth: '600px', fontFamily: 'var(--font-body)', opacity: 0.8, lineHeight: 1.6 }}>
                Cultivating Sustainable Change with Soul Love and Earth. Our focus is clear: fostering sustainable living through our meticulously curated product range.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {[
                { label: 'Homeware', text: 'Elevate your space with eco-friendly furniture and biodegradable decor that harmonize style with environmental respect.' },
                { label: 'Kitchenware', text: 'Cook sustainably using our durable, planet-friendly essentials, turning each meal into a step towards conservation.' },
                { label: 'Sustainable Fashion', text: 'Discover ethical fashion that radiates style and values, from clothing to accessories and footwear.' },
                { label: 'Cosmetics', text: 'Experience beauty that\'s kind to both you and the planet with our cruelty-free makeup and skincare line.' },
                { label: 'Organic Herbs', text: 'Nourish your well-being naturally with our carefully sourced, organic herbs, cultivated with both health and sustainability in mind.' }
              ].map((item, i) => (
                <div key={i} className="animate-fade-up" style={{
                  padding: '2rem',
                  backgroundColor: 'white',
                  border: '1px solid rgba(61,144,137,0.1)',
                  borderRadius: '2px',
                  animationDelay: `${0.1 * i}s`
                }}>
                  <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--color-teal-700)', marginBottom: '0.75rem', fontWeight: 500 }}>
                    {item.label}
                  </h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#666', lineHeight: 1.6 }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="animate-fade-up delay-500" style={{ marginTop: '3rem', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--color-teal-800)', lineHeight: 1.6, maxWidth: '800px', margin: '0 auto' }}>
                <strong>Our Commitment & Empowering Change:</strong> Sustainability pulses through our core. We embrace responsible practices and collaborate with ethical suppliers who share our mission. Beyond products, we equip you with knowledge and resources to drive informed, eco-conscious choices.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--color-gold-600)', marginTop: '2rem', fontWeight: 500 }}>
                Choosing Soul Love and Earth means joining a vibrant community united in forging a greener, more mindful world. Together, let's inspire transformation and create a planet we're proud to call home.
              </p>
            </div>
          </div>
          
        </section>

      </main>
      <Footer />
    </>
  )
}
