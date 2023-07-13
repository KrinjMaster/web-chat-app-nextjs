import { User } from '@/types/User'
import { kv } from '@vercel/kv'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.JWT_TOKEN,
  callbacks: {
    async signIn({ user }) {
      const dbUser = await kv.get<User | null>(`user:${user.id}`)

      if (!dbUser) {
        await kv.set(`user:${user.id}`, {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        })
        await kv.set(`user:email:${user.email}`, user.id)
        await kv.sadd(`users:list`, {
          id: user.id,
          email: user.email,
          image: user.image,
          name: user.name,
        })
      }

      return true
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id
      }
      return session
    },
    async jwt({ user, token }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async redirect() {
      return '/dashboard'
    },
  },
}
