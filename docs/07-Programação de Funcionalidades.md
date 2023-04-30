# Programação de Funcionalidades

Nesta seção são exibidas as telas correspondentes a cada funcionalidade da aplicação com suas respectivas instruções de acesso.

Para rodar a aplicação localmente, seguir os seguintes passos:

API:
- Realizar a instalação do Visual Studio Community 2022 e do MongoDB na sua máquina caso já não estejam instalados;
- Fazer o download do arquivo do projeto (ZIP) ou clone do projeto no GitHub;
- Abrir o arquivo "multipla_escolha_api.sln" (Presente na pasta backend/Api/multipla-escolha-api) no Visual Studio;
- Executar o comando "update-database" no console do Package Manager para criar as tabelas do banco de dados localmente através dos arquivos "migrations" do Entity Framework Core;
- Rodar o projeto em modo de desenvolvimento no Visual Studio, que deverá abrir uma janela do browser no endereço https://localhost:7284/swagger/index.html, exibindo a interface do Swagger para utilização dos endpoints da API;

Frontend:
- Após rodar a API conforme as instruções detalhadas acima, abrir o arquivo "multipla_escolha_api.sln" (Presente na pasta backend/Api/multipla-escolha-api) no Visual Studio;
- Abrir o Visual Studio Code e rodar o projeto presente na pasta frontend/multipla-escolha com o comando npm start;
- Abrir o navegador na URL http://localhost:3000 para acessar a homepage;

Uma vez que o projeto esteja rodando localmente, basta seguir as instruções abaixo para utilizar cada funcionalidade através do frontend em React. As funcionalidades também podem ser testadas a partir da interface do Swagger, fornecendo os parâmetros solicitados para cada endpoint. É importante ressaltar que a maioria dos endpoints da API requer autenticação para retornar resposta, sendo necessário fazer o login de usuário através do endereço http://localhost:3000/login para o frontend em React ou pelo endpoint /api/Usuarios/authenticate pelo Swagger.

## Cadastro de usuário (RF-01)
A funcionalidade de cadastro de usuário permite que um novo usuário se registre como "Aluno" ou "Professor", obtendo uma conta que pode utilizar para acessar as demais funcionalidades do sistema.

