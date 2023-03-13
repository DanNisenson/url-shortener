import LoginModal from '@/components/authModal/LoginModal'
import SignupModal from '@/components/authModal/SignupModal'

type HeroModalProps = {
  modal: number
  setModal: (modalState: number) => void
}

const HeroModal = ({ modal, setModal }: HeroModalProps) => {
  return (
    <>
      <div className="hero-modal__background">
        <div
          className="hero-modal__click-outside"
          onClick={() => setModal(0)}
        />
        <div className="hero-modal__card">
          {modal === 1 && <LoginModal />}
          {modal === 2 && <SignupModal />}
        </div>
      </div>
    </>
  )
}

export default HeroModal
