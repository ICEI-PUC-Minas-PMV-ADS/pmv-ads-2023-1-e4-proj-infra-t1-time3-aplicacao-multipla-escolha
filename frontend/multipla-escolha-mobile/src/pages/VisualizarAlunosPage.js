import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, FlatList, Alert } from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';
import Constants from 'expo-constants';
import NavbarComponent from '../components/NavbarComponent';
import LoadingComponent from '../components/LoadingComponent';

import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';

import { formatarData, encurtarTexto, switchBoolean } from '../utils/functions';

import { getTurma } from '../services/turmas.services';

import { colors } from '../utils/colors';

export default function VisualizarAlunosPage({ route }) {
  const navigation = useNavigation();

  const { turmaId } = route.params ? route.params : 0;

  const { userData } = useUser();

  const [turma, setTurma] = useState(null);

  const [turmaLoaded, setTurmaLoaded] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      getTurma(turmaId).then((res) => {
        setTurma(res);
      });
    }, [])
  );

  useEffect(() => {
    getTurma(turmaId).then((res) => {
      setTurma(res);
    });
  }, [turmaLoaded]);

  if (turma == null || typeof userData == 'undefined' || userData == null) {
    return (
      <View style={styles.container}>
        <NavbarComponent title="Alunos:" goBack={true} />
        <LoadingComponent />
      </View>
    );
  }

  function displayStatusAtividade(atividade) {
    const message = alunoTurma.item.aluno.status;

    if (message == 'Atividade atrasada') {
      return (
        <Text style={[styles.cardHeaderText, { color: 'darkred' }]}>
          {message}
        </Text>
      );
    }

    if (message == 'Atividade pendente') {
      return (
        <Text style={[styles.cardHeaderText, { color: 'darkblue' }]}>
          {message}
        </Text>
      );
    }

    return (
      <Text style={[styles.cardHeaderText, { color: 'green' }]}>{message}</Text>
    );
  }

  const renderItem = (alunoTurma) => {
    return (
      <View style={styles.card} key={alunoTurma.item.aluno.id}>
        <View style={styles.cardBody}>
          <Text style={{ fontSize: 21 }}>
            {alunoTurma.item.aluno.nome + ' ' + alunoTurma.item.aluno.sobrenome}
          </Text>
          <Text style={{ fontSize: 18 }}>
            {'(' + alunoTurma.item.aluno.email + ')'}
          </Text>
          <View style={{ display: 'flex', flexDirection: 'row-reverse', width: '100%' }}>
            <Button
              mode="contained"
              style={{
                backgroundColor: colors.secondaryColor,
                borderColor: colors.secondaryBorder,
                borderRadius: 6,
                marginTop: 12
              }}
              onPress={() =>
                navigation.navigate('VisualizarNotasPage', {
                  turmaId: turmaId,
                  alunoId: alunoTurma.item.aluno.id,
                })
              }>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                Abrir notas
              </Text>
            </Button>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <NavbarComponent title={'Alunos: ' + turma.nome} goBack={true} />
      <View
        style={{
          width: '95%',
          marginLeft: '2.5%',
          marginTop: 32,
          marginBottom: 32,
        }}>
        <View
          style={{
            height: 32,
            marginTop: 320,
            display: 'flex',
            flexDirection: 'row',
          }}>
          <Text style={{ fontSize: 21, fontWeight: 'bold' }}>
            Selecionar aluno
          </Text>
        </View>
        <FlatList
          style={{ width: '100%', marginBottom: 300, height: 600 }}
          data={turma.alunosTurma}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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
  },
  card: {
    width: '100%',
    height: 120,
    marginBottom: 12,
    padding: 6,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  cardHeaderText: {
    color: colors.textDarkGray,
    fontWeight: 'bold',
    fontSize: 12,
  },
  cardBody: {
    height: 128,
    paddingLeft: 8,
    paddingRight: 8,
    display: 'flex',
    alignItems: 'flex-start',
  },
});
