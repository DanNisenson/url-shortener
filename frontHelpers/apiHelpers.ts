export const getPostReqOptions = <T>(postContent: T) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postContent),
  }
}

export const getLongUrl = async <T>(slug: T) => {
  const url = process.env.BASE_URL

  const apiRes = await fetch(`${url}/api/url/${slug}`)
  const { message } = await apiRes.json()

  return message
}

export const getUserUrls = () => {

}
