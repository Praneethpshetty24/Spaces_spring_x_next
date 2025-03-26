import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function TweetList({ tweets, editingId, editText, setEditText, handleEdit, saveEdit, handleDelete, currentUserId }) {
  return (
    <div className="max-w-3xl space-y-4">
      {tweets.map((tweet) => (
        <div key={tweet.id} className="bg-[#1A1B25] p-4 rounded-xl space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>{tweet.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{tweet.username}</div>
                <div className="text-sm text-gray-400">
                  {new Date(tweet.created_at).toLocaleString()}
                </div>
              </div>
            </div>
            {currentUserId === tweet.user_id && (
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
            )}
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
  )
}
