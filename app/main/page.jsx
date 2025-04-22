"use client"
import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import Sidebar from "./components1/Sidebar"
import TweetList from "./components1/TweetList"
import TweetForm from "./components1/TweetForm"
import RouteProtector from "../RouteProtector/page"
import { getAuth } from 'firebase/auth'

export default function Page() {
  const [tweets, setTweets] = useState([])
  const [newTweet, setNewTweet] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [likedTweets, setLikedTweets] = useState(new Set())
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const auth = getAuth()
    auth.onAuthStateChanged(user => user && setUser(user))
    fetchTweets()
  }, [])

  useEffect(() => {
    if (user) {
      fetchUserLikes()
    }
  }, [user])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fetchTweets = async () => {
    const response = await fetch('/api/tweets')
    const data = await response.json()
    data && setTweets(data)
  }

  const fetchUserLikes = async () => {
    if (!user) return
    const response = await fetch(`/api/tweets/likes?userId=${user.uid}`)
    const data = await response.json()
    setLikedTweets(new Set(data?.map(like => like.tweet_id)))
  }

  const handleTweet = async () => {
    if (!user || !newTweet.trim()) return
    setIsLoading(true)
    try {
      const response = await fetch('/api/tweets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: newTweet.trim(),
          username: user.displayName || user.email?.split('@')[0] || 'Anonymous',
          user_id: user.uid
        })
      })
      const data = await response.json()
      if (data) {
        setTweets([data, ...tweets])
        setNewTweet("")
      }
    } catch (error) {
      console.error("Tweet error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLike = async (tweetId) => {
    if (!user) return
    try {
      const isLiked = likedTweets.has(tweetId)
      const response = await fetch('/api/tweets/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tweet_id: tweetId,
          user_id: user.uid,
          isLiked
        })
      })

      if (response.ok) {
        setLikedTweets(prev => {
          const next = new Set(prev)
          if (isLiked) {
            next.delete(tweetId)
          } else {
            next.add(tweetId)
          }
          return next
        })

        setTweets(tweets.map(t => 
          t.id === tweetId 
            ? { ...t, likes: t.likes + (isLiked ? -1 : 1) }
            : t
        ))
      }
    } catch (error) {
      console.error("Like error:", error)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <RouteProtector>
      <div className="min-h-screen bg-[#0B0C14] text-white">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 h-16 bg-[#0B0C14]/80 backdrop-blur-md border-b border-[#1A1B25] z-50">
          <div className="h-full max-w-screen-2xl mx-auto px-4 flex items-center justify-between">
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
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </header>

        <div className="flex pt-16">
          {/* Sidebar */}
          <div className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:sticky top-16 left-0 h-[calc(100vh-4rem)] w-80 border-r border-[#1A1B25] bg-[#0B0C14] p-4 transition-transform duration-200 z-40`}>
            <Sidebar />
          </div>

          {/* Main Content */}
          <main className="flex-1 min-h-[calc(100vh-4rem)]">
            <div className="max-w-3xl mx-auto px-3 md:px-4 py-4 md:py-8">
              <TweetForm 
                newTweet={newTweet}
                setNewTweet={setNewTweet}
                handleTweet={handleTweet}
                isLoading={isLoading}
              />
              <div className="space-y-4 md:space-y-6">
                <TweetList 
                  tweets={tweets} 
                  onLike={handleLike} 
                  currentUser={user} 
                  likedTweets={likedTweets} 
                />
              </div>
            </div>
          </main>
        </div>

        {/* Overlay */}
        {isSidebarOpen && <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsSidebarOpen(false)} />}

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <Button
            variant="secondary"
            size="icon"
            className="fixed bottom-8 right-8 rounded-full bg-purple-500 hover:bg-purple-600 z-50"
            onClick={scrollToTop}
          >
            <svg 
              viewBox="0 0 24 24" 
              className="h-5 w-5"
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
          </Button>
        )}
      </div>
    </RouteProtector>
  )
}

