"use client"
import { MessageSquare, Code, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Sidebar({ className = "" }) {
  const router = useRouter()

  return (
    <div className={`${className} space-y-4`}>
      <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-8">
        Spaces
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
