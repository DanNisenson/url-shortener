import * as argon2 from 'argon2'
import jwt from 'jsonwebtoken';

export async function hashPassword(password: string) {
  try {
    const hash = await argon2.hash(password)
    // should there be error handling here?
    return hash
  } catch (error) {
    console.log(error)
    return 'error'
  }
}

export const verifyPassword = async (hashedPassword: string, password: string) => {
  try {
    if (await argon2.verify(hashedPassword, password)) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log('verifyPassword', error)
    return 'error'
  }
}

export const decryptToken = (token: string) => {
  const secret = process.env.TOKEN_SECRET as string

  try {
    const decrypted = jwt.verify(token, secret) as string
    return decrypted
  } catch (error) {
    console.error("decryptToken", error)
  }
}