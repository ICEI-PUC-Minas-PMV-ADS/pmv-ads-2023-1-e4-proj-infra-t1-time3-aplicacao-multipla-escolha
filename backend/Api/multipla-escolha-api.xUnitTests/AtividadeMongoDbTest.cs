
namespace multipla_escolha_api.nUnitTests
{
    public class AtividadeMongoDbTest
    {
        [Test]
        public void AtividadeMongoDb_VerificarSeCorrecaoDeAtividadesEstaFuncionandoParaNota_AlunoAcertouTodasAsQuestoes()
        {
            // Arranjo

            string[] alternativas = new string[4] { "A", "B", "C", "D" };

            QuestaoMongoDb questaoUm = new QuestaoMongoDb(){
                Valor = 1,
                Enunciado = "",
                Imagem = "",
                Alternativas = alternativas,
                Resposta = 0,
                AlunoAcertouResposta = null
            };
            QuestaoMongoDb questaoDois = new QuestaoMongoDb()
            {
                Valor = 2,
                Enunciado = "",
                Imagem = "",
                Alternativas = alternativas,
                Resposta = 1,
                AlunoAcertouResposta = null
            };
            QuestaoMongoDb questaoTres = new QuestaoMongoDb()
            {
                Valor = 3,
                Enunciado = "",
                Imagem = "",
                Alternativas = alternativas,
                Resposta = 2,
                AlunoAcertouResposta = null
            };
            QuestaoMongoDb questaoQuatro = new QuestaoMongoDb()
            {
                Valor = 4,
                Enunciado = "",
                Imagem = "",
                Alternativas = alternativas,
                Resposta = 3,
                AlunoAcertouResposta = null
            };

            QuestaoMongoDb[] questoes = new QuestaoMongoDb[4]
            {
                questaoUm, questaoDois, questaoTres, questaoQuatro
            };

            var atividadeMongoDb = new AtividadeMongoDb
            {
                Id = "1",
                Questoes = questoes
            };

            RespostasDto respostasDto = new RespostasDto()
            {
                idAtividade = 1,
                Respostas = new int[4] { 0,1,2,3}
            };

            float notaEsperada = 10F;

            // Ação
            var correcaoAtividadeMongoDb = AtividadeMongoDb.Corrigir(atividadeMongoDb, respostasDto);

            float notaObtida = correcaoAtividadeMongoDb.Item2;

            // Asserção

            Assert.That(notaEsperada, Is.EqualTo(notaObtida));
        }

