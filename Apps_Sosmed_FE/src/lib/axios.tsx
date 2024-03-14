import axios, { AxiosInstance } from "axios";
import { useSelector } from "react-redux";
import { RootType } from "../types/storeType";

const token = localStorage.getItem("token");
// const token = useSelector((state: RootType) => state.setToken);
console.log(token);

const axiosIntelisen: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});
const ApiToken: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export { axiosIntelisen, ApiToken };
