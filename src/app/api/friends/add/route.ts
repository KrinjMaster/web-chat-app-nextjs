// import { db } from '@/lib/database'
// import { toPusherKey } from '@/lib/helpers'
// import { pusherServer } from '@/lib/pusher'

// export async function POST(req: Request) {
//   try {
//     const body = await req.json()
//     const userId = await db.get(`user:email:${body.email}`)

//     if (!userId) {
//       return new Response('User does not exist', {
//         status: 400,
//       })
//     }

//     if (!body.user) {
//       return new Response('Unathorized user')
//     }

//     if (body.user.email === body.email) {
//       return new Response('You can not add yourself as friend', {
//         status: 400,
//       })
//     }

//     const isAlreadyFriends = await db.sismember(
//       `user:${userId}:incoming_friends`,
//       body.user.id
//     )

//     if (isAlreadyFriends) {
//       return new Response('You can not add this user twice', {
//         status: 400,
//       })
//     }

//     // valid request
//     try {
//       pusherServer.trigger(
//         toPusherKey(`user:${userId}:incoming_friends`),
//         'incoming_friend_request',
//         {
//           senderId: body.user.id,
//           senderEmail: body.user.email,
//         }
//       )
//     } catch (err) {
//       return
//     }

//     await db.sadd(`user:${userId}:incoming_friends`, body.user.id)

//     return new Response('Success', {
//       status: 200,
//     })
//   } catch (err) {
//     if (err instanceof Error) {
//       return new Response(err.message, {
//         status: 400,
//       })
//     }
//   }
// }
