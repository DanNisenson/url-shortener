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

export default async function signUp(
  req: NextApiRequest,
  res: NextApiResponse<Response | ErrorResponse>,
) {
  const { email, password } = req.body

  const isInfoValid = validateAuthInfo(email, password)
  if (isInfoValid !== 1) return res.status(400).json(isInfoValid)

  
}