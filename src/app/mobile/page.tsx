'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function MobilePage() {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const cleanPhone = phone.trim()

    // 1. Phone number ko localStorage me save karo taaki /otp page use padh sake
    localStorage.setItem('userPhone', cleanPhone)

    // 2. Supabase ko OTP request bhejo (+91 ke saath)
    const { error } = await supabase.auth.signInWithOtp({
      phone: `+91${cleanPhone}`,
    })

    setLoading(false)

    if (error) {
      alert('Error sending OTP: ' + error.message)
      return
    }

    // 3. Request successful hone ke baad hi /otp par bhejo
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