import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/server/db/dbConnect'
import { decryptToken } from '@/server/encryptionHelpers'
import { findUserUrls } from '@/server/userQueries'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') return res.status(400).json('Wrong method')
  if (!req.headers.authorization) return res.status(401).json('Access denied')

  const token = req.headers.authorization

  const decrypted = decryptToken(token)
  if (!decrypted) return res.status(401).json({ error: 'Access denied' })

  const urls = await findUserUrls(decrypted)
  if(!urls) return res.status(500).json({ error: 'Database error' })
  if(urls?.length === 0) return res.status(400).json({ error: 'User has no urls' })

  return res.status(200).json(urls)
}
