# Programação de Funcionalidades

Nesta seção são exibidas as telas correspondentes a cada funcionalidade da aplicação com suas respectivas instruções de acesso.

Para rodar a aplicação localmente, seguir os seguintes passos:

API:
- Realizar a instalação do Visual Studio Community 2022 e do MongoDB na sua máquina caso já não estejam instalados;
- Fazer o download do arquivo do projeto (ZIP) ou clone do projeto no GitHub;
- Abrir o arquivo "multipla_escolha_api.sln" (Presente na pasta backend/Api/multipla-escolha-api) no Visual Studio;
- Executar o comando "update-database" no console do Package Manager para criar as tabelas do banco de dados localmente através dos arquivos "migrations" do Entity Framework Core;
- Rodar o projeto em modo de desenvolvimento no Visual Studio, que deverá abrir uma janela do browser no endereço https://localhost:7284/swagger/index.html, exibindo a interface do Swagger para utilização dos endpoints da API;

Frontend Web:
- Abrir o Visual Studio Code na pasta frontend/multipla-escolha;
- Instalar o react com o comando npm i react através do terminal;
- Utilizar o comando npm start no terminal para iniciar a aplicação;
- Após a aplicação iniciar, abrir o navegador na URL http://localhost:3000 para acessar a homepage;

