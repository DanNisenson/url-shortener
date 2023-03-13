export const getPostReqOptions = <T>(postContent: T) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postContent),
  }
}
