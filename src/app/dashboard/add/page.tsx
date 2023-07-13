'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import axios, { AxiosError } from 'axios'
import { Toaster, toast } from 'react-hot-toast'
interface Form {
    email: string
}

export default function Home() {
    const { handleSubmit, register, resetField } = useForm<Form>()
    const {data: session} = useSession()

    const addUser: SubmitHandler<Form> = async (formContent) => {
        try {
            if (session) {
                await axios.post('/api/friends/add', {
                    email: formContent.email,
                    user: session.user
                })
                resetField('email')
                toast.success('Success')
                return
            }
        }
        catch (err) {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data)
                return
            } 
        }
    }

    return (
        <main className="text-white w-full h-full py-1 flex flex-col gap-2">
            <p className='font-bold text-4xl'>Add user by email</p>
            <form className="h-12 flex gap-2.5" onSubmit={handleSubmit(addUser)}>
                <input type="email" placeholder='myfriend@example.dev' spellCheck='false' {...register('email')} className="peer w-full text-lg text-slate-200 bg-[#1e1e1e] border-2 border-[#3c3c3c] rounded-md invalid:border-pink-500 invalid:text-pink-600 focus:outline-none px-1 placeholder:text-zinc-600"/>
                <button className="rounded-md w-16 bg-[#505050] text-white font-bold" type="submit">Add</button>
            </form>
            <Toaster position="top-center" reverseOrder={false} toastOptions={{duration:2000}} />
        </main>
    )
}
