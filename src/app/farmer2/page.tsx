'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Farmer2Page() {
  const router = useRouter()
  
  // Track visibility for inputs
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const toggleCategory = (category: string) => {
    setActiveCategory((prev) => (prev === category ? null : category))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Navigate to the final farmer step
    router.push('/farmer3')
  }

  return (
    <div className="crop-container">
      <div className="crop-box">
        <h1>🌱 Which crop do you grow?</h1>
        <p className="crop-subtitle">Select the category of crop you grow</p>

        <form onSubmit={handleSubmit}>
          {/* VEGETABLES */}
          <div className="crop-item">
            <button
              type="button"
              className="crop-option"
              onClick={() => toggleCategory('vegetables')}
            >
              🥦 Vegetables
            </button>
            {activeCategory === 'vegetables' && (
              <div id="vegetables" className="crop-input">
                <label htmlFor="veg-input">Enter the vegetable you grow</label>
                <input
                  id="veg-input"
                  type="text"
                  placeholder="Example: Tomato, Potato, Onion"
                />
              </div>
            )}
          </div>

          {/* PULSES */}
          <div className="crop-item">
            <button
              type="button"
              className="crop-option"
              onClick={() => toggleCategory('pulses')}
            >
              🪵 Pulses
            </button>
            {activeCategory === 'pulses' && (
              <div id="pulses" className="crop-input">
                <label htmlFor="pulse-input">Enter the pulse you grow</label>
                <input
                  id="pulse-input"
                  type="text"
                  placeholder="Example: Moong, Chana, Masoor"
                />
              </div>
            )}
          </div>

          <button type="submit" style={{ marginTop: '20px' }}>
            Next →
          </button>
        </form>
      </div>
    </div>
  )
}