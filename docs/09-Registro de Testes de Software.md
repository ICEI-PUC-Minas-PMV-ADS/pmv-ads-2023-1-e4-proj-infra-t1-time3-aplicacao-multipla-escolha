# Registro de Testes de Software

Nesta seção se encontra o relatório com as evidências dos testes de software realizados no sistema pela equipe, baseado nos planos de teste de software descritos na seção anterior.

## Avaliação

## Testes de Unidade

### CTU-001 Testar método CheckIfUserNameOrEmailIsAlreadyUsed do Model "Usuario.cs"

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

<br>

### CTU-002 Testar o método CheckIfUserCanTakeTest do Model "Atividade.cs"

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

<br>

### CTU-003 Testar o método Corrigir do Model "AtividadeMongoDb.cs"

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

## Testes de Integração

### CTI-001 Verificar se as operações de salvar e recuperar usuários do banco de dados estão funcionando adequadamente

**Objetivo:** Testar se um usuário consegue ser salvo sem problemas no banco de dados, além de verificar se ao recuperar este usuário, ele corresponde ao que foi salvo.

**Requisitos que motivaram o teste:**	RF-001 Permitir que o usuário se cadastre como professor ou aluno.

**Passos**: Foram elaborados os seguintes testes de integração para testar o método sob diferentes circunstâncias:

```
    [Fact]
    public void SalvarUsuarioEVerificarSeUsuarioRecuperadoCorrespondeAEle()
    {
        // Arranjo
        Usuario novoUsuario = new Usuario
        {
            Id = 0,
            Senha = "Senha",
            NomeDeUsuario = "Joao",
            Nome = "Joao",
            Sobrenome = "Silva",
            Email = "Joao@email.com",
            Telefone = "(99)99999999",
            Perfil = Perfil.Aluno
        };
        
        // Ação
        _context.Usuarios.Add(novoUsuario);
        _context.SaveChanges();
        Usuario usuarioRecuperado = _context.Usuarios.FirstOrDefault(u => u.NomeDeUsuario == "Joao");

        // Asserção
        Xunit.Assert.Equal(novoUsuario.Nome, usuarioRecuperado.Nome);
    }
```

- Neste teste, o novo usuário foi salvo e recuperado com sucesso, de modo que o teste passou.

**Critérios de êxito:** Todos os testes de integração devem passar ao serem executados.

**Resultado**: Todos os testes de integração obtiveram êxito quando executados. Satisfazendo assim os critérios de êxito.

<br>

### CTI-002 Verificar se o banco de dados impede que se salvem usuários com chaves únicas duplicadas (nome de usuário e e-mail) 

**Objetivo:** Testar se o a aplicação impede que sejam salvos usuários que violem os constraints de "chave única" das colunas de nome de usuário e email da tabela "usuários".

**Requisitos que motivaram o teste:**	RF-001 Permitir que o usuário se cadastre como professor ou aluno.

**Passos**: Foram elaborados os seguintes testes de integração para testar o método sob diferentes circunstâncias:

```
    [Fact]
    public void SalvarUsuarioComMesmoNomeDeUsuarioOuEmail_EsperaSeRetornarErro()
    {
        // Arranjo
        Usuario novoUsuario = new Usuario
        {
            Id = 0,
            Senha = "Senha",
            NomeDeUsuario = "Joao",
            Nome = "Joao",
            Sobrenome = "Silva",
            Email = "Joao@email.com",
            Telefone = "(99)99999999",
            Perfil = Perfil.Aluno
        };
        _context.Usuarios.Add(novoUsuario);
        _context.SaveChanges();

        try
        {
            // Ação
            novoUsuario.Email = "outroemail@email.com";
            _context.Usuarios.Add(novoUsuario);
            _context.SaveChanges();
        Usuario usuarioRecuperado = _context.Usuarios.FirstOrDefault(u => u.NomeDeUsuario == "Joao");
            // Asserção
            Xunit.Assert.Fail("Ambos os usuários foram salvos");
        }
        catch
        {
            // Asserção
            Xunit.Assert.True(true, "Não foi possível salvar ambos os usuários");
        }

        try
        {        
            // Ação
            novoUsuario.NomeDeUsuario = "outroNome";
            _context.Usuarios.Add(novoUsuario);
            _context.SaveChanges();
            Usuario usuarioRecuperado = _context.Usuarios.FirstOrDefault(u => u.NomeDeUsuario == "Joao");
            // Asserção
            Xunit.Assert.Fail("Ambos os usuários foram salvos");
        }
        catch
        {
            // Asserção
            Xunit.Assert.True(true, "Não foi possível salvar ambos os usuários");
        }
    }
```

