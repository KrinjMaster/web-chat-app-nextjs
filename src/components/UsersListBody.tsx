import Image from 'next/image'
import { User } from '@/types/User'

const UsersListBody = (user: User) => {
  return (
    <div className='flex bg-[#1e1e1e] w-full h-20 border border-[#3c3c3c] p-2 rounded-lg items-center justify-start gap-2'>
      <Image alt='' width={30} height={30} src={user.image} className='w-16 h-16 rounded-lg'/>
      <div className='flex flex-col'>
        <h1 className='font-bold'>{user.name}</h1>
        <h1 className='text-zinc-500'>{user.email}</h1>
      </div>
    </div>
  )
}

export default UsersListBody