import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Alert } from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';
import Constants from 'expo-constants';
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import NavbarComponent from '../components/NavbarComponent';
import { useFocusEffect } from '@react-navigation/native';
import { getTurmasBusca } from '../services/turmas.services';
import LoadingComponent from '../components/LoadingComponent';
import {
  switchBoolean,
  formatarData,
  encurtarTexto,
} from '../utils/functions.js';
import { useUser } from '../context/UserContext';

// or any pure javascript modules available in npm

export default function BuscarTurmasPage({ route }) {
  const navigation = useNavigation();

  const { searchString } = route.params ? route.params : '';

  const { userData } = useUser();

  const itemsPorPagina = 6;

  const [turmas, setTurmas] = useState(null);

  const [turmasResponse, setTurmasResponse] = useState(null);

  const [totalItems, setTotalItems] = useState(null);

  const [maxPages, setMaxPages] = useState(null);

  const [pageNumber, setPageNumber] = useState(0);

  const [turmasLoaded, setTurmasLoaded] = useState(null);

  const [reloadTurmas, setReloadTurmas] = useState(true);

  const [searchStringTurma, setSearchStringTurma] = useState(searchString);

  const [searchStringProfessor, setSearchStringProfessor] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      setPageNumber(0);
      setMaxPages(null);
      setTurmas(null);
      getTurmasBusca({
        params: {
          pageSize: itemsPorPagina,
          pageNumber: 0,
          searchStringTurma: searchStringTurma,
          searchStringProfessor: searchStringProfessor,
        },
      }).then((res) => {
        setTurmasResponse(res.items),
          setMaxPages(res.totalPages),
          setTotalItems(res.totalItems);
      });
    }, [])
  );

  useEffect(() => {
    getTurmasBusca({
      params: {
        pageSize: itemsPorPagina,
        pageNumber: pageNumber,
        searchStringTurma: searchStringTurma,
        searchStringProfessor: searchStringProfessor,
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
    if (maxPages == null) {
      setTurmas(null);
    } else {
      setTurmas([]);
    }
    setPageNumber(0);
    setMaxPages(null);
    setReloadTurmas(switchBoolean(reloadTurmas));
  }, [turmasLoaded]);

  if (turmas == null || typeof userData == 'undefined' || userData == null) {
    return (
      <View style={styles.container}>
        <NavbarComponent title="Buscar turmas" goBack={true} />
        <LoadingComponent />
      </View>
    );
  }

  const renderItem = (turma) => {
    return (
      <View style={styles.card} key={turma.item.id}>
        <View style={styles.cardBody}>
          <Text style={styles.cardTitleText}>{turma.item.nome}</Text>
          <Text>{encurtarTexto(turma.item.descricao, 90)}</Text>
        </View>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>
            {'Professor:\n'}
            {encurtarTexto(
              turma.item.professor.nome +
                ' ' +
                turma.item.professor.sobrenome +
                ' (' +
                turma.item.professor.email +
                ')'
            )}
          </Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row-reverse' }}>
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
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Abrir</Text>
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
      <NavbarComponent title="Buscar turma" goBack={true} />
      <View
        style={{
          width: '90%',
          marginLeft: '2.5%',
          height: '100%',
          marginTop: 150,
        }}>
        <View>
          <TextInput
            label="Buscar por nome da turma"
            value={searchStringTurma}
            mode={'outlined'}
            right={
              <TextInput.Icon
                name="magnify"
                size={28}
                onPress={() => setTurmasLoaded(switchBoolean(turmasLoaded))}
              />
            }
            onChangeText={(searchStringTurma) => {
              setSearchStringTurma(searchStringTurma);
            }}
          />
        </View>
        <View>
          <TextInput
            label="Buscar nome/email do professor"
            value={searchStringProfessor}
            mode={'outlined'}
            right={
              <TextInput.Icon
                name="magnify"
                size={28}
                onPress={() => setTurmasLoaded(switchBoolean(turmasLoaded))}
              />
            }
            onChangeText={(searchStringProfessor) => {
              setSearchStringProfessor(searchStringProfessor);
            }}
          />
        </View>
        <Text style={{ margin: 12 }}>{totalItems} turma(s) encontrada(s)</Text>
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
    height: 42,
    display: 'flex',
    flexDirection: 'row',

    padding: 6,
    marginBottom: 8,
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
    fontSize: 21,
  },
});
