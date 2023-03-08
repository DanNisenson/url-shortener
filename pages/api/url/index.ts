import { nanoid } from 'nanoid'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ErrorResponse, MessageResponse } from '@/server.types'
import dbConnect from '@/server/db/dbConnect'
import jwt from 'jsonwebtoken'
import { decryptToken } from '@/server/encryptionHelpers'

type UserId = string | undefined

const insertUrl = async (longUrl: string, userId: UserId) => {
  const shortId = nanoid(6)

  try {
    const { urlsCollection, close } = await dbConnect()
    const newEntry = {
      userId: userId ? userId : '',
      longUrl: longUrl,
      shortUrl: shortId,
    }

    const insertResponse = await urlsCollection.insertOne(newEntry)
    close()

    if (insertResponse.acknowledged) {
      return shortId
    } else {
      return 'an error in the db has ocurred'
    }
  } catch (error) {
    console.log('insert error', error)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MessageResponse | ErrorResponse>,
) {
  if (req.method !== 'POST') return res.status(400).json({ error: 'Needs to be a POST request' })

  const longUrl = req.body.longUrl
  const token = req.body.token
  let userId: UserId = ''

  if (token) userId = decryptToken(token)
  if (token && !userId) return res.status(400).json({ error: 'invalid token'})

  try {
    const dbRes = await insertUrl(longUrl, userId)
    return res.status(201).json({ message: `http://localhost:3000/${dbRes}` })
  } catch (error) {
    console.log('error', error)
    return res.status(500).json({ error: 'There has been an error inserting the link'})
  }
}