### Tela de Cadastro
![cadastro](https://user-images.githubusercontent.com/74699119/235332970-ec5a7931-c7ad-4721-93a5-5357bfe3cdcb.png)

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

### Frontend
- cadastro.js
- RegisterComponent.js

### Instruções de acesso
1. Visualizar homepage;
2. Clicar na opção "Login" presente no cabeçalho;
3. Visualizar tela de login;
4. Clicar em "Cadastre-se";
5. Preenhcer as informações solicitadas e clicar em "Fazer cadastro";
6. Caso as informações fornecidas sejam válidas, a conta de usuário será criada e o usuário será redirecionado para a tela de login;

## Login de usuário (RF-01)
A funcionalidade de login de usuário permite que um usuário registrado realize login do sistema, obtendo um token JWT e iniciando uma sessão associada a ele.

### Tela de Login
![login](https://user-images.githubusercontent.com/74699119/235333128-d6181697-ad19-496d-aab0-f4708e07e0a2.png)

### Cabeçalho após login
![login2](https://user-images.githubusercontent.com/74699119/235333131-4a712155-19f8-4d5e-8197-260800237ee8.png)

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
6. Caso as informações fornecidas sejam válidas, a sessão será iniciada e o usuário será redirecionado para a homepage, o cabeçalho deverá ter sido atualizado, mostrando o nome do usuário e as opções de "Opções da conta" e "Logout";

## Atualizar dados cadastrais (Opções da conta) (RF-01)
A funcionalidade de atualizar dados cadastrais permite que o usuário atualize seus dados cadastrais, tal como e-mail, nome, sobrenome, telefone e senha. O usuário não pode modificar seu nome de usuário (identificador único utilizado para login) nem tipo de conta (aluno ou professor), o usuário poderá trocar seu e-mail, contanto que o novo e-mail informado não esteja em uso por nenhuma outra conta. Para realizar a atualização dos dados, o usuário deverá informar sua senha atual. O usuário poderá também optar por apagar sua conta.

### Tela de atualizar dados cadastrais
![opcoesdaconta1](https://user-images.githubusercontent.com/74699119/235354822-92d7cdcc-2128-4a05-b2bc-2777da730061.png)

### Tela de atualizar dados cadastrais - Senha solicitada após tentar mudar dado
![opcoesdaconta2](https://user-images.githubusercontent.com/74699119/235354842-eb877e3e-8a2e-4a9d-b3f9-78c4bfdad855.png)

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
2. Clicar na opção "Opções da conta" presente no cabeçalho;
3. Visualizar tela de atualizar dados cadastrais;
5. Preencher as informações solicitadas relativas aos dados que deseja atualizar e clicar em "atualizar dados", ou clicar em "apagar conta" caso deseje apagar sua conta;
6. Caso as informações fornecidas sejam válidas, uma mensagem de sucesso será exibida e o usuário será redirecionado para a homepage;

## Cadastro e edição de turmas por professor (RF-02)
A funcionalidade de cadastro de turmas permite que um usuário do tipo "Professor" cadastre uma nova turma em seu nome, fornecendo o nome e descrição da turma, além de poder decidir se a turma está ativa ou não (turmas não ativas não aparecem para os alunos na busca de turmas). As turmas cadastradas poderão então ser visualizadas na tela de "Minhas turmas" do professor, aonde poderão ser editadas ou apagadas clicando nos botões correspondentes.

### Tela de cadastro de turma
![criarturma](https://user-images.githubusercontent.com/74699119/235355741-45378d97-a4c3-4434-b529-b8a15f852f41.png)

### Tela de "minhas turmas"
![criarturma2](https://user-images.githubusercontent.com/74699119/235355742-2a70f9e8-41c0-4e96-a95c-d7f5f28c1852.png)

### Tela de editar turma
![criarturma3](https://user-images.githubusercontent.com/74699119/235355855-248d1793-1cd6-4dc5-8572-5858fd13fc08.png)

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
    "atividades": null
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
2. Clicar na opção "Minhas turmas" presente na homepage;
3. Visualizar tela de "Minhas turmas";
5. Clicar em "Nova turma";
6. Visualiar tela de cadastro de turma;
7. Preencher as informaçõs solicitadas e clicar em "Cadastrar turma";
8. Caso as informações fornecidas sejam válidas, uma mensagem de sucesso será exibida e o usuário será redirecionado para a tela de "Minhas turmas";
9. Caso deseje editar ou apagar uma das turmas criadas, clicar em "Editar" ou "Apagar". A opção de "Editar" redirecionará um usuário para uma tela similar a tela de cadastro de turmas onde ele poderá substituir as informações anteriormente cadastradas ao clicar em "Atualizar dados";

## Cadastro e edição de atividades em turma por professor (RF-03)
A funcionalidade de cadastro de atividades permite que um usuário do tipo "Professor" cadastre uma nova atividade em uma das suas turmas, deixando-a disponível para realização pelos alunos. Uma vez cadastrada, a atividade aparecerá na página de "detalhes" da turma em questão, que por sua vez é acessada ao clicar em "Abrir" em alguma turma presente na tela de "minhas turmas".

### Tela de cadastro de atividade
![criarAtividade1](https://user-images.githubusercontent.com/74699119/235369038-34870b55-2397-46e6-b77f-e8f9d81e6d22.png)

### Modal de cadastro de questão
![criarAtividade2](https://user-images.githubusercontent.com/74699119/235369040-81f05a18-47e4-4845-a404-fa480bb7a094.png)

### Tela de cadastro de atividade (Preenchida)
![criarAtividade3](https://user-images.githubusercontent.com/74699119/235369045-0f08f332-e86a-4c3f-a5f9-976eaf42553a.png)

### Tela de detalhes da turma
![criarAtividade4](https://user-images.githubusercontent.com/74699119/235369049-392dc035-d211-496d-9f35-aabeac5fc074.png)

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
  "id":13006,
   "nome":"Nova turma",
   "descricao":"Nova turma",
   "dataDeCriacao":"2023-04-30T13:28:26.5433026",
   "ativo":true,
   "professor":
   {
      "id":13003,
      "nomeDeUsuario":"Novo Professor",
      "nome":"Novo","sobrenome":"Professor",
      "email":"novoProfessor@email.com",
      "telefone":"(99)99999999",
      "perfil":1
   },
   "atividades":
   [
     {
       "id":13014,
       "nome":"Nova atividade",
       "valor":4,
       "descricao":"Nova atividade",
       "dataDeCriacao":"2023-04-30T17:48:11.7339606",
       "dataPrazoDeEntrega":"2023-04-30T23:59:00",
       "tentativasPermitidas":2,
       "uuidNoMongoDb":"142663ed-4cb2-4267-917c-3c5903009df2",
       "turma":null
     }
   ]
}
```

### Artefatos da funcionalidade

#### Models
- Atividade.cs
- AtividadeMongoDb.cs
- QuestaoMongoDb.cs
#### Services
- AtividadesServices.cs
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
2. Clicar na opção "Minhas turmas" presente na homepage;
3. Selecionar uma turma e clicar em "Abrir";
5. Visualizar tela de detalhes da turma;
6. Clicar em "Nova atividade";
7. Preencher as informaçõs solicitadas, adicionar as questões uma a uma clicando em "Adicionar questão" e por fim clicar em "Cadastrar atividade";
8. Caso as informações fornecidas sejam válidas, uma mensagem de sucesso será exibida e o usuário será redirecionado para a tela de "detalhes da turma";
9. Caso deseje editar ou apagar uma das atividades criadas, clicar em "Editar" ou "Apagar". A opção de "Editar" redirecionará um usuário para uma tela similar a tela de cadastro de atividade onde ele poderá substituir as informações anteriormente cadastradas ao clicar em "Atualizar atividade";
