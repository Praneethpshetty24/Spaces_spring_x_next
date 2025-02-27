"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import Sidebar from "./components1/Sidebar"
import TweetForm from "./components1/TweetForm"
import TweetList from "./components1/TweetList"
import RouteProtector from "../RouteProtector/page"

export default function Page() {
  const [tweets, setTweets] = useState([
    { id: 1, text: "Just deployed my first Next.js app! 🚀", timestamp: "2 hours ago" },
    { id: 2, text: "Learning about Server Components and loving it!", timestamp: "5 hours ago" },
  ])
  const [newTweet, setNewTweet] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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
    <RouteProtector>
      <div className="min-h-screen bg-[#0B0C14] text-white">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-[#1A1B25]">
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
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div
            className={`${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 fixed md:static top-0 left-0 h-screen md:h-auto z-40 w-80 border-r border-[#1A1B25] bg-[#0B0C14] p-4 transition-transform duration-200 ease-in-out`}
          >
            <Sidebar 
              newTweet={newTweet}
              setNewTweet={setNewTweet}
              handleTweet={handleTweet}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 md:ml-0">
            <TweetList
              tweets={tweets}
              editingId={editingId}
              editText={editText}
              setEditText={setEditText}
              handleEdit={handleEdit}
              saveEdit={saveEdit}
              handleDelete={handleDelete}
            />
          </div>
        </div>

        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </RouteProtector>
  )
}

