import { ably } from '@/lib/ably'
import { authOptions } from '@/lib/auth'
import { kv } from '@vercel/kv'
import { getServerSession } from 'next-auth'

export async function POST(req: Request) {
  try {
    // valid request
    const body = await req.json()
    const session = await getServerSession(authOptions)
    const channel = ably.channels.get(`user__${body.chatId}`)
    const date = new Date()

    channel.publish('new_message', {
      body: body.body,
      userId: session?.user.id,
      date: date.getTime(),
      userEmail: session?.user.email,
      userImage: session?.user.image,
    })

    await kv.sadd(`chat:${body.chatId}`, {
      body: body.body,
      userId: session?.user.id,
      date: date.getTime(),
      userEmail: session?.user.email,
      userImage: session?.user.image,
    })

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
