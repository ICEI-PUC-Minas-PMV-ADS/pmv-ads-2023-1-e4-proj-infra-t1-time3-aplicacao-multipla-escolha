# Registro de Testes de Software

Nesta seção se encontra o relatório com as evidências dos testes de software realizados no sistema pela equipe, baseado nos planos de teste de software descritos na seção anterior.

## Avaliação

## Testes de Unidade

### CT-001 Testar método CheckIfUserNameOrEmailIsAlreadyUsed do Model "Usuario.cs"

**Objetivo:** Testar o método CheckIfUserNameOrEmailIsAlreadyUsed, utilizado durante o cadastro ou atualização de dados de um usuário para ver se o nome de usuário e email informados estão disponíveis.

**Requisitos que motivaram o teste:**	RF-001 Permitir que o usuário se cadastre como professor ou aluno.

**Passos**: Foram elaborados os testes de unidade para testar o método sob diferentes circunstâncias:

```
        [Test]
        public void Usuario_VerificarSeJaExisteUmUsuarioCadastradoComEmailOuNomeDeUsuarioIgual_EsperaseEmailENomeDeUsuarioLivresParaUsar()
        {
            // Arranjo
            var novoUsuarioDto = new UsuarioDto
            {
                NomeDeUsuario = "novoUsuario",
                Email = "emailNovo@email.com"
            };

            Usuario? usuarioRecuperadoDoBanco = null;

            string? mensagemDeErroEsperada = null;

            // Ação
            string mensagemDeErroRetornada = Usuario.checkIfUserNameOrEmailIsAlreadyUsed(novoUsuarioDto, usuarioRecuperadoDoBanco);
            
            // Asserção
            Assert.That(mensagemDeErroRetornada, Is.EqualTo(mensagemDeErroEsperada));
        }
        [Test]
        public void Usuario_VerificarSeJaExisteUmUsuarioCadastradoComEmailOuNomeDeUsuarioIgual_EsperaseEmailJaCadastrado()
        {
            // Arranjo
            var novoUsuarioDto = new UsuarioDto
            {
                NomeDeUsuario = "novoUsuario",
                Email = "email@email.com"
            };

            var usuarioRecuperadoDoBanco = new Usuario
            {
                NomeDeUsuario = "usuarioAntigo",
                Email = "email@email.com"
            };

            string? mensagemDeErroEsperada = "Email já cadastrado!";
            
            // Ação
            string mensagemDeErroRetornada = Usuario.checkIfUserNameOrEmailIsAlreadyUsed(novoUsuarioDto, usuarioRecuperadoDoBanco);
            
            // Asserção
            Assert.That(mensagemDeErroRetornada, Is.EqualTo(mensagemDeErroEsperada));
        }
        [Test]
        public void Usuario_VerificarSeJaExisteUmUsuarioCadastradoComEmailOuNomeDeUsuarioIgual_EsperaseNomeDeUsuarioJaCadastrado()
        {
            // Arranjo
            var novoUsuarioDto = new UsuarioDto
            {
                NomeDeUsuario = "nomeDeUsuario",
                Email = "emailNovo@email.com"
            };

            var usuarioRecuperadoDoBanco = new Usuario
            {
                NomeDeUsuario = "nomeDeUsuario",
                Email = "emailAntigo@email.com"
            };

            string? mensagemDeErroEsperada = "Nome de usuário já cadastrado!";
            
            // Ação
            string mensagemDeErroRetornada = Usuario.checkIfUserNameOrEmailIsAlreadyUsed(novoUsuarioDto, usuarioRecuperadoDoBanco);
            
            // Asserção
            Assert.That(mensagemDeErroRetornada, Is.EqualTo(mensagemDeErroEsperada));
        }
```

- No primeiro teste, nenhum usuário é passado para a comparação, simulando uma situação em que nenhum usuário com e-mail ou nome de usuário igual ao do usuário que deseja-se criar foi encontrado, de modo que espera-se que nenhuma mensagem de erro (null) seja retornada.
- No segundo teste, o usuário passado como paramêtro possui o mesmo e-mail que o usuário que se deseja criar, mas outro nome de usuário, espera-se então obter uma mensagem de erro dizendo "Email já cadastrado!" como resposta.
- No terceiro teste, o usuário passado como paramêtro possui o mesmo nome de usuário que o usuário que se deseja criar, mas outro e-mail, espera-se então obter uma mensagem de erro dizendo "Nome de usuário já cadastrado!" como resposta.

**Critérios de êxito:** Todos os testes de unidade devem passar ao serem executados.

**Resultado**: Todos os testes de unidade obtiveram êxito quando executados. Satisfazendo assim os critérios de êxito.



### CT-002 CT-002 Testar o método CheckIfUserCanTakeTest do Model "Atividade.cs"

**Objetivo:** Testar o método CheckIfUserCanTakeTest, utilizado para verificar se o usuário já extrapolou o número de tentativas ou se perdeu o prazo para realização de uma determinada atividade.

**Requisitos que motivaram o teste:**	RF-006 Permitir que o usuário do tipo "aluno" possa realizar qualquer atividade de multipla escolha que não esteja com o prazo vencido ou com o limite de tentativas alcançado.

**Passos**: Foram elaborados os testes de unidade para testar o método sob diferentes circunstâncias:

