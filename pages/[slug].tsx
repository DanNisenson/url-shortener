import { getLongUrl } from '@/frontHelpers/apiHelpers'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

type Props = {
  props: {
    url: string
  }
}

export default function Redirection({ props }: Props) {
  return (
    <Head>
      <title>URL shortener</title>
      <meta name="description" content="Easy URL shortener" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* avoid favicon request */}
      <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
    </Head>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query

  const message = await getLongUrl(slug)
  
  if (message) {
    return {
      redirect: {
        destination: message,
        permanent: true,
      },
    }
  } else {
    return {
      notFound: true,
    }
  }
}