- Neste teste, não foi possível salvar usuários com nome de usuário ou e-mail duplicados, de modo que o teste passou com sucesso.
- 
**Critérios de êxito:** Todos os testes de integração devem passar ao serem executados.

**Resultado**: Todos os testes de integração obtiveram êxito quando executados. Satisfazendo assim os critérios de êxito.

<br>

### CTI-003 Salvar e recuperar uma turma associada a um usuário "professor" recém criado 

**Objetivo:** Testar se a aplicação permite que sejam salvas novas turmas associadas a um professor sem maiores problemas. 

**Requisitos que motivaram o teste:**	RF-002 Permitir que o usuário do tipo "professor" cadastre novas turmas associadas a ele.

**Passos**: Foram elaborados os seguintes testes de integração para testar o método sob diferentes circunstâncias:

```
    [Fact]
    public void SalvarERecuperarTurmaComUsuarioProfessorRecemCriado()
    {
        // Arranjo
        Usuario novoUsuario = new Usuario
        {
            Id = 0,
            Senha = "Senha",
            NomeDeUsuario = "Joao",
            Nome = "Joao",
            Sobrenome = "Silva",
            Email = "Joao@email.com",
            Telefone = "(99)99999999",
            Perfil = Perfil.Professor
        };
        
        _context.Usuarios.Add(novoUsuario);
        _context.SaveChanges();
        Usuario usuarioRecuperado = _context.Usuarios.FirstOrDefault(u => u.NomeDeUsuario == "Joao");

        // Ação
     
        Turma novaTurma = new Turma()
        {
            Nome = "Nova turma",
            Descricao = "Nova turma desc",
            Ativo = true,
            Professor = usuarioRecuperado
        };

        _context.Turmas.Add(novaTurma);
        _context.SaveChanges();

        Turma turmaRecuperada = _context.Turmas.FirstOrDefault(t => t.Nome == "Nova turma");

        // Asserção
        Xunit.Assert.Equal(novaTurma.Nome, turmaRecuperada.Nome);
    }
```

- Neste teste, a turma recém criada foi salva e recuperada sem maiores problemas, tendo assim êxito.
- 
**Critérios de êxito:** Todos os testes de integração devem passar ao serem executados.

**Resultado**: Todos os testes de integração obtiveram êxito quando executados. Satisfazendo assim os critérios de êxito.

<br>

### CTI-004 Salvar multíplas turmas associadas a um mesmo usuário "professor" recém criado e recupera-las filtrando pelo id do professor

**Objetivo:** Testar se a aplicação permite que sejam salvas multíplas turmas associadas ao mesmo professor e também se é possível recuperar todas elas através do id do professor

**Requisitos que motivaram o teste:**	RF-002 Permitir que o usuário do tipo "professor" cadastre novas turmas associadas a ele.

**Passos**: Foram elaborados os seguintes testes de integração para testar o método sob diferentes circunstâncias:

