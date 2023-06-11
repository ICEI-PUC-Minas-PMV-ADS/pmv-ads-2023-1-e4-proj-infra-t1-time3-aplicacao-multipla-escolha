import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Constants from 'expo-constants';
import NavbarComponent from '../components/NavbarComponent';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-community/picker';
import LoadingComponent from '../components/LoadingComponent';
import { useUser } from '../context/UserContext';

import {
  getCurrentUser,
  updateRegister,
  deleteAccount,
} from '../services/auth.services';
import { colors } from '../utils/colors';

export default function AccountOptionsPage({ navigation }) {
  const { userData, setUserData } = useUser();

  const [username, setUsername] = useState(null);

  const [nome, setNome] = useState('');

  const [sobrenome, setSobrenome] = useState('');

  const [email, setEmail] = useState('');

  const [telefone, setTelefone] = useState('');

  const [password, setPassword] = useState('');

  const [repeatPassword, setRepeatPassword] = useState('');

  const [oldPassword, setOldPassword] = useState('');

  const [perfil, setPerfil] = useState(0);

  const [errorMessage, setErrorMessage] = useState('');

  const [trocarSenha, setTrocarSenha] = useState(false);

  const [atualizarDados, setAtualizarDados] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getCurrentUser().then((res) => {
        setUsername(res.nomeDeUsuario);
        setNome(res.nome);
        setSobrenome(res.sobrenome);
        setEmail(res.email);
        setTelefone(res.telefone);
        setPassword('senha');
        setRepeatPassword('');
        setPerfil(res.perfil);
      });
    }, [])
  );

  useEffect(() => {
    getCurrentUser().then((res) => {
      setUsername(res.nomeDeUsuario);
      setNome(res.nome);
      setSobrenome(res.sobrenome);
      setEmail(res.email);
      setTelefone(res.telefone);
      setPassword('senha');
      setRepeatPassword('');
      setPerfil(res.perfil);
    });
  }, []);

  function handleRegister() {
    if (username.trim().length < 1) {
      return setErrorMessage('Preencher nome de usuário!');
    }

    if (nome.trim().length < 1) {
      return setErrorMessage('Preencher nome!');
    }

    if (sobrenome.trim().length < 1) {
      return setErrorMessage('Preencher sobrenome!');
    }

    if (email.trim().length < 1) {
      return setErrorMessage('Preencher email!');
    }

    let emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailRegex.test(email.trim())) {
      return setErrorMessage('Email inválido!');
    }

    if (telefone.trim().length < 1) {
      return setErrorMessage('Preencher telefone!');
    }

    let telefoneRegex = /^\(\d{2}\)\d{4,5}-?\d{4}$/g;

    if (!telefoneRegex.test(telefone.replace(/\s/g, ''))) {
      return setErrorMessage('Telefone inválido!');
    }

    if (password.trim().length < 1) {
      return setErrorMessage('Preencher senha!');
    }

    if (password.trim() != repeatPassword.trim() && trocarSenha == true) {
      return setErrorMessage('Senha e repetir senha não conferem!');
    }
    updateRegister(
      {
        nomeDeUsuario: 'null',
        senha: trocarSenha ? password : oldPassword,
        senhaAntiga: oldPassword,
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        telefone: telefone,
        perfil: 0,
      },
      navigation,
      setErrorMessage
    );
  }

  function handleDeleteAccount() {
    {
      Alert.alert('Apagar conta', 'Tem certza que deseja apagar sua conta?', [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => deleteAccount(navigation, setUserData),
        },
      ]);
    }
  }

  if (username == null) {
    return (
      <View style={styles.container}>
        <NavbarComponent title="Atualizar dados cadastrais" goBack={true} />
        <LoadingComponent />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavbarComponent title="Atualizar dados cadastrais" goBack={true} />
      <View style={{ display: 'flex', alignItems: 'center' }}>
        <TextInput
          style={styles.TextInput}
          label="Usuário"
          value={username}
          mode={'outlined'}
          disabled={true}
        />
        <TextInput
          style={styles.TextInput}
          label="Nome"
          value={nome}
          mode={'outlined'}
          onChangeText={(nome) => {
            setNome(nome), setErrorMessage(''), setAtualizarDados(true);
          }}
        />
        <TextInput
          style={styles.TextInput}
          label="Sobrenome"
          value={sobrenome}
          mode={'outlined'}
          onChangeText={(sobrenome) => {
            setSobrenome(sobrenome),
              setErrorMessage(''),
              setAtualizarDados(true);
          }}
        />
        <TextInput
          style={styles.TextInput}
          label="Email"
          value={email}
          mode={'outlined'}
          placeholder="usuario@email.com"
          left={<TextInput.Icon name="email" />}
          onChangeText={(email) => {
            setEmail(email), setErrorMessage(''), setAtualizarDados(true);
          }}
        />
        <TextInput
          style={styles.TextInput}
          label="Telefone"
          value={telefone}
          placeholder="(99) 99999-9999"
          mode={'outlined'}
          left={<TextInput.Icon name="phone" />}
          onChangeText={(telefone) => {
            setTelefone(telefone), setErrorMessage(''), setAtualizarDados(true);
          }}
        />
        <TextInput
          style={styles.TextInput}
          label="Senha"
          value={password}
          secureTextEntry={true}
          mode={'outlined'}
          left={<TextInput.Icon name="eye" />}
          onChangeText={(password) => {
            setPassword(password),
              setErrorMessage(''),
              setTrocarSenha(true),
              setAtualizarDados(true);
          }}
        />
        {trocarSenha == true ? (
          <TextInput
            style={styles.TextInput}
            label="RepetirSenha"
            value={repeatPassword}
            secureTextEntry={true}
            mode={'outlined'}
            left={<TextInput.Icon name="eye" />}
            onChangeText={(repeatPassword) => {
              setRepeatPassword(repeatPassword), setErrorMessage('');
            }}
          />
        ) : null}
        <View style={{ marginTop: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Perfil</Text>
          <View
            style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 6 }}>
            <Picker
              style={styles.SelectPerfil}
              selectedValue={perfil}
              disabled={true}>
              <Picker.Item label="Aluno" value={0} />
              <Picker.Item label="Professor" value={1} />
            </Picker>
          </View>
        </View>
        {atualizarDados == true ? (
          <TextInput
            style={styles.TextInput}
            label="Senha Atual"
            value={oldPassword}
            secureTextEntry={true}
            mode={'outlined'}
            left={<TextInput.Icon name="eye" />}
            onChangeText={(oldPassword) => {
              setOldPassword(oldPassword), setErrorMessage('');
            }}
          />
        ) : null}
      </View>
      <Text style={{ margin: 8, fontWeight: 'bold', color: 'red' }}>
        {errorMessage}
      </Text>
      <Button
        style={styles.ButtonCadastro}
        mode="contained"
        onPress={() => handleRegister()}>
        <Text style={{ color: 'white' }}>Confirmar</Text>
      </Button>
      <Button
        style={styles.ButtonApagarConta}
        mode="contained"
        onPress={() => handleDeleteAccount()}>
        <Text style={{ color: 'white' }}>Apagar Conta</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.defaultBackgroundColor,
  },
  TextInput: {
    marginBottom: 16,
    maxHeight: 50,
    width: 250,
  },
  ButtonCadastro: {
    backgroundColor: colors.primaryColor,
    borderRadius: 20,
    paddingBottom: 3,
    paddingTop: 3,
    width: 150,
  },
  ButtonApagarConta: {
    backgroundColor: colors.danger,
    borderColor: colors.dangerBorder,
    borderWidth: 1,
    borderRadius: 20,
    paddingBottom: 3,
    paddingTop: 3,
    width: 190,
    marginTop: 24,
  },
  SelectPerfil: {
    marginTop: 4,
    height: 32,
    width: 250,
    borderWidth: 0,
  },
});
