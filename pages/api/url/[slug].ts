import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/server/db/dbConnect'

type Data = {
  message: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET') {
    const { slug } = req.query
    if (slug) {
      const dbRes = await getUrl(slug as string)
      res.status(200).json({ message: dbRes })
    } else {
      res.status(400).json({ message: 'no URL found' })
    }
  } else {
    res.status(400).json({ message: 'wrong method' })
  }
}

const getUrl = async (shortId: string) => {
  try {
    const { urlsCollection, close } = await dbConnect()
    const res = await urlsCollection.findOne({ shortUrl: shortId })
    close()
    return res.longUrl
  } catch (error) {
    // console.log('getUrl error', error)
  }
}
