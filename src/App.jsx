import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Homepage'
import ShopPage from './pages/ShopPage'
import StoryPage from './pages/StoryPage'
import OffersPage from './pages/OffersPage'
import ContactPage from './pages/ContactPage'
import BlogPage from './pages/BlogPage'
import CheckoutPage from './pages/CheckoutPage'
import ProductPage from './pages/ProductPage'
import PricingDeliveryPage from './pages/PricingDeliveryPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import ReturnPolicyPage from './pages/ReturnPolicyPage'
import ReportScamPage from './pages/ReportScamPage'
import TermsPage from './pages/TermsPage'
import ReviewTermsPage from './pages/ReviewTermsPage'
import WhatsAppButton from './components/ui/WhatsAppButton'
import RouteProgress from './components/ui/RouteProgress'
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
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/pricing-delivery" element={<PricingDeliveryPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/return-policy" element={<ReturnPolicyPage />} />
          <Route path="/report-scam" element={<ReportScamPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/review-terms" element={<ReviewTermsPage />} />
        </Routes>
        <RouteProgress />
        <WhatsAppButton />
      </BrowserRouter>
    </CartProvider>
  )
}