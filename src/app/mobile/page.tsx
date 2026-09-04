'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function MobilePage() {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const cleanPhone = phone.trim()
    localStorage.setItem('userPhone', cleanPhone)

    try {
      // 1. Try real Supabase OTP send
      const { error } = await supabase.auth.signInWithOtp({
        phone: `+91${cleanPhone}`,
      })

      if (error) {
        console.warn("Supabase Auth error (falling back to dev mode):", error.message)
      }
    } catch (err) {
      console.warn("Supabase call failed, continuing to OTP step:", err)
    }

    // 2. Continuous Flow: OTP request fail ho ya pass, test flow ke liye user ko /otp par bhej do
    setLoading(false)
    router.push('/otp')
  }

  return (
    <div className="container">
      <div className="form-box">
        <h1>Farm Direct</h1>
        <h2>Mobile Verification</h2>
        <p>Please enter your mobile number</p>

        <form onSubmit={handleSubmit}>
          <input
            type="tel"
            placeholder="Enter 10 digit mobile number"
            pattern="[0-9]{10}"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </form>
      </div>
    </div>
  )
}