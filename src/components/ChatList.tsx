'use client'
import axios, { AxiosError } from 'axios'
import { Friend } from '@/types/Friend'
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { ably } from '@/lib/ably'

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

  const deleteFriend = async (friendId: string) => {
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
  {friendListState.map((friend) => <>
      <div className='flex bg-[#1e1e1e] w-full h-20 border border-[#3c3c3c] p-2 rounded-lg items-center justify-start gap-2'>
        <Image alt='' width={30} height={30} src={friend.image} className='w-16 h-16 rounded-lg'/>
        <div className='flex flex-col'>
          <h1 className='text-xl font-bold'>{friend.email}</h1>
          <p className='text-zinc-500'>last message here</p>
        </div>
        <button className='ml-auto' onClick={() => deleteFriend(friend.id)}>
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className='h-12 w-12'>
            <path fillRule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
        <Toaster position="top-center" reverseOrder={false} toastOptions={{duration:2000}} />
      </div>
    </>)}
  </>)
}

export default ChatListBody