import { useState } from 'react'
import { setLocalStorage } from '@/frontHelpers/localStorage'
import axios from 'axios';

type SignupInfo = {
  email: string
  password: string
}


const useSignup = () => {
  const [requestState, setRequestState] = useState('')
  const [authError, setAuthError] = useState('')

  const postRequest = async (signupInfo: SignupInfo) => {
    const baseUrl = process.env.BASE_URL
    const res = await axios.post(`${baseUrl}/api/user/signup`, signupInfo)
      return res.data
  }

  const handleSuccess = async (token: string) => {
    setLocalStorage('token', token)
    setRequestState('success')
    // redirect
  }

  const handleError = (error) => {
    setRequestState('error')
    const errRes = error.response?.data.error || 'server error'
    setAuthError(errRes)
  }

  const handleSignup = async (signupInfo: SignupInfo) => {
    setRequestState('loading')
    try {
      const token = await postRequest(signupInfo)
      handleSuccess(token)
    } catch (error) {
      handleError(error)
    }
  }

  return { requestState, authError, handleSignup }
}

export default useSignup
