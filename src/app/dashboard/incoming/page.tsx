import FriendRequests from '@/components/FriendRequests'
import { authOptions } from '@/lib/auth'
import { User } from 'next-auth'
import { getServerSession } from 'next-auth/next'
import { notFound } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession(authOptions)
   
  if (!session) notFound()

  
  return (
    <main className="h-full w-full text-white">
      {/* <FriendRequests requestList={reqList} sessionId={session.user.id}/> */}
    </main>
  )
}
