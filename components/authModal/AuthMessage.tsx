type AuthMessageProps = {
  requestState: string
  authError: string
}

const AuthMessage = ({ requestState, authError }: AuthMessageProps) => {
  
  if (requestState === 'loading') {
    return <p>Loading...</p>
  }
  if (requestState === 'success') {
    return<p>Success</p>
  }
  if (requestState === 'error') {
    return<p>{authError}</p>
  }

  return null
}

export default AuthMessage