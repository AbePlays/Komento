import type { RequestHandler } from '@sveltejs/kit'

import PrismaClient from '@lib/prisma'

export const post: RequestHandler = async ({ body: reqBody }) => {
  const client = PrismaClient.instance
  let status = 500
  let body = {}

  if (!reqBody) {
    status = 400
    body = { message: 'No body provided' }
  } else {
    try {
      // Extract userId and comment from body
      const { userId, commentId, content, replyingTo } = reqBody
      if (!userId || !content || !commentId || !replyingTo) {
        status = 400
        body = {
          message: 'No user id or commentId or replyingTo or content provided'
        }
      } else {
        // Create a reply in DB
        const reply = await client.reply.create({
          data: {
            content,
            createdAt: new Date().toISOString(),
            score: 0,
            user: userId,
            replyingTo
          }
        })
        if (!reply) {
          status = 500
          body = { message: 'Error creating reply' }
        } else {
          // Update comment in DB
          const comment = await client.comment.update({
            where: { id: commentId },
            data: { replies: { push: reply.id } }
          })
          if (!comment) {
            status = 500
            body = { message: 'Error updating comment' }
          } else {
            status = 200
            body = { message: 'Reply successfully created' }
          }
        }
      }
    } catch (e) {
      console.log(e)
      body = { message: 'Some error occured' }
    }
  }

  return { status, body }
}

export const del: RequestHandler = async ({ query }) => {
  const client = PrismaClient.instance
  const commentId = query.get('commentId')
  const replyId = query.get('replyId')
  let status = 500
  let body = {}

  if (!commentId || !replyId) {
    status = 400
    body = { message: 'No comment id or reply id provided' }
  } else {
    try {
      // Delete reply from DB
      const reply = await client.reply.delete({
        where: { id: replyId }
      })
      if (!reply) {
        status = 500
        body = { message: 'Error deleting reply' }
      } else {
        // Delete reply from comment from DB
        let comment = await client.comment.findUnique({
          where: { id: commentId }
        })
        comment = await client.comment.update({
          where: { id: commentId },
          data: {
            replies: { set: comment.replies.filter((id) => id !== replyId) }
          }
        })
        if (!comment) {
          status = 500
          body = { message: 'Error deleting reply from commennt' }
        } else {
          status = 200
          body = { message: 'Reply successfully deleted' }
        }
      }
    } catch (e) {
      console.log(e)
      body = { message: 'Some error occured' }
    }
  }

  return { status, body }
}

export const patch: RequestHandler = async ({ body: reqBody }) => {
  const client = PrismaClient.instance
  let status = 500
  let body = {}

  if (!reqBody) {
    status = 400
    body = { message: 'No body provided' }
  } else {
    try {
      // Extract commentId and comment from body
      const { id: replyId, content } = reqBody
      if (!replyId || !content) {
        status = 400
        body = { message: 'No reply id or content provided' }
      } else {
        // Update comment in DB
        const comment = await client.reply.update({
          where: { id: replyId },
          data: { content }
        })

        if (!comment) {
          status = 500
          body = { message: 'Error updating reply' }
        } else {
          status = 200
          body = { message: 'Reply successfully updated' }
        }
      }
    } catch (e) {
      console.log(e)
      body = { message: 'Some error occured' }
    }
  }

  return { status, body }
}
