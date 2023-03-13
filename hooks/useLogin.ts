import { setLocalStorage } from '@/frontHelpers/localStorage'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'

type LoginInfo = {
  email: string
  password: string
}

/**
 *
 * @param loginInfo { email, password }
 * @returns requestState: string, handleLogin: fetch req
 */
const useLogin = () => {
  const router = useRouter()
  const [requestState, setRequestState] = useState('')
  const [authError, setAuthError] = useState('')

  const postRequest = async (loginInfo: LoginInfo) => {
    const baseUrl = process.env.BASE_URL
    const res = await axios.post(`${baseUrl}/api/user/login`, loginInfo)
    return res.data
  }

  const handleSuccess = async (token: string) => {
    console.log('success', token)
    setLocalStorage('token', token)
    setRequestState('success')
    router.push('/dashboard')
  }

  const handleError = (error) => {
    setRequestState('error')
    const errRes = error.response?.data.error || 'server error'
    setAuthError(errRes)
  }

  const handleLogin = async (loginInfo: LoginInfo) => {
    setRequestState('loading')
    try {
      const { token } = await postRequest(loginInfo)
      handleSuccess(token)
    } catch (error) {
      handleError(error)
    }
  }

  return { requestState, authError, handleLogin }
}

export default useLogin
