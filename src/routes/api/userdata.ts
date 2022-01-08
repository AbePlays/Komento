import type { RequestHandler } from '@sveltejs/kit'
import type { Comment, User } from '@prisma/client'

import PrismaClient from '@lib/prisma'
import type { Comment as TComment, User as TUser } from '@types'

const formatUser = (user: User): TUser => {
  return {
    id: user.id,
    image: user.image,
    username: user.username
  }
}

const formatComment = (
  comment: Comment,
  likedByUser: boolean,
  dislikedByUser: boolean,
  user: TUser
): TComment => {
  return {
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    dislikedByUser,
    likedByUser,
    user,
    replies: [],
    score: Number(comment.score)
  }
}

export const get: RequestHandler = async ({ query }) => {
  const hashMap = new Map<string, TUser>()
  const client = PrismaClient.instance
  const userId = query.get('id')
  let status = 500
  let body = {}

  if (!userId) {
    status = 400
    body = { message: 'No user id provided' }
  } else {
    try {
      let user: User = null
      let comments: Array<Comment> = []
      let formattedUser: TUser = null
      const formattedComments: Array<TComment> = []

      // Query DB for user
      user = await client.user.findUnique({ where: { id: userId } })
      if (!user) {
        status = 404
        body = { message: 'User not found' }
      } else {
        // Format user and store it in map, then query DB for comments
        formattedUser = formatUser(user)
        hashMap.set(userId, formattedUser)
        comments = await client.comment.findMany({
          orderBy: { createdAt: 'desc' }
        })

        // Format comments
        if (comments) {
          comments.forEach(async (comment) => {
            // Find user info for the comment
            let commentUser: TUser = null
            if (hashMap.has(comment.user)) {
              commentUser = hashMap.get(comment.user)
            } else {
              const dbUser = await client.user.findUnique({
                where: { id: comment.user }
              })
              if (user) {
                commentUser = formatUser(dbUser)
                hashMap.set(comment.user, commentUser)
              }
            }
            // Figure if the user liked or disliked the comment
            const likedByUser = user.likes.includes(comment.id)
            const dislikedByUser = user.dislikes.includes(comment.id)
            // Format comment and add it to the array
            formattedComments.push(
              formatComment(comment, likedByUser, dislikedByUser, commentUser)
            )
          })
        }
        // Set response body and status
        status = 200
        body = {
          currentUser: formattedUser,
          comments: formattedComments
        }
      }
    } catch (e) {
      console.log(e)
      body = { message: 'Some error occured' }
    }
  }

  return { status, body }
}
