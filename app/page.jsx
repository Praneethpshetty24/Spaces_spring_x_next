"use client"

import { useRouter } from "next/navigation"
import { Users, MessageCircle, Compass, Heart } from "lucide-react"
import Nav from "@/components/Nav"
import Hero from "@/components/Hero"
import Features from "@/components/Features"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0B0C14]">
      <Nav />
      <main className="container mx-auto px-4 pt-16 lg:pt-24">
        <Hero />
        <Features />
      </main>
    </div>
  )
}

