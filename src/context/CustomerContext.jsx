import { createContext, useContext, useState, useEffect } from 'react'
import { registerCustomer, loginCustomer, logoutCustomer, getCustomer } from '../services/customer'

const CustomerContext = createContext()

export function CustomerProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  // Hydrate session on mount
  useEffect(() => {
    async function loadCustomer() {
      try {
        const customer = await getCustomer()
        if (customer) {
          setCurrentUser(customer)
        } else {
          setCurrentUser(null)
        }
      } catch (err) {
        if (import.meta.env.DEV) console.error('Failed to hydrate customer session:', err)
        handleLogout()
      } finally {
        setAuthLoading(false)
      }
    }
    loadCustomer()
  }, [])

  const handleLogin = async ({ email, password }) => {
    await loginCustomer({ email, password })
    // Fetch user after successful login
    const customer = await getCustomer()
    setCurrentUser(customer)
  }

  const handleRegister = async (userData) => {
    await registerCustomer(userData)
    // After registration, log them in automatically
    await handleLogin({ email: userData.email, password: userData.password })
  }

  const handleLogout = async () => {
    await logoutCustomer()
    setCurrentUser(null)
  }

  return (
    <CustomerContext.Provider value={{
      currentUser,
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
