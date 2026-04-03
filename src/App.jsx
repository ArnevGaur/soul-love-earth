import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
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
import OrderPlacedPage from './pages/OrderPlacedPage'
import WhatsAppButton from './components/ui/WhatsAppButton'
import RouteProgress from './components/ui/RouteProgress'
import { CartProvider } from './context/CartContext'
import { LanguageProvider } from './context/LanguageContext'
import AuthPage from './pages/AuthPage'
import OrdersPage from './pages/OrdersPage'
import HospitalityPage from './pages/HospitalityPage'
import PageTransition from './components/layout/PageTransition'
import AuthBackdrop from './components/layout/AuthBackdrop'
import './index.css'
import './mobile.css'

function AnimatedRoutes() {
  const location = useLocation()
  
  // Prevent remounting the animated auth slider when switching between /login and /register
  const routeKey = location.pathname === '/login' || location.pathname === '/register' 
    ? 'auth-slider-route' 
    : location.pathname;

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={routeKey}>
        <Route path="/"     element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/shop" element={<PageTransition><ShopPage /></PageTransition>} />
        <Route path="/story" element={<PageTransition><StoryPage /></PageTransition>} />
        <Route path="/offers" element={<PageTransition><OffersPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
        <Route path="/checkout" element={<PageTransition><CheckoutPage /></PageTransition>} />
        <Route path="/product/:id" element={<PageTransition><ProductPage /></PageTransition>} />
        <Route path="/pricing-delivery" element={<PageTransition><PricingDeliveryPage /></PageTransition>} />
        <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicyPage /></PageTransition>} />
        <Route path="/return-policy" element={<PageTransition><ReturnPolicyPage /></PageTransition>} />
        <Route path="/report-scam" element={<PageTransition><ReportScamPage /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><TermsPage /></PageTransition>} />
        <Route path="/review-terms" element={<PageTransition><ReviewTermsPage /></PageTransition>} />
        <Route path="/order-placed" element={<PageTransition><OrderPlacedPage /></PageTransition>} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/orders" element={<PageTransition><OrdersPage /></PageTransition>} />
        <Route path="/hospitality" element={<PageTransition><HospitalityPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
      <BrowserRouter>
        <AuthBackdrop />
        <AnimatedRoutes />
        <RouteProgress />
        <WhatsAppButton />
      </BrowserRouter>
    </CartProvider>
    </LanguageProvider>
  )
}