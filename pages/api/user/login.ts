// POST user data and respond with token
// - validate POST data             \ error handling
// - query: findOne({ email })      \ error handling
// - encrypt password and compare   \ error handling
// - tokenize userId
// - res.({ token })
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Response, ErrorResponse } from '@/server.types'
import jwt from 'jsonwebtoken'
import * as argon2 from 'argon2'
import validateAuthInfo from '@/server/validation/validateAuthInfo'
import { findUserByEmail } from '@/server/userQueries'
import { verifyPassword } from '@/server/encryptionHelpers'

// const verifyPassword = async (hashedPassword: string, password: string) => {
//   try {
//     if (await argon2.verify(hashedPassword, password)) {
//       return true
//     } else {
//       return false
//     }
//   } catch (error) {
//     console.log("verifyPassword", error)
//     return "error"
//   }
// }

export default async function signUp(
  req: NextApiRequest,
  res: NextApiResponse<Response | ErrorResponse>,
) {
  const { email, password } = req.body
  const authError = { error: "wrong email or password" }

  const isInfoValid = validateAuthInfo(email, password)
  if (isInfoValid !== 1) return res.status(400).json(authError)

  const dbUser = await findUserByEmail(email)
  if (!dbUser) return res.status(400).json(authError)

  const verified = await verifyPassword(dbUser.password, password);
  if (!verified) return res.status(400).json(authError)

  const userUuid = dbUser._id.toString()
  const secret = process.env.TOKEN_SECRET as string
  const token = jwt.sign(userUuid, secret)

  const response = {
    token: token,
  }

  return res.status(200).json(response)
}