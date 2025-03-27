"use client"

import { useState, useEffect } from "react"
import RouteProtector from "../RouteProtector/page"
import Chat from "./components/Chat"
import { collection, query, onSnapshot } from "firebase/firestore"


export default function Page() {
  
  return (
    <RouteProtector>
      <div className="min-h-screen bg-[#0B0C14] text-white flex flex-col">
        <div className="bg-[#1A1B25] p-4 border-b border-[#2D2E3A] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
              G
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Global Chat
              </h1>
            </div>
          </div>
        </div>

        <Chat />
      </div>
    </RouteProtector>
  )
}