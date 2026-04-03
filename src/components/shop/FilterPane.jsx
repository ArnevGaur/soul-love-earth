import { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'

// Generic simple accordion section
function Accordion({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ borderBottom: '1px solid rgba(33,78,65,0.1)', padding: '1.5rem 0' }}>
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
          fontSize: '0.82rem',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#214e41',
          margin: 0
        }}>
          {title}
        </h4>
        <ChevronDown 
          size={16} 
          color="#d4a843" // Core Brand Gold
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

export default function FilterPane({ 
  isOpen, 
  onClose,
  filters,
  setFilters,
  onClear
}) {
  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'Navy', hex: '#0a3a6c' },
    { name: 'Brown', hex: '#b37651' },
    { name: 'Brand Green', hex: '#214e41' },
    { name: 'Lime', hex: '#588b30' },
    { name: 'Grey', hex: '#7f7f7f' },
    { name: 'Red', hex: '#c75440' }, // Soft earth red
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
      {count !== null && (
        <span style={{
          backgroundColor: '#d4a843', // Brand Gold Badge
          color: '#ffffff',
          fontSize: '0.65rem',
          fontWeight: 600,
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
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          zIndex: 1000,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s ease'
        }}
      />

      {/* Pane Container */}
      <div className="filter-pane" style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        maxWidth: '380px',
        backgroundColor: 'rgba(250, 248, 243, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        zIndex: 1010,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-20px 0 80px rgba(33,78,65,0.15)',
        borderTopLeftRadius: '32px',
        borderBottomLeftRadius: '32px',
        overflow: 'hidden'
      }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem 2rem',
          borderBottom: '1px solid rgba(33,78,65,0.1)',
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
            borderBottom: '2px solid #d4a843' // Brand gold underline
          }}>
            FILTER
          </h3>
          <button 
            onClick={onClear}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 1.25rem',
              backgroundColor: 'transparent',
              color: '#214e41',
              border: '1px solid rgba(33,78,65,0.2)',
              borderRadius: '24px', // Elegant Pill shape
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#214e41'
              e.currentTarget.style.color = '#ffffff'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#214e41'
            }}
          >
             <X size={12} strokeWidth={2.5} style={{ color: 'inherit' }} />
            Clear
          </button>
        </div>

        {/* Scrollable Accodrions Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 2rem 2rem' }}>

          {/* Price */}
          <Accordion title="PRICE">
            <div style={{ paddingBottom: '0.5rem' }}>
              {/* Functional Dual Range Slider */}
              <div className="dual-slider" style={{ marginBottom: '1.5rem' }}>
                <div className="slider-track" />
                <div 
                  className="slider-range" 
                  style={{ 
                    left: `${((Number(filters.minPrice) || 0) / 2000) * 100}%`, 
                    width: `${(((Number(filters.maxPrice || 2000)) - (Number(filters.minPrice) || 0)) / 2000) * 100}%` 
                  }} 
                />
                <input 
                  type="range" 
                  className="min-slider" 
                  min="0" 
                  max="2000" 
                  value={filters.minPrice || 0} 
                  onChange={e => {
                    const val = Math.min(Number(e.target.value), (Number(filters.maxPrice || 2000)) - 1);
                    setFilters({ ...filters, minPrice: val });
                  }} 
                />
                <input 
                  type="range" 
                  className="max-slider" 
                  min="0" 
                  max="2000" 
                  value={filters.maxPrice || 2000} 
                  onChange={e => {
                    const val = Math.max(Number(e.target.value), (Number(filters.minPrice) || 0) + 1);
                    setFilters({ ...filters, maxPrice: val });
                  }} 
                />
              </div>

              {/* Price Inputs */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: '#214e41' }}>AED</span>
                <input 
                  type="text" 
                  value={filters.minPrice}
                  onChange={e => setFilters({ ...filters, minPrice: e.target.value })}
                  placeholder="0"
                  style={{
                    flex: 1,
                    width: '60px',
                    padding: '0.6rem',
                    textAlign: 'center',
                    border: '1px solid rgba(33,78,65,0.15)',
                    borderRadius: '12px',
                    backgroundColor: '#ffffff',
                    boxShadow: 'inset 0 2px 5px rgba(33,78,65,0.04)',
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '0.88rem',
                    fontWeight: 500,
                    color: '#214e41',
                    outline: 'none',
                    transition: 'border-color 0.3s'
                  }} 
                  onFocus={e => e.target.style.borderColor = '#d4a843'}
                  onBlur={e => e.target.style.borderColor = 'rgba(33,78,65,0.15)'}
                />
                
                <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: '#666', padding: '0 0.1rem' }}>to</span>

                <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: '#214e41' }}>AED</span>
                <input 
                  type="text" 
                  value={filters.maxPrice}
                  onChange={e => setFilters({ ...filters, maxPrice: e.target.value })}
                  placeholder="2000"
                  style={{
                    flex: 1,
                    width: '60px',
                    padding: '0.6rem',
                    textAlign: 'center',
                    border: '1px solid rgba(33,78,65,0.15)',
                    borderRadius: '12px',
                    backgroundColor: '#ffffff',
                    boxShadow: 'inset 0 2px 5px rgba(33,78,65,0.04)',
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '0.88rem',
                    fontWeight: 500,
                    color: '#214e41',
                    outline: 'none',
                    transition: 'border-color 0.3s'
                  }} 
                  onFocus={e => e.target.style.borderColor = '#d4a843'}
                  onBlur={e => e.target.style.borderColor = 'rgba(33,78,65,0.15)'}
                />
              </div>
            </div>
          </Accordion>

          {/* Availability */}
          <Accordion title="AVAILABILITY">
             <CheckboxRow 
               label="In Stock" 
               checked={filters.inStock} 
               onChange={() => setFilters({ ...filters, inStock: !filters.inStock })}
             />
             <CheckboxRow 
               label="Out of Stock" 
               checked={filters.outOfStock} 
               onChange={() => setFilters({ ...filters, outOfStock: !filters.outOfStock })}
             />
          </Accordion>

          {/* Color */}
          <Accordion title="COLOR">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
              {colors.map(color => {
                const isActive = filters.color === color.hex
                return (
                  <button
                    key={color.hex}
                    onClick={() => setFilters({ ...filters, color: isActive ? '' : color.hex })}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: color.hex,
                      border: isActive ? '3px solid #faf8f3' : '1px solid rgba(0,0,0,0.06)',
                      outline: isActive ? '2px solid #214e41' : 'none',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'all 0.2s',
                      boxShadow: isActive ? '0 4px 12px rgba(33,78,65,0.15)' : 'none',
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
               count={null}
               checked={filters.sizes['10']} 
               onChange={() => setFilters({ 
                 ...filters, 
                 sizes: { ...filters.sizes, '10': !filters.sizes['10'] } 
               })}
             />
             <CheckboxRow 
               label="14 inches" 
               count={null}
               checked={filters.sizes['14']} 
               onChange={() => setFilters({ 
                 ...filters, 
                 sizes: { ...filters.sizes, '14': !filters.sizes['14'] } 
               })}
             />
          </Accordion>

        </div>
      </div>
      <style>{`
        .dual-slider {
          position: relative;
          width: 100%;
          height: 24px;
        }
        .slider-track {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          height: 2px;
          background-color: rgba(33,78,65,0.1);
          width: 100%;
          z-index: 1;
        }
        .slider-range {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          height: 2px;
          background-color: #d4a843;
          z-index: 2;
        }
        .dual-slider input[type="range"] {
          position: absolute;
          width: 100%;
          appearance: none;
          background: transparent;
          pointer-events: none;
          margin: 0;
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
        }
        .dual-slider input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          pointer-events: auto;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: #214e41;
          cursor: pointer;
        }
        .dual-slider input[type="range"]::-moz-range-thumb {
          pointer-events: auto;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: #214e41;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </>
  )
}