Frontend Mobile:
- Instalar o [Localtunnel](https://theboroer.github.io/localtunnel-www/);
- Rodar a API do backend conforme as instruções anteriores;
- Abrir o prompt de comando do sistema operacional e utilizar o comando 'lt --port 5284' para expor a API através do link gerado pelo localtunnel (obs: é importante usar a porta 5284 em vez da 7284, já que o certificado SSL da porta 7284 gera problemas no localtunnel);
- Copiar a url disponibilizada pelo localtunnel;
- Acessar o endereço https://snack.expo.dev/@sergiomenezes/multipla-escolha-mobile, onde se encontra o frontend mobile da aplicação, e colar o link do localtunnel no arquivo src/services/url.js, colocando o mesmo como o valor da variável BASE_URL (ex: export const BASE_URL = 'https://tender-poets-live.loca.lt');
- Clicar na aba 'Android' do emulador local do Snack (importante, considerando que nem todas as funcionalidades são compatíveis com o emulador da aba 'web', que não corresponde 100% ao comportamento da aplicação em um dispositivo móvel);
- Visualizar a tela inicial da aplicação mobile;

Uma vez que o projeto esteja rodando localmente, basta seguir as instruções abaixo para utilizar cada funcionalidade através do frontend web em React ou frontend mobile em React Native (que roda no link do Snack disponibilizado). As funcionalidades também podem ser testadas a partir da interface do Swagger, fornecendo os parâmetros solicitados para cada endpoint. É importante ressaltar que a maioria dos endpoints da API requer autenticação para retornar resposta, sendo necessário fazer o login de usuário através do endereço http://localhost:3000/login para o frontend web em React, na tela de login do emulador de Android do Snack ou pelo endpoint /api/Usuarios/authenticate pelo Swagger.

## Cadastro de usuário (RF-01)
A funcionalidade de cadastro de usuário permite que um novo usuário se registre como "Aluno" ou "Professor", obtendo uma conta que pode utilizar para acessar as demais funcionalidades do sistema.

### Tela de Cadastro (Frontend Web)
![cadastro](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/2e9804c8-72ce-4fb3-a82e-033361e3d2cb)

### Tela de Cadastro (Frontend Mobile)
![Login](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/7c40ff15-76c2-407e-ac5a-a301677fd464)

### Requisitos atendidos
- RF-01

### Estrutura de Dados

Os dados preenchidos para o cadastro são enviados para a API na seguinte estrutura de dados JSON, sendo recebidas pelo endpoint através do DTO "UsuarioDto":
```
{
  email: "novousuario@email.com"
  nome: "Novo"
  nomeDeUsuario: "Novo Usuario"
  perfil: 0
  senha: "senha"
  sobrenome: "Usuario"
  telefone: "(99)99999997"
}
```

### Artefatos da funcionalidade

#### Models
- Usuario.cs
### Services
- UsuariosServices.cs
### DTO
- UsuarioDTO.cs
#### Controllers
- UsuariosController.cs

### Frontend Web
- cadastro.js
- RegisterComponent.js

### Frontend Mobile
- RegisterPage.js
- auth.services.js

### Instruções de acesso (Frontend Web)
1. Visualizar homepage;
2. Clicar na opção "Cadastrar-se";
5. Preenhcer as informações solicitadas e clicar em "Confirmar";
6. Caso as informações fornecidas sejam válidas, a conta de usuário será criada e o usuário será redirecionado para a tela de login;

### Instruções de acesso (Frontend Mobile)
1. Visualizar tela inicial;
2. Clicar na opção "Login" presente no cabeçalho;
3. Visualizar tela de login;
4. Clicar em "Cadastre-se";
5. Preenhcer as informações solicitadas e clicar em "Fazer cadastro";
6. Caso as informações fornecidas sejam válidas, a conta de usuário será criada e o usuário será redirecionado para a tela de login;

## Login de usuário (RF-01)
A funcionalidade de login de usuário permite que um usuário registrado realize login do sistema, obtendo um token JWT e iniciando uma sessão associada a ele.

### Homepage (Com link para tela de login no cabeçalho)
![home](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/e3009b4a-f1d0-4594-b032-989b8a6c275f)

### Tela de Login
![loginA](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/39d77906-6a03-4a4b-a99d-17d0dbad736a)

### Cabeçalho após login
![loginB](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/d1fc3295-522e-4961-8678-eb685338780a)

### Requisitos atendidos
- RF-01


### Estrutura de Dados

Os dados preenchidos para o login são enviados para o endpoint de autenticação da API na seguinte estrutura da dados JSON, sendo recebidos pelo endpoint através do DTO "AuthenticateDto":

```
{
  nomeDeUsuario: "Novo Usuario"
  senha: "senha"
}
```


### Artefatos da funcionalidade

#### Models
- Usuario.cs
#### Services
- UsuariosServices.cs
#### DTO
- AuthenticateDto.cs
#### Controllers
- UsuariosController.cs

### Frontend
- login.js
- loginComponent.js
- navbar.js

### Instruções de acesso
1. Visualizar homepage;
2. Clicar na opção "Login" presente no cabeçalho;
3. Visualizar tela de login;
5. Preenhcer usuário e senha e clicar em "Fazer login";
6. Caso as informações fornecidas sejam válidas, a sessão será iniciada e o usuário será redirecionado para a tela de "minhas turmas", o cabeçalho deverá ter sido atualizado, mostrando o nome do usuário;

## Atualizar dados cadastrais (Opções da conta) (RF-01)
A funcionalidade de atualizar dados cadastrais permite que o usuário atualize seus dados cadastrais, tal como e-mail, nome, sobrenome, telefone e senha. O usuário não pode modificar seu nome de usuário (identificador único utilizado para login) nem tipo de conta (aluno ou professor), o usuário poderá trocar seu e-mail, contanto que o novo e-mail informado não esteja em uso por nenhuma outra conta. Para realizar a atualização dos dados, o usuário deverá informar sua senha atual. O usuário poderá também optar por apagar sua conta.

### Menu do usuário para acesso a tela de "meus dados"
![meusDadosA1](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/190ebc3e-2190-4eed-9355-bd8d58477e3f)

### Tela de atualizar dados cadastrais
![meusDadosA](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/83bdd3b5-37a6-4ad6-a29e-83f90a33e474)

### Tela de atualizar dados cadastrais - Senha solicitada após tentar mudar dado
![meusDadosB](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/c7d15e4b-f5a0-41ef-a6b5-76ebbf4e31f7)

### Requisitos atendidos
- RF-01

### Estrutura de Dados

Os dados preenchidos para a atualização são enviados para o endpoint de atualização de usuários da API na seguinte estrutura da dados JSON, sendo recebidos pelo endpoint através do DTO "UsuarioDto":

```
{
  email: "novousuario@email.com"
  nome: "Trocar nome"
  nomeDeUsuario: "null"
  perfil: 0
  senha: "senha"
  senhaAntiga: "senha"
  sobrenome: "Usuario"
  telefone: "(99)999999999"
}
```
### Artefatos da funcionalidade

#### Models
- Usuario.cs
#### Services
- UsuariosServices.cs
#### DTO
- UsuarioDto.cs
#### Controllers
- UsuariosController.cs

### Frontend
- accountOptions.js
- accountOptionsComponent.js
- navbar.js

### Instruções de acesso
1. Realizar login;
2. Clicar na seta ao lado do seu nome no cabeçalho para abrir o menu de opções do usuário;
3. Clicar na opção "Perfil";
4. Visualizar tela de atualizar dados cadastrais;
5. Preencher as informações solicitadas relativas aos dados que deseja atualizar e clicar em "atualizar dados", ou clicar em "apagar conta" caso deseje apagar sua conta;
6. Caso as informações fornecidas sejam válidas, uma mensagem de sucesso será exibida e o usuário será redirecionado para a homepage;

## Cadastro e edição de turmas por professor (RF-02)
A funcionalidade de cadastro de turmas permite que um usuário do tipo "Professor" cadastre uma nova turma em seu nome, fornecendo o nome e descrição da turma, além de poder decidir se a turma está ativa ou não (turmas não ativas não aparecem para os alunos na busca de turmas). As turmas cadastradas poderão então ser visualizadas na tela de "Minhas turmas" do professor, aonde poderão ser editadas ou apagadas clicando nos botões correspondentes.

### Tela de "minhas turmas" (opção de "Nova turma")
![cadastroTurmasA](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/9cb86be1-ab33-4a52-9a1a-a01c1358f036)

### Tela de cadastro de turma
![criarTurma](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/c8051ffd-8a6f-474e-b50b-b9f5218c17bc)

### Tela de "minhas turmas" (opção de editar turma)
![cadastroTurmasC](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/e5056cdb-25ef-4d5e-9ae7-25551126e94c)

### Tela de editar turma
![editarTurma](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/12c3dd37-c6e1-400a-ba80-90761824b296)

### Requisitos atendidos
- RF-02

### Estrutura de Dados

Os dados preenchidos para a criação da turma são enviados para o endpoint de criar nova turma no seguinte formato JSON e recebidos pelo endpoint através do DTO TurmaDto 

```
{
  ativo: true
  descricao: "Nova turma"
  nome: "Nova turma"
}
```
Na tela de "minhas turmas", a lista de turmas cujo professor é o usuário atualmente logado é recuperada no seguinte formato JSON através do Model Turma:

```
[
  {
    "id": 13006,
    "nome": "Nova turma",
    "descricao": "Nova turma",
    "dataDeCriacao": "2023-04-30T13:28:26.5433026",
    "ativo": true,
    "professor": {
      "id": 13003,
      "nomeDeUsuario": "Novo Professor",
      "nome": "Novo",
      "sobrenome": "Professor",
      "email": "novoProfessor@email.com",
      "telefone": "(99)99999999",
      "perfil": 1
    },
    "alunosTurma": [],
    "atividades": [],
    "matriculado": null
  }
]
```

### Artefatos da funcionalidade

#### Models
- Turma.cs
#### Services
- TurmasServices.cs
#### DTO
- TurmaDto.cs
#### Controllers
- TurmaController.cs

### Frontend
- MinhasTurmas.js
- MinhasTurmasProfessorComponent.js
- criarTurma.js
- criarTurmaFormComponent.js
- editarTurma.js
- editarTurmaFormComponent.js

### Instruções de acesso
1. Realizar login em uma conta do tipo "Professor";
2. Caso já não esteja na tela de "minhas turmas", abrir o menu de opções do usuário clicando no seu nome no cabeçalho e clicar em "Turmas";
3. Visualizar tela de "Minhas turmas";
5. Clicar em "Nova turma";
6. Visualiar tela de cadastro de turma;
7. Preencher as informaçõs solicitadas e clicar em "Cadastrar turma";
8. Caso as informações fornecidas sejam válidas, uma mensagem de sucesso será exibida e o usuário será redirecionado para a tela de "Minhas turmas";
9. Caso deseje editar ou apagar uma das turmas criadas, clicar em "Editar" ou "Apagar". A opção de "Editar" redirecionará um usuário para uma tela similar a tela de cadastro de turmas onde ele poderá substituir as informações anteriormente cadastradas ao clicar em "Atualizar dados";

## Cadastro e edição de atividades em turma por professor (RF-03)
A funcionalidade de cadastro de atividades permite que um usuário do tipo "Professor" cadastre uma nova atividade em uma das suas turmas, deixando-a disponível para realização pelos alunos. Uma vez cadastrada, a atividade aparecerá na página de "detalhes" da turma em questão, que por sua vez é acessada ao clicar em "Abrir" em alguma turma presente na tela de "minhas turmas".

### Tela de detalhes da turma (opção de criar atividade)
![cadastrarAtividadeA](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/9ebd30e2-e261-4699-9772-c86cecb53a30)

### Tela de cadastro de atividade
![cadastrarAtividadeB](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/f4d6f1b9-ba9e-4640-a79e-c5d26c1057d4)

### Modal de cadastro de questão
![cadastrarAtividadeC](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/f0b4a1c4-bfef-4157-a178-d610813311ca)

### Tela de cadastro de atividade (Preenchida)
![cadastrarAtividadeD](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/80feafcc-7046-4592-a369-f3215f525b13)

### Tela de detalhes da turma (Com atividade nova)
![cadastrarAtividadeE](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/1fe36957-5c2b-4053-82df-dcdbedd006c4)

### Requisitos atendidos
- RF-03

### Estrutura de Dados

Os dados preenchidos para a criação da atividade são enviados para o endpoint de criar nova atividade no seguinte formato JSON e recebidos pelo endpoint através do DTO AtividadeDto. Uma vez recebeido pela API, o campo "atividadeMongoDb" é persistido no banco de dados não relacional MongoDb, enquanto o restante das informações é persistido em um banco de dados relacional, com um campo "uuidNoMongoDb" guardando o Id da parte persistida no MongoDb para recuperação pelo endpoint de recuperar atividade por id. O mesmo processo é feito para o endpoint de editar atividade, mas enviando o Id da atividade que deseja editar.

```
{
  atividadeMongoDb: {
    questoes: [
      {
        alternativas: ["Alternativa A", "Alternativa B", "Alternativa C", "Alternativa D"]
        enunciado: "Questão 1"
        imagem: ""
        resposta: 0
        valor: 2
      },
      {
        alternativas: ["Alternativa A", "Alternativa B", "Alternativa C", "Alternativa D"]
        enunciado: "Questão 2"
        imagem: ""
        resposta: 1
        valor: 2
      }
    ]
  }
  dataPrazoDeEntrega: "2023-04-30T23:59"
  descricao: "Nova atividade"
  nome: "Nova atividade"
  tentativasPermitidas: "2"
  turmaId: "13006"
  valor: 4
}
```
Na tela de "detalhes da turma", a lista de atividades é recuperada como parte do JSON da turma no campo "Atividades":

```
{
      "id": 5006,
      "nome": "Turma",
      "descricao": "DescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasas",
      "ativo": true,
      "dataDeCriacao": "2023-04-19T15:41:45.8741023",
      "professor": {
      "id": 8003,
      "nomeDeUsuario": "Sergio",
      "nome": "Sergio",
      "sobrenome": "Menezes",
      "email": "x@email.com",
      "telefone": "(99)99999997",
      "perfil": 1
      },
      "alunosTurma": [
            {
            "turmaId": 5006,
            "alunoId": 1,
            "aluno": {
            "id": 1,
            "nomeDeUsuario": "string",
            "nome": "string",
            "sobrenome": "string",
            "email": "email@email.com",
            "telefone": "(99)99999999",
            "perfil": 0
            }
            },
            {
            "turmaId": 5006,
            "alunoId": 10003,
            "aluno": {
            "id": 10003,
            "nomeDeUsuario": "user",
            "nome": "user",
            "sobrenome": "user",
            "email": "user@email.com.br",
            "telefone": "(99)99999997",
            "perfil": 0
            }
            }
      ],
      "atividades": [
            {
            "id": 2003,
            "nome": "Matematica basica",
            "descricao": "Soma e multiplicacao",
            "valor": 4.5,
            "dataPrazoDeEntrega": null,
            "dataDeCriacao": "2023-04-24T19:59:49.8344257",
            "tentativasPermitidas": null,
            "turmaId": 5006,
            "turma": null,
            "atividadeMongoDb": null,
            "podeSerRealizada": null,
            "status": null,
            "maiorNota": null,
            "tentativasAnteriores": null
            },
            {
            "id": 2018,
            "nome": "Tes",
            "descricao": "Tes",
            "valor": 0,
            "dataPrazoDeEntrega": null,
            "dataDeCriacao": "2023-04-24T20:31:16.2768954",
            "tentativasPermitidas": null,
            "turmaId": 5006,
            "turma": null,
            "atividadeMongoDb": null,
            "podeSerRealizada": null,
            "status": null,
            "maiorNota": null,
            "tentativasAnteriores": null
            },
            {
            "id": 8014,
            "nome": "Teste",
            "descricao": "Teste",
            "valor": 2,
            "dataPrazoDeEntrega": "2023-06-03T23:25:00",
            "dataDeCriacao": "2023-04-26T02:26:15.6661155",
            "tentativasPermitidas": null,
            "turmaId": 5006,
            "turma": null,
            "atividadeMongoDb": null,
            "podeSerRealizada": null,
            "status": null,
            "maiorNota": null,
            "tentativasAnteriores": null
            },
            {
            "id": 9014,
            "nome": "Teste",
            "descricao": "Teste",
            "valor": 4.5,
            "dataPrazoDeEntrega": "2023-04-26T13:29:00",
            "dataDeCriacao": "2023-04-26T16:28:23.5959741",
            "tentativasPermitidas": null,
            "turmaId": 5006,
            "turma": null,
            "atividadeMongoDb": null,
            "podeSerRealizada": null,
            "status": null,
            "maiorNota": null,
            "tentativasAnteriores": null
            },
            {
            "id": 9015,
            "nome": "Xx",
            "descricao": "Xx",
            "valor": 4.5,
            "dataPrazoDeEntrega": "2023-04-08T13:30:00",
            "dataDeCriacao": "2023-04-26T16:29:55.8999232",
            "tentativasPermitidas": null,
            "turmaId": 5006,
            "turma": null,
            "atividadeMongoDb": null,
            "podeSerRealizada": null,
            "status": null,
            "maiorNota": null,
            "tentativasAnteriores": null
            },
            {
            "id": 10014,
            "nome": "T",
            "descricao": "T",
            "valor": 0,
            "dataPrazoDeEntrega": "2023-05-05T12:31:00",
            "dataDeCriacao": "2023-04-27T15:31:27.8706483",
            "tentativasPermitidas": 2,
            "turmaId": 5006,
            "turma": null,
            "atividadeMongoDb": null,
            "podeSerRealizada": null,
            "status": null,
            "maiorNota": null,
            "tentativasAnteriores": null
            },
            {
            "id": 17015,
            "nome": "T",
            "descricao": "T",
            "valor": 3.5,
            "dataPrazoDeEntrega": null,
            "dataDeCriacao": "2023-05-19T23:07:35.7989231",
            "tentativasPermitidas": 4,
            "turmaId": 5006,
            "turma": null,
            "atividadeMongoDb": null,
            "podeSerRealizada": null,
            "status": null,
            "maiorNota": null,
            "tentativasAnteriores": null
            },
            {
            "id": 17016,
            "nome": "f",
            "descricao": "f",
            "valor": 5,
            "dataPrazoDeEntrega": "2023-07-08T20:47:00",
            "dataDeCriacao": "2023-05-19T23:42:56.5127829",
            "tentativasPermitidas": 1,
            "turmaId": 5006,
            "turma": null,
            "atividadeMongoDb": null,
            "podeSerRealizada": null,
            "status": null,
            "maiorNota": null,
            "tentativasAnteriores": null
            }
      ],
      "matriculado": null
}
```

### Artefatos da funcionalidade

#### Models
- Atividade.cs
- AtividadeMongoDb.cs
- QuestaoMongoDb.cs
#### Services
- AtividadesService.cs
- AtividadeMongoDbService.cs
#### DTO
- AtividadeDto.cs
- TurmaDto.cs
#### Controllers
- TurmaController.cs

### Frontend
- visualizarAtividade.js
- VisualizarAtividadeComponent.js
- criarAtividade.js
- CriarAtividadeFormComponent.js
- editarAtividade.js
- EditarAtividadeFormComponent.js

### Instruções de acesso
1. Realizar login com uma conta do tipo "professor";
2. Caso já não esteja na tela de "minhas turmas", abrir o menu de opções do usuário clicando no seu nome no cabeçalho e clicar em "Turmas";
3. Visualizar tela de "Minhas turmas";
4. Selecionar uma turma e clicar em "Abrir";
5. Visualizar tela de detalhes da turma;
6. Clicar em "Criar atividade";
7. Preencher as informaçõs solicitadas, adicionar as questões uma a uma clicando em "Adicionar questão" e por fim clicar em "Cadastrar atividade";
8. Caso as informações fornecidas sejam válidas, uma mensagem de sucesso será exibida e o usuário será redirecionado para a tela de "detalhes da turma";
9. Caso deseje editar ou apagar uma das atividades criadas, clicar nos ícones de "Editar" (Lápis cinza) ou "Apagar" (Lixeira vermelha). A opção de "Editar" redirecionará um usuário para uma tela similar a tela de cadastro de atividade onde ele poderá substituir as informações anteriormente cadastradas ao clicar em "Atualizar atividade";

## Busca de turmas (RF-04)
A funcionalidade de busca de turmas permite que o usuário do tipo "aluno" busque uma turma entre todas as turmas cadastradas que estejam com o status "Ativa", o usuário poderá filtrar a busca pelo nome da turma ou pelo nome/email do professor, facilitando a localização da turma que deseja encontrar.

### Tela de "Minhas turmas" (Aluno)
![buscarTurmaA](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/798454a6-3d74-42fc-a29d-e0b0ea2c65fe)

### Tela de buscar turma
![buscarTurmaB](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/81c2d907-4a7b-4811-ba69-4c97bad90e55)

### Tela de buscar turma (resultados filtrados)
![buscarTurmaC](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/160a261a-6119-497d-94df-54a7febd085b)

### Requisitos atendidos
- RF-04

### Estrutura de Dados

Os resultados exibidos na tela são recuperados de forma paginada da API na seguinte estrutura de dados:
```
{
  "totalItems": 10,
  "totalPages": 1,
  "currentPage": 0,
  "pageSize": 50,
  "currentPageSize": 10,
  "items": [
    {
      "id": 11006,
      "nome": "A",
      "descricao": "A",
      "dataDeCriacao": "2023-04-27T18:58:24.718313",
      "ativo": true,
      "professor": {
      "id": 8003,
      "nomeDeUsuario": "Sergio",
      "nome": "Sergio",
      "sobrenome": "Menezes",
      "email": "x@email.com",
      "telefone": "(99)99999997",
      "perfil": 1
    },
    "atividades": null
    },
    {
      "id": 11007,
      "nome": "B",
      "descricao": "B",
      "dataDeCriacao": "2023-04-27T18:58:29.2992459",
      "ativo": true,
      "professor": {
      "id": 8003,
      "nomeDeUsuario": "Sergio",
      "nome": "Sergio",
      "sobrenome": "Menezes",
      "email": "x@email.com",
      "telefone": "(99)99999997",
      "perfil": 1
    },
    "atividades": null
    },
    {
      "id": 11008,
      "nome": "C",
      "descricao": "C",
      "dataDeCriacao": "2023-04-27T18:58:32.8690104",
      "ativo": true,
      "professor": {
      "id": 8003,
      "nomeDeUsuario": "Sergio",
      "nome": "Sergio",
      "sobrenome": "Menezes",
      "email": "x@email.com",
      "telefone": "(99)99999997",
      "perfil": 1
    },
    "atividades": null
    },
    {
      "id": 11009,
      "nome": "D",
      "descricao": "D",
      "dataDeCriacao": "2023-04-27T18:58:35.4329811",
      "ativo": true,
      "professor": {
      "id": 8003,
      "nomeDeUsuario": "Sergio",
      "nome": "Sergio",
      "sobrenome": "Menezes",
      "email": "x@email.com",
      "telefone": "(99)99999997",
      "perfil": 1
    },
    "atividades": null
    },
    {
      "id": 11011,
      "nome": "F",
      "descricao": "F",
      "dataDeCriacao": "2023-04-27T18:58:42.2913222",
      "ativo": true,
      "professor": {
      "id": 8003,
      "nomeDeUsuario": "Sergio",
      "nome": "Sergio",
      "sobrenome": "Menezes",
      "email": "x@email.com",
      "telefone": "(99)99999997",
      "perfil": 1
    },
    "atividades": null
    },
    {
      "id": 11012,
      "nome": "G",
      "descricao": "G",
      "dataDeCriacao": "2023-04-27T18:58:45.0062003",
      "ativo": true,
      "professor": {
      "id": 8003,
      "nomeDeUsuario": "Sergio",
      "nome": "Sergio",
      "sobrenome": "Menezes",
      "email": "x@email.com",
      "telefone": "(99)99999997",
      "perfil": 1
    },
    "atividades": null
    },
    {
      "id": 13006,
      "nome": "Nova turma",
      "descricao": "Nova turma",
      "dataDeCriacao": "2023-04-30T13:28:26.5433026",
      "ativo": true,
      "professor": {
      "id": 13003,
      "nomeDeUsuario": "Novo Professor",
      "nome": "Novo",
      "sobrenome": "Professor",
      "email": "novoProfessor@email.com",
      "telefone": "(99)99999999",
      "perfil": 1
    },
    "atividades": null
    },
    {
      "id": 12006,
      "nome": "Nova turma teste",
      "descricao": "Descricao nova turma",
      "dataDeCriacao": "2023-04-27T22:47:47.1676699",
      "ativo": true,
      "professor": {
      "id": 8003,
      "nomeDeUsuario": "Sergio",
      "nome": "Sergio",
      "sobrenome": "Menezes",
      "email": "x@email.com",
      "telefone": "(99)99999997",
      "perfil": 1
    },
    "atividades": null
    },
    {
      "id": 3007,
      "nome": "Turma",
      "descricao": "string",
      "dataDeCriacao": "2023-04-13T17:16:25.5987795",
      "ativo": true,
      "professor": {
      "id": 2002,
      "nomeDeUsuario": "string2",
      "nome": "string",
      "sobrenome": "string",
      "email": "string2",
      "telefone": "string",
      "perfil": 0
    },
    "atividades": null
    },
    {
      "id": 5006,
      "nome": "Turma",
      "descricao": "Desc",
      "dataDeCriacao": "2023-04-19T15:41:45.8741023",
      "ativo": true,
      "professor": {
      "id": 8003,
      "nomeDeUsuario": "Sergio",
      "nome": "Sergio",
      "sobrenome": "Menezes",
      "email": "x@email.com",
      "telefone": "(99)99999997",
      "perfil": 1
    },
    "atividades": null
    }
  ]
}
```

### Artefatos da funcionalidade

#### Models
- Turma.cs

#### Services
- TurmasSevice.cs

#### DTO
- RespostaDto.cs

#### Controllers
- TurmasController.cs

### Frontend
- buscarTurmas.js
- BuscarTurmasComponent.js

### Instruções de acesso
1. Realizar login com uma conta do tipo "aluno";
2. Caso já não esteja na tela de "minhas turmas", abrir o menu de opções do usuário clicando no seu nome no cabeçalho e clicar em "Turmas";
3. Visualizar tela de "Minhas turmas";
4. Inserir os termos de busca desejados no campo de "buscar turma" e clicar no icone da lupa para realizar a busca;
5. Visualizar a tela de buscar turmas;
6. Digitar os termos de busca nos campos "Buscar por nome da turma" ou "Buscar por nome/email do professor" para filtrar os resultados;

## Matrícula em turma (RF-04 e RF-05)
A funcionalidade de matrícula em turma permite que o usuário do tipo "aluno" realize matrícula na turma desejada, tendo assim acessoa a realização de todas as atividades nela cadastradas.

### Tela de visualizar turma (botão "fazer matrícula aparece apenas para usuário tipo aluno)
![matriculaTurmaA](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/494dc3cc-63df-4590-b80b-f064f2eac89e)

### Tela de visualizar turma - mensagem de sucesso
![matriculaTurmaB](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/4338bafb-36d6-4925-9551-0e44bfb61014)

### Tela de visualizar turma (botão de "Cancelar matrícula" agora aparece)
![matriculaTurmaC](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/6175d21c-d92d-4626-97c5-e2f8457a9ba6)

### Tela de "Minhas turmas" - Aluno (Agora com a turma em que ele se matriculou)
![matriculaTurmaD](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/3e244de9-ce83-4f64-baa2-7f444c3696ec)

### Requisitos atendidos
- RF-04
- RF-05

### Estrutura de Dados

Este endpoint não recebe ou retorna nenhum payload em JSON. O id da turma em que o aluno deseja se matricular é enviado como um parametro na própria URL  para o endpoint api/Turmas/{idTurma}/matricular), enquanto o id do usuário é obtido do token JWT, que é enviado como um cookie durante a requisição. 

