import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function TweetList({ tweets }) {
  return (
    <div className="max-w-3xl space-y-6">
      {tweets.map((tweet) => (
        <div key={tweet.id} className="bg-[#1A1B25] p-6 rounded-xl">
          <div className="flex items-start space-x-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>{tweet.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-baseline space-x-2">
                <div className="font-semibold text-lg">{tweet.username}</div>
                <div className="text-sm text-gray-400">
                  {new Date(tweet.created_at).toLocaleString()}
                </div>
              </div>
              <div className="mt-3 text-gray-100 leading-relaxed">
                {tweet.text}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
