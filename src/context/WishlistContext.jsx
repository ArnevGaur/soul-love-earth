import { createContext, useContext, useState, useEffect } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('sle_wishlist')
      const parsed = saved ? JSON.parse(saved) : []
      return Array.isArray(parsed) ? parsed : []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('sle_wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addToWishlist = (product) => {
    setWishlistItems(prev => {
      if (prev.find(item => item.product_id === product.product_id)) {
        return prev
      }
      return [...prev, product]
    })
  }

  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.product_id !== productId))
  }

  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.find(item => item.product_id === product.product_id)
      if (exists) {
        return prev.filter(item => item.product_id !== product.product_id)
      }
      return [...prev, product]
    })
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  const isWishlisted = (productId) => {
    return wishlistItems.some(item => item.product_id === productId)
  }

  const wishlistCount = wishlistItems.length

  return (
    <WishlistContext.Provider value={{
      wishlistItems, addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist, isWishlisted, wishlistCount
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
