import { NextResponse } from 'next/server'
import supabase from '@/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('tweets')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request) {
  const body = await request.json()
  const { text, username, user_id } = body

  const { data, error } = await supabase
    .from('tweets')
    .insert([{ text, username, user_id, likes: 0 }])
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data[0])
}
