import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Constants from 'expo-constants';
import NavbarComponent from '../components/NavbarComponent';
import LoadingComponent from '../components/LoadingComponent';
import { Picker } from '@react-native-community/picker';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import { editTurma, getTurma } from '../services/turmas.services';
import { colors } from '../utils/colors';

export default function EditarTurmaPage({ route }) {
  const navigation = useNavigation();

  const { turmaId } = route.params ? route.params : 0;

  const [nomeDaTurma, setNomeDaTurma] = useState('');

  const [descricao, setDescricao] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [ativo, setAtivo] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      getTurma(turmaId).then((res) => {
        setNomeDaTurma(res.nome);
        setDescricao(res.descricao);
        setAtivo(res.ativo == true? "true" : "false");
      });
    }, [])
  );

  useEffect(() => {
    getTurma(turmaId).then((res) => {
      setNomeDaTurma(res.nome);
      setDescricao(res.descricao);
      setAtivo(res.ativo == true? "true" : "false");
    });
  }, []);

  function handleEditarTurma() {
    if (nomeDaTurma.trim().length == 0) {
      setNomeDaTurma('');
      return setErrorMessage('Inserir nome da turma!');
    }
    if (descricao.trim().length == 0) {
      setDescricao('');
      return setErrorMessage('Inserir descrição!');
    }
    editTurma(
      {
        id: turmaId,
        nome: nomeDaTurma,
        descricao: descricao,
        ativo: ativo == 'true' ? true : false,
      },
      navigation,
      setErrorMessage
    ).then((res) => navigation.goBack());
  }

  if (ativo == null) {
    return (
      <View style={styles.container}>
        <NavbarComponent title="Editar turma" goBack={true} />
        <LoadingComponent />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavbarComponent title="Editar turma" goBack={true} />
      <View style={{ margin: 30, display: 'flex', alignItems: 'center' }}>
        <TextInput
          style={styles.TextInput}
          label="Nome da turma"
          value={nomeDaTurma}
          mode={'outlined'}
          onChangeText={(nomeDaTurma) => {
            setNomeDaTurma(nomeDaTurma), setErrorMessage('');
          }}
        />
        <TextInput
          style={styles.TextArea}
          label="Descrição"
          value={descricao}
          multiline={true}
          numberOfLines={6}
          mode={'outlined'}
          onChangeText={(descricao) => {
            setDescricao(descricao), setErrorMessage('');
          }}
        />
        <View style={{ marginTop: 16, marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            Estado da turma
          </Text>
          <View
            style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 6 }}>
            <Picker
              style={styles.SelectAtivo}
              selectedValue={ativo}
              onValueChange={(ativoValue) => setAtivo(ativoValue)}>
              <Picker.Item label="Turma ativa" value={'true'} />
              <Picker.Item label="Turma inativa" value={'false'} />
            </Picker>
          </View>
        </View>
        {errorMessage.length > 0 ? (
          <Text style={{ color: 'red', marginBottom: 12, fontWeight: 'bold' }}>
            {errorMessage}
          </Text>
        ) : null}
      </View>

      <Button
        style={styles.ButtonEditarTurma}
        mode="contained"
        onPress={() => handleEditarTurma()}>
        <Text style={{ color: 'white' }}>Editar Turma</Text>
      </Button>
      <Button
        style={styles.ButtonCancelar}
        mode="contained"
        onPress={() => navigation.goBack()}>
        <Text style={{ color: 'white' }}>Cancelar</Text>
      </Button>
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
  TextInput: {
    marginBottom: 12,
    maxHeight: 70,
    width: 250,
  },
  TextArea: {
    marginBottom: 12,
    maxHeight: 280,
    width: 250,
  },
  ButtonEditarTurma: {
    backgroundColor: colors.primaryColor,
    borderRadius: 20,
    paddingBottom: 3,
    paddingTop: 3,
    marginBottom: 12,
    width: 150,
  },
  ButtonCancelar: {
    backgroundColor: colors.gray,
    borderRadius: 20,
    paddingBottom: 3,
    paddingTop: 3,
    marginBottom: 12,
    width: 120,
  },
  SelectAtivo: {
    marginTop: 4,
    height: 32,
    width: 250,
    borderWidth: 0,
  },
});
