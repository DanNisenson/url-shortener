import { getPostReqOptions } from '@/frontHelpers/apiHelpers'
import { useState } from 'react'

const URLForm = () => {
  const [urlInput, setUrlInput] = useState({ longUrl: '' })
  const [submition, setSubmition] = useState(0)
  const [shortUrl, setShortUrl] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput({ longUrl: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmition(1)

    const options = getPostReqOptions(urlInput)

    fetch('/api/url', options)
      .then((response) => response.json())
      .then((newData) => {
        setShortUrl(newData.message)
        setSubmition(2)
        setUrlInput({ longUrl: '' })
      })
      .catch((error) => {
        console.log(error)
        setSubmition(3)
      })
  }

  return (
    <form className="url-form" onSubmit={handleSubmit}>
      <label htmlFor="urlInput">
        <input
          className="url-input"
          type="text"
          name="urlInput"
          value={urlInput.longUrl}
          onChange={handleChange}
        />
      </label>
      {submition === 1 ? (
        <h2>Loading...</h2>
      ) : submition === 2 ? (
        <>
          <h2>There you go:</h2>
          <h2>{shortUrl}</h2>
        </>
      ) : submition === 3 ? (
        <h2>There&apos;s been an error :(</h2>
      ) : (
        <button className="url-btn">Shorten!</button>
      )}
    </form>
  )
}

export default URLForm
