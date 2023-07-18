'use client'
//100502009114070042110101183237167181126401
import { ably } from '@/lib/ably'
import { ChatMessage } from '@/types/ChatMessage'
import axios, { AxiosError } from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import MessageBodyUser from './MessageBodyUser'
import MessageBodyFriend from './MessageBodyFriend'

interface Props {
    chatMessages: ChatMessage[]
    params: {
        chat_id: string
    },
    friendEmail: string
    userId: string
}

interface Form {
    body: string
}

const ChatBody = ({ chatMessages, params , friendEmail, userId}: Props) => {
    const [chat, setChat] = useState(chatMessages)
    const { handleSubmit, register, resetField } = useForm<Form>()
    useEffect(() => {
        const channel = ably.channels.get(`user__${params.chat_id}`)

        channel.subscribe((e) => {
        if (e.name === 'new_message') {
          setChat((prevState) => [...prevState, e.data])
        }
      })
    },[])

    const sendMessage: SubmitHandler<Form> = async (formContent) => {
        try {
            await axios.post('/api/messages/send', {
                chatId:  params.chat_id,
                body: formContent.body
            })
            resetField('body')
        } catch (err) {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data)
            } 
        }
    }

    return (
        <section className='flex flex-col w-full h-screen pb-3  rounded-lg'>
            <div className='w-full h-12 flex items-center justify-start bg-[#202020] rounded-lg px-1'>
                <Link href={'/dashboard/messages'}>
                    <svg width="16" height="16" fill="currentColor" className='w-7 h-7' viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                    </svg>
                </Link>
                <h1 className='text-xl font-bold mx-auto'>{friendEmail}</h1>
            </div>
            {chat.length === 0
            ?   <div className='flex items-center w-full h-fit justify-center pt-2 gap-5'>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className='w-24 h-24'>
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
                    </svg>
                    <h1 className='font-bold text-5xl'>No messages yet</h1>
                </div> 
            :   <div className='w-full h-full flex flex-col gap-2 overflow-y-auto'>
                    {chat.sort((a, b) => a.date - b.date).map((message) => message.userId === userId
                    ? <MessageBodyUser {...message} key={message.date}/>
                    : <MessageBodyFriend {...message} key={message.date}/>
                    )}
                </div>
            }
            <form className="h-12 flex gap-2.5 mt-auto px-2" onSubmit={handleSubmit(sendMessage)}>
                <input type="text" {...register('body')} placeholder='Write a message...' spellCheck='true' className="peer w-full text-lg text-slate-200 bg-[#1e1e1e] border-2 border-[#3c3c3c] rounded-md invalid:border-pink-500 invalid:text-pink-600 focus:outline-none px-1 placeholder:text-zinc-600"/>
                <button className="rounded-md w-16 flex items-center justify-start hover:text-blue-600 transition-colors duration-200 ease-linear" type="submit">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className='w-8 h-8 rotate-45'>
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                    </svg>
                </button>
            </form>
            <Toaster position="top-center" reverseOrder={false} toastOptions={{duration: 2000}} />
        </section>
    )
}

export default ChatBody