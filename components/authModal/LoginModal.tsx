import useLogin from '@/hooks/useLogin'
import { useHandleForm } from '@/hooks/useHandleForm'
import AuthMessage from '@/components/authModal/AuthMessage'

const defaultLoginFormData = {
  email: '',
  password: '',
}

const LoginModal = () => {
  const { requestState, authError, handleLogin } = useLogin()
  const { formData, handleInput } = useHandleForm(defaultLoginFormData)

  return (
    <div className="hero-modal__form">
      <label htmlFor="email">Email:</label>
      <input
        className="hero-modal__input"
        type="text"
        name="email"
        onChange={handleInput}
      />
      <label htmlFor="password">Password:</label>
      <input
        className="hero-modal__input"
        type="text"
        name="password"
        onChange={handleInput}
      />

      <button
        className="hero-modal__button"
        onClick={() => handleLogin(formData)}>
        Log In
      </button>

      {requestState && (
        <AuthMessage requestState={requestState} authError={authError} />
      )}
    </div>
  )
}

export default LoginModal
