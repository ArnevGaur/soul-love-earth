import { createContext, useContext, useState, useEffect } from 'react'
import { registerCustomer, loginCustomer, logoutCustomer, getCustomer } from '../services/customer'

const CustomerContext = createContext()

export function CustomerProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('sle_customer_token') || null)
  const [authLoading, setAuthLoading] = useState(true)

  // Hydrate session on mount or when token changes
  useEffect(() => {
    async function loadCustomer() {
      if (!accessToken) {
        setCurrentUser(null)
        setAuthLoading(false)
        return
      }
      try {
        const customer = await getCustomer(accessToken)
        if (customer) {
          setCurrentUser(customer)
        } else {
          // Token invalid or expired
          handleLogout()
        }
      } catch (err) {
        console.error('Failed to hydrate customer session:', err)
        handleLogout()
      } finally {
        setAuthLoading(false)
      }
    }
    loadCustomer()
  }, [accessToken])

  const handleLogin = async ({ email, password }) => {
    const token = await loginCustomer({ email, password })
    localStorage.setItem('sle_customer_token', token)
    setAccessToken(token)
    // The useEffect will automatically fetch the user
  }

  const handleRegister = async (userData) => {
    await registerCustomer(userData)
    // After registration, log them in automatically
    await handleLogin({ email: userData.email, password: userData.password })
  }

  const handleLogout = async () => {
    if (accessToken) {
      await logoutCustomer(accessToken)
    }
    localStorage.removeItem('sle_customer_token')
    setAccessToken(null)
    setCurrentUser(null)
  }

  return (
    <CustomerContext.Provider value={{
      currentUser,
      accessToken,
      authLoading,
      login: handleLogin,
      register: handleRegister,
      logout: handleLogout
    }}>
      {children}
    </CustomerContext.Provider>
  )
}

export const useCustomer = () => useContext(CustomerContext)