```
        [Test]
        public void Atividade_VerificarSeNumeroDeTentativasOuPrazoDeEntregaDaAtividadeASerCorrigidaJaEstaoEsgotados_EsperaseNaoReceberMensagemDeErro()
        {
            // Arranjo
            var atividade = new Atividade
            {
                TentativasPermitidas = 1,
                DataPrazoDeEntrega = DateTime.Now.AddDays(30),
            };

            int numeroDeTentativas = 0;

            string? mensagemDeErroEsperada = null;

            // Ação
            string mensagemDeErroRetornada = Atividade.CheckIfUserCanTakeTest(atividade, numeroDeTentativas);
            
            // Asserção
            Assert.That(mensagemDeErroRetornada, Is.EqualTo(mensagemDeErroEsperada));
        }
        [Test]
        public void Atividade_VerificarSeNumeroDeTentativasOuPrazoDeEntregaDaAtividadeASerCorrigidaJaEstaoEsgotados_EsperaseMensagemDePrazoEsgotado()
        {
            // Arranjo
            var atividade = new Atividade
            {
                TentativasPermitidas = 1,
                DataPrazoDeEntrega = DateTime.Now.AddDays(-30),
            };

            int numeroDeTentativas = 0;

            string? mensagemDeErroEsperada = "Atividade fora do prazo!";

            // Ação
            string mensagemDeErroRetornada = Atividade.CheckIfUserCanTakeTest(atividade, numeroDeTentativas);

            // Asserção
            Assert.That(mensagemDeErroRetornada, Is.EqualTo(mensagemDeErroEsperada));
        }
        [Test]
        public void Atividade_VerificarSeNumeroDeTentativasOuPrazoDeEntregaDaAtividadeASerCorrigidaJaEstaoEsgotados_EsperaseMensagemDeTentativasEsgotadas()
        {
            // Arranjo
            var atividade = new Atividade
            {
                TentativasPermitidas = 2,
                DataPrazoDeEntrega = DateTime.Now.AddDays(30),
            };

            int numeroDeTentativas = 2;

            string? mensagemDeErroEsperada = "Número de tentativas extrapolado!";

            // Ação
            string mensagemDeErroRetornada = Atividade.CheckIfUserCanTakeTest(atividade, numeroDeTentativas);

            // Asserção
            Assert.That(mensagemDeErroRetornada, Is.EqualTo(mensagemDeErroEsperada));
        }
```

- No primeiro teste, a atividade em questão encontra-se dentro do prazo (data prazo de entrega é 30 dias a frente da da data atual) e o número de tentativas anteriores (0) é menor que o limite de tentativas (1), deste modo, espera-se que nenhuma mensagem de erro (null) seja retornada. 
- No segundo teste, a atividade em questão encontra-se fora dentro do prazo (data prazo de entrega é 30 dias antes da da data atual), embora o número de tentativas anteriores (0) seja menor que o limite de tentativas (1), deste modo, espera-se que uma mensagem de erro dizendo "Atividade fora do prazo!" seja retornada.
- No terceiro teste, a atividade em questão encontra-se dentro dentro do prazo (data prazo de entrega é 30 dias a frente da da data atual), mas o número de tentativas anteriores (2) é maior ou igual ao o limite de tentativas (2), deste modo, espera-se que uma mensagem de erro dizendo "Número de tentativas extrapolado!" seja retornada.

**Critérios de êxito:** Todos os testes de unidade devem passar ao serem executados.

**Resultado**: Todos os testes de unidade obtiveram êxito quando executados. Satisfazendo assim os critérios de êxito.



### CT-003 Testar o método Corrigir do Model "AtividadeMongoDb.cs"

**Objetivo:** Testar o método Corrigir, utilizado para realizar a correção de uma atividade a partir das respostas submetidas pelo aluno e retornar a nota e a correção da atividade para o aluno.

**Requisitos que motivaram o teste:**	
- RF-006 Permitir que o usuário do tipo "aluno" possa realizar qualquer atividade de multipla escolha que não esteja com o prazo vencido ou com o limite de tentativas alcançado.
- RF-007 Permitir que o aluno tenha acesso as próprias métricas relativas às atividades de multipla escolha que já realizou.

**Passos**: Foram elaborados os testes de unidade para testar o método sob diferentes circunstâncias:

```
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
```

- No primeiro teste, todas as respostas estão corretas, de modo que se espera que a nota máxima (10) seja retornada.
- No segundo teste, apenas as respostas para as questões 2 e 4 estão corretas, de modo que se espera que a nota retornada seja igual a soma dos valores dessas duas questões (2 + 4 neste caso).
- No terceiro teste, todas as respostas estão corretas, de modo que se espera que todas as questões sejam marcadas com o parametro "AlunoAcertouResposta = true", a presença de "AlunoAcertouResposta = null" em qualquer questão indicaria uma falha do método.
- No quarto teste, apenas as respostas para as questões 2 e 4 estão corretas, de modo que se espera que as questões 2 e 4 estejam marcadas com o parametro "AlunoAcertouResposta = true", mas que as questões 1 e 3 estejam com "AlunoAcertouResposta = false", a presença de "AlunoAcertouResposta = null" em qualquer questão indicaria uma falha do método.

**Critérios de êxito:** Todos os testes de unidade devem passar ao serem executados.

**Resultado**: Todos os testes de unidade obtiveram êxito quando executados. Satisfazendo assim os critérios de êxito.


