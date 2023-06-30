import FriendRequests from '@/components/FriendRequests'
import { authOptions } from '@/lib/auth'
import { User } from '@/types/User'
import { kv } from '@vercel/kv'
import { getServerSession } from 'next-auth/next'
import { notFound } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) notFound()

  const requestList = await kv.smembers(`user:${session?.user.id}:incoming_friend_requests`)

  const incomingFriendRequests = await Promise.all(
    requestList.map(async (userId) => {
      const requestUser = await kv.get<User>(`user:${userId}`)
      return {
        senderEmail: requestUser?.email as string,
        senderId: userId
      }
    })
  )
  
  return (
    <main className="h-full w-full text-white">
      <FriendRequests requestList={incomingFriendRequests} sessionId={session.user.id}/>
    </main>
  )
}
