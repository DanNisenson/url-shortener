import { useState } from "react";

export default function URLForm() {
  const [url, setUrl] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit!!");
  };

  return (
    <form className="url-form" onSubmit={handleSubmit}>
      <label htmlFor="urlInput">
        <input
        className="url-input"
          type="text"
          name="urlInput"
          value={url}
          onChange={handleChange}
        />
      </label>
      <button className="url-btn">Shorten!</button>
    </form>
  );
}
