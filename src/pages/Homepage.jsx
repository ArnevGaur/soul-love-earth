import Navbar from '../components/layout/Navbar'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero and other sections coming next */}
        <div style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '2rem',
          color: '#3d9089',
          backgroundColor: '#faf8f3',
        }}>
          Soul Love &amp; Earth
        </div>
      </main>
    </>
  )
}