```
    [Fact]
    public void SalvarMultiplasTurmasComUsuarioProfessorRecemCriadoERecuperarComoListaParaAqueleProfessor()
    {
        // Arranjo
        Usuario novoUsuario = new Usuario
        {
            Id = 0,
            Senha = "Senha",
            NomeDeUsuario = "Joao",
            Nome = "Joao",
            Sobrenome = "Silva",
            Email = "Joao@email.com",
            Telefone = "(99)99999999",
            Perfil = Perfil.Professor
        };

        _context.Usuarios.Add(novoUsuario);
        _context.SaveChanges();
        Usuario usuarioRecuperado = _context.Usuarios.FirstOrDefault(u => u.NomeDeUsuario == "Joao");

        // Ação

        Turma novaTurma = new Turma()
        {
            Nome = "Nova turma",
            Descricao = "Nova turma desc",
            Ativo = true,
            Professor = usuarioRecuperado
        };

        Turma novaTurma2 = new Turma()
        {
            Nome = "Nova turma 2",
            Descricao = "Nova turma 2 desc",
            Ativo = true,
            Professor = usuarioRecuperado
        };

        Turma novaTurma3 = new Turma()
        {
            Nome = "Nova turma 3",
            Descricao = "Nova turma 3 desc",
            Ativo = true,
            Professor = usuarioRecuperado
        };

        _context.Turmas.Add(novaTurma);
        _context.Turmas.Add(novaTurma2);
        _context.Turmas.Add(novaTurma3);
        _context.SaveChanges();

        List<Turma> turmasRecuperadas = _context.Turmas.Include(t => t.Professor).Where(t => t.Professor.Id == usuarioRecuperado.Id).ToList();

        // Asserção
        Xunit.Assert.Equal(turmasRecuperadas.Count(), 3);
    }
```

- Neste teste, todas as turmas foram criadas sem problemas, tendo sido recuperadas adequadamente quando filtradas pelo id do professor, tendo assim êxito.
- 
**Critérios de êxito:** Todos os testes de integração devem passar ao serem executados.

**Resultado**: Todos os testes de integração obtiveram êxito quando executados. Satisfazendo assim os critérios de êxito.

<br>

### CTI-005 Salvar, editar e recuperar a turma recém editada

**Objetivo:** Testar se a aplicação permite que as informações de uma turma salva sejam modificadas sem maiores problemas

**Requisitos que motivaram o teste:**	RF-002 Permitir que o usuário do tipo "professor" cadastre novas turmas associadas a ele.

**Passos**: Foram elaborados os seguintes testes de integração para testar o método sob diferentes circunstâncias:

```
    [Fact]
    public void SalvarEditarERecuperarTurma_EsperaSeQueOsDadosTenhamSidoAtualizadosAoRecuperarATurmaEditada()
    {
        // Arranjo
        Usuario novoUsuario = new Usuario
        {
            Id = 0,
            Senha = "Senha",
            NomeDeUsuario = "Joao",
            Nome = "Joao",
            Sobrenome = "Silva",
            Email = "Joao@email.com",
            Telefone = "(99)99999999",
            Perfil = Perfil.Professor
        };

        _context.Usuarios.Add(novoUsuario);
        _context.SaveChanges();
        Usuario usuarioRecuperado = _context.Usuarios.FirstOrDefault(u => u.NomeDeUsuario == "Joao");

        // Ação

        Turma novaTurma = new Turma()
        {
            Nome = "Nova turma",
            Descricao = "Nova turma desc",
            Ativo = true,
            Professor = usuarioRecuperado
        };

        _context.Turmas.Add(novaTurma);
        _context.SaveChanges();

        Turma turmaRecuperada = _context.Turmas.FirstOrDefault(t => t.Nome == "Nova turma");

        turmaRecuperada.Nome = "Novo nome";
        turmaRecuperada.Descricao = "Nova descrição";
        turmaRecuperada.Ativo = false;

        _context.Turmas.Update(turmaRecuperada);

        Turma turmaAtualizada = _context.Turmas.FirstOrDefault(t => t.Id == turmaRecuperada.Id);

        // Asserção
        Xunit.Assert.Equal(turmaAtualizada.Nome, "Novo nome");
        Xunit.Assert.Equal(turmaAtualizada.Descricao, "Nova descrição");
        Xunit.Assert.Equal(turmaAtualizada.Ativo, false);
    }
```

