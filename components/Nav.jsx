"use client"

import { useRouter } from "next/navigation"
import { auth } from "@/firebase"
import { useEffect, useState } from "react"

export default function Nav() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user)
      if (user) {
        router.push("/")
      }
    })

    return () => unsubscribe()
  }, [router])

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-sm border-b border-purple-500/10 bg-[#0B0C14]/75 flex items-center justify-between p-4 lg:p-6">
      <div className="flex items-center space-x-3">
        <svg 
          viewBox="0 0 24 24" 
          className="w-8 h-8 text-purple-500"
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
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Spaces
        </span>
      </div>
      <button
        onClick={() => router.push(isAuthenticated ? "/main" : "/sign-up")}
        className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
      >
        {isAuthenticated ? "Dashboard" : "Join Now"}
      </button>
    </nav>
  )
}