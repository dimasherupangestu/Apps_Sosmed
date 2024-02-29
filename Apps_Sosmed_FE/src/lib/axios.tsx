import axios, { AxiosInstance } from "axios";

const token = localStorage.getItem("token");
const heders = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "multipart/form-data",
};
const axiosIntelisen = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

const axios_Heders: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: heders,
});

export { axiosIntelisen, axios_Heders };