        [Test]
        public void AtividadeMongoDb_VerificarSeCorrecaoDeAtividadesEstaFuncionandoParaNota_AlunoAcertouQuestoesDoisEQuatro()
        {
            // Arranjo

            string[] alternativas = new string[4] { "A", "B", "C", "D" };

            QuestaoMongoDb questaoUm = new QuestaoMongoDb()
            {
                Valor = 1,
                Enunciado = "",
                Imagem = "",
                Alternativas = alternativas,
                Resposta = 0,
                AlunoAcertouResposta = null
            };
            QuestaoMongoDb questaoDois = new QuestaoMongoDb()
            {
                Valor = 2,
                Enunciado = "",
                Imagem = "",
                Alternativas = alternativas,
                Resposta = 1,
                AlunoAcertouResposta = null
            };
            QuestaoMongoDb questaoTres = new QuestaoMongoDb()
            {
                Valor = 3,
                Enunciado = "",
                Imagem = "",
                Alternativas = alternativas,
                Resposta = 2,
                AlunoAcertouResposta = null
            };
            QuestaoMongoDb questaoQuatro = new QuestaoMongoDb()
            {
                Valor = 4,
                Enunciado = "",
                Imagem = "",
                Alternativas = alternativas,
                Resposta = 3,
                AlunoAcertouResposta = null
            };

            QuestaoMongoDb[] questoes = new QuestaoMongoDb[4]
            {
                questaoUm, questaoDois, questaoTres, questaoQuatro
            };

            var atividadeMongoDb = new AtividadeMongoDb
            {
                Id = "1",
                Questoes = questoes
            };

            RespostasDto respostasDto = new RespostasDto()
            {
                idAtividade = 1,
                Respostas = new int[4] { 1, 1, 3, 3 }
            };

            float notaEsperada = 6F;

            // Ação
            var correcaoAtividadeMongoDb = AtividadeMongoDb.Corrigir(atividadeMongoDb, respostasDto);

            float notaObtida = correcaoAtividadeMongoDb.Item2;

            // Asserção
            Assert.That(notaEsperada, Is.EqualTo(notaObtida));
        }
        [Test]
        public void AtividadeMongoDb_VerificarSeCorrecaoDeAtividadesEstaFuncionandoParaCriarGabarito_AlunoAcertouTodasAsQuestoes()
        {
            // Arranjo

            string[] alternativas = new string[4] { "A", "B", "C", "D" };

            QuestaoMongoDb questaoUm = new QuestaoMongoDb()
            {
                Valor = 1,
                Enunciado = "",
                Imagem = "",
                Alternativas = alternativas,
                Resposta = 0,
                AlunoAcertouResposta = null
            };
            QuestaoMongoDb questaoDois = new QuestaoMongoDb()
            {
                Valor = 2,
                Enunciado = "",
                Imagem = "",
                Alternativas = alternativas,
                Resposta = 1,
                AlunoAcertouResposta = null
            };
            QuestaoMongoDb questaoTres = new QuestaoMongoDb()
            {
                Valor = 3,
                Enunciado = "",
                Imagem = "",
                Alternativas = alternativas,
                Resposta = 2,
                AlunoAcertouResposta = null
            };
            QuestaoMongoDb questaoQuatro = new QuestaoMongoDb()
            {
                Valor = 4,
                Enunciado = "",
                Imagem = "",
                Alternativas = alternativas,
                Resposta = 3,
                AlunoAcertouResposta = null
            };

            QuestaoMongoDb[] questoes = new QuestaoMongoDb[4]
            {
                questaoUm, questaoDois, questaoTres, questaoQuatro
            };

            var atividadeMongoDb = new AtividadeMongoDb
            {
                Id = "1",
                Questoes = questoes
            };

            RespostasDto respostasDto = new RespostasDto()
            {
                idAtividade = 1,
                Respostas = new int[4] { 0, 1, 2, 3 }
            };

            bool[] alunoAcertouRespostaArray = new bool[4] { true, true, true, true };

            // Ação
            var correcaoAtividadeMongoDb = AtividadeMongoDb.Corrigir(atividadeMongoDb, respostasDto);

            AtividadeMongoDb atividadeMongoDbCorrigida = correcaoAtividadeMongoDb.Item1;

            bool[] statusDasRespostasRetornadasArray = new bool[4];

            for (int i = 0; i < 4; i++)
            {
                if (atividadeMongoDbCorrigida.Questoes[i].AlunoAcertouResposta == null)
                {
                    Assert.Fail();
                    break;
                }
                else if (atividadeMongoDbCorrigida.Questoes[i].AlunoAcertouResposta == true)
                {
                    statusDasRespostasRetornadasArray[i] = true;
                }
                else if (atividadeMongoDbCorrigida.Questoes[i].AlunoAcertouResposta == false)
                {
                    statusDasRespostasRetornadasArray[i] = false;
                }
            }

            // Asserção

            Assert.That(alunoAcertouRespostaArray, Is.EqualTo(statusDasRespostasRetornadasArray));
        }
        [Test]
        public void AtividadeMongoDb_VerificarSeCorrecaoDeAtividadesEstaFuncionandoParaCriarGabarito_AlunoAcertouQuestoesDoisEQuatro()
        {
            // Arranjo

            string[] alternativas = new string[4] { "A", "B", "C", "D" };

            QuestaoMongoDb questaoUm = new QuestaoMongoDb()
            {
                Valor = 1,
                Enunciado = "",
                Imagem = "",
                Alternativas = alternativas,
                Resposta = 0,
                AlunoAcertouResposta = null
            };
            QuestaoMongoDb questaoDois = new QuestaoMongoDb()
            {
                Valor = 2,
                Enunciado = "",
                Imagem = "",
                Alternativas = alternativas,
                Resposta = 1,
                AlunoAcertouResposta = null
            };
            QuestaoMongoDb questaoTres = new QuestaoMongoDb()
            {
                Valor = 3,
                Enunciado = "",
                Imagem = "",
                Alternativas = alternativas,
                Resposta = 2,
                AlunoAcertouResposta = null
            };
            QuestaoMongoDb questaoQuatro = new QuestaoMongoDb()
            {
                Valor = 4,
                Enunciado = "",
                Imagem = "",
                Alternativas = alternativas,
                Resposta = 3,
                AlunoAcertouResposta = null
            };

            QuestaoMongoDb[] questoes = new QuestaoMongoDb[4]
            {
                questaoUm, questaoDois, questaoTres, questaoQuatro
            };

            var atividadeMongoDb = new AtividadeMongoDb
            {
                Id = "1",
                Questoes = questoes
            };

            RespostasDto respostasDto = new RespostasDto()
            {
                idAtividade = 1,
                Respostas = new int[4] { 1, 1, 3, 3 }
            };

            bool[] alunoAcertouRespostaArray = new bool[4] { false, true, false, true };

            // Ação
            var correcaoAtividadeMongoDb = AtividadeMongoDb.Corrigir(atividadeMongoDb, respostasDto);

            AtividadeMongoDb atividadeMongoDbCorrigida = correcaoAtividadeMongoDb.Item1;

            bool[] statusDasRespostasRetornadasArray = new bool[4];

            for (int i = 0; i < 4; i++)
            {
                if (atividadeMongoDbCorrigida.Questoes[i].AlunoAcertouResposta == null)
                {
                    Assert.Fail();
                    break;
                }
                else if (atividadeMongoDbCorrigida.Questoes[i].AlunoAcertouResposta == true)
                {
                    statusDasRespostasRetornadasArray[i] = true;
                }
                else if (atividadeMongoDbCorrigida.Questoes[i].AlunoAcertouResposta == false)
                {
                    statusDasRespostasRetornadasArray[i] = false;
                }
            }

            // Asserção
            
            Assert.That(alunoAcertouRespostaArray, Is.EqualTo(statusDasRespostasRetornadasArray));
        }
    }
}