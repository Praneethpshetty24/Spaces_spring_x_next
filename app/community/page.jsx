"use client"

import { useState } from "react"
import { Menu, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import RouteProtector from "../RouteProtector/page"

export default function Page() {
  const [message, setMessage] = useState("")
  
  // Dummy data for demonstration
  const messages = [
    { id: 1, user: "John", message: "Hey everyone!", time: "10:00 AM", isMe: false },
    { id: 2, user: "Alice", message: "Hi John! How are you?", time: "10:01 AM", isMe: true },
    { id: 3, user: "Bob", message: "Welcome to the community!", time: "10:02 AM", isMe: false },
    { id: 4, user: "John", message: "Thanks! Excited to be here", time: "10:03 AM", isMe: false },
  ]

  return (
    <RouteProtector>
      <div className="min-h-screen bg-[#0B0C14] text-white flex flex-col">
        {/* Header */}
        <div className="bg-[#1A1B25] p-4 border-b border-[#2D2E3A] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
              G
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Global Chat
              </h1>
              <p className="text-sm text-gray-400">420 members</p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${msg.isMe ? 'bg-purple-600' : 'bg-[#1A1B25]'} rounded-lg p-3`}>
                {!msg.isMe && (
                  <div className="text-sm font-semibold text-purple-400 mb-1">
                    {msg.user}
                  </div>
                )}
                <p className="text-gray-100">{msg.message}</p>
                <div className="text-xs text-gray-400 mt-1 text-right">
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-[#1A1B25] p-4 border-t border-[#2D2E3A]">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-[#0B0C14] border border-[#2D2E3A] rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
            />
            <Button 
              className="bg-purple-500 hover:bg-purple-600 rounded-lg p-2"
              onClick={() => setMessage("")}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </RouteProtector>
  )
}