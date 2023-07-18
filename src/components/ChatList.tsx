'use client'
import axios, { AxiosError } from 'axios'
import { Friend } from '@/types/Friend'
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { ably } from '@/lib/ably'
import Link from 'next/link'
import { getChatId } from '@/lib/helpers'

const ChatListBody = ({friendList, sessionId} : {friendList: Friend[], sessionId: string}) => {
  const [ friendListState, setFriendList ] = useState(friendList)

  useEffect(() => {
    const channel_request = ably.channels.get(
        `user__${sessionId}__friend_requests`
    )

    channel_request.subscribe((e) => {
        if (e.name === 'friend_deleted') {
            setFriendList(prevState => prevState.filter(friend => friend.id !== e.data.friendId))
        }
    })
  },[sessionId])

  const deleteFriend = async (friendId: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()
      try {
        await axios.post('/api/friends/delete', {
            friendId: friendId,
        })
        return
      }
      catch (err) {
          if (err instanceof AxiosError) {
              toast.error(err.response?.data)
              return
          } 
      }
    }

  return (<>
  {friendListState.length === 0 
      ? <div className='flex items-center w-full h-fit justify-center pt-2 gap-5'>
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className='w-24 h-24'>
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
          </svg>
          <h1 className='font-bold text-5xl'>No friends yet</h1>
        </div> 
  : friendListState.map((friend) => <>
      <Link href={`/dashboard/messages/${getChatId(friend.id, sessionId)}`} key={friend.id} className='flex bg-[#1e1e1e] w-full h-20 border border-[#3c3c3c] p-2 rounded-lg items-center justify-start gap-2'>
        <Image alt='' width={30} height={30} src={friend.image} className='w-16 h-16 rounded-lg'/>
        <div className='flex flex-col'>
          <h1 className='text-xl font-bold'>{friend.email}</h1>
          <p className='text-zinc-500'>last message here</p>
        </div>
        <button className='ml-auto' onClick={(e) => deleteFriend(friend.id, e)}>
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className='h-12 w-12 hover:fill-red-600 transition-colors duration-200 ease-linear'>
            <path fillRule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
        <Toaster position="top-center" reverseOrder={false} toastOptions={{duration:2000}} />
      </Link>
    </>)}
  </>)
}

export default ChatListBody