import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Constants from 'expo-constants';
import { getUserInfo, logoff } from '../services/auth.services';
import { colors } from '../utils/colors';
import { useUser } from '../context/UserContext';
import { Appbar } from 'react-native-paper';
import { switchBoolean } from '../utils/functions';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoadingComponent({ title, goBack }) {
  const { userData, setUserData } = useUser();

  const navigation = useNavigation();

  const [showOptions, setShowOptions] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setShowOptions(false);
      const token = AsyncStorage.getItem('@TOKEN_KEY').then((token) =>
        getUserInfo().then((response) => {
          if (token != null && response == null) {
            AsyncStorage.removeItem('@TOKEN_KEY').then((res) => {
              window.alert('Sessão expirada!');
              navigation.navigate('HomePage');
            });
          }
          setUserData(response);
        })
      );
    }, [])
  );

  return (
    <View style={styles.navbar}>
      <View style={styles.navbarTop}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {goBack ? (
            <Appbar.Action
              style={{ margin: 0, padding: 0, marginLeft: -20 }}
              icon="chevron-left"
              size={28}
              color="black"
              onPress={() => navigation.goBack()}
            />
          ) : null}
          <Text style={styles.navbarText}>{title}</Text>
        </View>
        {typeof userData != 'undefined' && userData != null ? (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{ position: 'relative'}}>
              <Appbar.Action
                icon="bell"
                size={24}
                color="white"
                onPress={() => navigation.navigate('NotificationsPage', {numeroDeNotificacoesNaoLidas: userData.numeroDeNotificacoesNaoLidas})}
              />
              {userData.numeroDeNotificacoesNaoLidas > 0 &&
              userData.numeroDeNotificacoesNaoLidas != null ? (
                userData.numeroDeNotificacoesNaoLidas < 100 ? (
                  <View style={styles.notificationCircle}>
                    <Text
                      style={[
                        { color: 'white', fontWeight: 'bold' },
                        userData.numeroDeNotificacoesNaoLidas > 9
                          ? { fontSize: 12 }
                          : null,
                      ]}>
                      {userData.numeroDeNotificacoesNaoLidas}
                    </Text>
                  </View>                  
                ) : (
                  <View style={styles.notificationCircle}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 11,
                      }}>
                      99+
                    </Text>
                  </View>
                )
              ) : null}
            </View>
            <Appbar.Action
              icon="account-circle"
              size={32}
              color="white"
              onPress={() => setShowOptions(switchBoolean(showOptions))}
            />
          </View>
        ) : null}
      </View>
      {showOptions == true ? (
        <View style={styles.navbarOptions}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              height: 40,
              paddingRight: 18,
            }}>
            <Text
              style={[styles.navbarText, { fontSize: 15 }]}
              onPress={() => {
                navigation.navigate('MinhasTurmasPage'), setShowOptions(false);
              }}>
              Minhas turmas
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              height: 40,
              paddingRight: 18,
            }}>
            <Text
              style={[styles.navbarText, { fontSize: 15 }]}
              onPress={() => {
                navigation.navigate('AccountOptionsPage'),
                  setShowOptions(false);
              }}>
              Perfil
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              height: 40,
            }}>
            <Text
              style={[styles.navbarText, { fontSize: 15 }]}
              onPress={() => logoff(navigation, setUserData)}>
              Sair
            </Text>
            <Appbar.Action
              icon="logout"
              size={21}
              color="white"
              onPress={() => logoff(navigation, setUserData)}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    width: '100%',
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.75,
    shadowRadius: 3,
    backgroundColor: colors.primaryColor,
    position: 'absolute',
    top: 0,
    flex: 1,
    zIndex: 10,
  },
  navbarTop: {
    width: '100%',
    height: 60,
    maxHeight: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 25,
    paddingRight: 25,
  },
  navbarOptions: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: 0,
    margin: 0,
    paddingRight: 25,
  },
  navbarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  notificationCircle: {
    height: 21,
    width: 21,
    borderRadius: 21,
    backgroundColor: '#6082B6',
    position: 'absolute',
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
