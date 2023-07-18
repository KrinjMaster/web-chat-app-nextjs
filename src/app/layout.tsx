import './globals.css'
import { Inter } from 'next/font/google'
import SessionProvider from '../providers/SessionProvider'

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

