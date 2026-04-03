import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import AuthSlider from '../components/auth/AuthSlider'

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <AuthSlider initialMode="signIn" />
      <Footer />
    </>
  )
}
