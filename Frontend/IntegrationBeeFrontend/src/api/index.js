import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: '/api/v2',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const accessToken = Cookies.get('access');
  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';
  return config;
});

api.interceptors.response.use(response => response, async error => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = Cookies.get('refresh');
    try {
      const { data } = await axios.post('/api/v2/refresh/', { refresh: refreshToken });
      Cookies.set('access', data.access);
      api.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
      originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
      return api(originalRequest);
    } catch (refreshError) {
      // handle refresh token failure, e.g., redirect to login
      return Promise.reject(refreshError);
    }
  }
  return Promise.reject(error);
});

const noAuthApi = axios.create({
  baseURL: '/api/v2',
  headers: {
    'Content-Type': 'application/json',
  }
});


export {api, noAuthApi};