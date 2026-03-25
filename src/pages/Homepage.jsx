import Navbar from '../components/layout/Navbar'
import Hero from '../components/home/Hero'
import ValueProps from '../components/home/ValueProps'
import Categories from '../components/home/Categories'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ValueProps />
        <Categories />
        {/* More sections coming next */}
      </main>
    </>
  )
}