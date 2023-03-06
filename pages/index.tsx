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
      </Head>
      <main>
        <HeroTitle />
        <URLForm />
      </main>
    </>
  );
}
