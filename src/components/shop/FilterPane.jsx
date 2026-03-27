import { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'

// Generic simple accordion section
function Accordion({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '1.5rem 0' }}>
      <button 
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        <h4 style={{
          fontFamily: 'Jost, sans-serif',
          fontSize: '0.85rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#214e41',
          margin: 0
        }}>
          {title}
        </h4>
        <ChevronDown 
          size={16} 
          color="#c75440" // Matches the red arrows from the reference
          style={{ 
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.3s' 
          }} 
        />
      </button>

      <div style={{
        display: 'grid',
        gridTemplateRows: open ? '1fr' : '0fr',
        transition: 'grid-template-rows 0.3s ease, opacity 0.3s ease',
        opacity: open ? 1 : 0,
        overflow: 'hidden'
      }}>
        <div style={{ minHeight: 0 }}>
          <div style={{ paddingTop: '1.5rem' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FilterPane({ isOpen, onClose }) {
  // Mock states for interaction
  const [price, setPrice] = useState([10, 408])
  const [availability, setAvailability] = useState({ inStock: false, outOfStock: false })
  const [activeColor, setActiveColor] = useState(null)
  const [sizes, setSizes] = useState({ '10': false, '14': false })

  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'Navy', hex: '#0a3a6c' },
    { name: 'Brown', hex: '#b37651' },
    { name: 'Dark Green', hex: '#0e2b10' },
    { name: 'Lime', hex: '#588b30' },
    { name: 'Grey', hex: '#7f7f7f' },
    { name: 'Red', hex: '#ea2b3b' },
  ]

  // Shared checkbox style
  const CheckboxRow = ({ label, checked, onChange, count = null }) => (
    <label style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.75rem', 
      cursor: 'pointer', 
      marginBottom: '1rem',
      fontFamily: 'Jost, sans-serif',
      fontSize: '0.82rem',
      fontWeight: 400,
      color: '#2c2c2c'
    }}>
      <input 
        type="checkbox" 
        checked={checked}
        onChange={onChange}
        style={{
          width: '16px',
          height: '16px',
          accentColor: '#214e41', // Native checkbox styling synced to brand dark green
          cursor: 'pointer'
        }}
      />
      <span style={{ flex: 1 }}>{label}</span>
      {count && (
        <span style={{
          backgroundColor: '#ea2b3b', // Red badge matches wireframe
          color: 'white',
          fontSize: '0.65rem',
          fontWeight: 500,
          width: '18px',
          height: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
        }}>
          {count}
        </span>
      )}
    </label>
  )

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(26,47,44,0.3)',
          zIndex: 1000,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease'
        }}
      />

      {/* Pane Container */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        maxWidth: '360px',
        backgroundColor: '#faf8f3', // Off-white theme base
        zIndex: 1010,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-10px 0 40px rgba(0,0,0,0.05)'
      }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem 2rem',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
        }}>
          <h3 style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '1rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#214e41', // Dark green header
            margin: 0,
            paddingBottom: '0.2rem',
            borderBottom: '2px solid #ca3636' // Solid red underline from layout
          }}>
            FILTER
          </h3>
          <button 
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.4rem 0.8rem',
              backgroundColor: '#1b2a41', // Dark navy/black button from the picture layout
              color: 'white',
              border: 'none',
              borderRadius: '2px', // Slight curve
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: '12px', height: '12px', borderRadius: '50%', 
              backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
               <X size={10} color="#1b2a41" strokeWidth={3} />
            </div>
            Clear
          </button>
        </div>

        {/* Scrollable Accodrions Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 2rem 2rem' }}>

          {/* Price */}
          <Accordion title="PRICE">
            <div style={{ paddingBottom: '0.5rem' }}>
              {/* Fake Range Slider Visual */}
              <div style={{
                position: 'relative',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1.5rem',
              }}>
                <div style={{ position: 'absolute', left: 0, right: 0, height: '2px', backgroundColor: '#e2e2e2' }} />
                <div style={{ position: 'absolute', left: '0%', right: '0%', height: '2px', backgroundColor: '#1b2a41' }} />
                <div style={{ position: 'absolute', left: '0%', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#1b2a41', transform: 'translate(-50%, 0)' }} />
                <div style={{ position: 'absolute', left: '100%', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#1b2a41', transform: 'translate(-50%, 0)' }} />
              </div>

              {/* Price Inputs */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', color: '#1b2a41' }}>AED</span>
                <input 
                  type="text" 
                  value={price[0]}
                  onChange={e => setPrice([e.target.value, price[1]])}
                  style={{
                    flex: 1,
                    width: '60px',
                    padding: '0.5rem',
                    textAlign: 'center',
                    border: '1px solid #dcdcdc',
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '0.9rem',
                    color: '#1b2a41',
                    background: 'none',
                    outline: 'none'
                  }} 
                />
                
                <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', color: '#1b2a41' }}>AED</span>
                <input 
                  type="text" 
                  value={price[1]}
                  onChange={e => setPrice([price[0], e.target.value])}
                  style={{
                    flex: 1,
                    width: '60px',
                    padding: '0.5rem',
                    textAlign: 'center',
                    border: '1px solid #dcdcdc',
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '0.9rem',
                    color: '#1b2a41',
                    background: 'none',
                    outline: 'none'
                  }} 
                />
              </div>
            </div>
          </Accordion>

          {/* Availability */}
          <Accordion title="AVAILABILITY">
             <CheckboxRow 
               label="In Stock" 
               checked={availability.inStock} 
               onChange={() => setAvailability({ ...availability, inStock: !availability.inStock })}
             />
             <CheckboxRow 
               label="Out of Stock" 
               checked={availability.outOfStock} 
               onChange={() => setAvailability({ ...availability, outOfStock: !availability.outOfStock })}
             />
          </Accordion>

          {/* Color */}
          <Accordion title="COLOR">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
              {colors.map(color => {
                const isActive = activeColor === color.hex
                return (
                  <button
                    key={color.hex}
                    onClick={() => setActiveColor(isActive ? null : color.hex)}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: color.hex,
                      border: isActive ? '3px solid #faf8f3' : '1px solid rgba(0,0,0,0.1)',
                      outline: isActive ? '2px solid #dcdcdc' : 'none',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'all 0.2s',
                      boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                    }}
                    title={color.name}
                    aria-label={color.name}
                  />
                )
              })}
            </div>
          </Accordion>

          {/* Size */}
          <Accordion title="SIZE">
             <CheckboxRow 
               label="10 inches" 
               count={1}
               checked={sizes['10']} 
               onChange={() => setSizes({ ...sizes, '10': !sizes['10'] })}
             />
             <CheckboxRow 
               label="14 inches" 
               count={1}
               checked={sizes['14']} 
               onChange={() => setSizes({ ...sizes, '14': !sizes['14'] })}
             />
          </Accordion>

        </div>
      </div>
    </>
  )
}
