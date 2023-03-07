import { nanoid } from 'nanoid'
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/server/apiHelpers/dbConnect'

type Data = {
  message: any
}

const insertUrl = async (longUrl: string) => {
  const shortId = nanoid(6)
  try {
    const { urlsCollection, close } = await dbConnect()
    const newEntry = {
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

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    try {
      const dbRes = await insertUrl(req.body.url)
      res.status(201).json({ message: `http://localhost:3000/${dbRes}` })
    } catch (error) {
      console.log('error', error)
    }
  } else {
    res.status(400).json({ message: 'Wrong method!' })
  }
}
