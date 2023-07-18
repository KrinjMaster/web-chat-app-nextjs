import ChatBody from '@/components/ChatBody'
import { authOptions } from '@/lib/auth'
import { ChatMessage } from '@/types/ChatMessage'
import { User } from '@/types/User'
import { kv } from '@vercel/kv'
import { getServerSession } from 'next-auth'

export default async function Home({
  params,
}: {
  params: { chat_id: string }
}) {
  const session = await getServerSession(authOptions)
  const friendId = params.chat_id.replace(session?.user.id as string, '')
  const friend = await kv.get<User>(`user:${friendId}`)
  const chatList = await kv.smembers<ChatMessage[]>(`chat:${params.chat_id}`)

  return (
    <main className="text-white w-full h-fit">
      <ChatBody chatMessages={chatList} params={params} userId={session?.user.id as string} friendEmail={friend?.email as string}/>
    </main>
  )
}