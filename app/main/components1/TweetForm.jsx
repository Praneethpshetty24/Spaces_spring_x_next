import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function TweetForm({ newTweet, setNewTweet, handleTweet, isLoading }) {
  return (
    <div className="bg-[#1A1B25] rounded-xl p-4 space-y-4">
      <Textarea
        value={newTweet}
        onChange={(e) => setNewTweet(e.target.value)}
        placeholder="What's happening?"
        className="bg-[#22233A] border-0 resize-none text-white placeholder:text-gray-400"
        rows={4}
        disabled={isLoading}
      />
      <Button 
        className="w-full bg-purple-600 hover:bg-purple-700" 
        onClick={handleTweet}
        disabled={isLoading || !newTweet.trim()}
      >
        <Send className="mr-2 h-4 w-4" />
        {isLoading ? 'Sending...' : 'Tweet'}
      </Button>
    </div>
  )
}
