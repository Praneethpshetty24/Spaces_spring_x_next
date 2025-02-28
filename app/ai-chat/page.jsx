"use client"
import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, Paperclip, Smile } from 'lucide-react'
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

  useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), [])

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

  const messageClasses = isAi => `flex ${isAi ? "justify-start" : "justify-end"} animate-in fade-in duration-200`
  const bubbleClasses = isAi => `${isAi ? "bg-[#1A1B25] border border-[#2A2B35]" : 
    "bg-gradient-to-br from-purple-600 to-indigo-700"} p-4 rounded-2xl space-y-3 max-w-[85%] shadow-lg`

  return (
    <RouteProtector>
    <div className="h-screen flex flex-col bg-gradient-to-b from-[#0B0C14] to-[#13141F] text-white">
      <div className="border-b border-[#1A1B25] p-4 backdrop-blur-md bg-[#0B0C14]/80 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
            <Sparkles className="h-5 w-5 mr-2 text-purple-400 inline" />AI Chat
          </h1>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-6 pb-4">
          {messages.map(msg => (
            <div key={msg.id} className={messageClasses(msg.isAi)}>
              <div className={bubbleClasses(msg.isAi)}>
                <div className="flex items-center space-x-3">
                  <Avatar className={msg.isAi ? "bg-indigo-700" : "bg-purple-800"}>
                    <AvatarFallback>{msg.isAi ? "AI" : "ME"}</AvatarFallback>
                  </Avatar>
                  <div className="font-semibold">{msg.isAi ? "AI Assistant" : "You"}</div>
                </div>
                <p className="text-gray-100">{msg.text}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className={messageClasses(true)}>
              <div className={bubbleClasses(true)}>
                <div className="flex items-center space-x-3">
                  <Avatar className="bg-indigo-700">
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="font-semibold">AI Assistant</div>
                </div>
                <p className="text-gray-100">
                  <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse mr-1"></span>
                  <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse delay-75 mr-1"></span>
                  <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse delay-150"></span>
                </p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="border-t border-[#1A1B25] bg-[#0B0C14]/95 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1A1B25] rounded-xl p-4 border border-[#2A2B35]">
            <Textarea
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="bg-[#22233A] border-0 resize-none text-white"
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
            />
            <div className="flex justify-between mt-3">
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Smile className="h-5 w-5" />
                </Button>
              </div>
              <Button onClick={handleSend} disabled={!newMessage.trim() || isTyping} className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800">
                <Send className="mr-2 h-4 w-4" />Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </RouteProtector>
  )
}