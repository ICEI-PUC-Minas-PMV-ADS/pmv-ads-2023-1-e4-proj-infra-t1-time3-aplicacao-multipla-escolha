import API from '../services/webapi.services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from './urls';

export const createResultado = async (param) => {
  try {
    return await API.post(BASE_URL + '/api/Resultados', param).then(
      (response) => {
        return response.data;
      },
      (error) => {
        window.alert(error);
        return null;
      }
    );
  } catch (error) {
    window.alert(error);
    return null;
  }
};

export const getResultado = async (resultadoId) => {
  try {
    return await API.get(BASE_URL + '/api/Resultados/' + resultadoId).then(
      (response) => {
        return response.data;
      },
      (error) => {
        window.alert(error);
        return null;
      }
    );
  } catch (error) {
    window.alert(error);
    return null;
  }
};