"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Pencil, Trash2, User, Home, Send, MessageSquare, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Page() {
  const router = useRouter()
  const [tweets, setTweets] = useState([
    { id: 1, text: "Just deployed my first Next.js app! 🚀", timestamp: "2 hours ago" },
    { id: 2, text: "Learning about Server Components and loving it!", timestamp: "5 hours ago" },
  ])
  const [newTweet, setNewTweet] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState("")

  const handleTweet = () => {
    if (newTweet.trim()) {
      setTweets([{ id: Date.now(), text: newTweet, timestamp: "Just now" }, ...tweets])
      setNewTweet("")
    }
  }

  const handleEdit = (id, text) => {
    setEditingId(id)
    setEditText(text)
  }

  const saveEdit = (id) => {
    setTweets(tweets.map((tweet) => (tweet.id === id ? { ...tweet, text: editText } : tweet)))
    setEditingId(null)
  }

  const handleDelete = (id) => {
    setTweets(tweets.filter((tweet) => tweet.id !== id))
  }

  return (
    <div className="min-h-screen bg-[#0B0C14] text-white flex">
      {/* Left Sidebar */}
      <div className="w-80 border-r border-[#1A1B25] p-4 space-y-4">
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

        <div className="pt-4">
          <div className="bg-[#1A1B25] rounded-xl p-4 space-y-4">
            <Textarea
              value={newTweet}
              onChange={(e) => setNewTweet(e.target.value)}
              placeholder="What's happening?"
              className="bg-[#22233A] border-0 resize-none text-white placeholder:text-gray-400"
              rows={4}
            />
            <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleTweet}>
              <Send className="mr-2 h-4 w-4" />
              Tweet
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="max-w-3xl space-y-4">
          {tweets.map((tweet) => (
            <div key={tweet.id} className="bg-[#1A1B25] p-4 rounded-xl space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">User Name</div>
                    <div className="text-sm text-gray-400">{tweet.timestamp}</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(tweet.id, tweet.text)}
                    className="text-gray-400 hover:text-purple-400"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(tweet.id)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {editingId === tweet.id ? (
                <div className="space-y-2">
                  <Textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="bg-[#22233A] border-0 text-white"
                  />
                  <Button size="sm" onClick={() => saveEdit(tweet.id)} className="bg-purple-600 hover:bg-purple-700">
                    Save
                  </Button>
                </div>
              ) : (
                <p className="text-gray-100">{tweet.text}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

