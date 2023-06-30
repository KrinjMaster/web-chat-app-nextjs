'use client'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function Home() {
  const {data: session} = useSession({
    required: true
  })

  if (session) redirect('/dashboard')
  return (
    <main className="w-full h-full">
      
    </main>
  )
}
