// POST user data and create account
// - validate POST data                                              \ error handling
// - query: findOne({ email }) (check for email already registered)  \ error handling
// - encrypt password
// - query: insertOne({ email, encryptedPassword })                  \ error handling
// - tokenize userId
// - res.({ token })

// how to proper format error. ex: validateInfo error responses
// what should I return in validateInfo if it's all good
// when to throw new Error
// should there be error handling in try-catch @line20

import dbConnect from '@/server/db/dbConnect'
import validateAuthInfo from '@/server/validation/validateAuthInfo'
import * as argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Response, ErrorResponse } from '@/server.types'
import { findUserByEmail } from '@/server/userQueries'

async function hashPassword(password: string) {
  try {
    const hash = await argon2.hash(password)
    // should there be error handling here?
    return hash
  } catch (error) {
    console.log(error)
    return 'error'
  }
}

const insertNewUser = async (email: string, hashedPassword: string) => {
  const newUser = {
    email: email,
    password: hashedPassword,
  }
  try {
    const { usersCollection, close } = await dbConnect()
    const dbRes = await usersCollection.insertOne(newUser)
    close()
    return dbRes
  } catch (error) {
    console.log('insertNewUser error', error)
  }
}

export default async function signUp(
  req: NextApiRequest,
  res: NextApiResponse<Response | ErrorResponse>,
) {
  const { email, password } = req.body

  const isInfoValid = validateAuthInfo(email, password)
  if (isInfoValid !== 1) return res.status(400).json(isInfoValid)

  const user = await findUserByEmail(email)
  if (user?.email) return res.status(400).json({ error: 'Email already in use' })
 
  const hashedPassword = await hashPassword(password)
  if (hashedPassword === 'error') {
    console.log(hashedPassword)
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
