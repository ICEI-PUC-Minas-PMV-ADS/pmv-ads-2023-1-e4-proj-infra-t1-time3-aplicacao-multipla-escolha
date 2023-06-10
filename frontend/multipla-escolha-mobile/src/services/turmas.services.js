import API from '../services/webapi.services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from './urls';

export const getTurmasUsuario = async (param) => {
  try {
    return await API.get(BASE_URL + '/api/Turmas/user-turmas', param).then(
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

export const getTurmasBusca = async (param) => {
  try {
    return await API.get(BASE_URL + '/api/Turmas', param).then(
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


export const createTurma = async (param) => {
  try {
    return await API.post(BASE_URL + '/api/Turmas', param).then(
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

export const editTurma = async (param) => {
  try {
    return await API.put(BASE_URL + '/api/Turmas', param).then(
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

export const getTurma = async (turmaId) => {
  try {
    return await API.get(BASE_URL + '/api/Turmas/' + turmaId).then(
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

export const deleteTurma = async (turmaId) => {
  try {
    return await API.delete(BASE_URL + '/api/Turmas/' + turmaId).then(
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

export const matricularTurma = async (turmaId) => {
  try {
    return await API.put(BASE_URL + '/api/Turmas/' + turmaId + '/matricular').then(
      (response) => {
        window.alert("Matricula realizada com sucesso!")
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

export const desmatricularTurma = async (turmaId) => {
  try {
    return await API.put(BASE_URL + '/api/Turmas/' + turmaId + '/desmatricular').then(
      (response) => {
        window.alert("Matricula cancelada!")
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