### Artefatos da funcionalidade

#### Models
- Turma.cs
- TurmaAluno.cs

#### Services
- TurmasSevice.cs

#### Controllers
- TurmasController.cs

### Frontend
- visualizarTurma.js
- visualizarTurmaComponent.js

### Instruções de acesso
1. Realizar login com uma conta do tipo "aluno";
2. Caso já não esteja na tela de "minhas turmas", abrir o menu de opções do usuário clicando no seu nome no cabeçalho e clicar em "Turmas";
3. Visualizar tela de "Minhas turmas";
4. Inserir os termos de busca desejados no campo de "buscar turma" e clicar no icone da lupa para realizar a busca;
5. Visualizar a tela de buscar turmas;
6. Selecionar a turma desejada;
7. Clicar em "Fazer matricula";
8. Caso a matrícula ocorra com sucesso, uma mensagem de sucesso será exibida;
9. Caso deseje cancelar a matrícula, basta clicar no botão de "Cancelar matrícula".

## Visualização e realização de atividade por aluno (RF-05, RF-06 e RF-07)
A funcionalidade de visualização e realização de atividade por aluno permite a um usuário do tipo aluno realizar atividades cadastradas em alguma turma. No momento, qualquer usuário "aluno" pode realizar qualquer atividade, uma vez que as funcionalidade de matrícula em turma e visualização de turmas na qual o aluno está matriculado não estão completamente implementadas. Ao selecionar uma atividade e clicar em "abrir", o usuário poderá visualizar os resultados todas as tentativas anteriores para aquela atividade. O usuário poderá também clicar em "Fazer tarefa" para realizar uma nova tentativa caso não tenha extrapolado o limite de tentativas, obtendo sua nota e correção da atividade imediatamente após submete-la.  

