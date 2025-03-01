"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ArrowLeft, Calendar, Mail, Sparkles, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import RouteProtector from "../RouteProtector/page"
import { auth } from "@/firebase"

export default function Profile() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-[#0B0C14]"><Sparkles className="animate-pulse w-10 h-10 text-purple-500" /></div>

  return (
    <RouteProtector>
      <div className="min-h-screen bg-[#0B0C14] text-white">
        <header className="p-4 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.push("/main")} className="mr-3 hover:bg-[#1A1B25]">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Profile</h1>
        </header>

        <div className="relative">
          <div className="h-56 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-600 w-full" />
          
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <Sparkles className="w-32 h-32 text-white" />
          </div>
          
          <Avatar className="absolute left-1/2 top-full transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-[#0B0C14] shadow-lg">
            <AvatarImage src={user?.photoURL} />
            <AvatarFallback className="bg-[#1A1B25] text-xl">{user?.displayName?.split(' ').map(n => n[0]).join('') || "UN"}</AvatarFallback>
          </Avatar>
        </div>
        
        <div className="mt-20 text-center px-4 flex flex-col items-center">
          <h1 className="text-5xl font-bold mb-2">{user?.displayName || "User"}</h1>
          
          <div className="flex items-center text-gray-400 mb-3">
            <Mail className="h-4 w-4 mr-2" />
            <span>{user?.email || "No email"}</span>
          </div>
          
          <div className="flex items-center text-gray-400 border border-[#1A1B25] rounded-full py-1 px-4 bg-[#0F1018]">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Joined {user?.metadata?.creationTime ? 
              new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              }) : "February 28, 2025"}
            </span>
          </div>
        </div>
        
        <div className="fixed bottom-4 right-4">
          <Button variant="ghost" size="icon" className="rounded-full bg-[#1A1B25] hover:bg-[#242535] w-12 h-12">
            <Moon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </RouteProtector>
  )
}