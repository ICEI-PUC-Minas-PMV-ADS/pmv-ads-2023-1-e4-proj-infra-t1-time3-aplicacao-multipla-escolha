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
1. Realizar login;
2. Clicar na opção "Minhas turmas" presente na homepage;
3. Visualizar tela de "Minhas turmas";
5. Clicar em "Nova turma";
6. Visualiar tela de cadastro de turma;
7. Preencher as informaçõs solicitadas e clicar em "Cadastrar turma";
8. Caso as informações fornecidas sejam válidas, uma mensagem de sucesso será exibida e o usuário será redirecionado para a tela de "Minhas turmas";
9. Caso deseje editar ou apagar uma das turmas criadas, clicar em "Editar" ou "Apagar". A opção de "Editar" redirecionará um usuário para uma tela similar a tela de cadastro de turmas onde ele poderá substituir as informações anteriormente cadastradas ao clicar em "Atualizar dados";
