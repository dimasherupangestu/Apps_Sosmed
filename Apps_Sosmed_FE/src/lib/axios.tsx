import axios, { AxiosInstance } from "axios";

const token = localStorage.getItem("token");

const axiosIntelisen: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});
const ApiToken: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export { ApiToken, axiosIntelisen };
