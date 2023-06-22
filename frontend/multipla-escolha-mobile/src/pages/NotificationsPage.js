import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Alert } from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';
import Constants from 'expo-constants';
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import NavbarComponent from '../components/NavbarComponent';
import { useFocusEffect } from '@react-navigation/native';
import { getUserNotifications } from '../services/auth.services';
import LoadingComponent from '../components/LoadingComponent';
import {
  switchBoolean,
  formatarData,
  encurtarTexto,
} from '../utils/functions.js';
import { useUser } from '../context/UserContext';

// or any pure javascript modules available in npm

export default function NotificationsPage({ route }) {
  const navigation = useNavigation();

  const { numeroDeNotificacoesNaoLidas } = route.params ? route.params : '';

  const { userData } = useUser();

  const [notificacoes, setNotificacoes] = useState(null);

  const [totalItems, setTotalItems] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      setNotificacoes(null);
      getUserNotifications().then((res) => {
        let notificacoes = res.notificacoes.reverse();
        for (let i = 0; i < notificacoes.length; i++) {
          notificacoes[i].index = i;
        }
        setNotificacoes(notificacoes);
        setTotalItems(res.notificacoes.length);
      });
    }, [])
  );

  useEffect(() => {
    getUserNotifications().then((res) => {
      let notificacoes = res.notificacoes.reverse();
      for (let i = 0; i < notificacoes.length; i++) {
        notificacoes[i].index = i;
      }
      setNotificacoes(notificacoes);
      setTotalItems(res.notificacoes.length);
    });
  }, []);

  if (
    notificacoes == null ||
    typeof userData == 'undefined' ||
    userData == null
  ) {
    return (
      <View style={styles.container}>
        <NavbarComponent title="Notificações" goBack={true} />
        <LoadingComponent />
      </View>
    );
  }

  const renderItem = (turma) => {
    return (
      <View style={styles.card} key={turma.item.id}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>
            {formatarData(turma.item.data, true)}
          </Text>
          {turma.item.index < numeroDeNotificacoesNaoLidas ? (
            <Text style={{ color: 'blue', marginRight: 12 }}>
              Nova notificação
            </Text>
          ) : null}
        </View>
        <View style={styles.cardTitle}>
          <Text style={styles.cardTitleText}>{turma.item.titulo}</Text>
        </View>
        <View style={styles.cardBody}>
          <Text>{encurtarTexto(turma.item.conteudo, 180)}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row-reverse' }}></View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <NavbarComponent title="Notificações" goBack={true} />
      <View
        style={{
          width: '90%',
          marginLeft: '2.5%',
          height: '100%',
          marginTop: 150,
        }}>
        <Text style={{ marginBottom: 12, textAlign: 'center' }}>
          {totalItems} notificações(s) encontrada(s)
        </Text>
        <FlatList
          style={{ width: '100%', marginBottom: 100 }}
          data={notificacoes}
          renderItem={renderItem}
          keyExtractor={(item) => item.index}
        />
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
    width: '100%',
  },
  card: {
    width: '100%',
    height: 160,
    marginBottom: 12,
    padding: 6,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  cardHeader: {
    height: 24,
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    padding: 6,
    paddingTop: 2,
  },
  cardTitle: {
    height: 36,
    display: 'flex',
    flexDirection: 'row',
    padding: 6,
    marginBottom: 2,
  },
  cardHeaderText: {
    color: colors.textDarkGray,
    fontWeight: 'bold',
    fontSize: 12,
  },
  cardBody: {
    height: 98,
    paddingLeft: 8,
    paddingRight: 8,
    display: 'flex',
    alignItems: 'flex-start',
  },
  cardTitleText: {
    color: colors.textDarkGray,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
