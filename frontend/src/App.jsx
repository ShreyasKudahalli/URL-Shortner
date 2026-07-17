import URLForm from "./components/URLForm";
import Result from "./components/Results";
import { useState } from "react";

function App() {
  const [shortUrl, setShortUrl] = useState("");
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-xl">

        <h1 className="text-center text-4xl font-bold">
          🔗 URL Shortener
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Paste your long URL and get a short one instantly.
        </p>

        <div className="mt-8">
          <URLForm setShortUrl={setShortUrl} />
        </div>

        {shortUrl && <Result shortUrl={shortUrl} />}

      </div>
    </div>
  );
}

export default App;