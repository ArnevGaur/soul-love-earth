import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Homepage'
import ShopPage from './pages/ShopPage'
import StoryPage from './pages/StoryPage'
import WhatsAppButton from './components/ui/WhatsAppButton'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"     element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/story" element={<StoryPage />} />
      </Routes>
      <WhatsAppButton />
    </BrowserRouter>
  )
}