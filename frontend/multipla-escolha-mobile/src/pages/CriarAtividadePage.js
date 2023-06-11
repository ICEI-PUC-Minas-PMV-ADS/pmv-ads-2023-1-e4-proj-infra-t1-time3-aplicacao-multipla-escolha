import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { TextInput, Button, Checkbox, IconButton } from 'react-native-paper';
import Constants from 'expo-constants';
import NavbarComponent from '../components/NavbarComponent';
import { Picker } from '@react-native-community/picker';
import { useFocusEffect } from '@react-navigation/native';

import { createAtividade } from '../services/atividades.services';
import { colors } from '../utils/colors';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CriarAtividadePage({ navigation, route }) {
  const { turmaId } = route.params ? route.params : 0;

  const [nomeDaAtividade, setNomeDaAtividade] = useState('');

  const [descricao, setDescricao] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const [semPrazo, setSemPrazo] = useState(false);

  const [tentativasPermitidas, setTentativasPermitidas] = useState('1');

  const [tentativasIlimitadas, setTentativasIlimitadas] = useState(false);

  const [valorAtividade, setValorAtividade] = useState('0');

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);

    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const [openModalQuestao, setOpenModalQuestao] = useState(false);

  const [questoes, setQuestoes] = useState([]);

  const [valorQuestao, setValorQuestao] = useState('0');

  const [enunciado, setEnunciado] = useState('');

  const ALFABETO = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  const [alternativas, setAlternativas] = useState(['', '', '', '']);

  const [numeroAlternativas, setNumeroAlternativas] = useState('4');

  const [numeroAlternativasParseInt, setNumeroAlternativasParseInt] =
    useState(4);

  const [resposta, setResposta] = useState(0);

  const [editIndexQuestao, setEditIndexQuestao] = useState(null);

  function handleCriarAtividade() {
    if (nomeDaAtividade.trim().length == 0) {
      setNomeDaAtividade('');
      return setErrorMessage('Inserir nome da atividade!');
    }
    if (descricao.trim().length == 0) {
      setDescricao('');
      return setErrorMessage('Inserir descrição!');
    }
    if (questoes.length == 0) {
      setDescricao('');
      return setErrorMessage('Inserir ao menos uma questão!');
    }
    createAtividade(
      {
        nome: nomeDaAtividade,
        descricao: descricao,
        turmaId: turmaId,
        tentativasPermitidas: tentativasIlimitadas
          ? null
          : typeof parseInt(tentativasPermitidas) == 'number' &&
            parseInt(tentativasPermitidas) > 0
          ? parseInt(tentativasPermitidas)
          : null,
        atividadeMongoDb: { questoes: questoes },
        dataPrazoDeEntrega: semPrazo ? null : ajustarOffsetData(date),
        valor:
          typeof parseFloat(valorAtividade) == 'number'
            ? parseFloat(valorAtividade).toFixed(2)
            : 0,
      },
      navigation,
      setErrorMessage
    ).then((res) => navigation.goBack());
  }

  function ajustarOffsetData(data) {
    const offset = data.getTimezoneOffset();
    data = new Date(data.getTime() - 1000 * (60 * offset));
    data = data.toISOString().substring(0, 19);
    return data;
  }

  function formatarDataIsoString(data) {
    data = ajustarOffsetData(data);
    data = data.replace('T', '-');
    let separateData = data.split('-');
    let dataFormatada =
      separateData[2] +
      '/' +
      separateData[1] +
      '/' +
      separateData[0] +
      ' ' +
      separateData[3];
    return dataFormatada;
  }

  useEffect(() => {
    setErrorMessage('');
    if (openModalQuestao == true) {
      if (editIndexQuestao == null) {
        setEnunciado('');
        setValorQuestao('0');
        setResposta(0);
        setNumeroAlternativas('4');
        setNumeroAlternativasParseInt(4);
        setAlternativas(['', '', '', '']);
      } else {
        setEnunciado(questoes[editIndexQuestao].enunciado);
        setValorQuestao(questoes[editIndexQuestao].valor.toString());
        setResposta(questoes[editIndexQuestao].resposta);
        setNumeroAlternativas(
          questoes[editIndexQuestao].alternativas.length.toString()
        );
        setNumeroAlternativasParseInt(
          questoes[editIndexQuestao].alternativas.length
        );
        setAlternativas(questoes[editIndexQuestao].alternativas);
      }
    } else {
      setEditIndexQuestao(null);
    }
  }, [openModalQuestao]);

  useEffect(() => {
    let newAlternativas = [];
    for (let i = 0; i < numeroAlternativasParseInt; i++) {
      if (alternativas.length > i) {
        newAlternativas.push(alternativas[i]);
      } else {
        newAlternativas.push('');
      }
    }
    setAlternativas(newAlternativas);
  }, [numeroAlternativasParseInt]);

  function updateAlternativaText(index, text) {
    let newAlternativas = [];
    for (let i = 0; i < numeroAlternativasParseInt; i++) {
      if (i == index) {
        newAlternativas.push(text);
      } else {
        if (alternativas.length > i) {
          newAlternativas.push(alternativas[i]);
        } else {
          newAlternativas.push('');
        }
      }
    }
    setAlternativas(newAlternativas);
  }

  function renderPickerOptions() {
    let options = [];
    for (let i = 0; i < numeroAlternativasParseInt; i++) {
      options.push(<Picker.Item label={ALFABETO[i]} value={i} />);
    }
    return options;
  }

  function adicionarQuestao() {
    if (enunciado.trim().length == 0) {
      setEnunciado('');
      return setErrorMessage('Inserir enunciado!');
    }
    for (let i = 0; i < numeroAlternativasParseInt; i++) {
      if (alternativas[i].trim().length == 0) {
        return setErrorMessage('Preencher todas as alternativas!');
      }
    }
    setOpenModalQuestao(false);
    const novaQuestao = {
      valor:
        typeof parseFloat(valorQuestao) == 'number'
          ? parseFloat(valorQuestao)
          : 0,
      enunciado: enunciado,
      imagem: '',
      alternativas: alternativas,
      resposta: resposta,
    };

    if (editIndexQuestao == null) {
      setQuestoes((questoes) => [...questoes, novaQuestao]);
    } else {
      let newQuestoes = [];
      for (let i = 0; i < questoes.length; i++) {
        if (editIndexQuestao == i) {
          newQuestoes.push(novaQuestao);
        } else {
          newQuestoes.push(questoes[i]);
        }
      }
      setQuestoes(newQuestoes);
    }
  }

  function handleDelete(indexQuestao) {
    let newQuestoes = [];
    for (let i = 0; i < questoes.length; i++) {
      if (indexQuestao != i) {
        newQuestoes.push(questoes[i]);
      }
    }
    setQuestoes(newQuestoes);
  }

  useEffect(() => {
    let newValorAtividade = 0;
    for (let i = 0; i < questoes.length; i++) {
      newValorAtividade += questoes[i].valor;
    }
    setValorAtividade(newValorAtividade);
  }, [questoes]);

  if (openModalQuestao) {
    return (
      <View style={styles.container}>
        <NavbarComponent title="Criar Atividade" />
        <ScrollView
          style={{
            margin: 60,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
          }}>
          <Text style={{ fontSize: 21, fontWeight: 'bold', margin: 24 }}>
            ADICIONAR QUESTÃO
          </Text>
          <TextInput
            style={styles.TextArea}
            label="Enunciado"
            value={enunciado}
            multiline={true}
            numberOfLines={6}
            mode={'outlined'}
            onChangeText={(enunciado) => {
              setEnunciado(enunciado), setErrorMessage('');
            }}
          />
          <Text style={{ fontSize: 16, fontWeight: 'bold', margin: 6 }}>
            Pontos da questão
          </Text>
          <TextInput
            style={[styles.TextInput, { width: 60 }]}
            value={valorQuestao}
            mode={'outlined'}
            keyboardType="numeric"
            onChangeText={(valorQuestao) => {
              setValorQuestao(valorQuestao), setErrorMessage('');
            }}
          />
          <Text style={{ fontSize: 16, fontWeight: 'bold', margin: 6 }}>
            Número de alternativas
          </Text>
          <TextInput
            style={[styles.TextInput, { width: 60 }]}
            value={numeroAlternativas}
            mode={'outlined'}
            keyboardType="numeric"
            onChangeText={(numeroAlternativas) =>
              setNumeroAlternativas(numeroAlternativas)
            }
            onEndEditing={() => {
              setNumeroAlternativas(
                typeof parseInt(numeroAlternativas) == 'number' &&
                  parseInt(numeroAlternativas) > 0 &&
                  parseInt(numeroAlternativas) <= 26
                  ? parseInt(numeroAlternativas).toString()
                  : '4'
              ),
                setNumeroAlternativasParseInt(
                  typeof parseInt(numeroAlternativas) == 'number' &&
                    parseInt(numeroAlternativas) > 0 &&
                    parseInt(numeroAlternativas) <= 26
                    ? parseInt(numeroAlternativas)
                    : 4
                ),
                setErrorMessage('');
            }}
          />
          <Text style={{ fontSize: 16, fontWeight: 'bold', margin: 6 }}>
            Alternativa correta
          </Text>
          <Picker
            style={styles.SelectResposta}
            selectedValue={resposta}
            onValueChange={(respostaValue) => setResposta(respostaValue)}>
            {renderPickerOptions()}
          </Picker>
          {alternativas.map((alternativa, index) => (
            <View key={'alternativa' + index}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 21, marginRight: 12 }}>
                  {ALFABETO[index]}.
                </Text>
                <TextInput
                  style={styles.TextInput}
                  value={alternativas[index]}
                  mode={'outlined'}
                  onChangeText={(text) => {
                    updateAlternativaText(index, text), setErrorMessage('');
                  }}
                />
              </View>
            </View>
          ))}
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 12,
            }}>
            {errorMessage.length > 0 ? (
              <Text
                style={{ color: 'red', marginBottom: 12, fontWeight: 'bold' }}>
                {errorMessage}
              </Text>
            ) : null}
            <Button
              style={styles.ButtonCriarAtividade}
              mode="contained"
              onPress={() => adicionarQuestao()}>
              <Text style={{ color: 'white' }}>{editIndexQuestao == null? "Adicionar" : "Atualizar"}</Text>
            </Button>
            <Button
              style={styles.ButtonCancelar}
              mode="contained"
              onPress={() => setOpenModalQuestao(false)}>
              <Text style={{ color: 'white' }}>Cancelar</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavbarComponent title="Criar Atividade" goBack={true} />
      <ScrollView style={{ margin: 30, display: 'flex', alignItems: 'center' }}>
        <View style={{ margin: 30, display: 'flex', alignItems: 'center' }}>
          <TextInput
            style={styles.TextInput}
            label="Nome da atividade"
            value={nomeDaAtividade}
            mode={'outlined'}
            onChangeText={(nomeDaAtividade) => {
              setNomeDaAtividade(nomeDaAtividade), setErrorMessage('');
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
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {semPrazo ? null : (
              <React.Fragment>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                  Prazo: {formatarDataIsoString(date)}
                </Text>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Button
                    style={{ margin: 6 }}
                    mode="contained"
                    onPress={showDatepicker}>
                    <Text style={{ color: 'white' }}>Mudar Dia</Text>
                  </Button>
                  <Button
                    style={{ margin: 6 }}
                    mode="contained"
                    onPress={showTimepicker}>
                    <Text style={{ color: 'white' }}>Mudar Horário</Text>
                  </Button>
                </View>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                  />
                )}
              </React.Fragment>
            )}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Checkbox
                status={semPrazo ? 'checked' : 'unchecked'}
                onPress={() => {
                  setSemPrazo(!semPrazo);
                }}
              />
              <Text
                style={{ marginLeft: 6, fontSize: 16, fontWeight: 'bold' }}
                onPress={() => setSemPrazo(!semPrazo)}>
                Sem prazo
              </Text>
            </View>
            {tentativasIlimitadas ? null : (
              <React.Fragment>
                <Text
                  style={{ fontSize: 16, fontWeight: 'bold', marginTop: 12 }}>
                  Tentativas permitidas
                </Text>
                <TextInput
                  style={[styles.TextInput, { width: 60 }]}
                  value={tentativasPermitidas}
                  mode={'outlined'}
                  keyboardType="numeric"
                  onChangeText={(tentativasPermitidas) => {
                    setTentativasPermitidas(tentativasPermitidas),
                      setErrorMessage('');
                  }}
                />
              </React.Fragment>
            )}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Checkbox
                status={tentativasIlimitadas ? 'checked' : 'unchecked'}
                onPress={() => {
                  setTentativasIlimitadas(!tentativasIlimitadas);
                }}
              />
              <Text
                style={{ marginLeft: 6, fontSize: 16, fontWeight: 'bold' }}
                onPress={() => setTentativasIlimitadas(!tentativasIlimitadas)}>
                Tentativas ilimitadas
              </Text>
            </View>
          </View>
          <Text style={{ marginTop: 24, fontSize: 21, fontWeight: 'bold' }}>
            Questões
          </Text>
          <Text style={{ margin: 6, fontSize: 16, fontWeight: 'bold' }}>
            Valor total:{' '}
            {' ' + parseFloat(valorAtividade).toFixed(2).toString().replace('.', ',') + ' pontos'}
          </Text>
          <View style={{ width: '95%', marginLeft: '2.5%' }}>
            {questoes.map((questao, indexQuestao) => (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'black',
                  borderRadius: 5,
                  padding: 6,
                  width: '100%',
                  marginTop: 6,
                  marginBottom: 6,
                }}>
                <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
                <Text>Questão {indexQuestao + 1}</Text>
                <Text style={{ fontWeight: 'bold' }}>
                  Valor: {questao.valor.toString().replace(".",",")}
                </Text>
                </View>
                <Text style={{margin: 6}}>{questao.enunciado}</Text>
                <View style={{ width: '100%' }}>
                  {questao.alternativas.map((alternativa, index) => (
                    <View
                      style={{
                        borderTopWidth: 1,
                        borderColor: '#555555',
                        margin: 6,
                      }}>
                      <Text
                        style={
                          index == questao.resposta ? { color: 'green' } : null
                        }>
                        {ALFABETO[index] + '. ' + alternativa}{' '}
                      </Text>
                    </View>
                  ))}
                  <View
                    style={{ display: 'flex', flexDirection: 'row-reverse' }}>
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
                        onPress={() => handleDelete(indexQuestao)}></IconButton>
                    </View>
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
                        onPress={() => {
                          setEditIndexQuestao(indexQuestao),
                            setOpenModalQuestao(true);
                        }}>
                        >
                      </IconButton>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 32,
            }}>
            <Button
              style={[styles.ButtonCriarAtividade, { width: 200 }]}
              mode="contained"
              onPress={() => {
                setOpenModalQuestao(true), setErrorMessage('');
              }}>
              <Text style={{ color: 'white' }}>Adicionar Questão</Text>
            </Button>
          </View>
          {errorMessage.length > 0 ? (
            <Text
              style={{ color: 'red', marginBottom: 12, fontWeight: 'bold' }}>
              {errorMessage}
            </Text>
          ) : null}
          <Button
            style={styles.ButtonCriarAtividade}
            mode="contained"
            onPress={() => handleCriarAtividade()}>
            <Text style={{ color: 'white' }}>Criar Atividade</Text>
          </Button>
          <Button
            style={styles.ButtonCancelar}
            mode="contained"
            onPress={() => navigation.goBack()}>
            <Text style={{ color: 'white' }}>Cancelar</Text>
          </Button>
        </View>
      </ScrollView>
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
  ButtonCriarAtividade: {
    backgroundColor: colors.primaryColor,
    borderRadius: 20,
    paddingBottom: 3,
    paddingTop: 3,
    marginBottom: 12,
    width: 180,
  },
  ButtonCancelar: {
    backgroundColor: colors.gray,
    borderRadius: 20,
    paddingBottom: 3,
    paddingTop: 3,
    marginBottom: 12,
    width: 120,
  },
  SelectResposta: {
    marginTop: 4,
    height: 32,
    width: 250,
    borderWidth: 0,
  },
});