- A turma foi criada sem problemas, tendo sido recuperada com as edições esperadas após ter sido salva e recuperada novamente. Deste modo, o teste teve êxito.

**Critérios de êxito:** Todos os testes de integração devem passar ao serem executados.

**Resultado**: Todos os testes de integração obtiveram êxito quando executados. Satisfazendo assim os critérios de êxito.

<br>

### CTI-006 Matricular aluno em turma recém criada

**Objetivo:** Testar se a aplicação permite associar uma aluno recém criado a uma turma recém criada como aluno matriculado.

**Requisitos que motivaram o teste:**	RF-004 Permitir que o usuário do tipo "aluno" se matricule em turmas existentes

**Passos**: Foram elaborados os seguintes testes de integração para testar o método sob diferentes circunstâncias:

```
    [Fact]
    public void MatricularAlunoEmTurmaRecemCriada_EsperaSeQueChecagemRetorneFalseAntesDeSalvarAsMudancasMasRetorneTrueAposRealizarAMatricula()
    {
        // Arranjo
        Usuario novoUsuario = new Usuario
        {
            Id = 0,
            Senha = "Senha",
            NomeDeUsuario = "Joao",
            Nome = "Joao",
            Sobrenome = "Silva",
            Email = "Joao@email.com",
            Telefone = "(99)99999999",
            Perfil = Perfil.Professor
        };

        Usuario novoUsuarioAluno = new Usuario
        {
            Id = 0,
            Senha = "Senha",
            NomeDeUsuario = "Pedro",
            Nome = "Pedro",
            Sobrenome = "Rodrigues",
            Email = "Pedro@email.com",
            Telefone = "(99)99999997",
            Perfil = Perfil.Aluno
        };

        _context.Usuarios.Add(novoUsuario);
        _context.Usuarios.Add(novoUsuarioAluno);
        _context.SaveChanges();
        Usuario usuarioRecuperado = _context.Usuarios.FirstOrDefault(u => u.NomeDeUsuario == "Joao");
        Usuario usuarioAlunoRecuperado = _context.Usuarios.FirstOrDefault(u => u.NomeDeUsuario == "Pedro");
        
        Turma novaTurma = new Turma()
        {
            Nome = "Nova turma",
            Descricao = "Nova turma desc",
            Ativo = true,
            Professor = usuarioRecuperado
        };

        _context.Turmas.Add(novaTurma);
        _context.SaveChanges();

        Turma turmaRecuperada = _context.Turmas.FirstOrDefault(t => t.Nome == "Nova turma");

        // Ação
        TurmaAluno turmaAluno = new();
        turmaAluno.Aluno = usuarioAlunoRecuperado;
        turmaAluno.Turma = turmaRecuperada;

        bool alunoMatriculado = _context.Turmas.Include(t => t.AlunosTurma).Any(t => t.AlunosTurma.Any(at => at.AlunoId == usuarioAlunoRecuperado.Id));

        _context.TurmasAlunos.Add(turmaAluno);
        _context.SaveChanges();

        // Asserção
        Xunit.Assert.Equal(alunoMatriculado, false);

        alunoMatriculado = _context.Turmas.Include(t => t.AlunosTurma).Any(t => t.AlunosTurma.Any(at => at.AlunoId == usuarioAlunoRecuperado.Id));

        // Asserção
        Xunit.Assert.Equal(alunoMatriculado, true);
    }
```

- A checagem para verificar se o usuário estava matriculado na turma retornou negativo antes de as mudanças serem salvas no banco, mas positivo após as mudanças serem salvas, demonstrando o êxito do teste.

**Critérios de êxito:** Todos os testes de integração devem passar ao serem executados.

**Resultado**: Todos os testes de integração obtiveram êxito quando executados. Satisfazendo assim os critérios de êxito.

<br>

