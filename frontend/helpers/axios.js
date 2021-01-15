import axios from "axios";
import { API } from "../config";
import { getCookie } from "../redux/actions/auth";

const initialAxios = axios.create({
  baseURL: API,
});

initialAxios.interceptors.request.use(function (config) {
  const token = getCookie("token");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export default initialAxios;
