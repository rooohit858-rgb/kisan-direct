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

    const cleanPhone = phone.replace(/\D/g, "")
    const formattedPhone = `+91${cleanPhone}`

    // 1. Phone number LocalStorage me save karein (har haal me)
    localStorage.setItem('userPhone', cleanPhone)

    // 2. Supabase Request try karein
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      })
      if (error) {
        console.warn('Supabase SMS Provider Notice:', error.message)
      }
    } catch (err) {
      console.warn('Network / Auth Bypass:', err)
    }

    // 3. Request fail ho ya pass, test flow ko rukaawat nahi honi chahiye
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