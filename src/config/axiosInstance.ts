import { base_url } from '@/config/environment';
import axios from 'axios';
import Cookies from 'js-cookie';

export const BASE_URLS = {
  app: base_url,
};

type ServiceType = keyof typeof BASE_URLS;

const api = (service: ServiceType) => {
  const instance = axios.create({
    baseURL: BASE_URLS[service],
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      ClientId: 'Next app'
    },
  });

  instance.interceptors.request.use(
    async (config) => {
      const token = Cookies.get("giftlo_token");
   


      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        
      }

      return config;
    },
    (error) => {

      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response?.status === 401) {
        // logout here
        // logout(true);
      }

      if (error?.response?.data?.errorMessage === 'Invalid Refresh Token') {
        //logout here
      }
      return Promise.reject(error);
    }
  );

  return instance;
};



export default api;
