'use client'

import { useRouter } from 'next/navigation'

export default function Farmer3Page() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Complete registration sequence and redirect to main dashboard/home
    router.push('/')
  }

  return (
    <div className="price-container">
      <div className="price-box">
        <h1>💰 Set Your Selling Price</h1>
        <p className="price-subtitle">
          Enter the selling price and available quantity of your crop
        </p>

        <form onSubmit={handleSubmit}>
          {/* CROP NAME DISPLAY */}
          <div className="detail-section">
            <label>🌾 Crop</label>
            <div className="crop-display">
              Crop: <span id="cropName">Selected Crop</span>
            </div>
          </div>

          {/* PRICE PER KG */}
          <div className="detail-section">
            <label>💰 Price Per Kg</label>
            <div className="rupee-input">
              <span>₹</span>
              <input
                type="number"
                placeholder="Enter price per Kg"
                min="0"
                required
              />
            </div>
          </div>

          {/* PRICE PER QUINTAL */}
          <div className="detail-section">
            <label>💰 Price Per Quintal</label>
            <div className="rupee-input">
              <span>₹</span>
              <input
                type="number"
                placeholder="Enter price per Quintal"
                min="0"
                required
              />
            </div>
          </div>

          <button type="submit" style={{ marginTop: '20px' }}>
            Complete Setup 🎉
          </button>
        </form>
      </div>
    </div>
  )
}