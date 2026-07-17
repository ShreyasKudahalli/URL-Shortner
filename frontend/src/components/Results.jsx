import { useState } from "react";

function Result({ shortUrl }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shortUrl);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="mt-6 rounded-lg border bg-gray-50 p-4">
      <p className="text-sm text-gray-500">
        Your Short URL
      </p>

      <div className="mt-2 flex items-center justify-between gap-3">
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all text-blue-600 hover:underline"
        >
          {shortUrl}
        </a>

        <button
          onClick={copyToClipboard}
          className="rounded bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export default Result;