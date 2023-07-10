import { authOptions } from '../../../lib/auth'
import { kv } from '@vercel/kv'
import { getServerSession } from 'next-auth'

export default async function Home() {
  const session = await getServerSession(authOptions)
  const friendsList = await kv.smembers(`user:${session?.user.id}:friends`)

  return (
    <main className="text-white w-full h-fit">
      {friendsList.map((friend) => 
        <>
          <h1 className='text-white'>{friend}</h1>
        </>
      )}
    </main>
  )
}