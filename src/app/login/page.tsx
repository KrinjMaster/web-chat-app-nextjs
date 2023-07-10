'use client'
import GoogleSignInButton from '@/components/GoogleSIgnButton'

export default function home() {
    return (
        <main className="h-screen w-screen flex text-slate-100">
            <div className='md:w-96 md:h-96 w-[90vw] h-[65vh] bg-[#1e1e1e] m-auto rounded-xl p-2 flex flex-col'>
                <h1 className='text-6xl text-white font-bold'>Login</h1>
                <div className='flex flex-col justify-between h-full'>
                    <form className="w-full h-fit font-medium flex flex-col">
                        <label className="text-3xl">
                            <span className="text-lg ">Username</span>
                            <input type="text" spellCheck='false' pattern="^[a-zA-Z0-9\s]+$" className="peer w-full border-[3px] border-[#3c3c3c] rounded-lg invalid:border-pink-500 invalid:text-pink-600 focus:outline-none p-1 bg-white bg-opacity-[3%]"/>
                        </label>
                        <label className="text-3xl">
                            <span className="text-lg">Email</span>
                            <input type="email" spellCheck='false' className="peer w-full border-[3px] border-[#3c3c3c] rounded-lg invalid:border-pink-500 invalid:text-pink-600 focus:outline-none px-1 bg-white bg-opacity-[3%] p-1"/>
                        </label>
                    </form>
                    <div className="flex w-full justify-between gap-2.5">
                        <hr className="border-2 w-full my-auto rounded-l-lg border-[#3c3c3c]"/>
                        <p className="text-sm my-auto font-medium text-zinc-600">or</p>
                        <hr className="border-2 w-full my-auto rounded-r-lg border-[#3c3c3c]"/>
                    </div>
                    <GoogleSignInButton/>
                </div>
            </div>
        </main>
    )
}