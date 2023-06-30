import './globals.css'
import { Inter } from 'next/font/google'
import SessionProvider from '../providers/SessionProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
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
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}

