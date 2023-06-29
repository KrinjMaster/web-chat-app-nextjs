'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import axios, { AxiosError } from 'axios'
import { Toaster, toast } from 'react-hot-toast'

interface Form {
    email: string
}

export default function Home() {
    const { handleSubmit, register } = useForm<Form>()
    const {data: session} = useSession()

    const addUser: SubmitHandler<Form> = async (email) => {

        try {
            if (session) {
                // await axios.post('/api/friends/add', {
                //     email: email.email,
                //     user: session.user
                // })
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
                <input type="email" spellCheck='false' {...register('email')} className="peer w-full text-lg text-slate-200 bg-[#252525] border-2 rounded-lg invalid:border-pink-500 invalid:text-pink-600 focus:outline-none px-1"/>
                <button className="rounded-lg bg-white text-black w-16" type="submit">Add</button>
            </form>
            <Toaster position="top-center" reverseOrder={false} toastOptions={{duration:2000}} />
        </main>
    )
}
