import Head from 'next/head'
import HeroTitle from '@/components/heroSections/HeroTitle'
import URLForm from '@/components/heroSections/URLForm'
import HeroAuth from '@/components/heroSections/HeroAuth'
import HeroModal from '@/components/authModal/HeroModal'
import { useState } from 'react'
import Dashboard from '@/components/Dashboard'

export default function Home() {
  const [modal, setModal] = useState<number>(0)
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const log = () => {
    setIsLogged(true)
    setModal(0)
  }

  return (
    <>
      <Head>
        <title>URL shortener</title>
        <meta name="description" content="Easy URL shortener" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* avoid favicon request */}
        <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
      </Head>
      <main>
        <HeroTitle />
        <URLForm />
        {isLogged ? <Dashboard /> : <HeroAuth setModal={setModal}  />}
        {modal ? <HeroModal modal={modal} setModal={setModal} log={log} /> : null}
      </main>
    </>
  )
}
