import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Constants from 'expo-constants';
import NavbarComponent from '../components/NavbarComponent';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { login } from '../services/auth.services';
import { colors } from '../utils/colors';

export default function LoginPage({ navigation }) {
  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      setUsername('');
      setPassword('');
      setErrorMessage('');
      AsyncStorage.getItem('@TOKEN_KEY').then((res) => {
        if (res != null) {
          navigation.navigate('MinhasTurmasPage');
        }
      });
    }, [])
  );

  function handleLogin() {
    if (username.trim().length == 0) {
      setUsername('');
      return setErrorMessage('Inserir nome de usuário!');
    }
    if (password.trim().length == 0) {
      setPassword('');
      return setErrorMessage('Inserir senha!');
    }
    login(
      {
        nomeDeUsuario: username,
        senha: password,
      },
      navigation,
      setErrorMessage
    );
  }

  return (
    <View style={styles.container}>
      <NavbarComponent title="Login" goBack={true} />
      <Image
        style={styles.ImageUser}
        source={require('../assets/images/userImg.png')}
      />
      <View style={{ margin: 80, display: 'flex', alignItems: 'center' }}>
        <TextInput
          style={styles.TextInput}
          label="Usuário"
          value={username}
          mode={'outlined'}
          left={<TextInput.Icon name="account" />}
          onChangeText={(username) => {setUsername(username), setErrorMessage('')}}
        />
        <TextInput
          style={styles.TextInput}
          label="Senha"
          value={password}
          secureTextEntry={true}
          mode={'outlined'}
          left={<TextInput.Icon name="eye" />}
          onChangeText={(password) => {setPassword(password), setErrorMessage('')}}
        />
        {
          errorMessage.length > 0 ?
          <Text style={{color: 'red', marginBottom: 12, fontWeight: 'bold'}}>{errorMessage}</Text>
          :
          null
        }
        <Text style={styles.LoginText}>Esqueceu sua senha?</Text>
      </View>

      <Button
        style={styles.ButtonLogin}
        mode="contained"
        onPress={() => handleLogin()}>
        <Text style={{color: 'white'}}>
          Login
        </Text>
      </Button>
      <Text style={[styles.LoginText, { marginTop: 20 }]}>
        Não possui uma conta?{' '}
        <Text
          onPress={() => navigation.navigate('RegisterPage')}
          style={{ color: 'blue', cursor: 'pointer' }}>
          Cadastre-se.
        </Text>
      </Text>
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
    marginBottom: 12,
    maxHeight: 70,
    width: 250,
  },
  ButtonLogin: {
    backgroundColor: colors.primaryColor,
    borderRadius: 20,
    paddingBottom: 3,
    paddingTop: 3,
    marginBottom: 12,
    width: 100,
  },
  ImageUser: {
    width: 70,
    height: 70,
  },
  LoginText: {
    fontWeight: 'bold',
    color: colors.primaryColor,
  },
});
