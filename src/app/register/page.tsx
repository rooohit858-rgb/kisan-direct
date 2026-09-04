'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Move to the next step in your sequence
    router.push('/mobile')
  }

  return (
    <div className="form-container">
      <h1>Farm Direct</h1>
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter your full name" required />
        <br /><br />
        <input type="email" placeholder="Enter your email" required />
        <br /><br />
        <input type="password" placeholder="Create password" required />
        <br /><br />
        <input type="password" placeholder="Confirm password" required />
        <br /><br />
        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account?{' '}
        <Link href="/login">Login</Link>
      </p>
    </div>
  )
}