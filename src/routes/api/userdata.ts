import type { RequestHandler } from '@sveltejs/kit'
import type { Comment, Reply, User } from '@prisma/client'

import PrismaClient from '@lib/prisma'
import type {
  Comment as TComment,
  Reply as TReply,
  User as TUser
} from '@types'

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
  user: TUser,
  replies: Array<TReply>
): TComment => {
  return {
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    dislikedByUser,
    likedByUser,
    user,
    replies,
    score: Number(comment.score)
  }
}

const formatReply = (
  reply: Reply,
  likedByUser: boolean,
  dislikedByUser: boolean,
  user: TUser,
  replyingTo: string
): TReply => {
  return {
    id: reply.id,
    content: reply.content,
    createdAt: reply.createdAt,
    dislikedByUser,
    likedByUser,
    score: Number(reply.score),
    user,
    replyingTo
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
      let formattedReplies: Array<TReply> = []

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
          for (const comment of comments) {
            formattedReplies = []
            // Find user info for the comment
            let commentUser: TUser = null
            if (hashMap.has(comment.user)) {
              commentUser = hashMap.get(comment.user)
            } else {
              const dbUser = await client.user.findUnique({
                where: { id: comment.user }
              })
              if (dbUser) {
                commentUser = formatUser(dbUser)
                hashMap.set(comment.user, commentUser)
              }
            }
            // Figure if the user liked or disliked the comment
            const likedByUser = user.likes.includes(comment.id)
            const dislikedByUser = user.dislikes.includes(comment.id)
            // Query DB for replies
            const replies = comment.replies
            if (replies.length) {
              for (const replyId of replies) {
                // Figure if the user liked or disliked the reply
                let replyUser: TUser = null
                const reply = await client.reply.findUnique({
                  where: { id: replyId }
                })
                const likedByUser = user.likes.includes(replyId)
                const dislikedByUser = user.dislikes.includes(replyId)
                let replyingToUsername = ''
                if (hashMap.has(reply.user)) {
                  replyUser = hashMap.get(reply.user)
                } else {
                  const dbUser = await client.user.findUnique({
                    where: { id: reply.user }
                  })
                  if (dbUser) {
                    replyUser = formatUser(dbUser)
                    hashMap.set(reply.user, replyUser)
                  }
                }

                if (hashMap.has(reply.replyingTo)) {
                  replyingToUsername = hashMap.get(reply.replyingTo).username
                } else {
                  const dbUser = await client.user.findUnique({
                    where: { id: reply.replyingTo }
                  })
                  if (dbUser) {
                    const temp = formatUser(dbUser)
                    replyingToUsername = temp.username
                    hashMap.set(reply.replyingTo, temp)
                  }
                }

                const formattedReply = formatReply(
                  reply,
                  likedByUser,
                  dislikedByUser,
                  replyUser,
                  replyingToUsername
                )
                formattedReplies.push(formattedReply)
              }
            }
            // Format comment and add it to the array
            formattedComments.push(
              formatComment(
                comment,
                likedByUser,
                dislikedByUser,
                commentUser,
                formattedReplies
              )
            )
          }
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
