"use client"

import { useState, useEffect, useRef } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { db, auth } from "@/firebase"
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, limit } from "firebase/firestore"

export default function Chat() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp.toMillis());
    const timeStr = date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    
    return timeStr
      .replace(/\./g, '')
      .toLowerCase()
      .replace(/,/, ' at');
  };

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("timestamp", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        user: doc.data().user,
        message: doc.data().message,
        time: doc.data().timestamp ? formatTimestamp(doc.data().timestamp) : '',
        isMe: doc.data().userId === auth.currentUser?.uid,
        photoURL: doc.data().userPhoto || null
      }));
      setMessages(newMessages.reverse());
      scrollToBottom();
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser({
          name: user.displayName,
          photo: user.photoURL,
          uid: user.uid
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "" || !auth.currentUser) return;

    try {
      await addDoc(collection(db, "messages"), {
        user: auth.currentUser.displayName || "Anonymous",
        userId: auth.currentUser.uid,
        userPhoto: auth.currentUser.photoURL,
        message: message.trim(),
        timestamp: serverTimestamp()
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-73px)]">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${msg.isMe ? 'bg-purple-600' : 'bg-[#1A1B25]'} rounded-lg p-3`}>
              <div className="flex items-center gap-2 mb-2">
                {!msg.isMe && msg.photoURL && (
                  <img 
                    src={msg.photoURL} 
                    alt={msg.user} 
                    className="w-8 h-8 rounded-full"
                    referrerPolicy="no-referrer"
                  />
                )}
                <span className="text-sm font-semibold text-purple-400">
                  {msg.user}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-gray-100 break-words">{msg.message}</p>
                <p className="text-[10px] text-gray-400">
                  {msg.time}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-[#1A1B25] p-4 border-t border-[#2D2E3A] flex-shrink-0">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-[#0B0C14] border border-[#2D2E3A] rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 text-sm"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(e)}
          />
          <Button 
            className="bg-purple-500 hover:bg-purple-600 rounded-lg p-2"
            onClick={sendMessage}
            disabled={!auth.currentUser}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
