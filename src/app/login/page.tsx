'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (isSignUp) {
      // Create new user with Supabase
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) setMessage(error.message)
      else setMessage('Signup successful! Check your email for confirmation.')
    } else {
      // Login existing user with Supabase
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) setMessage(error.message)
      else {
        setMessage('Login successful!')
        router.push('/')
      }
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md border border-gray-100">
        <h2 className="mb-2 text-2xl font-bold text-center text-gray-800">
          Khet Se Ghar - {isSignUp ? 'Sign Up' : 'Login'}
        </h2>
        <p className="mb-6 text-sm text-center text-gray-500">
          {isSignUp ? 'Create a new account' : 'Welcome back! Please enter your details.'}
        </p>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-emerald-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-emerald-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {message && (
            <p className="text-sm font-medium text-center text-emerald-600 bg-emerald-50 p-2 rounded">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-600 py-2.5 font-semibold text-white hover:bg-emerald-700 transition"
          >
            {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="font-semibold text-emerald-600 underline"
          >
            {isSignUp ? 'Login' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  )
}