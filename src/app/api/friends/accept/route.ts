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
      `user__${body.senderId}__friend_requests`
    )

    channel.publish('new_friend_added', {
      senderId: body.senderId,
    })

    channel2.publish('new_friend_added', {
      senderId: session?.user.id,
    })

    await kv.srem(
      `user:${session?.user.id}:incoming_friend_requests`,
      body.senderId
    )

    await kv.sadd(`user:${session?.user.id}:friends`, body.senderId)
    await kv.sadd(`user:${body.senderId}:friends`, session?.user.id)

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
