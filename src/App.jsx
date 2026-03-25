import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Homepage'
import ShopPage from './pages/ShopPage'
import StoryPage from './pages/StoryPage'
import OffersPage from './pages/OffersPage'
import ContactPage from './pages/ContactPage'
import BlogPage from './pages/BlogPage'
import CheckoutPage from './pages/CheckoutPage'
import WhatsAppButton from './components/ui/WhatsAppButton'
import { CartProvider } from './context/CartContext'
import './index.css'

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"     element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
        <WhatsAppButton />
      </BrowserRouter>
    </CartProvider>
  )
}