import type { RequestHandler } from '@sveltejs/kit'

import PrismaClient from '@lib/prisma'

export const post: RequestHandler<
  unknown,
  { userId: string; replyId: string }
> = async ({ body: reqBody }) => {
  const client = PrismaClient.instance
  let status = 500
  let body = {}

  if (!reqBody) {
    status = 400
    body = { message: 'No body provided' }
  } else {
    try {
      // Extract userId and replyId from body
      const { userId, replyId } = reqBody
      if (!userId) {
        status = 400
        body = { message: 'No user id or reply id provided' }
      } else {
        // Query DB for user
        const user = await client.user.findUnique({ where: { id: userId } })
        if (!user) {
          status = 400
          body = { message: 'User not found' }
        } else {
          // Prepare promise for updating user and reply
          let updateUser: Promise<unknown>
          let updateReply: Promise<unknown>
          if (user.dislikes.includes(replyId)) {
            // If user has already disliked reply, remove dislike
            updateUser = client.user.update({
              where: { id: userId },
              data: {
                dislikes: [...user.dislikes.filter((id) => id !== replyId)]
              }
            })
            // Increment reply's score
            updateReply = client.reply.update({
              where: { id: replyId },
              data: { score: { increment: 1 } }
            })
          } else {
            if (user.likes.includes(replyId)) {
              // If user has already liked reply, remove like and add dislike
              updateUser = client.user.update({
                where: { id: userId },
                data: {
                  likes: [...user.likes.filter((id) => id !== replyId)],
                  dislikes: [...user.dislikes, replyId]
                }
              })
              // Decrement reply's score
              updateReply = client.reply.update({
                where: { id: replyId },
                data: { score: { decrement: 2 } }
              })
            } else {
              // If user has not liked or disliked reply, add dislike
              updateUser = client.user.update({
                where: { id: userId },
                data: { dislikes: [...user.dislikes, replyId] }
              })
              // Decrement reply's score
              updateReply = client.reply.update({
                where: { id: replyId },
                data: { score: { decrement: 1 } }
              })
            }
          }
          await Promise.all([updateUser, updateReply])
          status = 200
          body = { message: 'Updated successfully' }
        }
      }
    } catch (e) {
      console.log(e)
      body = { message: 'Some error occured' }
    }
  }

  return { status, body }
}
