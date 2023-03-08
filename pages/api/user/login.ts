import type { NextApiRequest, NextApiResponse } from 'next'
import type { AuthResponse, ErrorResponse } from '@/server.types'
import jwt from 'jsonwebtoken'
import validateAuthInfo from '@/server/validation/validateAuthInfo'
import { findUserByEmail } from '@/server/userQueries'
import { verifyPassword } from '@/server/encryptionHelpers'

export default async function signUp(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponse | ErrorResponse>,
) {
  if (req.method !== 'POST') return res.status(400).json({ error: 'Needs to be a POST request'})

  const { email, password } = req.body
  const authError = { error: 'wrong email or password' }

  const isInfoValid = validateAuthInfo(email, password)
  if (isInfoValid !== 1) return res.status(400).json(authError)

  const dbUser = await findUserByEmail(email)
  if (!dbUser) return res.status(400).json(authError)

  const verified = await verifyPassword(dbUser.password, password)
  if (!verified) return res.status(400).json(authError)

  const userUuid = dbUser._id.toString()
  const secret = process.env.TOKEN_SECRET as string
  const token = jwt.sign(userUuid, secret)

  const response = {
    token: token,
  }

  return res.status(200).json(response)
}
