import { useState, useEffect } from "react";
import { shortenURL } from "../services/api";

function URLForm({ onSuccess }) {

    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [message, setMessage] = useState("");


    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await shortenURL(url, alias);

            setUrl("");
            setAlias("");

            if (onSuccess) {
                onSuccess();
                setMessage("URL shortened successfully!");
            }

        } catch (error) {
            console.error(error);

            if (error.response?.data?.short_code) {
                setMessage(error.response.data.short_code[0]);
            }else {
                setMessage("Failed to shorten URL.");
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 mb-8"
        >

            <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter your URL..."
                required
                className="w-full rounded-lg border border-gray-300 p-3"
            />
            <input
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder="Custom alias (optional)"
                className="w-full rounded-lg border border-gray-300 p-3"
            />

            <button
                className="w-full rounded-lg bg-blue-600 text-white p-3"
            >
                Shorten URL
            </button>

            {message && (
            message === "URL shortened successfully!" ? (
                <p className="mt-2 text-center text-green-600">{message}</p>
            ) : (
                <p className="mt-2 text-center text-red-600">{message}</p>
            )
            )}

        </form>
    );
}

export default URLForm;