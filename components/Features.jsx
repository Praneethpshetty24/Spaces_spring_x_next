import { Users, MessageCircle, Compass } from "lucide-react"

export default function Features() {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 pb-20">
      <div className="p-6 rounded-xl bg-[#1A1B25] hover:bg-[#22233A] transition-colors">
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-6 h-6 text-purple-500" />
          <h3 className="text-purple-400 text-xl font-semibold">Open Community</h3>
        </div>
        <p className="text-gray-400">Join like-minded people</p>
      </div>

      <div className="p-6 rounded-xl bg-[#1A1B25] hover:bg-[#22233A] transition-colors">
        <div className="flex items-center gap-3 mb-4">
          <MessageCircle className="w-6 h-6 text-purple-500" />
          <h3 className="text-purple-400 text-xl font-semibold">Chat</h3>
        </div>
        <p className="text-gray-400">Real-time conversations</p>
      </div>

      <div className="p-6 rounded-xl bg-[#1A1B25] hover:bg-[#22233A] transition-colors">
        <div className="flex items-center gap-3 mb-4">
          <Compass className="w-6 h-6 text-purple-500" />
          <h3 className="text-purple-400 text-xl font-semibold">Explore</h3>
        </div>
        <p className="text-gray-400">Discover new content</p>
      </div>
    </div>
  )
}
