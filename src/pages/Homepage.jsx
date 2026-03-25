import Navbar from '../components/layout/Navbar'
import Hero from '../components/home/Hero'
import ValueProps from '../components/home/ValueProps'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ValueProps />
        {/* More sections coming next */}
      </main>
    </>
  )
}