import { useState } from "react";
import Analytics from "./Analytics";
import { deleteURL } from "../services/api";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect } from "react";

function URLCard({ url, onDelete }) {

    const [showAnalytics, setShowAnalytics] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showQR, setShowQR] = useState(false);

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


    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this URL?"
        );

        if (!confirmed) return;

        try {
            await deleteURL(url.id);

            if (onDelete) {
                onDelete();
            }

        } catch (error) {
            console.error(error);
            alert("Failed to delete URL.");
        }
    };

    const isExpired = url.expires_at && new Date(url.expires_at) <= new Date();

    return (
        <div className="border rounded-lg p-5 shadow bg-white">

            {isExpired && (
                <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
                    ⚠️ This link has expired
                </div>
            )}
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

            <p className="mt-3">
                <strong>Expires:</strong>{" "}
                {url.expires_at
                    ? new Date(url.expires_at).toLocaleString()
                    : "Never"}
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

                <button
                    onClick={handleDelete}
                    className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                    🗑 Delete
                </button>

                <button
                    onClick={() => setShowQR(!showQR)}
                    className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
                >
                    {showQR ? "Hide QR" : "📱 QR Code"}
                </button>

            </div>

                {showQR && (
                    <div className="mt-4 flex justify-center rounded-lg bg-gray-50 p-4">
                        <QRCodeCanvas
                            value={url.short_url}
                            size={180}
                        />
                    </div>
                )}

        </div>
    );
}

export default URLCard;