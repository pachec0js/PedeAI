import axios from 'axios';

const connectBack = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

connectBack.interceptors.request.use((config) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default connectBack;
