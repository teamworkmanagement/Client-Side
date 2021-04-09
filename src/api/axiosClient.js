import axios from 'axios';
const axiosClient = axios.create(
  {
    baseURL: 'https://localhost:9001/api/',
    headers: {
      'Content-Type': 'application/json',
    },
  }
);

// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  console.log('request error');
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  throw new Error(JSON.stringify(error.response.data));
  return Promise.reject(error.response.data);
});

export default axiosClient;