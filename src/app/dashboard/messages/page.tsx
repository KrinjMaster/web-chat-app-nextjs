import { Friend } from '@/types/Friend'
import { authOptions } from '../../../lib/auth'
import { kv } from '@vercel/kv'
import { User, getServerSession } from 'next-auth'
import ChatList from '@/components/ChatList'

export default async function Home() {
  const session = await getServerSession(authOptions)
  const friendsList = await kv.smembers(`user:${session?.user.id}:friends`)

  const friendsListWithMoreData = await Promise.all<Friend>(
    friendsList.map(async friendId => {
      const friendProfile = await kv.get<User>(`user:${friendId}`)

      return {
        id: friendId as string,
        email: friendProfile?.email as string,
        image: friendProfile?.image as string
      }
    })
  )

  return (
    <main className="text-white w-full h-fit">
      <ChatList friendList={friendsListWithMoreData} sessionId={session?.user.id as string}/>
    </main>
  )
}