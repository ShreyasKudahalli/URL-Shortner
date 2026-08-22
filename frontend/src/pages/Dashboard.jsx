import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import URLForm from "../components/URLForm";
import URLCard from "../components/URLCard";

import { getDashboard } from "../services/api";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);


    const urlsPerPage = 2;

    useEffect(() => {
        loadDashboard();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);
    const loadDashboard = async () => {
        try {
            const data = await getDashboard();
            setDashboard(data);
        } catch (error) {
            console.log(error);
        }
    };

    if (!dashboard) {
        return <h1>Loading...</h1>;
    }

    const filteredUrls = dashboard.urls.filter((url) =>
        url.original_url.toLowerCase().includes(search.toLowerCase()) ||
        url.short_code.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUrls.length / urlsPerPage);

    const startIndex = (currentPage - 1) * urlsPerPage;

    const currentUrls = filteredUrls.slice(
        startIndex,
        startIndex + urlsPerPage
    );

    return (
        <>
            <Navbar />

            <div className="max-w-6xl mx-auto p-8">

                <URLForm onSuccess={loadDashboard} />

                <div className="grid grid-cols-2 gap-6 my-8">

                    <div className="bg-blue-500 text-white rounded-lg p-6">
                        <h2>Total URLs</h2>
                        <p className="text-3xl font-bold">
                            {dashboard.total_urls}
                        </p>
                    </div>

                    <div className="bg-green-500 text-white rounded-lg p-6">
                        <h2>Total Clicks</h2>
                        <p className="text-3xl font-bold">
                            {dashboard.total_clicks}
                        </p>
                    </div>

                </div>
                <div className="mb-6">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="🔍 Search URLs..."
                        className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="space-y-4">

                    {currentUrls.length === 0 ? (
                        <div className="rounded-lg border bg-white p-8 text-center shadow">
                            <p className="text-gray-500">
                                🔍 No URLs found
                            </p>
                        </div>
                    ) : (
                        currentUrls.map((url) => (
                            <URLCard
                                key={url.id}
                                url={url}
                                onDelete={loadDashboard}
                            />
                        ))
                    )}

                </div>

                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-8">

                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="rounded-md bg-gray-200 px-4 py-2 disabled:opacity-50"
                        >
                            ← Previous
                        </button>

                        <span className="font-medium">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="rounded-md bg-gray-200 px-4 py-2 disabled:opacity-50"
                        >
                            Next →
                        </button>

                    </div>
                )}

            </div>
        </>
    );
}

export default Dashboard;