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
      const { id: userId, content } = reqBody
      if (!userId || !content) {
        status = 400
        body = { message: 'No user id or content provided' }
      } else {
        // Create a comment in DB
        const comment = await client.comment.create({
          data: {
            content,
            createdAt: new Date().toISOString(),
            score: 0,
            user: userId,
            replies: []
          }
        })

        if (!comment) {
          status = 500
          body = { message: 'Error creating comment' }
        } else {
          status = 200
          body = { message: 'Comment successfully created' }
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
  const commentId = query.get('id')
  let status = 500
  let body = {}

  if (!commentId) {
    status = 400
    body = { message: 'No comment id provided' }
  } else {
    try {
      // Delete comment from DB
      const comment = await client.comment.delete({ where: { id: commentId } })
      if (!comment) {
        status = 500
        body = { message: 'Error deleting comments' }
      } else {
        status = 200
        body = { message: 'Comments successfully deleted' }
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
      const { id: commentId, content } = reqBody
      if (!commentId || !content) {
        status = 400
        body = { message: 'No comment id or content provided' }
      } else {
        // Update comment in DB
        const comment = await client.comment.update({
          where: { id: commentId },
          data: { content }
        })

        if (!comment) {
          status = 500
          body = { message: 'Error updating comment' }
        } else {
          status = 200
          body = { message: 'Comment successfully updated' }
        }
      }
    } catch (e) {
      console.log(e)
      body = { message: 'Some error occured' }
    }
  }

  return { status, body }
}
