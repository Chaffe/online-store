import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URI,
});

instance.interceptors.request.use((config: any) => {
  config.headers.Authorization = localStorage.getItem('token');
  return config;
})

export default instance;