### Tela de visualizar turma (Selecionar atividade)
![realizarAtividadeB](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/ab1f430a-fefc-4e93-8f1f-4173cf68b711)

### Tela de visualizar atividade e tentativas anteriores
![realizarAtividadeC](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/4d339bf8-e8ed-44f2-a00e-3b8aec04818a)

### Tela de realizar atividade
![realizarAtividadeD](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/f9734986-47cb-4539-9b06-f9a3893925d6)

### Tela de realizar atividade (Preenchida e submetida)
![realizarAtividadeE](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/b49b25de-d491-413d-9562-c925a7cef631)

### Tela de resultado da atividade
![realizarAtividadeF](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/c48f4f74-a132-4485-b56a-eb2a022436d9)

### Tela de visualizar atividade e tentativas anteriores (após realização da primeira tentativa, clicar em "Visualizar" no histórico de tentativas retorna o usuário para a tela de visualizar resultado)
![realizarAtividadeG](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/49213384-5038-479e-8429-7887aacb7a7c)

### Requisitos atendidos
- RF-05
- RF-06
- RF-07

### Estrutura de Dados

As respostas preenchidas ao realizar uma atividade são enviados no seguinte formato JSON, sendo recebidas no endpoint de correção através do DTO RespostasDto:
```
{
  idAtividade: "13014",
  respostas: [0, 1]
}
```

