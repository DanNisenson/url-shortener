// POST user data and create account
// - validate POST data                                              \ error handling
// - query: findOne({ email }) (check for email already registered)  \ error handling
// - encrypt password
// - query: insertOne({ email, encryptedPassword })                  \ error handling
// - tokenize userId
// - res.({ token })
import type { NextApiRequest, NextApiResponse } from 'next'
import * as argon2 from 'argon2'

type Response = {}

async function hashing(password: string) {
  try {
    const hash = await argon2.hash(password)
    if (hash) return hash
  } catch (err) {
    console.log(err)
    return err
  }
}

const findByEmail = async (email: string) => {
  
}

/**
 * Validate email and password
 * @param email string
 * @param password string
 * @returns 1 for valid info. { error: string} for invalid info
 */
const validateInfo = (email = null, password = null) => {
  if (!email) return { error: 'Must enter email' }
  if (!password) return { error: 'Must enter password' }

  const regexemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const regexpassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

  if (!regexemail.test(email)) return { error: 'invalid email format' }
  if (!regexpassword.test(password)) return { error: 'invalid password format' }

  return 1
}

export default async function signUp(req: NextApiRequest, res: NextApiResponse<Response>) {
  const { email, password } = req.body

  const isInfoValid = validateInfo(email, password)
  if (isInfoValid !== 1) return res.status(400).json(isInfoValid)



  // const hash = await hashing(password)
  // console.log('controller', hash)
  return res.status(200).json({ hash: isInfoValid })
}
