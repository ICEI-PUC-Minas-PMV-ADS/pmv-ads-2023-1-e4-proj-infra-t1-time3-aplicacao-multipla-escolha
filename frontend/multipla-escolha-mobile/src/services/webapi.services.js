import axios, { AxiosInstance, Agent } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const onRequest = async (config) => {
  const token = await AsyncStorage.getItem('@TOKEN_KEY');
  config.headers = {
    'Content-Type': 'application/JSON',
    'Authorization': 'bearer ' + token,
    'bypass-tunnel-reminder': 'any',
  };
  return config;
};

const setupInterceptorsTo = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(onRequest);
  return axiosInstance;
};

const API = axios.create();
setupInterceptorsTo(API);
export default API;
