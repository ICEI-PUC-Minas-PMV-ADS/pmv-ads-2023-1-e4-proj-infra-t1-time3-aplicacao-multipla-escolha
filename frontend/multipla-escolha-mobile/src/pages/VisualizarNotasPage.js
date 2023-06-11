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

import { getTurmaComResultados } from '../services/turmas.services';

import { colors } from '../utils/colors';

export default function VisualizarNotasPage({ route }) {
  const navigation = useNavigation();

  const { turmaId } = route.params ? route.params : 0;

  const { alunoId } = route.params ? route.params : 0;

  const { userData } = useUser();

  const [turma, setTurma] = useState(null);

  const [turmaLoaded, setTurmaLoaded] = useState(null);

  const [notaTotalAluno, setNotaTotalAluno] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      getTurmaComResultados(turmaId, alunoId).then((res) => {
        setTurma(res);
        const resultados = res.atividades;
        let notaTotal = 0;
        let notaTotalMax = 0;
        for (let i = 0; i < resultados.length; i++) {
          if (resultados[i].maiorNota != null) {
            notaTotal += resultados[i].maiorNota;
          }
          if (
            resultados[i].valor != null &&
            resultados[i].status != null &&
            resultados[i].status != 'Atividade pendente'
          ) {
            notaTotalMax += resultados[i].valor;
          }
        }
        setNotaTotalAluno(notaTotal + '/' + notaTotalMax);
      });
    }, [])
  );

  useEffect(() => {
    getTurmaComResultados(turmaId, alunoId).then((res) => {
      setTurma(res);
      const resultados = res.atividades;
      let notaTotal = 0;
      let notaTotalMax = 0;
      for (let i = 0; i < resultados.length; i++) {
        if (resultados[i].maiorNota != null) {
          notaTotal += resultados[i].maiorNota;
        }
        if (
          resultados[i].valor != null &&
          resultados[i].status != null &&
          resultados[i].status != 'Atividade pendente'
        ) {
          notaTotalMax += resultados[i].valor;
        }
      }
      setNotaTotalAluno(notaTotal + '/' + notaTotalMax);
    });
  }, [turmaLoaded]);

  if (turma == null || typeof userData == 'undefined' || userData == null) {
    return (
      <View style={styles.container}>
        <NavbarComponent title="Notas:" goBack={true} />
        <LoadingComponent />
      </View>
    );
  }

  function displayStatusAtividade(atividade) {
    const message = atividade.item.status;

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

  const renderItem = (atividade) => {
    return (
      <View style={styles.card} key={atividade.item.id}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>
            {' Prazo: '}
            {formatarData(atividade.item.dataPrazoDeEntrega, true)}
          </Text>
          <Text>{displayStatusAtividade(atividade)}</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.cardTitleText}>{atividade.item.nome}</Text>
          <Text style={{ fontSize: 21, fontWeight: 'bold', color: '#555555' }}>
            {atividade.item.status != 'Atividade pendente'
              ? (atividade.item.maiorNota != null
                  ? atividade.item.maiorNota.toString().replace('.', ',')
                  : '0') +
                '/' +
                atividade.item.valor.toString().replace('.', ',') +
                ' pontos'
              : 'Pendente'}
          </Text>
          <Text>{encurtarTexto(atividade.item.descricao, 80)}</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
          }}>
          <View style={{ height: 30 }}>
            <Text style={{ fontSize: 12 }}>
              {'Atividade criada em\n'}
              {formatarData(atividade.item.dataDeCriacao)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <NavbarComponent title={'Notas: ' + turma.nome} goBack={true} />
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
            flexDirection: 'row-reverse',
          }}>
          <Text style={{ fontSize: 21, fontWeight: 'bold' }}>
            Total:{' '}
            {notaTotalAluno.toString().replace('.', ',').replace('.', ',')}
          </Text>
        </View>
        <FlatList
          style={{ width: '100%', marginBottom: 300, height: 600 }}
          data={turma.atividades}
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
    height: 200,
    marginBottom: 12,
    padding: 6,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  cardHeader: {
    height: 22,
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 6,
    paddingRight: 6,
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
});
