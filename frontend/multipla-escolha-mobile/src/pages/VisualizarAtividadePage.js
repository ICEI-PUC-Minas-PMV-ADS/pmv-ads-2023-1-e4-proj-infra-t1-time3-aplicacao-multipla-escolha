import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Alert } from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';
import Constants from 'expo-constants';
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import NavbarComponent from '../components/NavbarComponent';
import { useFocusEffect } from '@react-navigation/native';
import { getTurmasUsuario, deleteTurma } from '../services/turmas.services';
import LoadingComponent from '../components/LoadingComponent';
import {
  switchBoolean,
  formatarData,
  encurtarTexto,
} from '../utils/functions.js';
import { useUser } from '../context/UserContext';

// or any pure javascript modules available in npm

export default function VisualizarAtividadePage() {
  const navigation = useNavigation();

  const { userData } = useUser();

  const itemsPorPagina = 6;

  const [turmas, setTurmas] = useState(null);

  const [turmasResponse, setTurmasResponse] = useState(null);

  const [totalItems, setTotalItems] = useState(null);

  const [maxPages, setMaxPages] = useState(null);

  const [pageNumber, setPageNumber] = useState(0);

  const [turmasLoaded, setTurmasLoaded] = useState(null);

  const [reloadTurmas, setReloadTurmas] = useState(true);

  const [ativas, setAtivas] = useState(true);

  const [searchString, setSearchString] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      setPageNumber(0);
      setAtivas(true);
      setMaxPages(null);
      setTurmas(null);
      getTurmasUsuario({
        params: {
          pageSize: itemsPorPagina,
          pageNumber: 0,
          ativas: true,
        },
      }).then((res) => {
        setTurmasResponse(res.items),
          setMaxPages(res.totalPages),
          setTotalItems(res.totalItems);
      });
    }, [])
  );

  useEffect(() => {
    getTurmasUsuario({
      params: {
        pageSize: itemsPorPagina,
        pageNumber: pageNumber,
        ativas: ativas,
      },
    }).then((res) => {
      setTurmasResponse(res.items),
        setMaxPages(res.totalPages),
        setTotalItems(res.totalItems);
    });
  }, [pageNumber, reloadTurmas]);

  useEffect(() => {
    if (turmas == null) {
      setTurmas(turmasResponse);
    } else {
      if (pageNumber > 0 || turmas.length == 0) {
        setTurmas((turmas) => [...turmas, ...turmasResponse]);
      }
    }
  }, [turmasResponse]);

  useEffect(() => {
    setTurmas([]);
    setPageNumber(0);
    setMaxPages(null);
    setReloadTurmas(switchBoolean(reloadTurmas));
  }, [ativas, turmasLoaded]);

  if (turmas == null || typeof userData == 'undefined' || userData == null) {
    return (
      <View style={styles.container}>
        <NavbarComponent title="Visualizar atividade" goBack={true}/>
        <LoadingComponent />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavbarComponent title="Visualizar atividade" goBack={true}/>
    
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
    width: '100%',
  },
});
