'use client'
import { ably } from '@/lib/ably'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import NavBarSkeleton from './NavBarSkeleton'
import { Toaster, toast } from 'react-hot-toast'

const NavBar = ({ unseenFriendRequests }: { unseenFriendRequests: number }) => {
    const [friendReqQuantity, setFriendReqQuantity] = useState<number | null>(null)

    const { data: session} = useSession({
      required: true
    })

    const pathname = usePathname()

    
    useEffect(() => {
      unseenFriendRequests === 0 ? null : setFriendReqQuantity(unseenFriendRequests)
      
      const channel = ably.channels.get(
        `user__${session?.user.id}__friend_requests`
      )
        
      channel.subscribe((e) => {
        if (e.name === 'new_friend_request') {
          toast('You have new friend request!', {
            icon: '🔔',
          })
          setFriendReqQuantity((prevState) => prevState === null ? 1 : prevState + 1)
        }
        else if (e.name === 'friend_request_denied') {
          setFriendReqQuantity((prevState) => prevState && prevState - 1 === 0 ? null : prevState && prevState - 1)
        }
        else if (e.name === 'new_friend_added') {
          setFriendReqQuantity((prevState) => prevState && prevState - 1 === 0 ? null : prevState && prevState - 1)
          toast('You have new friend!', {
            icon: '🔔',
          })
        }
        else if (e.name === 'friend_deleted') {
          toast('Friend deleted!', {
            icon: '🔔',
          })
        }
      })
    },[session?.user.id])

    if (session && session.user.image) {
      return (
        <section className='h-screen w-72 flex flex-col py-2 justify-between sticky'>
          <div className='w-full h-full flex flex-col gap-5 justify-center'>
            <div className='flex flex-col'>
              <p className='text-gray-500 font-bold ml-1'>Chats</p>
              <Link href='/dashboard/messages' className={`w-full flex gap-1 rounded-lg hover:bg-[#303030] hover:text-white p-1 font-bold items-center transition-colors duration-150 ease-linear ${pathname.includes('/dashboard/messages') ? 'text-white' : 'text-gray-600'}`}>
                <svg viewBox="0 0 24 24" stroke="currentColor" strokeLinecap="round" fill='currentColor' strokeLinejoin="round" className='h-8 w-8 p-1 stroke-2'>
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg> 
                Browse chats
              </Link>
            </div>
            <div className='flex flex-col'>
              <p className='text-gray-500 font-bold ml-1'>Users</p>
              <Link href='/dashboard/users' className={`w-full flex gap-1 rounded-lg hover:bg-[#303030] hover:text-white p-1 font-bold items-center transition-colors duration-150 ease-linear ${pathname === '/dashboard/users' ? 'text-white' : 'text-gray-600'}`}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className='w-8 h-8 p-0.5'>
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
                </svg> 
                Users
              </Link>
            </div>
            <div className='flex flex-col'>
              <p className='text-gray-500 font-bold ml-1'>Friend requests</p>
              <Link href='/dashboard/add' className={`w-full flex gap-1 rounded-lg hover:bg-[#303030] hover:text-white p-1 pl-2 font-bold items-center transition-colors duration-150 ease-linear ${pathname === '/dashboard/add' ? 'text-white' : 'text-gray-600 fill-gray-600'}`}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className='w-7 h-7'>
                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                </svg>
                Add friend
              </Link>
              <Link href='/dashboard/incoming' className={`w-full flex gap-1 rounded-lg hover:bg-[#303030] hover:text-white p-1 font-bold items-center transition-colors duration-150 ease-linear ${pathname === '/dashboard/incoming' ? 'text-white' : 'text-gray-600 fill-gray-600'}`}>
                <svg width="16" height="16" fill="currentColor" className="w-7 h-7" viewBox="0 0 16 16">
                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                </svg>
                Incoming
                {friendReqQuantity && <span className='w-5 h-5 bg-red-500 rounded-full flex items-center justify-center ml-auto text-white'>{friendReqQuantity}</span>}
              </Link>
            </div>
          </div>
          <div className='w-full mt-auto flex gap-2 p-1 items-end justify-between h-12'>
            <Image alt='' width='30' height='30' src={session.user.image} className='rounded-md w-12 h-12'/>
            <button className='hover:text-white text-gray-600 stroke-1 bg-zinc-800 bg-opacity-25 hover:bg-opacity-100 p-1.5 rounded-md text-center z-10 transition-colors duration-150 ease-linear' onClick={() => signOut()}>
              <svg width="16" height="16" fill="currentColor" className="w-10 h-10" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
              </svg>
            </button>
          </div>
          <Toaster position="top-center" reverseOrder={false} toastOptions={{duration: 2000}} />
        </section>
      )
    }
    else {
      return <NavBarSkeleton/>
    }
}

export default NavBar