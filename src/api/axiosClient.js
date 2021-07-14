import axios from "axios";
import { API_URL } from "src/env";
import { setValueAuth } from "src/shared_components/views/pages/login/authSlice";
import { delete_cookie, getCookie, refreshTokenFunc } from "src/utils/auth";
import store from "../app/store";

axios.defaults.withCredentials = true;

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let reqQueue = [];

const processQueue = (error, token = null) => {
  reqQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  })

  reqQueue = [];
}

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (err) {
    const originalRequest = err.config;
    if (getCookie("TokenExpired") === "true") {
      delete_cookie("TokenExpired");
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          reqQueue.push({ resolve, reject })
        }).then(() => {
          return axiosClient(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        })
      }

      isRefreshing = true;

      return new Promise(function (resolve, reject) {
        refreshTokenFunc()
          .then((data) => {
            processQueue(null);
            isRefreshing = false;
            resolve(axiosClient(originalRequest));
          })
          .catch((error) => {
            processQueue(err, null);
            isRefreshing = false;
            store.dispatch(setValueAuth(false));
            reject(err);
          });
      })

    }

    if (err.response) {
      console.log("er1 res", err.response);
      console.log("er1 data", err.response.data);

      if (err.response.status === 401) store.dispatch(setValueAuth(false));

      return Promise.reject(err.response.data);
    } else if (err.request) {
      if (err.message.includes('timeout')) {
        return Promise.reject(err.message);
      }

      console.log("er2", err.request);
      return Promise.reject(err.request);
    } else {
      console.log("er3", err);
    }

    console.log(err);
    return Promise.reject(err);
  }
);

export default axiosClient;
