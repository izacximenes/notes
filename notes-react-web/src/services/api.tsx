import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "./auth";
import { useHistory } from 'react-router'

const api = axios.create({
  baseURL: "http://127.0.0.1:3333"
});

api.interceptors.request.use(async (config : AxiosRequestConfig) => {
  const token = getToken();
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use((response) => {
  return response;
}, (error) => {

  if(error.response.status === 403){
    useHistory().push('/login');
  }

  return Promise.reject(error);
});

export default api;