import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import URLForm from "../components/URLForm";
import URLCard from "../components/URLCard";

import { getDashboard } from "../services/api";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        loadDashboard();
    }, []);

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

                <div className="space-y-4">

                    {dashboard.urls.map((url) => (
                        <URLCard
                            key={url.id}
                            url={url}
                        />
                    ))}

                </div>

            </div>
        </>
    );
}

export default Dashboard;