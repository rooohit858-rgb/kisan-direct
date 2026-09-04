'use client'

import { useRouter } from 'next/navigation'

export default function OtpPage() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Move to the next step: Role Selection
    router.push('/role')
  }

  return (
    <div className="container">
      <div className="form-box">
        <h1>Farm Direct</h1>
        <h2>Verify OTP</h2>
        <p>Enter the OTP sent to your mobile number</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter OTP"
            maxLength={6}
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
      </div>
    </div>
  )
}