### CTI-008 Salvar multíplas atividades associadas a uma mesma turma recém criada e recupera-las filtrando pelo id da turma 

**Objetivo:** Testar se a aplicação permite que sejam salvas multíplas atividades associadas a uma mesma turma e também se é possível recuperar todas elas através do id da turma.

**Requisitos que motivaram o teste:**	RF-003 Permitir que o usuário do tipo "professor" cadastre atividades de multipla escolha associadas as turmas das quais é dono, RF-005 Permitir que o usuário do tipo "aluno" tenha acesso a todas as atividades de multipla escolha cadastradas nas turmas das quais participa., RF-006 Permitir que o usuário do tipo "aluno" possa realizar qualquer atividade de multipla escolha que não esteja com o prazo vencido ou com o limite de tentativas alcançado.

**Passos**: Foram elaborados os seguintes testes de integração para testar o método sob diferentes circunstâncias:

```
    [Fact]
    public void SalvarERecuperarMultiplasAtividadesEmUmaTurma()
    {
        // Arranjo
        Usuario novoUsuario = new Usuario
        {
            Id = 0,
            Senha = "Senha",
            NomeDeUsuario = "Joao",
            Nome = "Joao",
            Sobrenome = "Silva",
            Email = "Joao@email.com",
            Telefone = "(99)99999999",
            Perfil = Perfil.Professor
        };

        _context.Usuarios.Add(novoUsuario);
        _context.SaveChanges();
        Usuario usuarioRecuperado = _context.Usuarios.FirstOrDefault(u => u.NomeDeUsuario == "Joao");


        Turma novaTurma = new Turma()
        {
            Nome = "Nova turma",
            Descricao = "Nova turma desc",
            Ativo = true,
            Professor = usuarioRecuperado
        };

        _context.Turmas.Add(novaTurma);
        _context.SaveChanges();

        Turma turmaRecuperada = _context.Turmas.FirstOrDefault(t => t.Nome == "Nova turma");

        // Ação

        Atividade novaAtividade = new Atividade()
        {
            Nome = "Nova atividade",
            Descricao = "Descricao nova atividade",
            Valor = 10.5F,
            DataDeCriacao = DateTime.Now,
            DataPrazoDeEntrega = DateTime.Now,
            TentativasPermitidas = 1,
            UuidNoMongoDb = Guid.NewGuid().ToString(),
            Turma = turmaRecuperada
        };

        Atividade novaAtividade2 = new Atividade()
        {
            Nome = "Nova atividade2",
            Descricao = "Descricao nova atividade2",
            Valor = 10.5F,
            DataDeCriacao = DateTime.Now,
            DataPrazoDeEntrega = DateTime.Now,
            TentativasPermitidas = 1,
            UuidNoMongoDb = Guid.NewGuid().ToString(),
            Turma = turmaRecuperada
        };

        Atividade novaAtividade3 = new Atividade()
        {
            Nome = "Nova atividade3",
            Descricao = "Descricao nova atividade3",
            Valor = 10.5F,
            DataDeCriacao = DateTime.Now,
            DataPrazoDeEntrega = DateTime.Now,
            TentativasPermitidas = 1,
            UuidNoMongoDb = Guid.NewGuid().ToString(),
            Turma = turmaRecuperada
        };

        _context.Atividades.Add(novaAtividade);
        _context.Atividades.Add(novaAtividade2);
        _context.Atividades.Add(novaAtividade3);
        _context.SaveChanges();

        List<Atividade> atividadesRecuperadas = _context.Atividades.Include(a => a.Turma).Where(a => a.Turma.Id == turmaRecuperada.Id).ToList();

        // Asserção
        Xunit.Assert.Equal(atividadesRecuperadas.Count(), 3);
    }
```

- Todas as turmas foram salvas e recuperadas com sucesso filtrando pelo id da turma, demonstrando o êxito do teste.

**Critérios de êxito:** Todos os testes de integração devem passar ao serem executados.

