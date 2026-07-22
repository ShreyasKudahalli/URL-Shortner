import { useState } from "react";
import { shortenURL } from "../services/api";

function URLForm({ onSuccess }) {

    const [url, setUrl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await shortenURL(url);

            setUrl("");

            if (onSuccess) {
                onSuccess();
            }

        } catch (error) {
            console.log(error.response);
            console.log(error.response?.data);
            console.log(error.response?.status);
            console.error(error);
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

            <button
                className="w-full rounded-lg bg-blue-600 text-white p-3"
            >
                Shorten URL
            </button>

        </form>
    );
}

export default URLForm;