import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TweetList({ tweets, onLike, currentUser, likedTweets }) {
  return (
    <div className="max-w-3xl space-y-6">
      {tweets.map((tweet) => {
        const isLiked = likedTweets.has(tweet.id)
        return (
          <div key={tweet.id} className="bg-[#1A1B25] p-6 rounded-xl">
            <div className="flex items-start space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>{tweet.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-lg">{tweet.username}</span>
                    <span className="text-sm text-gray-400">{new Date(tweet.created_at).toLocaleString()}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onLike(tweet.id)}
                    disabled={!currentUser}
                    className={`text-gray-400 ${isLiked ? 'text-red-500 hover:text-red-600' : 'hover:text-red-500'}`}
                  >
                    <Heart 
                      className="h-5 w-5" 
                      fill={isLiked ? "currentColor" : "none"}
                    />
                    <span className="ml-1">{tweet.likes || 0}</span>
                  </Button>
                </div>
                <p className="mt-3 text-gray-100 leading-relaxed">{tweet.text}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
