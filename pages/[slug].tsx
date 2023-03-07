import { useRouter } from "next/router";

export default function Redirection() {
  const router = useRouter();
  const { slug } = router.query;
  if (slug) {
    const url = process.env.BASE_URL;
    fetch(`${url}/api/${slug}`)
      .then((res) => res.json())
      .then((res) => window.location.replace(res.message))
      .catch((err) => console.error(err));
  }
}