Na tela de visualizar resultado, o resultado atual é obtido na seguinte estrutura de dados JSON utilizando o DTO "ResultadoDto", assim como no endpoint para recuperar atividades, o conteúdo do campo "atividadeMongoDb" (onde a atividade preenchida pelo aluno com sua nota e respostas é recuperada) também é recuperado do MongoDb através do Uuid guardado no campo "uuidNoMongoDb" do resultado em questão:
```
{
  "id":8002,
  "atividade":
  {
    "id":13014,
    "nome":"Nova atividade",  
    "valor":4,
    "descricao":"Nova atividade",
    "dataDeCriacao":"2023-04-30T17:48:11.7339606",
    "dataPrazoDeEntrega":"2023-04-30T23:59:00",
    "tentativasPermitidas":2,
    "uuidNoMongoDb":"142663ed-4cb2-4267-917c-3c5903009df2",
    "turma":{
      "id":13006,
      "nome":"Nova turma",
      "descricao":"Nova turma",
      "dataDeCriacao":"2023-04-30T13:28:26.5433026",
      "ativo":true,
      "professor":{
        "id":13003,
        "nomeDeUsuario":"Novo Professor",
        "nome":"Novo",
        "sobrenome":"Professor",
        "email":"novoProfessor@email.com",
        "telefone":"(99)99999999",
        "perfil":1
      },
      "atividades":[null]
      }
    },
    "notaDoAluno":4,
    "notaMaxima":4,
    "numeroDaTentativa":2,
    "dataDaTentativa":"2023-04-30T18:37:17.45743",
    "atividadeMongoDb":{
      "id":"169db94e-109b-4e91-8205-b41446d4ad30",
      "questoes":[
        {
          "valor":2,
          "enunciado":"Questão 1",
          "imagem":"",
          "alternativas": ["Alternativa A","Alternativa B","Alternativa C","Alternativa D"],
          "resposta":0,"alunoAcertouResposta":true
        },
        {
          "valor":2,
          "enunciado":"Questão 2",
          "imagem":"",
          "alternativas":["Alternativa A","Alternativa B","Alternativa C","Alternativa D"],
          "resposta":1,
          "alunoAcertouResposta":true
         }
      ]
   }
}
```

