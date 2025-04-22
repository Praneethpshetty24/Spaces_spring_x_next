import { NextResponse } from 'next/server'
import supabase from '@/supabase'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  const { data, error } = await supabase
    .from('tweet_likes')
    .select('tweet_id')
    .eq('user_id', userId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request) {
  const { tweet_id, user_id, isLiked } = await request.json()

  try {
    if (isLiked) {
      // Unlike
      await supabase.from('tweet_likes')
        .delete()
        .eq('user_id', user_id)
        .eq('tweet_id', tweet_id)

      const { data: tweet } = await supabase
        .from('tweets')
        .select('likes')
        .eq('id', tweet_id)
        .single()

      if (tweet) {
        await supabase
          .from('tweets')
          .update({ likes: Math.max(0, tweet.likes - 1) })
          .eq('id', tweet_id)
      }
    } else {
      // Like
      await supabase
        .from('tweet_likes')
        .insert({ user_id, tweet_id })

      const { data: tweet } = await supabase
        .from('tweets')
        .select('likes')
        .eq('id', tweet_id)
        .single()

      if (tweet) {
        await supabase
          .from('tweets')
          .update({ likes: tweet.likes + 1 })
          .eq('id', tweet_id)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update like status' }, 
      { status: 500 }
    )
  }
}
