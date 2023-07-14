'use client'
import UsersListBody from '@/components/UsersListBody'
import { User } from '@/types/User'
import { useState } from 'react'

const UsersListSection = ({usersList}: { usersList: User[] }) => {
    const [usersListState, setUsersListState] = useState(usersList)
    const [filter, setFilter] = useState<string>('')
    return (<>
        <form className="h-12 flex">
            <input type="text" placeholder='myfriend@example.dev' spellCheck='false' onChange={(e) => setFilter(e.target.value)} className="peer w-full text-lg text-slate-200 bg-[#1e1e1e] border-2 border-[#3c3c3c] rounded-md focus:outline-none px-1 placeholder:text-zinc-600"/>
        </form>
        <div className='h-full w-full grid grid-cols-2 gap-1.5'>
            {usersListState.filter(user => filter === '' ? user : user.email.includes(filter)).map(user => (
                <>
                    <UsersListBody key={user.id} {...user}/>
                </>
            ))}
        </div>
    </>)
}

export default UsersListSection