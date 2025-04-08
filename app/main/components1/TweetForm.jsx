import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function TweetForm({ newTweet, setNewTweet, handleTweet, isLoading }) {
  return (
    <div className="bg-[#1A1B25] rounded-xl p-4 md:p-6 space-y-3 md:space-y-4 mb-4 md:mb-8 border border-[#2A2B35]">
      <div className="flex items-center gap-2 md:gap-3">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm md:text-base font-semibold">
          PR
        </div>
        <div>
          <h2 className="text-base md:text-lg font-semibold text-white">Create Post</h2>
          <p className="text-xs md:text-sm text-gray-400">Share your thoughts with the community</p>
        </div>
      </div>
      <Textarea
        value={newTweet}
        onChange={(e) => setNewTweet(e.target.value)}
        placeholder="What's happening?"
        className="bg-[#22233A] border-0 resize-none text-white placeholder:text-gray-400 min-h-[100px] md:min-h-[120px] text-sm md:text-base p-3 md:p-4"
        disabled={isLoading}
      />
      <div className="flex justify-end">
        <Button 
          className="bg-purple-600 hover:bg-purple-700 px-4 md:px-8 text-sm md:text-base w-full md:w-auto" 
          onClick={handleTweet}
          disabled={isLoading || !newTweet.trim()}
        >
          <Send className="mr-2 h-3 w-3 md:h-4 md:w-4" />
          {isLoading ? 'Publishing...' : 'Publish'}
        </Button>
      </div>
    </div>
  )
}
