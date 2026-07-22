import { useEffect, useState } from "react";
import { getAnalytics } from "../services/api";

function Analytics({ shortCode }) {

    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        const data = await getAnalytics(shortCode);
        setAnalytics(data);
    };

    if (!analytics) {
        return <p>Loading analytics...</p>;
    }

    return (
        <div className="mt-4 border rounded p-4 bg-gray-50">

            <p>
                <strong>Total Clicks:</strong>
                {" "}
                {analytics.total_clicks}
            </p>

            <p>
                <strong>Created:</strong>
                {" "}
                {new Date(analytics.created_at).toLocaleString()}
            </p>

            <p>
                <strong>Last Clicked:</strong>
                {" "}
                {
                    analytics.last_clicked
                        ? new Date(analytics.last_clicked).toLocaleString()
                        : "No clicks yet"
                }
            </p>

            <button
                onClick={loadAnalytics}
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
            >
                Refresh
            </button>

        </div>
    );
}

export default Analytics;