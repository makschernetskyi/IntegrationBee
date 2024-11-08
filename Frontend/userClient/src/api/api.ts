import axios from 'axios';
import Cookies from 'js-cookie';

export const BASE_URL = import.meta.env.VITE_API_URL


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

api.interceptors.request.use(config => {
  const accessToken = Cookies.get('access');
  const csrfToken = Cookies.get('csrftoken')
  if(!Cookies.get("refresh")){
    Cookies.set("refresh", "null")
  }
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';
  return config;
});

api.interceptors.response.use(response => response, async error => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = Cookies.get('refresh');
    try {
      const { data } = await axios.post(`${BASE_URL}/refresh/`, { refresh: refreshToken });
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
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


export {api, noAuthApi};