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

    channel.publish('friend_request_denied', {
      senderId: body.senderId,
    })

    await kv.srem(
      `user:${session?.user.id}:incoming_friend_requests`,
      body.senderId
    )

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
