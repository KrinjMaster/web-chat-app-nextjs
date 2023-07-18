import { postDate } from '@/lib/helpers'
import { ChatMessage } from '@/types/ChatMessage'
import Image from 'next/image'

const MessageBodyGray = (message: ChatMessage) => {
  const date = new Date(message.date)
  return (<>
    <div className='flex flex-row-reverse w-full justify-between gap-2.5 items-center'>
        <h1 className='text-sm text-zinc-600 w-32'>{postDate(date)}</h1>
        <div className='flex flex-col w-[75%] ml-auto'>
          <p className='text-sm text-zinc-600 mr-auto'>{message.userEmail}</p>
          <h1 className='font-bold break-all h-fit p-1 text-xl mr-auto'>{message.body}</h1>
        </div>
        <Image alt='' width={30} height={30} src={message.userImage} className='w-12 h-12 rounded-lg mb-auto'/>
    </div>
  </>)
}

export default MessageBodyGray