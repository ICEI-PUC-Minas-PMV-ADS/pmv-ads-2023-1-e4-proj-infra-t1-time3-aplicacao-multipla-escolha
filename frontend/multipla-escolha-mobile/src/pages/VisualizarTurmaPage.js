import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, FlatList, Alert } from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';
import Constants from 'expo-constants';
import NavbarComponent from '../components/NavbarComponent';
import LoadingComponent from '../components/LoadingComponent';
import { Picker } from '@react-native-community/picker';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';

import { formatarData, encurtarTexto, switchBoolean } from '../utils/functions';

import {
  getTurma,
  matricularTurma,
  desmatricularTurma,
} from '../services/turmas.services';
import { deleteAtividade } from '../services/atividades.services';

import { colors } from '../utils/colors';

export default function VisualizarTurmaPage({ route }) {
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
        <NavbarComponent title="Turma:" goBack={true} />
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

  function handleDelete(atividadeIdDeletar) {
    Alert.alert('Apagar atividade', 'Tem certza que deseja apagar esta atividade?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () =>
          deleteAtividade(atividadeIdDeletar).then((res) =>
            setTurmaLoaded(switchBoolean(turmaLoaded))
          ),
      },
    ]);
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
          <Text style={{ fontWeight: 'bold', color: '#555555' }}>
            {atividade.item.valor.toString().replace('.', ',')} pontos
          </Text>
          <Text>{encurtarTexto(atividade.item.descricao, 80)}</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
          }}>
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
                  onPress={() => handleDelete(atividade.item.id)}></IconButton>
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
                    navigation.navigate('EditarAtividadePage', {
                      turmaId: atividade.item.turma.id,
                      atividadeId: atividade.item.id,
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
                navigation.navigate('VisualizarAtividadePage', {
                  atividadeId: atividade.item.id, turmaId: atividade.item.turma.id
                })
              }>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Abrir</Text>
            </Button>
          </View>
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
      <NavbarComponent title={"Turma: " + turma.nome} goBack={true} />
      <View
        style={{
          height: 250,
          marginTop: 320,
          width: '100%',
          backgroundColor: colors.lightPurple,
        }}>
        <View
          style={{ padding: 6, display: 'flex', flexDirection: 'row-reverse' }}>
          <Text>Turma criada em: {formatarData(turma.dataDeCriacao)} </Text>
        </View>
        <View style={{ padding: 6, paddingTop: 0, height: 160 }}>
          <Text style={{ fontSize: 24 }}>Professor:</Text>
          <Text style={{ fontSize: 21 }}>
            {turma.professor.nome + ' ' + turma.professor.sobrenome}
          </Text>
          <Text style={{ fontSize: 18 }}>
            {'(' + turma.professor.email + ')'}
          </Text>
          <Text style={{ marginTop: 12 }}>
            {encurtarTexto(turma.descricao, 180)}
          </Text>
        </View>
        {userData.perfil == 'Professor' ? null : turma.matriculado ? (
          <View style={{ width: '100%', alignItems: 'center', marginTop: 12 }}>
            <Button
              style={{
                backgroundColor: colors.danger,
                borderColor: colors.dangerBorder,
                borderWidth: 1,
                borderRadius: 12,
                width: 210,
                padding: 0,
              }}
              onPress={() =>
                desmatricularTurma(turma.id).then((res) =>
                  setTurmaLoaded(switchBoolean(turmaLoaded))
                )
              }>
              <Text style={{ color: 'white' }}>Cancelar matricula</Text>
            </Button>
          </View>
        ) : (
          <View style={{ width: '100%', alignItems: 'center', marginTop: 12 }}>
            <Button
              style={{
                backgroundColor: colors.primaryColor,
                borderColor: colors.primaryColor,
                borderWidth: 1,
                borderRadius: 12,
                width: 210,
                padding: 0,
              }}
              onPress={() =>
                matricularTurma(turma.id).then((res) =>
                  setTurmaLoaded(switchBoolean(turmaLoaded))
                )
              }>
              <Text style={{ color: 'white' }}>Realizar matricula</Text>
            </Button>
          </View>
        )}
      </View>
      {userData.perfil != 'Professor' ? (
        <React.Fragment>
          <View
            style={{
              margin: 0,
              marginTop: 12,
              marginBottom: 12,
              marginLeft: 24,
              width: '100%',
              display: 'flex',
              flexDirection: 'row-reverse',
            }}>
            <Button
              icon="school"
              style={[styles.button, { width: 100, marginRight: 12 }]}
              onPress={() => navigation.navigate('VisualizarNotasPage', {turmaId: turmaId, alunoId: userData.id})}>
              <Text style={{ color: '#555555' }}>Notas</Text>
            </Button>
          </View>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <View
            style={{
              margin: 0,
              marginTop: 12,
              marginBottom: 12,
              marginLeft: 24,
              width: '100%',
              display: 'flex',
              flexDirection: 'row-reverse',
            }}>
            <Button
              icon="pen"
              style={[styles.button, { width: 200 }]}
              onPress={() => navigation.navigate('CriarAtividadePage', {turmaId: turma.id})}>
              <Text style={{ color: '#555555' }}>Criar atividade</Text>
            </Button>
            <Button
              icon="school"
              style={[styles.button, { width: 100, marginRight: 12 }]}
              onPress={() => navigation.navigate('VisualizarAlunosPage', {turmaId: turmaId, alunoId: userData.id})}>
              <Text style={{ color: '#555555' }}>Notas</Text>
            </Button>
          </View>
        </React.Fragment>
      )}
      <View
        style={{
          width: '90%',
          marginLeft: '2.5%',
          height: '100%',
        }}>
        <View style={{ display: 'flex', alignItems: 'center', margin: 6 }}>
          <Text>{turma.atividades.length} Atividade(s) cadastrada(s)</Text>
        </View>
        <FlatList
          style={{ width: '100%', marginBottom: 300, marginTop: 16 }}
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
