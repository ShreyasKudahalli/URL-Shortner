import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/auth/";

export const registerUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}register/`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${BASE_URL}login/`, credentials);
  return response.data;
};