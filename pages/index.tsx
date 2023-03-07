import Head from "next/head";
import HeroTitle from "@/components/HeroTitle";
import URLForm from "@/components/URLForm";

export default function Home() {
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
      </main>
    </>
  );
}
