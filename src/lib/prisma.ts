// https://github.com/prisma/prisma/issues/6491#issuecomment-847141591
import Prisma, * as PrismaAll from '@prisma/client'

const PrismaClient = Prisma?.PrismaClient || PrismaAll?.PrismaClient

const DBClient = {
  instance: new PrismaClient()
}

export type IDBClient = typeof DBClient

Object.freeze(DBClient)

export default DBClient
