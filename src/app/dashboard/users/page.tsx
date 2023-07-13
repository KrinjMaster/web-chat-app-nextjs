import { User } from '@/types/User'
import { kv } from '@vercel/kv'
import UsersListSection from '../../../components/UsersListSection'

export default async function Home() {
    const usersList = await kv.smembers<User[]>(`users:list`)
    return (
        <main className="text-white w-full h-fit pt-2 flex flex-col gap-2">
            <UsersListSection usersList={usersList}/>
        </main>
    )
}