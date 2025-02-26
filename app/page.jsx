"use client"

import { useRouter } from "next/navigation"
import { Users, MessageCircle, Compass, Heart } from "lucide-react"

export default function Page() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#0B0C14]">
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
          onClick={() => router.push("/sign-up")}
          className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
        >
          Join Now
        </button>
      </nav>

      <main className="container mx-auto px-4 pt-16 lg:pt-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            Connect, Share, Discover
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-16">
            Join millions of people sharing their thoughts, moments, and creativity in unique spaces
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 pb-20">
          <div className="p-6 rounded-xl bg-[#1A1B25] hover:bg-[#22233A] transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-purple-500" />
              <h3 className="text-purple-400 text-xl font-semibold">Open Community</h3>
            </div>
            <p className="text-gray-400">Join like-minded people</p>
          </div>

          <div className="p-6 rounded-xl bg-[#1A1B25] hover:bg-[#22233A] transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="w-6 h-6 text-purple-500" />
              <h3 className="text-purple-400 text-xl font-semibold">Chat</h3>
            </div>
            <p className="text-gray-400">Real-time conversations</p>
          </div>

          <div className="p-6 rounded-xl bg-[#1A1B25] hover:bg-[#22233A] transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <Compass className="w-6 h-6 text-purple-500" />
              <h3 className="text-purple-400 text-xl font-semibold">Explore</h3>
            </div>
            <p className="text-gray-400">Discover new content</p>
          </div>
        </div>
      </main>
    </div>
  )
}