Na tela de "visualizar atividade e tentativas anteriores", a atividade e a lista de tentativas anteriores são recuperados no seguinte formato JSON:

```
{
  "id": 13014,
  "nome": "Nova atividade",
  "descricao": "Nova atividade",
  "valor": 4,
  "dataPrazoDeEntrega": "2023-04-30T23:59:00",
  "tentativasPermitidas": 2,
  "turmaId": 13006,
  "turma": {
    "id": 13006,
    "nome": "Nova turma",
    "descricao": "Nova turma",
    "dataDeCriacao": "2023-04-30T13:28:26.5433026",
    "ativo": true,
    "professor": {
      "id": 13003,
      "nomeDeUsuario": "Novo Professor",
      "nome": "Novo",
      "sobrenome": "Professor",
      "email": "novoProfessor@email.com",
      "telefone": "(99)99999999",
      "perfil": 1
    },
  "atividades": []
  },
"atividadeMongoDb": {
  "id": "142663ed-4cb2-4267-917c-3c5903009df2",
  "questoes": [
    {
      "valor": 2,
      "enunciado": "Questão 1",
      "imagem": "",
      "alternativas": [
        "Alternativa A",
        "Alternativa B",
        "Alternativa C",
        "Alternativa D"
      ],
      "resposta": null,
      "alunoAcertouResposta": null
    },
    {
      "valor": 2,
      "enunciado": "Questão 2",
      "imagem": "",
      "alternativas": [
        "Alternativa A",
        "Alternativa B",
        "Alternativa C",
        "Alternativa D"
      ],
      "resposta": null,
      "alunoAcertouResposta": null
    }
  ]
 },
 "podeSerRealizada": true,
 "tentativasAnteriores": [
    {
      "id": 7002,
      "notaDoAluno": 2,
      "notaMaxima": 4,
      "numeroDaTentativa": 1,
      "dataDaTentativa": "2023-04-30T18:19:35.8301422",
      "uuidNoMongoDb": "45f2e1fb-cffe-4433-8b1a-f66bb1f025a1",
      "aluno": {
        "id": 14003,
        "nomeDeUsuario": "Novo Aluno",
        "nome": "Novo",
        "sobrenome": "Aluno",
        "email": "novoaluno@email.com",
        "telefone": "(99)99999997",
        "perfil": 0
      },
      "atividade": {
        "id": 13014,
        "nome": "Nova atividade",
        "valor": 4,
        "descricao": "Nova atividade",
        "dataDeCriacao": "2023-04-30T17:48:11.7339606",
        "dataPrazoDeEntrega": "2023-04-30T23:59:00",
        "tentativasPermitidas": 2,
        "uuidNoMongoDb": "142663ed-4cb2-4267-917c-3c5903009df2",
        "turma": {
          "id": 13006,
          "nome": "Nova turma",
          "descricao": "Nova turma",
          "dataDeCriacao": "2023-04-30T13:28:26.5433026",
          "ativo": true,
          "professor": {
            "id": 13003,
            "nomeDeUsuario": "Novo Professor",
            "nome": "Novo",
            "sobrenome": "Professor",
            "email": "novoProfessor@email.com",
            "telefone": "(99)99999999",
            "perfil": 1
          },
          "atividades": []
        }
      }
    }
  ]
}
```

### Artefatos da funcionalidade

#### Models
- Resultado.cs
- Atividade.cs
- AtividadeMongoDb.cs
- QuestaoMongoDb.cs
#### Services
- ResultadosSevice.cs
- AtividadesService.cs
- AtividadeMongoDbService.cs
#### DTO
- RespostaDto.cs
- ResultadoDto.cs
- AtividadeDto.cs
- TurmaDto.cs
#### Controllers
- TurmasController.cs
- ResultadosController.cs

### Frontend
- visualizarAtividade.js
- VisualizarAtividadeComponent.js
- fazerAtividade.js
- FazerAtividadeComponent.js
- visualizarResultado.js
- VisualizarRestadoComponent.js

### Instruções de acesso
1. Realizar login com uma conta do tipo "aluno";
2. Caso já não esteja na tela de "minhas turmas", abrir o menu de opções do usuário clicando no seu nome no cabeçalho e clicar em "Turmas";
3. Visualizar tela de "Minhas turmas";
4. Selecionar uma turma e clicar em "Abrir";
5. Visualizar tela de detalhes da turma;
6. Selecionar uma atividade cujo limite de tentativas e prazo não esteja esgotado e clicar em "Abrir";
7. Visualizar a tela de visualizar atividades e resultados anteriores;
8. Clicar em "Fazer tarefa";
9. Visualizar a tela de fazer tarefa;
10. Preencher as respostas das questões e clicar em "Submeter";
11. Caso todas as respsotas tenham sido preenchidas, uma mensagem de sucesso será exibida e o usuário será redirecionado para a tela de visualizar resultado;
12. Visualizar resultado;
13. Clicar em "Voltar" para voltar para a tela de visualizar atividade;
14. Visualizar tela de visualizar atividade, agora com a tentativa anterior aparecendo nela;
15. Clicar em "Visualizar" na tentativa anterior para visualiza-la novamente.

