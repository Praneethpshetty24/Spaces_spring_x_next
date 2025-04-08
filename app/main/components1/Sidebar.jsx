"use client"
import { MessageSquare, Code, User, LogOut, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { auth } from "@/firebase"

export default function Sidebar({ className = "" }) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await auth.signOut()
      router.push('/')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <div className={`${className} flex flex-col h-[calc(100vh-4rem)]`}>
      {/* Navigation Section */}
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
          onClick={() => router.push("/community")}
        >
          <Users className="mr-2 h-5 w-5" />
          Community
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

        <div className="pt-4 border-t border-[#1A1B25]">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-500/10"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
