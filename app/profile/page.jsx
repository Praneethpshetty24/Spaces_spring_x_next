"use client"

import { useRouter } from "next/navigation"
import { Home, User, Settings, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import RouteProtector from "../RouteProtector/page"

export default function Profile() {
  const router = useRouter()

  return (
    <RouteProtector>
    <div className="min-h-screen bg-[#0B0C14] text-white flex">
      {/* Left Sidebar */}
      <div className="w-80 border-r border-[#1A1B25] p-4 space-y-4">
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-8">
          Breeze
        </div>

        <div className="space-y-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-[#1A1B25]"
            onClick={() => router.push("/main")}
          >
            <Home className="mr-2 h-5 w-5" />
            Home
          </Button>

          <Button variant="ghost" className="w-full justify-start text-white hover:bg-[#1A1B25] bg-[#1A1B25]">
            <User className="mr-2 h-5 w-5" />
            Profile
          </Button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="flex-1">
        <div className="border-b border-[#1A1B25]">
          <div className="p-4 flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/")}
              className="text-white hover:bg-[#1A1B25]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Profile</h1>
          </div>
        </div>

        <div className="p-4">
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl" />
            <Avatar className="absolute bottom-0 left-4 transform translate-y-1/2 w-24 h-24 border-4 border-[#0B0C14]">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </div>

          <div className="mt-16 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">User Name</h2>
                <p className="text-gray-400">@username</p>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Settings className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>

            <p className="text-gray-300">
              Full-stack developer | Web3 Enthusiast | Building the future of social media
            </p>

            <div className="flex space-x-4 text-gray-400">
              <span>
                <strong className="text-white">1,234</strong> Following
              </span>
              <span>
                <strong className="text-white">5,678</strong> Followers
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </RouteProtector>
  )
}

