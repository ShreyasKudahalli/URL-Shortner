import { useState } from "react";
import Analytics from "./Analytics";

function URLCard({ url }) {

    const [showAnalytics, setShowAnalytics] = useState(false);

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

            <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
                {showAnalytics ? "Hide Analytics" : "View Analytics"}
            </button>

            {showAnalytics && (
                <Analytics shortCode={url.short_code} />
            )}

        </div>
    );
}

export default URLCard;