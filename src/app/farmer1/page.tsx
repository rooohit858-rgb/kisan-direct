'use client'

import { useRouter } from 'next/navigation'

export default function Farmer1Page() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Move to the next step: Farmer Details Part 2
    router.push('/farmer2')
  }

  return (
    <div className="farm-details-container">
      <div className="farm-details-box">
        <h1>Farm Details</h1>
        <p className="subtitle">Please enter your farm information</p>

        <form onSubmit={handleSubmit}>
          {/* Farmer ID */}
          <label htmlFor="farmerId">Farmer ID</label>
          <input
            type="text"
            id="farmerId"
            placeholder="Enter your Farmer ID"
            pattern="[0-9]{10}"
            maxLength={10}
            required
          />

          {/* Farm Name */}
          <label htmlFor="farmName">Farm Name</label>
          <input
            type="text"
            id="farmName"
            placeholder="Enter your Farm Name"
            required
          />

          {/* Farm Location */}
          <label htmlFor="farmLocation">Farm Location</label>
          <input
            type="text"
            id="farmLocation"
            placeholder="Enter your Farm Location"
            required
          />

          {/* State */}
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            placeholder="Enter your State"
            required
          />

          {/* District */}
          <label htmlFor="district">District</label>
          <input
            type="text"
            id="district"
            placeholder="Enter your District"
            required
          />

          <button type="submit">Next →</button>
        </form>
      </div>
    </div>
  )
}