import { User } from 'next-auth'

type UserPassword = string

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
  }
}

declare module 'next-auth' {
  interface Session {
    user: User
  }
}
