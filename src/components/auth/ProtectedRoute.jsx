import { Navigate } from 'react-router-dom'
import { useCustomer } from '../../context/CustomerContext'

/**
 * Wraps routes that require authentication.
 * Redirects to /login if no valid access token is present.
 * Shows nothing while the auth state is loading to avoid flash of content.
 */
export default function ProtectedRoute({ children }) {
  const { accessToken, authLoading } = useCustomer()

  if (authLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-cream)',
        fontFamily: 'var(--font-body)',
        color: '#888',
        fontSize: '0.9rem',
      }}>
        Loading…
      </div>
    )
  }

  if (!accessToken) {
    return <Navigate to="/login" replace />
  }

  return children
}
