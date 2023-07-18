
import { postDate } from '@/lib/helpers'
import { ChatMessage } from '@/types/ChatMessage'
import Image from 'next/image'

const MessageBodyUser = (message: ChatMessage) => {
  const date = new Date(message.date)
  return (<>
    <div className='flex w-full justify-between gap-2.5 items-center'>
        <h1 className='text-sm text-zinc-600 w-32'>{postDate(date)}</h1>
        <div className='flex flex-col w-[75%] ml-auto'>
          <p className='text-sm text-zinc-600 ml-auto'>You</p>
          <h1 className='font-bold break-all h-fit p-1 text-xl ml-auto'>{message.body}</h1>
        </div>
        <Image alt='' width={30} height={30} src={message.userImage} className='w-12 h-12 rounded-lg mb-auto'/>
    </div>
  </>)
}

export default MessageBodyUser