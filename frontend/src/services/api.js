import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export default api;


export const shortenURL = async (originalUrl) => {
  const response = await api.post("/shorten/", {
    original_url: originalUrl,
  });

  return response.data;
};