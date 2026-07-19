import { useState } from "react";
import { shortenURL,getAnalytics } from "../services/api";

function URLForm({ setShortUrl,setShortCode,setAnalytics  }) {
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await shortenURL(url);

      setShortUrl(data.short_url);
      setShortCode(data.short_code);

      const analytics = await getAnalytics(data.short_code);

      setAnalytics(analytics);

      setUrl("");
    } catch (error) {
      console.error(error);
      alert("Failed to shorten URL.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter your URL..."
        required
        className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Shorten URL
      </button>
    </form>
  );
}

export default URLForm;