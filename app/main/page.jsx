"use client"
import { useState, useEffect } from "react"
import { Menu, ArrowUp } from "lucide-react"  // Add ArrowUp import
import { Button } from "@/components/ui/button"
import Sidebar from "./components1/Sidebar"
import TweetList from "./components1/TweetList"
import RouteProtector from "../RouteProtector/page"
import supabase from '@/supabase'
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
    const { data } = await supabase.from('tweets').select('*').order('created_at', { ascending: false })
    data && setTweets(data)
  }

  const fetchUserLikes = async () => {
    if (!user) return
    const { data } = await supabase
      .from('tweet_likes')
      .select('tweet_id')
      .eq('user_id', user.uid)
    
    setLikedTweets(new Set(data?.map(like => like.tweet_id)))
  }

  const handleTweet = async () => {
    if (!user || !newTweet.trim()) return
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('tweets')
        .insert([{
          text: newTweet.trim(),
          username: user.displayName || user.email?.split('@')[0] || 'Anonymous',
          user_id: user.uid,
          likes: 0
        }])
        .select()
      if (error) throw error
      if (data?.[0]) {
        setTweets([data[0], ...tweets])
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
      if (isLiked) {
        // Unlike
        await supabase
          .from('tweet_likes')
          .delete()
          .eq('user_id', user.uid)
          .eq('tweet_id', tweetId)
        
        await supabase
          .from('tweets')
          .update({ likes: tweets.find(t => t.id === tweetId).likes - 1 })
          .eq('id', tweetId)

        setLikedTweets(prev => {
          const next = new Set(prev)
          next.delete(tweetId)
          return next
        })
      } else {
        // Like
        await supabase
          .from('tweet_likes')
          .insert({ user_id: user.uid, tweet_id: tweetId })

        await supabase
          .from('tweets')
          .update({ likes: tweets.find(t => t.id === tweetId).likes + 1 })
          .eq('id', tweetId)

        setLikedTweets(prev => new Set([...prev, tweetId]))
      }

      setTweets(tweets.map(t => 
        t.id === tweetId 
          ? { ...t, likes: t.likes + (isLiked ? -1 : 1) }
          : t
      ))
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
          <div className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:static top-0 left-0 h-screen md:h-auto z-40 w-80 border-r border-[#1A1B25] bg-[#0B0C14] p-4 transition-transform duration-200`}>
            <Sidebar newTweet={newTweet} setNewTweet={setNewTweet} handleTweet={handleTweet} isLoading={isLoading} />
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 md:ml-0">
            <TweetList tweets={tweets} onLike={handleLike} currentUser={user} likedTweets={likedTweets} />
          </div>
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
            <ArrowUp className="h-5 w-5" />
          </Button>
        )}
      </div>
    </RouteProtector>
  )
}

