'use client'

import Link from 'next/link'

export default function RolePage() {
  return (
    <div className="role-container">
      <div className="heading">
        <h1>Farm Direct</h1>
        <h2>Welcome to Farm Direct!</h2>
        <p>Choose how you want to continue</p>
      </div>

      <div className="role-cards">
        {/* FARMER CARD */}
        <div className="role-card">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1G_rgkqMsgLeaIpx-g2YkTerAF4M7ES-NMsQuAwrOxg&s=10"
            alt="Farmer"
          />
          <h2>I am a Farmer 🧑‍🌾</h2>
          <p>Sell your fresh products directly to consumers.</p>
          <Link href="/farmer1">
            <button type="button">Continue as Farmer →</button>
          </Link>
        </div>

        {/* CONSUMER CARD */}
        <div className="role-card">
          <img
            src="https://thumbs.dreamstime.com/z/happy-farmer-holding-wicker-basket-full-fresh-fruits-agriculture-farm-harvest-concept-happy-farmer-holding-wicker-basket-full-118282746.jpg"
            alt="Consumer"
          />
          <h2>I am a Consumer 🛒</h2>
          <p>Buy fresh products directly from farmers.</p>
          <Link href="/consumer">
            <button type="button">Continue as Consumer →</button>
          </Link>
        </div>
      </div>
    </div>
  )
}