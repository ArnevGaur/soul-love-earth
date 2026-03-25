import { useState, useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { fetchOrders } from '../services/opencart'
import { useLanguage } from '../context/LanguageContext'
import { Package, Truck, CheckCircle, Clock, ChevronRight, ChevronDown } from 'lucide-react'

export default function OrdersPage() {
  const { t, lang } = useLanguage()
  const o = t.orders
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedOrder, setExpandedOrder] = useState(null)

  useEffect(() => {
    fetchOrders().then(data => {
      setOrders(data)
      setLoading(false)
    })
  }, [])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle size={18} color="#3d9089" />
      case 'shipped': return <Truck size={18} color="#d4a843" />
      case 'processing': return <Clock size={18} color="#999" />
      default: return <Package size={18} />
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'delivered': return o.st_delivered
      case 'shipped': return o.st_shipped
      case 'processing': return o.st_processing
      default: return status
    }
  }

  const trackingSteps = [
    { key: 'processing', label: o.st_processing },
    { key: 'shipped', label: o.st_shipped },
    { key: 'out', label: o.st_out },
    { key: 'delivered', label: o.st_delivered },
  ]

  const getStepStatus = (orderStatus, stepKey) => {
    const statusOrder = ['processing', 'shipped', 'out', 'delivered']
    const currentIndex = statusOrder.indexOf(orderStatus)
    const stepIndex = statusOrder.indexOf(stepKey)
    
    if (stepIndex < currentIndex) return 'completed'
    if (stepIndex === currentIndex) return 'current'
    return 'pending'
  }

  return (
    <div style={{ backgroundColor: '#faf8f3', minHeight: '100vh' }}>
      <Navbar />
      
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '120px 2rem 5rem' }}>
        <header style={{ marginBottom: '3rem', textAlign: lang === 'ar' ? 'right' : 'left' }}>
          <h1 style={{ 
            fontFamily: 'Cormorant Garamond, serif', 
            fontSize: '2.5rem', 
            fontWeight: 400, 
            color: '#0a1d1c',
            marginBottom: '0.5rem'
          }}>
            {o.title}
          </h1>
          <div style={{ width: '60px', height: '2px', backgroundColor: '#d4a843' }} />
        </header>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[1, 2].map(i => (
              <div key={i} style={{ height: '120px', backgroundColor: 'white', borderRadius: '8px', animation: 'pulse 1.5s infinite' }} />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <Package size={48} color="#ccc" style={{ marginBottom: '1rem' }} />
            <p style={{ fontFamily: 'Jost, sans-serif', color: '#666' }}>{o.noOrders}</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {orders.map(order => (
              <div 
                key={order.id} 
                style={{ 
                  backgroundColor: 'white', 
                  borderRadius: '12px', 
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                  border: '1px solid rgba(61, 144, 137, 0.08)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Order Summary Header */}
                <div 
                  style={{ 
                    padding: '1.5rem', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    cursor: 'pointer',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                >
                  <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    <div>
                      <span style={{ fontSize: '0.7rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>{o.orderId}</span>
                      <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 600, color: '#0a1d1c' }}>{order.id}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.7rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>{o.date}</span>
                      <span style={{ fontFamily: 'Jost, sans-serif', color: '#666' }}>{order.date}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.7rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>{o.total}</span>
                      <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 600, color: '#3d9089' }}>{order.total}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      padding: '0.4rem 0.8rem', 
                      backgroundColor: 'rgba(61, 144, 137, 0.05)', 
                      borderRadius: '100px' 
                    }}>
                      {getStatusIcon(order.status)}
                      <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.8rem', fontWeight: 500, color: '#0a1d1c' }}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    <ChevronDown 
                      size={20} 
                      color="#999" 
                      style={{ 
                        transform: expandedOrder === order.id ? 'rotate(180deg)' : 'none', 
                        transition: 'transform 0.3s' 
                      }} 
                    />
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedOrder === order.id && (
                  <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid #f2f2f2' }}>
                    {/* Items List */}
                    <div style={{ padding: '1.5rem 0' }}>
                      {order.items.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', fontFamily: 'Jost, sans-serif', fontSize: '0.9rem' }}>
                          <span style={{ color: '#0a1d1c' }}>{item.name} <span style={{ color: '#999' }}>x{item.quantity}</span></span>
                          <span style={{ color: '#666' }}>{item.price}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tracking Timeline */}
                    <div style={{ marginTop: '1rem', padding: '2rem', backgroundColor: '#faf8f3', borderRadius: '12px' }}>
                      <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', marginBottom: '2rem', textAlign: 'center' }}>{o.track}</h4>
                      
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        position: 'relative',
                        padding: '0 1rem'
                      }}>
                        {/* Progress Line */}
                        <div style={{ 
                          position: 'absolute', 
                          top: '12px', 
                          left: '2rem', 
                          right: '2rem', 
                          height: '2px', 
                          backgroundColor: '#e0e0e0',
                          zIndex: 0 
                        }} />
                        
                        {trackingSteps.map((step, idx) => {
                          const status = getStepStatus(order.status, step.key)
                          return (
                            <div key={idx} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60px' }}>
                              <div style={{ 
                                width: '26px', 
                                height: '26px', 
                                borderRadius: '50%', 
                                backgroundColor: status === 'pending' ? 'white' : status === 'current' ? '#d4a843' : '#3d9089',
                                border: `2px solid ${status === 'pending' ? '#e0e0e0' : 'transparent'}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '0.75rem',
                                boxShadow: status === 'current' ? '0 0 15px rgba(212, 168, 67, 0.4)' : 'none'
                              }}>
                                {status === 'completed' && <CheckCircle size={14} color="white" />}
                                {status === 'current' && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'white' }} />}
                              </div>
                              <span style={{ 
                                fontFamily: 'Jost, sans-serif', 
                                fontSize: '0.65rem', 
                                textAlign: 'center', 
                                color: status === 'pending' ? '#999' : '#0a1d1c',
                                fontWeight: status === 'current' ? 600 : 400,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                              }}>
                                {step.label}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />

      <style>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 0.8; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  )
}
