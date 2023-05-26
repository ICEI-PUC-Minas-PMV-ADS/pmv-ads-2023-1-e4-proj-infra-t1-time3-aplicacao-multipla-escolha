import API from '../services/webapi.services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from './urls';

export const login = async (param) => {
  try {
    return await API.post(BASE_URL + '/api/Usuarios/authenticate', param).then(
      (response) => {
        window.alert('Sucesso');
        AsyncStorage.setItem('@TOKEN_KEY', response.data.jwtToken).then();
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

export const logoff = async () => {
  window.alert('Logoff realizado');
  AsyncStorage.setItem('@TOKEN_KEY', '').then();
};

export const loginTeste = async (param) => {
  try {
    return await API.get(BASE_URL + '/api/Turmas', {}).then(
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
