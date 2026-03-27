import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/home/Hero'
import ValueProps from '../components/home/ValueProps'
import Categories from '../components/home/Categories'
import BagsCollection from '../components/home/BagsCollection'
import NewArrivals from '../components/home/NewArrivals'
import Story from '../components/home/Story'
import Testimonials from '../components/home/Testimonials'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ValueProps />
        <Categories />
        <BagsCollection />
        <NewArrivals />
        <Story />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}