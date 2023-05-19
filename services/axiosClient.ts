import { clearDataUser } from "@/store/slices/userSlipSlice";
import { clearAccessToken } from "@/store/slices/tokenSlice";
import { store } from "@/store";
import axios, { AxiosResponse } from "axios";
const axiosClient = axios.create({
  // baseURL: "https://seal-app-kptuj.ondigitalocean.app",
  baseURL: "https://seal-app-nhk46.ondigitalocean.app/",
  headers: {
    "Content-type": "application/json",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
  const persistedState = localStorage
    ? localStorage.getItem("persist:root")
    : null;
  const getTokenFormLocalStore = persistedState
    ? JSON.parse(persistedState).token
    : null;
  const token = getTokenFormLocalStore
    ? JSON.parse(getTokenFormLocalStore).access_token
    : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  (err) => {
    if (err?.response?.status === 401) {
      store.dispatch(clearAccessToken());
      store.dispatch(clearDataUser());
      window.location.replace("/");
      throw new Error("Unauthorized");
    }
    if (err?.response?.status === 400) {
      // throw new Error(err.response.data.message);
      return err;
    }
    throw err;
  }
);

export default axiosClient;
