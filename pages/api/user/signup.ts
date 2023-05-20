// POST user data and create account
// - validate POST data                                              \ error handling
// - query: findOne({ email }) (check for email already registered)  \ error handling
// - encrypt password
// - query: insertOne({ email, encryptedPassword })                  \ error handling
// - tokenize userId
// - res.({ token })
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ErrorResponse, AuthResponse } from '@/server.types'
import { hashPassword } from '@/server/encryptionHelpers'
import { findUserByEmail, insertNewUser } from '@/server/userQueries'
import validateAuthInfo from '@/server/validation/validateAuthInfo'
import jwt from 'jsonwebtoken'

export default async function signUp(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponse | ErrorResponse>,
) {
  if (req.method !== 'POST') return res.status(400).json({ error: 'Needs to be a POST request'})

  const { email, password } = req.body

  const isInfoValid = validateAuthInfo(email, password)
  if (isInfoValid !== 1) return res.status(400).json(isInfoValid)

  const user = await findUserByEmail(email)
  if (user) return res.status(400).json({ error: 'Email already in use' })

  const hashedPassword = await hashPassword(password)
  if (hashedPassword === 'error') {
    // console.log(hashedPassword)
    return
  }

  const { acknowledged, insertedId } = await insertNewUser(email, hashedPassword)
  if (!acknowledged) return res.status(400).json({ error: 'Error inserting new user' })

  const userUuid = insertedId.toString()
  const secret = process.env.TOKEN_SECRET as string
  const token = jwt.sign(userUuid, secret)

  const response = {
    token: token,
  }

  return res.status(200).json(response)
}
