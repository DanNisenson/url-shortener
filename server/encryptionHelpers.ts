import * as argon2 from 'argon2'

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
    console.log("verifyPassword", error)
    return "error"
  }
}