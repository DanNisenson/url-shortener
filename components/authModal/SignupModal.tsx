import { useHandleForm } from '@/hooks/useHandleForm'
import useLogin from '@/hooks/useLogin'
import AuthMessage from '@/components/authModal/AuthMessage';
import useSignup from '../../hooks/useSignup';

const defaultLoginFormData = {
  email: '',
  password: '',
}

type SignupModalProps = {
  setLoggedView: (logState: number) => void
}

const SignupModal = ({setLoggedView}: SignupModalProps) => {
  const { requestState, authError, handleSignup } = useSignup(setLoggedView)
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
      <label htmlFor="confirmPassword">Confirm password:</label>
      <input
        className="hero-modal__input"
        type="text"
        name="password"
        onChange={handleInput}
      />

      <button
        className="hero-modal__button"
        onClick={() => handleSignup(formData)}>
        Sign Up
      </button>

      {requestState && (
        <AuthMessage requestState={requestState} authError={authError} />
      )}
    </div>
  )
}

export default SignupModal
