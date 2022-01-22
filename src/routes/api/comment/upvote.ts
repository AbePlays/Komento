import type { RequestHandler } from '@sveltejs/kit'

import PrismaClient from '@lib/prisma'

export const post: RequestHandler<
  unknown,
  { userId: string; commentId: string }
> = async ({ body: reqBody }) => {
  const client = PrismaClient.instance
  let status = 500
  let body = {}

  if (!reqBody) {
    status = 400
    body = { message: 'No body provided' }
  } else {
    try {
      // Extract userId and commentId from body
      const { userId, commentId } = reqBody
      if (!userId) {
        status = 400
        body = { message: 'No user id or comment id provided' }
      } else {
        // Query DB for user
        const user = await client.user.findUnique({ where: { id: userId } })
        if (!user) {
          status = 400
          body = { message: 'User not found' }
        } else {
          // Prepare promise for updating user and comment
          let updateUser: Promise<unknown>
          let updateComment: Promise<unknown>
          if (user.likes.includes(commentId)) {
            // If user has already liked comment, remove like
            updateUser = client.user.update({
              where: { id: userId },
              data: { likes: [...user.likes.filter((id) => id !== commentId)] }
            })
            // Decrement comment's score
            updateComment = client.comment.update({
              where: { id: commentId },
              data: { score: { decrement: 1 } }
            })
          } else {
            if (user.dislikes.includes(commentId)) {
              // If user has already disliked comment, remove the dislike and add like
              updateUser = client.user.update({
                where: { id: userId },
                data: {
                  dislikes: [...user.dislikes.filter((id) => id !== commentId)],
                  likes: [...user.likes, commentId]
                }
              })
              // Increment comment's score
              updateComment = client.comment.update({
                where: { id: commentId },
                data: { score: { increment: 2 } }
              })
            } else {
              // If user has not liked or disliked comment, add like
              updateUser = client.user.update({
                where: { id: userId },
                data: { likes: [...user.likes, commentId] }
              })
              // Increment comment's score
              updateComment = client.comment.update({
                where: { id: commentId },
                data: { score: { increment: 1 } }
              })
            }
          }
          await Promise.all([updateUser, updateComment])
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
