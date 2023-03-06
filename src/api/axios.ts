import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://online-store-e1zu.onrender.com',
});

instance.interceptors.request.use((config: any) => {
  config.headers.Authorization = localStorage.getItem('token');
  return config;
})

export default instance;