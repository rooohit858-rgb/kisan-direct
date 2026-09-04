'use client'

import { useRouter } from 'next/navigation'

export default function MobilePage() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Move to the next step: OTP Verification
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
            required
          />
          <button type="submit">Send OTP</button>
        </form>
      </div>
    </div>
  )
}