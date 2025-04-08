import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TweetList({ tweets, onLike, currentUser, likedTweets }) {
  return (
    <div className="space-y-4 md:space-y-6">
      {tweets.map((tweet) => {
        const isLiked = likedTweets.has(tweet.id)
        return (
          <div key={tweet.id} className="bg-[#1A1B25] p-4 md:p-6 rounded-xl border border-[#2A2B35]">
            <div className="flex items-start space-x-3 md:space-x-4">
              <Avatar className="w-8 h-8 md:w-10 md:h-10">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-sm md:text-base">{tweet.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-x-2">
                  <div className="flex flex-col md:flex-row md:items-center md:gap-2 min-w-0">
                    <span className="font-semibold text-sm md:text-base truncate">{tweet.username}</span>
                    <span className="text-xs md:text-sm text-gray-400">{new Date(tweet.created_at).toLocaleString()}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onLike(tweet.id)}
                    disabled={!currentUser}
                    className={`text-gray-400 shrink-0 ${isLiked ? 'text-red-500 hover:text-red-600' : 'hover:text-red-500'}`}
                  >
                    <Heart 
                      className="h-4 w-4 md:h-5 md:w-5" 
                      fill={isLiked ? "currentColor" : "none"}
                    />
                    <span className="ml-1 text-xs md:text-sm">{tweet.likes || 0}</span>
                  </Button>
                </div>
                <p className="mt-2 text-sm md:text-base text-gray-100 break-words">{tweet.text}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
