import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Constants from 'expo-constants';
import { colors } from '../utils/colors';
import NavbarComponent from '../components/NavbarComponent';

// or any pure javascript modules available in npm

export default function AccountOptionsPage({ navigation }) {

  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  const [test, setTest] = useState(null);

  return (
    <View style={styles.container}>
          <NavbarComponent title="Opções da conta" goBack={true} />
      <Text style={styles.Title}>Opções da conta</Text>
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
    textAlign: 'center',
  },
  Title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ImgContainer: { 
    marginTop: 90, 
    marginBottom: 60, 
    padding: 8, 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center' 
    },
  ImageHome: {
    width: 250,
    height: 220,
    marginBottom: 32,
  },
  ButtonLogin: {
    backgroundColor: colors.primaryColor,
    borderRadius: 20,
    paddingBottom: 3,
    paddingTop: 3,
    marginBottom: 12,
  },
  ButtonCadastro: {
    color: colors.primaryColor,
    fontWeight: 'bold',
  },
});