## Visualização de métricas/notas por aluno e professor (RF-07 e RF-08)
A funcionalidade de visualização de métricas/notas permitem que o usuário visualize a nota obtida por um usuário para todas as atividades em uma determinada turma (no caso de atividades que permitem mais de uma tentativa, a nota exibida/mantida será a maior nota entre todas as tentativas do daquele usuário para aquela atividade). Para o usuário do tipo "aluno", o único usuário cujas notas ele poderá visualizar é ele mesmo, no caso do usuário do tipo "professor", uma tela de selecionar aluno aparecerá caso ele seja o dono da turma, na qual ele poderá selecionar qualquer aluno da turma e visualizar suas notas. 

### Tela de visualizar turma (Selecionar "notas")
![notasA](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/4c069d6f-acc5-48ae-a6cc-04f283d93c9c)

### Tela de selecionar aluno (Apenas para usuário "Professor)
![notasB](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/cdaec103-c746-4446-8838-579aa83d5178)

### Tela de visualizar notas
![notasC](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/8ddaa504-1cd4-454c-93d1-2f1290d5a53a)

### Tela de visualizar notas (busca de atividade)
![notasD](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/00ffc7e0-a521-4a09-97e2-cdbb7e268165)

### Requisitos atendidos
- RF-07
- RF-08

### Estrutura de Dados

Na tela de selecionar alunos, os dados da turma como um todo são retornados na seguinte estrutura JSON, com a lista de alunos sendo um de seus parâmetros:
```
{
      "id": 5006,
      "nome": "Turma",
      "descricao": "DescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasas",
      "ativo": true,
      "dataDeCriacao": "2023-04-19T15:41:45.8741023",
      "professor": {
      "id": 8003,
      "nomeDeUsuario": "Sergio",
      "nome": "Sergio",
      "sobrenome": "Menezes",
      "email": "x@email.com",
      "telefone": "(99)99999997",
      "perfil": 1
      },
      "alunosTurma": [
            {
            "turmaId": 5006,
            "alunoId": 1,
            "aluno": {
            "id": 1,
            "nomeDeUsuario": "string",
            "nome": "string",
            "sobrenome": "string",
            "email": "email@email.com",
            "telefone": "(99)99999999",
            "perfil": 0
            }
            },
            {
            "turmaId": 5006,
            "alunoId": 10003,
            "aluno": {
            "id": 10003,
            "nomeDeUsuario": "user",
            "nome": "user",
            "sobrenome": "user",
            "email": "user@email.com.br",
            "telefone": "(99)99999997",
            "perfil": 0
            }
            }
      ],
      "atividades": [
            {
            "id": 2003,
            "nome": "Matematica basica",
            "descricao": "Soma e multiplicacao",
            "valor": 4.5,
            "dataPrazoDeEntrega": null,
            "dataDeCriacao": "2023-04-24T19:59:49.8344257",
            "tentativasPermitidas": null,
            "turmaId": 5006,
            "turma": null,
            "atividadeMongoDb": null,
            "podeSerRealizada": null,
            "status": null,
            "maiorNota": null,
            "tentativasAnteriores": null
            },
            {
            "id": 2018,
            "nome": "Tes",
            "descricao": "Tes",
            "valor": 0,
            "dataPrazoDeEntrega": null,
            "dataDeCriacao": "2023-04-24T20:31:16.2768954",
            "tentativasPermitidas": null,
            "turmaId": 5006,
            "turma": null,
            "atividadeMongoDb": null,
            "podeSerRealizada": null,
            "status": null,
            "maiorNota": null,
            "tentativasAnteriores": null
            },
            {
            "id": 8014,
            "nome": "Teste",
            "descricao": "Teste",
            "valor": 2,
            "dataPrazoDeEntrega": "2023-06-03T23:25:00",
            "dataDeCriacao": "2023-04-26T02:26:15.6661155",
            "tentativasPermitidas": null,
            "turmaId": 5006,
            "turma": null,
            "atividadeMongoDb": null,
            "podeSerRealizada": null,
            "status": null,
            "maiorNota": null,
            "tentativasAnteriores": null
            },
            {
            "id": 9014,
            "nome": "Teste",
            "descricao": "Teste",
            "valor": 4.5,
            "dataPrazoDeEntrega": "2023-04-26T13:29:00",
            "dataDeCriacao": "2023-04-26T16:28:23.5959741",
            "tentativasPermitidas": null,
            "turmaId": 5006,
            "turma": null,
            "atividadeMongoDb": null,
            "podeSerRealizada": null,
            "status": null,
            "maiorNota": null,
            "tentativasAnteriores": null
            },
            {
            "id": 9015,
            "nome": "Xx",
            "descricao": "Xx",
            "valor": 4.5,
            "dataPrazoDeEntrega": "2023-04-08T13:30:00",
            "dataDeCriacao": "2023-04-26T16:29:55.8999232",
            "tentativasPermitidas": null,
            "turmaId": 5006,
            "turma": null,
            "atividadeMongoDb": null,
            "podeSerRealizada": null,
            "status": null,
            "maiorNota": null,
            "tentativasAnteriores": null
            },
            {
            "id": 10014,
            "nome": "T",
            "descricao": "T",
            "valor": 0,
            "dataPrazoDeEntrega": "2023-05-05T12:31:00",
            "dataDeCriacao": "2023-04-27T15:31:27.8706483",
            "tentativasPermitidas": 2,
            "turmaId": 5006,
            "turma": null,
            "atividadeMongoDb": null,
            "podeSerRealizada": null,
            "status": null,
            "maiorNota": null,
            "tentativasAnteriores": null
            },
            {
            "id": 17015,
            "nome": "T",
            "descricao": "T",
            "valor": 3.5,
            "dataPrazoDeEntrega": null,
            "dataDeCriacao": "2023-05-19T23:07:35.7989231",
            "tentativasPermitidas": 4,
            "turmaId": 5006,
            "turma": null,
            "atividadeMongoDb": null,
            "podeSerRealizada": null,
            "status": null,
            "maiorNota": null,
            "tentativasAnteriores": null
            },
            {
            "id": 17016,
            "nome": "f",
            "descricao": "f",
            "valor": 5,
            "dataPrazoDeEntrega": "2023-07-08T20:47:00",
            "dataDeCriacao": "2023-05-19T23:42:56.5127829",
            "tentativasPermitidas": 1,
            "turmaId": 5006,
            "turma": null,
            "atividadeMongoDb": null,
            "podeSerRealizada": null,
            "status": null,
            "maiorNota": null,
            "tentativasAnteriores": null
            }
      ],
      "matriculado": null
}
```

Na tela de visualizar notas/métricas, as métricas do aluno em questão são recuperadas na mesma estrutura de dados, mas com o parametro "idAluno" com o id do aluno em questão sendo enviado na request, se o usuário atualmente logado tiver permissão para visualizar as métricas do aluno solicitado, a mesma estrutura de dados será retornada, mas com o campo "atividades" contendo as informações das métricas daquele aluno para cada uma das atividades nos campos "status" (entregue, pendente ou atrasado) e "maior nota" (a maior nota obtida pelo aluno em todas as suas tentativas para aquela atividade)
 
