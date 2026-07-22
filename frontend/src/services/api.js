import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export default api;


export const shortenURL = async (originalUrl) => {
  const token = localStorage.getItem("access");
  const response = await api.post("/shorten/", 
    {
        original_url: originalUrl,
    },
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

  return response.data;
};

export const getAnalytics = async (shortCode) => {
    const response = await api.get(`/analytics/${shortCode}/`);
    return response.data;
};

export const getDashboard = async () => {

    const token = localStorage.getItem("access");

    const response = await api.get(
        "dashboard/",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};