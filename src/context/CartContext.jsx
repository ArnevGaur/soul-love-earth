import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('sle_cart')
    return saved ? JSON.parse(saved) : []
  })
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('sle_cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product_id === product.product_id)
      if (existing) {
        return prev.map(item =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { ...product, quantity }]
    })
    setCartDrawerOpen(true)
  }

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.product_id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId)
    setCartItems(prev =>
      prev.map(item => (item.product_id === productId ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => setCartItems([])

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  
  const cartTotal = cartItems.reduce((acc, item) => {
    const priceStr = item.special ? item.special : item.price
    const price = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0
    return acc + (price * item.quantity)
  }, 0)

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQuantity, clearCart,
      cartCount, cartTotal,
      cartDrawerOpen, setCartDrawerOpen
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
