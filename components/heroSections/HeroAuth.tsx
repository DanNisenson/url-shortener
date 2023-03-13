type HeroAuthProps = {
  setModal: (modalState: number) => void
}

const HeroAuth = ({ setModal }: HeroAuthProps) => {
  return (
    <div>
      <h2>Access to save your links</h2>
      <button className="hero-btns" onClick={() => setModal(1)}>
        Log In
      </button>
      <button className="hero-btns" onClick={() => setModal(2)}>
        Sign Up
      </button>
    </div>
  )
}

export default HeroAuth
