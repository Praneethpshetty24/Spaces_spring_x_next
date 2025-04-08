"use client"
import { useState, useRef, useEffect } from "react"
import { Send, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import RouteProtector from "../RouteProtector/page"

export default function AiChat() {
  const [messages, setMessages] = useState([{ id: 1, text: "Hello! How can I assist you today?", isAi: true }])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const handleSend = async () => {
    if (!newMessage.trim()) return
    const userMsg = { id: Date.now(), text: newMessage, isAi: false }
    setMessages(prev => [...prev, userMsg])
    setNewMessage("")
    setIsTyping(true)
    
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newMessage })
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error);
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: data.text,
        isAi: true
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Sorry, I encountered an error. Please try again.",
        isAi: true
      }]);
    } finally {
      setIsTyping(false);
    }
  }

  const messageClasses = isAi => 
    `flex ${isAi ? "justify-start" : "justify-end"} animate-in slide-in-from-${isAi ? 'left' : 'right'} duration-300`
  
  const bubbleClasses = isAi => 
    `${isAi ? "bg-[#1A1B25] border border-[#2A2B35] hover:bg-[#1E1F2A]" : 
    "bg-gradient-to-br from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800"} 
    p-5 rounded-2xl space-y-3 max-w-[85%] shadow-lg transition-colors duration-200`

  return (
    <RouteProtector>
      <div className="h-screen flex flex-col bg-gradient-to-b from-[#0B0C14] to-[#13141F] text-white">
        {/* Header */}
        <div className="border-b border-[#1A1B25] p-6 backdrop-blur-md bg-[#0B0C14]/90 sticky top-0 z-10">
          <div className="max-w-3xl mx-auto flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent flex items-center">
              <Sparkles className="h-6 w-6 mr-3 text-purple-400" />
              AI Assistant
            </h1>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 px-4 py-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map(msg => (
              <div key={msg.id} className={messageClasses(msg.isAi)}>
                <div className={bubbleClasses(msg.isAi)}>
                  <div className="flex items-center space-x-4">
                    <Avatar className={`${msg.isAi ? "bg-indigo-700" : "bg-purple-800"} h-8 w-8`}>
                      <AvatarFallback>{msg.isAi ? "AI" : "ME"}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium text-sm text-gray-300">
                      {msg.isAi ? "AI Assistant" : "You"}
                    </div>
                  </div>
                  <p className="text-gray-100 leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className={messageClasses(true)}>
                <div className={bubbleClasses(true)}>
                  <div className="flex items-center space-x-4">
                    <Avatar className="bg-indigo-700 h-8 w-8">
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="font-medium text-sm text-gray-300">AI Assistant</div>
                  </div>
                  <div className="flex space-x-2 py-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-[#1A1B25] bg-[#0B0C14]/95 p-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#1A1B25] rounded-2xl p-4 border border-[#2A2B35] shadow-lg">
              <Textarea
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="bg-[#22233A] border-0 resize-none text-white min-h-[80px] rounded-xl focus:ring-2 focus:ring-purple-500 transition-shadow duration-200"
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
              />
              <div className="flex justify-end mt-4">
                <Button 
                  onClick={handleSend} 
                  disabled={!newMessage.trim() || isTyping}
                  className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 px-6 py-2 rounded-xl transition-all duration-200 transform hover:scale-105"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RouteProtector>
  )
}