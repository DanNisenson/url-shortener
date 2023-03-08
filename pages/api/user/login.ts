// POST user data and respond with token
// - validate POST data             \ error handling
// - query: findOne({ email })      \ error handling
// - encrypt password and compare   \ error handling
// - tokenize userId
// - res.({ token })
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import * as argon2 from 'argon2'

export default async function signUp(
  req: NextApiRequest,
  res: NextApiResponse<Response | ErrorResponse>,
) {

}