import { useState } from "react";
import Analytics from "./Analytics";

function URLCard({ url }) {

    const [showAnalytics, setShowAnalytics] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url.short_url);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);

        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };

    return (
        <div className="border rounded-lg p-5 shadow bg-white">

            <p>
                <strong>Original URL:</strong>
                <br />
                {url.original_url}
            </p>

            <p className="mt-3">
                <strong>Short URL:</strong>
                <br />
                <a
                    href={url.short_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600"
                >
                    {url.short_url}
                </a>
            </p>

            <p className="mt-3">
                <strong>Clicks:</strong> {url.total_clicks}
            </p>

            <div className="flex gap-3 mt-4">

                <button
                    onClick={handleCopy}
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    {copied ? "✓ Copied!" : "📋 Copy"}
                </button>

                <button
                    onClick={() => setShowAnalytics(!showAnalytics)}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                    {showAnalytics ? "Hide Analytics" : "📊 Analytics"}
                </button>

            </div>

        </div>
    );
}

export default URLCard;