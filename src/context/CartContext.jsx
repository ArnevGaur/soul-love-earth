import { createContext, useContext, useState, useEffect } from 'react'
import { createCart, getCart, addToCart as apiAddToCart, removeFromCart as apiRemoveFromCart, updateCart as apiUpdateCart } from '../services/cart'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('sle_cart')
      const parsed = saved ? JSON.parse(saved) : []
      return Array.isArray(parsed) ? parsed.filter(item => item && item.product_id) : []
    } catch (e) {
      return []
    }
  })
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('sle_wishlist')
      const parsed = saved ? JSON.parse(saved) : []
      return Array.isArray(parsed) ? parsed.filter(item => item && item.product_id) : []
    } catch (e) {
      return []
    }
  })
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)
  const [checkoutUrl, setCheckoutUrl] = useState(() => localStorage.getItem('sle_checkout_url') || '')
  
  // Track mapping between local product IDs and Shopify Cart line IDs
  const [lineIds, setLineIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('sle_cart_lines') || '{}')
    } catch {
      return {}
    }
  })

  // Initialize or fetch Shopify cart
  useEffect(() => {
    async function initCart() {
      let cartId = localStorage.getItem('sle_cart_id')
      let cart
      if (cartId) {
        cart = await getCart(cartId)
      }
      if (!cart) {
        cart = await createCart()
        if (cart) {
          localStorage.setItem('sle_cart_id', cart.id)
        }
      }
      if (cart?.checkoutUrl) {
        setCheckoutUrl(cart.checkoutUrl)
        localStorage.setItem('sle_checkout_url', cart.checkoutUrl)
      }
    }
    initCart()
  }, [])

  useEffect(() => {
    localStorage.setItem('sle_cart', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem('sle_wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  useEffect(() => {
    localStorage.setItem('sle_cart_lines', JSON.stringify(lineIds))
  }, [lineIds])

  const addToCart = async (product, quantity = 1) => {
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

    // Sync to Shopify
    const cartId = localStorage.getItem('sle_cart_id')
    if (cartId && product.variant_id) {
      // Check if we already have a lineId for this product
      const lineId = lineIds[product.product_id]
      if (lineId) {
        const item = cartItems.find(i => i.product_id === product.product_id)
        const newQuantity = (item ? item.quantity : 0) + quantity
        await apiUpdateCart(cartId, lineId, newQuantity)
      } else {
        const updatedCart = await apiAddToCart(cartId, product.variant_id, quantity)
        if (updatedCart) {
          // Find the new line item id
          const newEdge = updatedCart.lines.edges.find(e => e.node.merchandise?.id === product.variant_id)
          if (newEdge) {
            setLineIds(prev => ({ ...prev, [product.product_id]: newEdge.node.id }))
          }
        }
      }
    }
  }

  const removeFromCart = async (productId) => {
    setCartItems(prev => prev.filter(item => item.product_id !== productId))
    
    // Sync to Shopify
    const cartId = localStorage.getItem('sle_cart_id')
    const lineId = lineIds[productId]
    if (cartId && lineId) {
      await apiRemoveFromCart(cartId, lineId)
      setLineIds(prev => {
        const copy = { ...prev }
        delete copy[productId]
        return copy
      })
    }
  }

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId)
    setCartItems(prev =>
      prev.map(item => (item.product_id === productId ? { ...item, quantity } : item))
    )

    // Sync to Shopify
    const cartId = localStorage.getItem('sle_cart_id')
    const lineId = lineIds[productId]
    if (cartId && lineId) {
      await apiUpdateCart(cartId, lineId, quantity)
    }
  }

  const clearCart = () => {
    setCartItems([])
    setLineIds({})
    localStorage.removeItem('sle_cart_id')
    localStorage.removeItem('sle_checkout_url')
    setCheckoutUrl('')
    createCart().then(cart => {
      if (cart) {
        localStorage.setItem('sle_cart_id', cart.id)
        localStorage.setItem('sle_checkout_url', cart.checkoutUrl)
        setCheckoutUrl(cart.checkoutUrl)
      }
    })
  }

  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.some(item => item.product_id === product.product_id)
      if (exists) {
        return prev.filter(item => item.product_id !== product.product_id)
      }
      return [...prev, product]
    })
  }

  const cartCount = cartItems.reduce((acc, item) => acc + (item?.quantity || 0), 0)
  
  const cartTotal = cartItems.reduce((acc, item) => {
    if (!item) return acc
    const priceStr = String(item.special || item.price || '0')
    const price = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0
    return acc + (price * (item.quantity || 0))
  }, 0)

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQuantity, clearCart,
      wishlistItems, toggleWishlist,
      cartCount, cartTotal,
      cartDrawerOpen, setCartDrawerOpen,
      checkoutUrl
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
