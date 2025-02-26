"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AiChat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I assist you today?", isAi: true, timestamp: "Just now" },
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSend = () => {
    if (newMessage.trim()) {
      // Add user message
      setMessages([...messages, { 
        id: Date.now(), 
        text: newMessage, 
        isAi: false, 
        timestamp: "Just now" 
      }])
      setNewMessage("")
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          text: "This is a simulated AI response. Implement actual AI integration here.",
          isAi: true,
          timestamp: "Just now"
        }])
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0C14] text-white flex flex-col">
      {/* Header */}
      <div className="border-b border-[#1A1B25] p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            AI Chat
          </h1>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isAi ? 'justify-start' : 'justify-end'}`}>
              <div className={`bg-[#1A1B25] p-4 rounded-xl space-y-3 max-w-[80%]`}>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={message.isAi ? "/ai-avatar.png" : "/placeholder.svg"} />
                    <AvatarFallback>{message.isAi ? "AI" : "ME"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{message.isAi ? "AI Assistant" : "You"}</div>
                    <div className="text-sm text-gray-400">{message.timestamp}</div>
                  </div>
                </div>
                <p className="text-gray-100 whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Input Area */}
      <div className="border-t border-[#1A1B25] bg-[#0B0C14] p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1A1B25] rounded-xl p-4 space-y-4">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="bg-[#22233A] border-0 resize-none text-white placeholder:text-gray-400"
              rows={3}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
            />
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700" 
              onClick={handleSend}
              disabled={!newMessage.trim()}
            >
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