**Resultado**: Todos os testes de integração obtiveram êxito quando executados. Satisfazendo assim os critérios de êxito.

<br>

### CTI-009 CTI-009 Salvar, editar e recuperar a atividade recém editada

**Objetivo:** Testar se a aplicação permite que as informações de uma atividade salva sejam modificadas sem maiores problemas.

**Requisitos que motivaram o teste:**	RF-003 Permitir que o usuário do tipo "professor" cadastre atividades de multipla escolha associadas as turmas das quais é dono, RF-005 Permitir que o usuário do tipo "aluno" tenha acesso a todas as atividades de multipla escolha cadastradas nas turmas das quais participa., RF-006 Permitir que o usuário do tipo "aluno" possa realizar qualquer atividade de multipla escolha que não esteja com o prazo vencido ou com o limite de tentativas alcançado.

**Passos**: Foram elaborados os seguintes testes de integração para testar o método sob diferentes circunstâncias:

```
    [Fact]
    public void SalvarEditarERecuperarAtividade_EsperaSeQueOsDadosTenhamSidoAtualizadosAoRecuperarAAtividadeEditada()
    {
        // Arranjo
        Usuario novoUsuario = new Usuario
        {
            Id = 0,
            Senha = "Senha",
            NomeDeUsuario = "Joao",
            Nome = "Joao",
            Sobrenome = "Silva",
            Email = "Joao@email.com",
            Telefone = "(99)99999999",
            Perfil = Perfil.Professor
        };

        _context.Usuarios.Add(novoUsuario);
        _context.SaveChanges();
        Usuario usuarioRecuperado = _context.Usuarios.FirstOrDefault(u => u.NomeDeUsuario == "Joao");


        Turma novaTurma = new Turma()
        {
            Nome = "Nova turma",
            Descricao = "Nova turma desc",
            Ativo = true,
            Professor = usuarioRecuperado
        };

        _context.Turmas.Add(novaTurma);
        _context.SaveChanges();

        Turma turmaRecuperada = _context.Turmas.FirstOrDefault(t => t.Nome == "Nova turma");

        // Ação

        Atividade novaAtividade = new Atividade()
        {
            Nome = "Nova atividade",
            Descricao = "Descricao nova atividade",
            Valor = 10.5F,
            DataDeCriacao = DateTime.Now,
            DataPrazoDeEntrega = DateTime.Now,
            TentativasPermitidas = 1,
            UuidNoMongoDb = Guid.NewGuid().ToString(),
            Turma = turmaRecuperada
        };

        _context.Atividades.Add(novaAtividade);
        _context.SaveChanges();

        Atividade atividadeRecuperada = _context.Atividades.FirstOrDefault(t => t.Nome == "Nova atividade");

        atividadeRecuperada.Nome = "Novo nome";
        atividadeRecuperada.Descricao = "Nova descrição";
        atividadeRecuperada.Valor = 20;
        atividadeRecuperada.TentativasPermitidas = 2;

        _context.Atividades.Update(atividadeRecuperada);
        _context.SaveChanges();

        Atividade atividadeAtualizada = _context.Atividades.FirstOrDefault(a => a.Id == atividadeRecuperada.Id);

        // Asserção
        Xunit.Assert.Equal(atividadeAtualizada.Nome, "Novo nome");
        Xunit.Assert.Equal(atividadeAtualizada.Descricao, "Nova descrição");
        Xunit.Assert.Equal(atividadeAtualizada.Valor, 20);
        Xunit.Assert.Equal(atividadeAtualizada.TentativasPermitidas, 2);
    }
```

- A nova atividade foi salva com sucesso, tendo seus parametros modificados ao ser recuperada novamente após a edição, demonstrando o êxito do teste.

**Critérios de êxito:** Todos os testes de integração devem passar ao serem executados.

**Resultado**: Todos os testes de integração obtiveram êxito quando executados. Satisfazendo assim os critérios de êxito.

<br>
