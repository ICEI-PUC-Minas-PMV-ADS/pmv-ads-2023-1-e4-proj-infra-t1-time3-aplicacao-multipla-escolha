import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import {
  TextInput,
  Button,
  Checkbox,
  IconButton,
  RadioButton,
} from 'react-native-paper';
import Constants from 'expo-constants';
import NavbarComponent from '../components/NavbarComponent';
import { getAtividade } from '../services/atividades.services';
import {createResultado} from '../services/resultados.services'
import { colors } from '../utils/colors';
import LoadingComponent from '../components/LoadingComponent';
import { useUser } from '../context/UserContext';

// or any pure javascript modules available in npm

export default function RealizarAtividadePage({ navigation, route }) {
  const { atividadeId } = route.params ? route.params : 0;

  const { turmaId } = route.params ? route.params : 0;

  const { userData } = useUser();

  const [nomeDaAtividade, setNomeDaAtividade] = useState('');

  const [valorAtividade, setValorAtividade] = useState('0');

  const [questoes, setQuestoes] = useState([]);

  const [turma, setTurma] = useState(null);

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

  const [respostasAluno, setRespostasAluno] = useState(null);

  const [liberarSubmissao, setLiberarSubmissao] = useState(false);

  useEffect(() => {
    getAtividade(atividadeId).then((res) => {
      setNomeDaAtividade(res.nome);
      setQuestoes(res.atividadeMongoDb.questoes);
      setValorAtividade(res.valor);
      setTurma(res.turma);
      let newRespostasAluno = [];
      for (let i = 0; i < res.atividadeMongoDb.questoes.length; i++) {
        newRespostasAluno.push(-1);
      }
      setRespostasAluno(newRespostasAluno);
    });
  }, []);

  function atualizarRespostas(indexQuestao, resposta) {
    let liberarSubmissao = true;
    let newRespostasAluno = [];
    for (let i = 0; i < questoes.length; i++) {
      if (i == indexQuestao) {
        newRespostasAluno.push(resposta);
      } else {
        newRespostasAluno.push(respostasAluno[i]);
        if (respostasAluno[i] == -1) {
          liberarSubmissao = false;
        }
      }
    }
    setLiberarSubmissao(liberarSubmissao);
    setRespostasAluno(newRespostasAluno);
  }

function submeterResultados() {
  createResultado({
    idAtividade: atividadeId,
    respostas: respostasAluno,
  }).then(res => navigation.navigate("VisualizarResultadoPage", {atividadeId: res.id, turmaId: turmaId}));
}

  if (
    respostasAluno == null ||
    typeof userData == 'undefined' ||
    userData == null
  ) {
    return (
      <View style={styles.container}>
        <NavbarComponent title="Atividade" />
        <LoadingComponent />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavbarComponent title={'Atividade - ' + nomeDaAtividade} goBack={true} />
      <ScrollView
        style={{
          margin: 30,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}>
        <View
          style={{
            marginTop: 30,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
          }}>
          <View style={{ margin: 6, fontSize: 16, fontWeight: 'bold' }}>
            <Text style={{ margin: 6, fontSize: 16, fontWeight: 'bold' }}>
              Valor:{' '}
              {' ' +
                parseFloat(valorAtividade)
                  .toFixed(2)
                  .toString()
                  .replace('.', ',') +
                ' pontos'}
            </Text>
          </View>
          <Text style={{ marginTop: 12, fontSize: 21, fontWeight: 'bold' }}>
            Questões
          </Text>
          <View style={{ width: 300, marginLeft: '2.5%' }}>
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
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Text>Questão {indexQuestao + 1}</Text>
                  <Text style={{ fontWeight: 'bold' }}>
                    Valor: {questao.valor.toString().replace('.', ',')}
                  </Text>
                </View>
                <Text style={{ margin: 6 }}>{questao.enunciado}</Text>
                <View style={{ width: '100%' }}>
                  {questao.alternativas.map((alternativa, index) => (
                    <View
                      style={{
                        borderTopWidth: 1,
                        borderColor: '#555555',
                        margin: 6,
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <RadioButton
                          status={
                            respostasAluno[indexQuestao] == index
                              ? 'checked'
                              : 'unchecked'
                          }
                          onPress={() =>
                            atualizarRespostas(indexQuestao, index)
                          }
                        />
                        <Text>{ALFABETO[index] + ') ' + alternativa} </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Button
          style={
            liberarSubmissao
              ? styles.ButtonSubmeter
              : styles.ButtonSubmeterInativo
          }
          mode="contained"
          onPress={liberarSubmissao ? () => submeterResultados() : () => window.alert("Preencha todas as questões!")}>
          <Text style={{ color: 'white' }}>Submeter</Text>
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
  ButtonSubmeter: {
    backgroundColor: colors.secondaryColor,
    borderRadius: 20,
    padding: 2,
    margin: 'auto',
    marginTop: 12,
    marginBottom: 12,
    width: 120,
  },
  ButtonSubmeterInativo: {
    backgroundColor: colors.gray,
    borderRadius: 20,
    padding: 2,
    margin: 'auto',
    marginTop: 12,
    marginBottom: 12,
    width: 120,
  },
});
