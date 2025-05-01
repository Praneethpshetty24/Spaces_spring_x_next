"use client"

import React, { useState } from 'react'
import { useRouter } from "next/navigation"
import Image from "next/image"
import { auth, googleProvider } from "@/firebase" 
import { signInWithPopup } from "firebase/auth"

export default function SignUp() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      const result = await signInWithPopup(auth, googleProvider)
      console.log("User Info:", result.user)
      
      // Send welcome email
      try {
        const response = await fetch('/api/mailer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: result.user.email,
            name: result.user.displayName,
          }),
        });

        const data = await response.json();
        console.log('Email API response:', data);

        if (!response.ok) {
          throw new Error(`Email API error: ${data.message || 'Unknown error'}`);
        }

        // Wait a moment to ensure email is sent
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (emailError) {
        console.error("Welcome email error:", emailError);
        // Continue with sign in even if email fails
      }

      router.push("/main") // Redirect to the main page after successful login
    } catch (error) {
      console.error("Google sign-in error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0C14] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[#151823] relative">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-[2px]">
          <div className="h-full w-full rounded-2xl bg-[#151823]" />
        </div>

        <div className="relative z-10 space-y-8">
          <div className="text-center space-y-2">
            <div className="flex justify-center items-center mb-4">
              <svg 
                viewBox="0 0 24 24" 
                className="w-16 h-16 text-purple-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <path d="M3.29 7L12 12.75 20.71 7" />
                <path d="M12 22.08V12.75" />
              </svg>
            </div>
            <h1 
              className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer"
              onClick={() => router.push("/")}
            >
              Spaces
            </h1>
            <p className="text-gray-400">Join the community today</p>
          </div>

          <button 
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 rounded-lg px-6 py-3.5 font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </div>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google.
              </>
            )}
          </button>

          <p className="text-gray-400 text-sm text-center px-4">
            By continuing, you agree to our{' '}
            <span className="text-purple-500 hover:text-purple-400 cursor-pointer">Terms of Service</span>
            {' '}and{' '}
            <span className="text-purple-500 hover:text-purple-400 cursor-pointer">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  )
}
