import NavBar from '@/components/NavBar'
import { authOptions } from '@/lib/auth'
import { kv } from '@vercel/kv'
import { getServerSession } from 'next-auth'
import { Inter } from 'next/font/google'
import { redirect } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Krinjgram',
  description: 'Best chatting chat 4sure',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/login')
    }
    
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <section className='max-w-[1024px] mx-auto h-fit flex flex-row'>
            <NavBar/>
            {children}
        </section>
      </body>
    </html>
  )
}

