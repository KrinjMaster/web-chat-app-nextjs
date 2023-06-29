import './globals.css'
import { Inter } from 'next/font/google'
import SessionProvider from '../providers/SessionProvider'
// import NavBar from '@/components/NavBar'

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
      <body className={`${inter.className} max-w-[1024px] mx-auto h-fit flex`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}

