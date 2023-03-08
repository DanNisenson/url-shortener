/**
 * Validate email and password
 * @param email string
 * @param password string
 * @returns 1 for valid info. { error: string } for invalid info
 */
export default function validateAuthInfo(email = null, password = null) {
  if (!email) return { error: 'Must enter email' }
  if (!password) return { error: 'Must enter password' }

  const regexemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const regexpassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

  if (!regexemail.test(email)) return { error: 'invalid email format' }
  if (!regexpassword.test(password))
    return { error: 'password must be 8 characters long and must include numbers and letters' }

  return 1
}