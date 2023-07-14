import { ably } from '@/lib/ably'
import { authOptions } from '@/lib/auth'
import { kv } from '@vercel/kv'
import { getServerSession } from 'next-auth'

export async function POST(req: Request) {
  try {
    // valid request
    const body = await req.json()
    const session = await getServerSession(authOptions)

    const channel = ably.channels.get(
      `user__${session?.user.id}__friend_requests`
    )

    const channel2 = ably.channels.get(
      `user__${body.friendId}__friend_requests`
    )

    channel.publish('friend_deleted', {
      friendId: body.friendId,
    })

    channel2.publish('friend_deleted', {
      friendId: session?.user.id,
    })

    await kv.srem(`user:${session?.user.id}:friends`, body.friendId)
    await kv.srem(`user:${body.friendId}:friends`, session?.user.id)

    return new Response('Success', {
      status: 200,
    })
  } catch (err) {
    if (err instanceof Error) {
      return new Response(err.message, {
        status: 400,
      })
    }
  }
}
