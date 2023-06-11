import API from '../services/webapi.services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from './urls';

export const createAtividade = async (param) => {
  try {
    return await API.post(BASE_URL + '/api/Atividades', param).then(
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

export const editAtividade = async (param) => {
  try {
    return await API.put(BASE_URL + '/api/Atividades', param).then(
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

export const getAtividade = async (atividadeId) => {
  try {
    return await API.get(BASE_URL + '/api/Atividades/' + atividadeId).then(
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

export const deleteAtividade = async (atividadeId) => {
  try {
    return await API.delete(BASE_URL + '/api/Atividades/' + atividadeId).then(
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
