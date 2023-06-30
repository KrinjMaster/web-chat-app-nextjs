import { ably } from '@/lib/ably'
import { authOptions } from '@/lib/auth'
import { kv } from '@vercel/kv'
import { getServerSession } from 'next-auth'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const userId = await kv.get(`user:email:${body.email}`)

    if (!userId) {
      return new Response('User does not exist', {
        status: 400,
      })
    }

    if (!body.user) {
      return new Response('Unathorized user')
    }

    if (body.user.email === body.email) {
      return new Response('You can not add yourself as friend', {
        status: 400,
      })
    }

    const isAlreadyFriends = await kv.sismember(
      `user:${userId}:incoming_friend_requests`,
      body.user.id
    )

    if (isAlreadyFriends) {
      return new Response('You can not add this user twice', {
        status: 400,
      })
    }

    // valid request
    const requestUserSession = await getServerSession(authOptions)

    const channel = ably.channels.get(
      `user__${userId}__incoming_friend_requests`
    )

    channel.publish('new_friend_request', {
      senderEmail: requestUserSession?.user.email,
      senderId: body.user.id,
    })

    await kv.sadd(`user:${userId}:incoming_friend_requests`, body.user.id)

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
