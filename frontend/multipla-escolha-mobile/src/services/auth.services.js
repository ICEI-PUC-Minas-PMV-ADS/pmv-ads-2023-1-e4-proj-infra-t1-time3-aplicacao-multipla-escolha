import API from '../services/webapi.services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from './urls';

export const login = async (param, navigation, setErrorMessage) => {
  try {
    return await API.post(BASE_URL + '/api/Usuarios/authenticate', param).then(
      (response) => {
        AsyncStorage.setItem('@TOKEN_KEY', response.data.jwtToken).then((res) =>
          navigation.navigate('MinhasTurmasPage')
        );
      },
      (error) => {
        if (error.request.status == 401) {
          setErrorMessage('Usuário ou senha incorretos!');
        } else {
          setErrorMessage('Erro no login!');
        }
        return null;
      }
    );
  } catch (error) {
    window.alert(error);
    return null;
  }
};

export const register = async (param, navigation, setErrorMessage) => {
  try {
    return await API.post(BASE_URL + '/api/Usuarios', param).then(
      (response) => {
        window.alert('Cadastro realizado com sucesso!');
        navigation.navigate('LoginPage');
      },
      (error) => {
        setErrorMessage(error.request.response);
        return null;
      }
    );
  } catch (error) {
    window.alert(error);
    return null;
  }
};

export const updateRegister = async (param, navigation, setErrorMessage) => {
  try {
    return await API.put(BASE_URL + '/api/Usuarios', param).then(
      (response) => {
        window.alert('Atualização dos dados realizada com sucesso!');
        navigation.navigate('HomePage');
      },
      (error) => {
        setErrorMessage(error.request.response);
        return null;
      }
    );
  } catch (error) {
    window.alert(error);
    return null;
  }
};

export const logoff = async (navigation, setUserData) => {
  AsyncStorage.removeItem('@TOKEN_KEY').then((response) => {
    setUserData(null);
    navigation.navigate('HomePage');
  });
};

export const getUserInfo = async (param) => {
  try {
    return await API.get(BASE_URL + '/api/Usuarios/Info', param).then(
      (response) => {
        return response.data;
      },
      (error) => {
        return null;
      }
    );
  } catch (error) {
    window.alert(error);
    return null;
  }
};

export const getCurrentUser = async (param) => {
  try {
    return await API.get(BASE_URL + '/api/Usuarios/Current', param).then(
      (response) => {
        return response.data;
      },
      (error) => {
        return null;
      }
    );
  } catch (error) {
    window.alert(error);
    return null;
  }
};

export const deleteAccount = async (navigation, setUserData) => {
  try {
    return await API.delete(BASE_URL + '/api/Usuarios/delete-account').then(
      (res) => {
        window.alert('Conta apagada com sucesso!');
        AsyncStorage.removeItem('@TOKEN_KEY').then((response) => {
          setUserData(null);
          navigation.navigate('HomePage');
          return response.data;
        });
      },
      (error) => {
        return null;
      }
    );
  } catch (error) {
    window.alert(error);
    return null;
  }
};
