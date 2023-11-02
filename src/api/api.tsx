import axios from 'axios';

const axiosInstance = axios.create({
  //baseURL: 'http://74.235.186.233:3001',
  baseURL: 'https://smartvenda.com.br/api',
  //baseURL: 'http://localhost:3001/api',
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    config.headers['Content-Type'] = 'application/json';
    const token = JSON.parse(
      localStorage.getItem('user') || '',
    ).accessToken;

    if (token && config.url !== '/auth/sign-in') {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    if (error.response && error.response.status === 403) {
      window.location.href = '/auth/sign-in';
    }
    return Promise.reject(error);
  },
);

const api = {
  axios: axiosInstance,
  get: (url: any, config = {}) =>
    axiosInstance.get(url, config),
  post: (url: any, data = {}, config = {}) =>
    axiosInstance.post(url, data, config),
  patch: (url: any, data = {}, config = {}) =>
    axiosInstance.patch(url, data, config),
  delete: (url: any, config = {}) =>
    axiosInstance.delete(url, config),
};

export default api;