```
{
      "id": 5006,
      "nome": "Turma",
      "descricao": "DescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasasDescasdasdasas",
      "ativo": true,
      "dataDeCriacao": "2023-04-19T15:41:45.8741023",
      "professor": {
      "id": 8003,
      "nomeDeUsuario": "Sergio",
      "nome": "Sergio",
      "sobrenome": "Menezes",
      "email": "x@email.com",
      "telefone": "(99)99999997",
      "perfil": 1
      },
      "alunosTurma": [
            {
            "turmaId": 5006,
            "alunoId": 1,
            "aluno": {
            "id": 1,
            "nomeDeUsuario": "string",
            "nome": "string",
            "sobrenome": "string",
            "email": "email@email.com",
            "telefone": "(99)99999999",
            "perfil": 0
            }
            },
            {
            "turmaId": 5006,
            "alunoId": 10003,
            "aluno": {
            "id": 10003,
            "nomeDeUsuario": "user",
            "nome": "user",
            "sobrenome": "user",
            "email": "user@email.com.br",
            "telefone": "(99)99999997",
            "perfil": 0
            }
            }
      ],
      "atividades": [
            {
            "id": 2003,
            "nome": "Matematica basica",
            "descricao": "Soma e multiplicacao",
            "valor": 4.5,
            "dataPrazoDeEntrega": null,
            "dataDeCriacao": "2023-04-24T19:59:49.8344257",
            "tentativasPermitidas": null,
            "turmaId": 5006,
            "turma": null,
            "atividadeMongoDb": null,
            "podeSerRealizada": null,
            "status": "Entregue",
            "maiorNota": 4.5,
            "tentativasAnteriores": null
            },
            {
            "id": 2018,
            "nome": "Tes",
            "descricao": "Tes",
            "valor": 0,
            "dataPrazoDeEntrega": null,
            "dataDeCriacao": "2023-04-24T20:31:16.2768954",
            "tentativasPermitidas": null,
            "turmaId": 5006,
            "turma": null,
            "atividadeMongoDb": null,
            "podeSerRealizada": null,
            "status": "Entregue",
            "maiorNota": 0,
            "tentativasAnteriores": null
            },
            {
            "id": 8014,
            "nome": "Teste",
            "descricao": "Teste",
            "valor": 2,
            "dataPrazoDeEntrega": "2023-06-03T23:25:00",
            "dataDeCriacao": "2023-04-26T02:26:15.6661155",
            "tentativasPermitidas": null,
            "turmaId": 5006,
            "turma": null,
            "atividadeMongoDb": null,
            "podeSerRealizada": null,
            "status": "Entregue",
            "maiorNota": 2,
            "tentativasAnteriores": null
            },
            {
            "id": 9014,
            "nome": "Teste",
            "descricao": "Teste",
            "valor": 4.5,
            "dataPrazoDeEntrega": "2023-04-26T13:29:00",
            "dataDeCriacao": "2023-04-26T16:28:23.5959741",
            "tentativasPermitidas": null,
            "turmaId": 5006,
            "turma": null,
            "atividadeMongoDb": null,
            "podeSerRealizada": null,
            "status": "Atividade atrasada",
            "maiorNota": null,
            "tentativasAnteriores": null
            },
            {
            "id": 9015,
            "nome": "Xx",
            "descricao": "Xx",
            "valor": 4.5,
            "dataPrazoDeEntrega": "2023-04-08T13:30:00",
            "dataDeCriacao": "2023-04-26T16:29:55.8999232",
            "tentativasPermitidas": null,
            "turmaId": 5006,
            "turma": null,
            "atividadeMongoDb": null,
            "podeSerRealizada": null,
            "status": "Atividade atrasada",
            "maiorNota": null,
            "tentativasAnteriores": null
            },
            {
            "id": 10014,
            "nome": "T",
            "descricao": "T",
            "valor": 0,
            "dataPrazoDeEntrega": "2023-05-05T12:31:00",
            "dataDeCriacao": "2023-04-27T15:31:27.8706483",
            "tentativasPermitidas": 2,
            "turmaId": 5006,
            "turma": null,
            "atividadeMongoDb": null,
            "podeSerRealizada": null,
            "status": "Atividade atrasada",
            "maiorNota": null,
            "tentativasAnteriores": null
            },
            {
            "id": 17015,
            "nome": "T",
            "descricao": "T",
            "valor": 3.5,
            "dataPrazoDeEntrega": null,
            "dataDeCriacao": "2023-05-19T23:07:35.7989231",
            "tentativasPermitidas": 4,
            "turmaId": 5006,
            "turma": null,
            "atividadeMongoDb": null,
            "podeSerRealizada": null,
            "status": "Entregue",
            "maiorNota": 1,
            "tentativasAnteriores": null
            },
            {
            "id": 17016,
            "nome": "f",
            "descricao": "f",
            "valor": 5,
            "dataPrazoDeEntrega": "2023-07-08T20:47:00",
            "dataDeCriacao": "2023-05-19T23:42:56.5127829",
            "tentativasPermitidas": 1,
            "turmaId": 5006,
            "turma": null,
            "atividadeMongoDb": null,
            "podeSerRealizada": null,
            "status": "Atividade pendente",
            "maiorNota": null,
            "tentativasAnteriores": null
            }
      ],
      "matriculado": null
}
```

### Artefatos da funcionalidade

#### Models
- Resultado.cs
- Atividade.cs
- AtividadeMongoDb.cs
- QuestaoMongoDb.cs

#### Services
- AtividadesService.cs
- AtividadeMongoDbService.cs

#### DTO
- AtividadeDto.cs
- TurmaDto.cs
#### Controllers
- TurmasController.cs

### Frontend
- visualizarAtividade.js
- visualizarAtividadeComponent.js
- visualizarNotas.js
- visualizarAlunosTurmaComponent.js
- visualizarNotasComponent.js

### Instruções de acesso
1. Realizar login;
2. Caso já não esteja na tela de "minhas turmas", abrir o menu de opções do usuário clicando no seu nome no cabeçalho e clicar em "Turmas";
3. Visualizar tela de "Minhas turmas";
4. Selecionar uma turma e clicar em "Abrir";
5. Visualizar tela de detalhes da turma;
6. Clicar no botão "Notas";
7. Caso esteja logado numa conta do tipo "Professor", visualizar a tela de selecionar aluno e clicar no aluno cujas notas deseja visualizar;
8. Caso esteja logado numa conta do tipo "Aluno", o usuário será automaticamente redirecionado para a tela de visualizar notas contendo suas notas;
9. Visualizar a tela de "Visualizar notas";
10. Caso deseje buscar uma atividade específica na lista, inserir o nome da atividade no campo de busca.
