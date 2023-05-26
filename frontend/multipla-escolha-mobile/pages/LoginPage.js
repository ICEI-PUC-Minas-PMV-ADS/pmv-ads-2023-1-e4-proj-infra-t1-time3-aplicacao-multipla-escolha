import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Constants from 'expo-constants';
import { login, logoff, loginTeste } from '../services/auth.services';
// or any pure javascript modules available in npm

export default function App() {
  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  const [test, setTest] = useState(null);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.TextInput}
        label="username"
        value={username}
        mode={'outlined'}
        left={<TextInput.Icon name="account" />}
        onChangeText={(username) => setUsername(username)}
      />
      <TextInput
        style={styles.TextInput}
        label="password"
        value={password}
        secureTextEntry={true}
        mode={'outlined'}
        left={<TextInput.Icon name="eye" />}
        onChangeText={(password) => setPassword(password)}
      />
      <Button
        mode="contained"
        onPress={() =>
          login({
            nomeDeUsuario: username,
            senha: password,
          })
        }>
        Login
      </Button>
      <Button
        style={{ marginTop: 12 }}
        mode="contained"
        onPress={() => logoff()}>
        Logoff
      </Button>
      <Button
        style={{ marginTop: 12 }}
        mode="contained"
        onPress={() => loginTeste().then(res => {setTest(null), setTest(res.items[0])})}>
        Teste recuperar turma
      </Button>
      {test != null ? (
        <View style={{ marginTop: 32 }}>
          <Text>Turma</Text>
          <Text>Id: {test.id}</Text>
          <Text>Nome: {test.nome}</Text>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  TextInput: {
    marginBottom: 12,
  },
});
