import axios from 'axios';
import { refreshToken } from 'src/utils/auth';

axios.defaults.withCredentials = true;

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
}, function (err) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  const originalRequest = err.config;
  if (err.response) {
    // client received an error response (5xx, 4xx)
    console.log('cc1 res', err.response);
    console.log('cc1 data', err.response.data);
    if (err.response.data.status) {
      console.log('cc1status', err.response.data.status);
    }
    return Promise.reject(err.response.data);
  } else if (err.request) {
    // client never received a response, or request never left 
    console.log('cc2', err.request.response);
    const object = JSON.parse(err.request.response);
    return axios.post('https://localhost:9001/api/account/refresh').then(response => {
      console.log('config cũ: ', err.response.config);
      return axios(err.response.config);
    }).catch(error => {

      //router.push('/login');
      return Promise.reject(error);
    })
    return Promise.reject(object);
  } else {
    console.log('cc3', err);
  }
  return Promise.reject(err);

});

export default axiosClient;