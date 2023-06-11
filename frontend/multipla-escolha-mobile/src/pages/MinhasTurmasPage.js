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
import {
  switchBoolean,
  formatarData,
  encurtarTexto,
} from '../utils/functions.js';
import LoadingComponent from '../components/LoadingComponent';
import { useUser } from '../context/UserContext';

// or any pure javascript modules available in npm

export default function MinhasTurmasPage() {
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
        <NavbarComponent title="Minhas turmas" />
        <LoadingComponent />
      </View>
    );
  }

  function handleDelete(turmaId) {
    Alert.alert('Apagar turma', 'Tem certza que deseja apagar esta turma?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => handleDeleteTurma(turmaId),
      },
    ]);
    async function handleDeleteTurma(turmaId) {
      deleteTurma(turmaId).then((res) => {
        setPageNumber(0);
        setMaxPages(null);
        setTurmasLoaded(switchBoolean(turmasLoaded));
      });
    }
  }

  const renderItem = (turma) => {
    return (
      <View style={styles.card} key={turma.item.id}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>
            {'Turma criada em\n         '}
            {formatarData(turma.item.dataDeCriacao)}
          </Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.cardTitleText}>{turma.item.nome}</Text>
          <Text>{encurtarTexto(turma.item.descricao, 120)}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          {userData.perfil != 'Professor' ? null : (
            <View
              style={{
                height: 36,
                width: 36,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.danger,
                paddingLeft: 1,
                paddingBottom: 1,
                marginLeft: 12,
                marginRight: 2,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: colors.dangerBorder,
              }}>
              <IconButton
                icon="delete"
                style={{ height: 30, margin: 'auto' }}
                onPress={() => handleDelete(turma.item.id)}></IconButton>
            </View>
          )}
          {userData != null && userData.perfil != 'Professor' ? null : (
            <View
              style={{
                height: 36,
                width: 36,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.gray,
                paddingBottom: 2,
                marginLeft: 12,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: colors.grayBorder,
              }}>
              <IconButton
                icon="pen"
                style={{ height: 30, margin: 'auto' }}
                onPress={() =>
                  navigation.navigate('EditarTurmaPage', {
                    turmaId: turma.item.id,
                  })
                }>
                >
              </IconButton>
            </View>
          )}
          <Button
            mode="contained"
            style={{
              backgroundColor: colors.secondaryColor,
              borderColor: colors.secondaryBorder,
              borderRadius: 6,
            }}
            onPress={() =>
              navigation.navigate('VisualizarTurmaPage', {
                turmaId: turma.item.id,
              })
            }>
            <Text
              style={{ color: 'white', fontWeight: 'bold' }}>
              Abrir
            </Text>
          </Button>
        </View>
      </View>
    );
  };

  function carregarMaisItems() {
    if (pageNumber < maxPages - 1) {
      setPageNumber(pageNumber + 1);
    }
  }

  return (
    <View style={styles.container}>
      <NavbarComponent title="Minhas turmas" />
      <View
        style={{
          width: '90%',
          marginLeft: '2.5%',
          height: '100%',
          marginTop: 150,
        }}>
        {userData.perfil != 'Professor' ? (
          <React.Fragment>
            <View>
              <TextInput
                label="Buscar nova turma"
                value={searchString}
                mode={'outlined'}
                right={
                  <TextInput.Icon
                    name="magnify"
                    size={28}
                    onPress={() =>
                      navigation.navigate('BuscarTurmasPage', {
                        searchString: searchString,
                      })
                    }
                  />
                }
                onChangeText={(searchString) => {
                  setSearchString(searchString);
                }}
              />
            </View>
            <Text style={{ margin: 12 }}>
              Matriculado em {totalItems} turma(s)
            </Text>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <View
              style={{
                marginBottom: 12,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Button
                icon="school"
                style={ativas ? styles.buttonAtivo : styles.button}
                onPress={() => setAtivas(true)}>
                <Text style={{ color: '#555555' }}>Ativas</Text>
              </Button>
              <Button
                icon="calendar-minus"
                style={ativas ? styles.button : styles.buttonAtivo}
                onPress={() => setAtivas(false)}>
                <Text style={{ color: '#555555' }}>Inativas</Text>
              </Button>
              <Button
                icon="pen"
                style={styles.button}
                onPress={() => navigation.navigate('CriarTurmaPage')}>
                <Text style={{ color: '#555555' }}>Criar</Text>
              </Button>
            </View>
            <Text style={{ marginBottom: 12 }}>
              {totalItems} turma(s) cadastrada(s)
            </Text>
          </React.Fragment>
        )}
        <FlatList
          style={{ width: '100%', marginBottom: 100 }}
          data={turmas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={0.8}
          onEndReached={() => carregarMaisItems()}
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
    textAlign: 'center',
    width: '100%',
  },
  card: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    padding: 6,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  cardHeader: {
    height: 36,
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  cardHeaderText: {
    color: colors.textDarkGray,
    fontWeight: 'bold',
    fontSize: 12,
  },
  cardBody: {
    height: 112,
    paddingLeft: 8,
    paddingRight: 8,
    display: 'flex',
    alignItems: 'flex-start',
  },
  cardTitleText: {
    color: colors.textDarkGray,
    fontWeight: 'bold',
    fontSize: 21,
  },
  button: {
    backgroundColor: 'white',
    width: '30%',
    color: colors.primaryColor,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 12,
  },
  buttonAtivo: {
    backgroundColor: '#e9e9fe',
    width: '30%',
    color: colors.primaryColor,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 12,
  },
});
