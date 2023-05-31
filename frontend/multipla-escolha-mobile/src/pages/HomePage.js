import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Constants from 'expo-constants';
import { colors } from '../utils/colors';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomePage({ navigation }) {
  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('@TOKEN_KEY').then((res) => {
        if (res != null) {
          navigation.navigate("MinhasTurmasPage")
        }
      });
    }, [])
  );
  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Multípla Escolha</Text>
      <View style={styles.ImgContainer}>
        <Image
          style={styles.ImageHome}
          source={require('../assets/images/homePageImg.png')}
        />
        <Text>Uma plataforma amigável para alunos e professores</Text>
      </View>
      <View>
        <Button
          onPress={() => navigation.navigate('LoginPage')}
          style={styles.ButtonLogin}
          mode="contained">
          <Text style={{ fontWeight: 'bold' }}>Fazer login</Text>
        </Button>
        <Button onPress={() => navigation.navigate("RegisterPage")}>
          <Text style={styles.ButtonCadastro}>Cadastrar-se</Text>
        </Button>
      </View>
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
