import { getAnalytics } from "../services/api";


function Analytics({ analytics, shortCode, setAnalytics }) {
      const refreshAnalytics = async () => {
        const data = await getAnalytics(shortCode);
        setAnalytics(data);
    };
  return (
    <div className="mt-6 rounded-lg border bg-white p-4 shadow">
      <h2 className="mb-4 text-xl font-semibold">
        📊 Analytics
      </h2>

      <div className="space-y-2">
        <p>
          <strong>Total Clicks:</strong> {analytics.total_clicks}
        </p>

        <p>
          <strong>Created At:</strong>{" "}
          {new Date(analytics.created_at).toLocaleString()}
        </p>

        <p>
          <strong>Last Clicked:</strong>{" "}
          {analytics.last_clicked
            ? new Date(analytics.last_clicked).toLocaleString()
            : "No clicks yet"}
        </p>
        <button onClick={refreshAnalytics} className="mt-4 inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          🔄 Refresh Analytics
        </button>
      </div>
    </div>
  );
}

export default Analytics;