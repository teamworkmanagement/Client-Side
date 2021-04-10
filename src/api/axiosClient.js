import axios from 'axios';
import { setAuthF } from 'src/shared_components/views/pages/login/authSlice';
import { refreshToken, refreshTokenFunc } from 'src/utils/auth';
import store from '../app/store';

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
    //console.log('er1 res', err.response);
    //console.log('er1 data', err.response.data);
    if (err.response.data.status) {
      //console.log('er1status', err.response.data.status);
    }
    return Promise.reject(err.response.data);
  }
  else if (err.request) {
    // client never received a response, or request never left 
    //console.log('er2', err.request.response);
    return refreshTokenFunc().then(data => {
      return new Promise((resolve, reject) => {
        axiosClient.request(err.config).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    }).catch(error => {
      console.log('error next: ', error);
      store.dispatch(setAuthF());
      return Promise.reject(error);
    });

    /*const output = refreshToken();
    if (output)
      return axiosClient(err.config);*/
  }
  else {
    console.log('er3', err);
  }
  return Promise.reject(err);

});

export default axiosClient;