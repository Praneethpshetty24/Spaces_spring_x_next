"use client"
import { MessageSquare, Code, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Sidebar({ className = "" }) {
  const router = useRouter()

  return (
    <div className={`${className} space-y-4`}>
      <div className="flex items-center gap-2">
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
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Spaces
        </div>
      </div>

      <div className="space-y-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-white hover:bg-[#1A1B25]"
          onClick={() => router.push("/ai-chat")}
        >
          <MessageSquare className="mr-2 h-5 w-5" />
          AI Chat
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start text-white hover:bg-[#1A1B25]"
          onClick={() => router.push("/code")}
        >
          <Code className="mr-2 h-5 w-5" />
          Code
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start text-white hover:bg-[#1A1B25]"
          onClick={() => router.push("/profile")}
        >
          <User className="mr-2 h-5 w-5" />
          Profile
        </Button>
      </div>
    </div>
  )
}
