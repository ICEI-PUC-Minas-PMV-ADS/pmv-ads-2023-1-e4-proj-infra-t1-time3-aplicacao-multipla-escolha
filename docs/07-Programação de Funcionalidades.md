# Programação de Funcionalidades

Nesta seção são exibidas as telas correspondentes a cada funcionalidade da aplicação com suas respectivas instruções de acesso.

Para rodar a aplicação localmente, seguir os seguintes passos:

## Versão hospedada

O frontend web da aplicação foi hospedado na plataforma [Vercel](https://vercel.com/), podendo ser acessado através do seguinte link: https://multipla-escolha-deploy-frontend.vercel.app/

Já o frontend mobile foi hospedado na plataforma Snack do [Expo.dev](https://expo.dev/), podendo ser acessado no seguinte link: https://snack.expo.dev/@sergiomenezes/multipla-escolha-mobile-final?platform=android

Obs: Clicar na Aba "Android" do emulador do Snack para rodar da maneira apropriada, já que a versão Web não é compatível com todos os recursos utilizados.

Ambos utilizam a mesma API, hospedada no [Azure](https://azure.microsoft.com/pt-br/free/search/?ef_id=_k_Cj0KCQjwnMWkBhDLARIsAHBOftoFVP90He4Mo5FZN5-gD49I0focOjXHUBZrUr3lXkqCyj_ibBLZFScaAntTEALw_wcB_k_&OCID=AIDcmmzmnb0182_SEM__k_Cj0KCQjwnMWkBhDLARIsAHBOftoFVP90He4Mo5FZN5-gD49I0focOjXHUBZrUr3lXkqCyj_ibBLZFScaAntTEALw_wcB_k_&gclid=Cj0KCQjwnMWkBhDLARIsAHBOftoFVP90He4Mo5FZN5-gD49I0focOjXHUBZrUr3lXkqCyj_ibBLZFScaAntTEALw_wcB) e disponível no link: https://multipla-escolha-api20230620213010.azurewebsites.net/

Obs: O link acima redirecionará para uma página com Http Error 404, isto ocorre pois todos os recursos da API encontram-se em outras rotas. Caso queira visualizar uma rota da API em ação, será necessário colocar manualmente o token JWT nos cookies associados a este domínio e acessar um endpoint válido como https://multipla-escolha-api20230620213010.azurewebsites.net/api/Turmas.

## Rodar localmente

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
- Acessar o endereço https://snack.expo.dev/@sergiomenezes/multipla-escolha-mobile-final?platform=android, onde se encontra o frontend mobile da aplicação, e colar o link fornecido pelo localtunnel para a porta 5284 no arquivo src/services/url.js, colocando o mesmo como o valor da variável BASE_URL (ex: export const BASE_URL = 'https://tender-poets-live.loca.lt');
- Clicar na aba 'Android' do emulador local do Snack (importante, considerando que nem todas as funcionalidades são compatíveis com o emulador da aba 'web', que não corresponde 100% ao comportamento da aplicação em um dispositivo móvel);
- Visualizar a tela inicial da aplicação mobile;

Uma vez que o projeto esteja rodando localmente, basta seguir as instruções abaixo para utilizar cada funcionalidade através do frontend web em React ou frontend mobile em React Native (que roda no link do Snack disponibilizado). As funcionalidades também podem ser testadas a partir da interface do Swagger, fornecendo os parâmetros solicitados para cada endpoint. É importante ressaltar que a maioria dos endpoints da API requer autenticação para retornar resposta, sendo necessário fazer o login de usuário através do endereço http://localhost:3000/login para o frontend web em React, na tela de login do emulador de Android do Snack ou pelo endpoint /api/Usuarios/authenticate pelo Swagger.

## Cadastro de usuário (RF-01)
A funcionalidade de cadastro de usuário permite que um novo usuário se registre como "Aluno" ou "Professor", obtendo uma conta que pode utilizar para acessar as demais funcionalidades do sistema.

## Frontend Web
### Tela de Cadastro (Frontend Web)
![cadastro](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/2e9804c8-72ce-4fb3-a82e-033361e3d2cb)

## Frontend Mobile
### Tela de Cadastro (Frontend Mobile)
![Cadastro](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/6528d654-260a-49b7-8216-0c2b84c91151)

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


## Frontend Web
### Homepage (Com link para tela de login no cabeçalho)
![home](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/e3009b4a-f1d0-4594-b032-989b8a6c275f)

### Tela de Login
![loginA](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/39d77906-6a03-4a4b-a99d-17d0dbad736a)

### Cabeçalho após login
![loginB](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/d1fc3295-522e-4961-8678-eb685338780a)

## Frontend Mobile
### Tela inicial
![HomePage](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/d04e874d-b777-4417-8c1a-e0b7778c8a9b)

### Tela de Login
![Login](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/a5ba9c41-74f1-416d-baa1-fcc3ab15c316)

### Cabeçalho após login
![cabecalhoLogin](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/abafb50f-9574-4ac1-83e9-7bce16be7387)

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

### Frontend Web
- login.js
- loginComponent.js
- navbar.js

### Frontend Mobile
- HomePage.js
- LoginPage.js
- NavbarComponent.js
- auth.services.js

### Instruções de acesso (Frontend Web)
1. Visualizar homepage;
2. Clicar na opção "Login" presente no cabeçalho;
3. Visualizar tela de login;
5. Preenhcer usuário e senha e clicar em "Fazer login";
6. Caso as informações fornecidas sejam válidas, a sessão será iniciada e o usuário será redirecionado para a tela de "minhas turmas", o cabeçalho deverá ter sido atualizado, mostrando o nome do usuário;

### Instruções de acesso (Frontend Mobile)
1. Visualizar tela inicial;
2. Clicar na opção "Fazer Login";
3. Visualizar tela de login;
5. Preenhcer usuário e senha e clicar em "Fazer login";
6. Caso as informações fornecidas sejam válidas, a sessão será iniciada e o usuário será redirecionado para a tela de "minhas turmas", o cabeçalho deverá ter sido atualizado, mostrando um icone de "usuário";


## Atualizar dados cadastrais (Opções da conta) (RF-01)
A funcionalidade de atualizar dados cadastrais permite que o usuário atualize seus dados cadastrais, tal como e-mail, nome, sobrenome, telefone e senha. O usuário não pode modificar seu nome de usuário (identificador único utilizado para login) nem tipo de conta (aluno ou professor), o usuário poderá trocar seu e-mail, contanto que o novo e-mail informado não esteja em uso por nenhuma outra conta. Para realizar a atualização dos dados, o usuário deverá informar sua senha atual. O usuário poderá também optar por apagar sua conta.

## Frontend Web
### Menu do usuário para acesso a tela de "meus dados"
![meusDadosA1](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/190ebc3e-2190-4eed-9355-bd8d58477e3f)

### Tela de atualizar dados cadastrais
![meusDadosA](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/83bdd3b5-37a6-4ad6-a29e-83f90a33e474)

### Tela de atualizar dados cadastrais - Senha solicitada após tentar mudar dado
![meusDadosB](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/c7d15e4b-f5a0-41ef-a6b5-76ebbf4e31f7)

## Frontend Mobile
### Menu do usuário para acesso a tela de "Atualizar dados cadastrais"
![cabecalhoLoginOpcoesPerfil](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/240fd320-2d4f-4873-b919-c4d8e67ffd20)

### Tela de atualizar dados cadastrais
![atualizarDadosCadastrais](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/d035a277-a535-4ff8-b404-b62cc98dd95a)

### Tela de atualizar dados cadastrais - Senha solicitada após tentar mudar dado
![atualizarDadosCadastrais2](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/42faf735-1fc4-4d66-8495-8d3dc37bf056)

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

### Frontend Web
- accountOptions.js
- accountOptionsComponent.js
- navbar.js
- 
### Frontend Mobile
- accountOptionsPage.js
- auth.services.js

### Instruções de acesso (Frontend Web)
1. Realizar login;
2. Clicar na seta ao lado do seu nome no cabeçalho para abrir o menu de opções do usuário;
3. Clicar na opção "Perfil";
4. Visualizar tela de atualizar dados cadastrais;
5. Preencher as informações solicitadas relativas aos dados que deseja atualizar e clicar em "confirmar", ou clicar em "apagar conta" caso deseje apagar sua conta;
6. Caso as informações fornecidas sejam válidas, uma mensagem de sucesso será exibida e o usuário será redirecionado para a tela de minhas turmas;

### Instruções de acesso (Frontend Mobile)
1. Realizar login;
2. Clicar no icone de usuário no cabeçalho para abrir o menu de opções do usuário;
3. Clicar na opção "Perfil";
4. Visualizar tela de atualizar dados cadastrais;
5. Preencher as informações solicitadas relativas aos dados que deseja atualizar e clicar em "atualizar dados", ou clicar em "apagar conta" caso deseje apagar sua conta;
6. Caso as informações fornecidas sejam válidas, uma mensagem de sucesso será exibida e o usuário será redirecionado para a homepage;

## Cadastro e edição de turmas por professor (RF-02)
A funcionalidade de cadastro de turmas permite que um usuário do tipo "Professor" cadastre uma nova turma em seu nome, fornecendo o nome e descrição da turma, além de poder decidir se a turma está ativa ou não (turmas não ativas não aparecem para os alunos na busca de turmas). As turmas cadastradas poderão então ser visualizadas na tela de "Minhas turmas" do professor, aonde poderão ser editadas ou apagadas clicando nos botões correspondentes.

## Frontend Web
### Tela de "minhas turmas" (opção de "Nova turma")
![cadastroTurmasA](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/9cb86be1-ab33-4a52-9a1a-a01c1358f036)

### Tela de cadastro de turma
![criarTurma](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/c8051ffd-8a6f-474e-b50b-b9f5218c17bc)

### Tela de "minhas turmas" (opção de editar turma)
![cadastroTurmasC](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/e5056cdb-25ef-4d5e-9ae7-25551126e94c)

### Tela de editar turma
![editarTurma](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/12c3dd37-c6e1-400a-ba80-90761824b296)

## Frontend Mobile
### Tela de "minhas turmas" (opção de "Criar")
![criarTurma1](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/703acb90-0b52-44a7-be91-003fca16e1b7)

### Tela de cadastro de turma
![criarTurma2](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/c96ab3ac-177c-4e19-9ebd-bb2d3d99aa03)

### Tela de "minhas turmas" (opção de editar turma)
![criarTurma3](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/1dcfee30-c901-4498-ac5e-6b6a98a2840e)

### Tela de editar turma
![criarTurma4](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/37044747-ad74-44f4-be22-a51678ba8551)

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
### Frontend Web
- MinhasTurmas.js
- MinhasTurmasProfessorComponent.js
- criarTurma.js
- criarTurmaFormComponent.js
- editarTurma.js
- editarTurmaFormComponent.js
### Frontend Mobile
- MinhasTurmasPage.js
- CriarTurmaPage.js
- EditarTurmaPage.js
- turmas.services.js

### Instruções de acesso (Frontend Web)
1. Realizar login em uma conta do tipo "Professor";
2. Caso já não esteja na tela de "minhas turmas", abrir o menu de opções do usuário clicando no seu nome no cabeçalho e clicar em "Turmas";
3. Visualizar tela de "Minhas turmas";
5. Clicar em "Nova turma";
6. Visualiar tela de cadastro de turma;
7. Preencher as informaçõs solicitadas e clicar em "Cadastrar turma";
8. Caso as informações fornecidas sejam válidas, uma mensagem de sucesso será exibida e o usuário será redirecionado para a tela de "Minhas turmas";
9. Caso deseje editar ou apagar uma das turmas criadas, clicar em "Editar" ou "Apagar". A opção de "Editar" redirecionará um usuário para uma tela similar a tela de cadastro de turmas onde ele poderá substituir as informações anteriormente cadastradas ao clicar em "Atualizar dados";

### Instruções de acesso (Frontend Mobile)
1. Realizar login em uma conta do tipo "Professor";
2. Caso já não esteja na tela de "minhas turmas", abrir o menu de opções do usuário clicando no seu nome no cabeçalho e clicar em "Minhas Turmas";
3. Visualizar tela de "Minhas turmas";
5. Clicar em "Criar";
6. Visualiar tela de cadastro de turma;
7. Preencher as informaçõs solicitadas e clicar em "Criar turma";
8. Caso as informações fornecidas sejam válidas, uma mensagem de sucesso será exibida e o usuário será redirecionado para a tela de "Minhas turmas";
9. Caso deseje editar ou apagar uma das turmas criadas, clicar em "Editar" ou "Apagar". A opção de "Editar" redirecionará um usuário para uma tela similar a tela de cadastro de turmas onde ele poderá substituir as informações anteriormente cadastradas ao clicar em "Atualizar dados";

## Cadastro e edição de atividades em turma por professor (RF-03)
A funcionalidade de cadastro de atividades permite que um usuário do tipo "Professor" cadastre uma nova atividade em uma das suas turmas, deixando-a disponível para realização pelos alunos. Uma vez cadastrada, a atividade aparecerá na página de "detalhes" da turma em questão, que por sua vez é acessada ao clicar em "Abrir" em alguma turma presente na tela de "minhas turmas".

## Frontend Web
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

## Frontend Mobile
### Tela de detalhes da turma (opção de criar atividade)
![criarAtividade1](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/1104095e-a0cc-4fbf-865b-38f542aec15d)

### Tela de cadastro de atividade
![criarAtividade2](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/4e6f733b-8c83-4093-a83c-040eab4fc109)

### Modal de cadastro de questão
![criarAtividade3](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/3a87b8ce-2b22-427f-a663-717ca83a8d88)

### Modal de cadastro de questão (Preenchido)
![criarAtividade4](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/44c0c7e1-03be-4326-8007-90ebb6cb53eb)

### Tela de cadastro de atividade (Preenchida)
![criarAtividade5](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/5ed48396-a4bc-42fc-9e5b-6107fface3c4)

### Tela de detalhes da turma (Com atividade nova)
![criarAtividade6](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/5747dc72-0417-487e-bf14-e9d5211f76dd)


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

### Frontend Web
- visualizarAtividade.js
- VisualizarAtividadeComponent.js
- criarAtividade.js
- CriarAtividadeFormComponent.js
- editarAtividade.js
- EditarAtividadeFormComponent.js
### Frontend Mobile
- VisualizarTurmaPage.js
- CriarAtividadePage.js
- EditarAtividadePage.js
- turmas.services.js
- atividades.services.js

### Instruções de acesso (Frontend Web)
1. Realizar login com uma conta do tipo "professor";
2. Caso já não esteja na tela de "minhas turmas", abrir o menu de opções do usuário clicando no seu nome no cabeçalho e clicar em "Turmas";
3. Visualizar tela de "Minhas turmas";
4. Selecionar uma turma e clicar em "Abrir";
5. Visualizar tela de detalhes da turma;
6. Clicar em "Criar atividade";
7. Preencher as informaçõs solicitadas, adicionar as questões uma a uma clicando em "Adicionar questão" e por fim clicar em "Cadastrar atividade";
8. Caso as informações fornecidas sejam válidas, uma mensagem de sucesso será exibida e o usuário será redirecionado para a tela de "detalhes da turma";
9. Caso deseje editar ou apagar uma das atividades criadas, clicar nos ícones de "Editar" (Lápis cinza) ou "Apagar" (Lixeira vermelha). A opção de "Editar" redirecionará um usuário para uma tela similar a tela de cadastro de atividade onde ele poderá substituir as informações anteriormente cadastradas ao clicar em "Atualizar atividade";

### Instruções de acesso (Frontend Mobile)
1. Realizar login com uma conta do tipo "professor";
2. Caso já não esteja na tela de "minhas turmas", abrir o menu de opções do usuário clicando no seu nome no cabeçalho e clicar em "Turmas";
3. Visualizar tela de "Minhas turmas";
4. Selecionar uma turma e clicar em "Abrir";
5. Visualizar tela de detalhes da turma;
6. Clicar em "Criar atividade";
7. Preencher as informaçõs solicitadas, adicionar as questões uma a uma clicando em "Adicionar questão" e por fim clicar em "Cadastrar atividade";
8. Caso as informações fornecidas sejam válidas, uma mensagem de sucesso será exibida e o usuário será redirecionado para a tela de "detalhes da turma";
9. Caso deseje editar ou apagar uma das atividades criadas, clicar nos ícones de "Editar" (Lápis cinza) ou "Apagar" (Lixeira vermelha). A opção de "Editar" redirecionará um usuário para uma tela similar a tela de cadastro de atividade onde ele poderá substituir as informações anteriormente cadastradas ao clicar em "Editar atividade";

## Busca de turmas (RF-04)
A funcionalidade de busca de turmas permite que o usuário do tipo "aluno" busque uma turma entre todas as turmas cadastradas que estejam com o status "Ativa", o usuário poderá filtrar a busca pelo nome da turma ou pelo nome/email do professor, facilitando a localização da turma que deseja encontrar.

## Frontend Web
### Tela de "Minhas turmas" (Aluno)
![buscarTurmaA](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/798454a6-3d74-42fc-a29d-e0b0ea2c65fe)

### Tela de buscar turma
![buscarTurmaB](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/81c2d907-4a7b-4811-ba69-4c97bad90e55)

### Tela de buscar turma (resultados filtrados)
![buscarTurmaC](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/160a261a-6119-497d-94df-54a7febd085b)

## Frontend Mobile
### Tela de "Minhas turmas" (Aluno)
![buscarTurma1](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/b20ac447-43ff-454a-b8d3-9e0ebe3724e6)

### Tela de buscar turma
![buscarTurma2](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/bf224beb-a147-4891-8f23-317df48a75bd)

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

### Frontend Web
- buscarTurmas.js
- BuscarTurmasComponent.js

### Frontend Mobile
- MinhasTurmasPage.js
- BuscarTurmaPage.js
- turmas.services.js

### Instruções de acesso (Frontend Web)
1. Realizar login com uma conta do tipo "aluno";
2. Caso já não esteja na tela de "minhas turmas", abrir o menu de opções do usuário clicando no seu nome no cabeçalho e clicar em "Turmas";
3. Visualizar tela de "Minhas turmas";
4. Inserir os termos de busca desejados no campo de "buscar turma" e clicar no icone da lupa para realizar a busca;
5. Visualizar a tela de buscar turmas;
6. Digitar os termos de busca nos campos "Buscar por nome da turma" ou "Buscar por nome/email do professor" para filtrar os resultados;

### Instruções de acesso (Frontend Mobile)
1. Realizar login com uma conta do tipo "aluno";
2. Caso já não esteja na tela de "minhas turmas", abrir o menu de opções do usuário clicando no seu nome no cabeçalho e clicar em "Turmas";
3. Visualizar tela de "Minhas turmas";
4. Inserir os termos de busca desejados no campo de "buscar turma" e clicar no icone da lupa para realizar a busca;
5. Visualizar a tela de buscar turmas;
6. Digitar os termos de busca nos campos "Buscar por nome da turma" ou "Buscar por nome/email do professor" para filtrar os resultados;

## Matrícula em turma (RF-04 e RF-05)
A funcionalidade de matrícula em turma permite que o usuário do tipo "aluno" realize matrícula na turma desejada, tendo assim acessoa a realização de todas as atividades nela cadastradas.

## Frontend Web
### Tela de visualizar turma (botão "fazer matrícula aparece apenas para usuário tipo aluno)
![matriculaTurmaA](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/494dc3cc-63df-4590-b80b-f064f2eac89e)

### Tela de visualizar turma - mensagem de sucesso
![matriculaTurmaB](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/4338bafb-36d6-4925-9551-0e44bfb61014)

### Tela de visualizar turma (botão de "Cancelar matrícula" agora aparece)
![matriculaTurmaC](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/6175d21c-d92d-4626-97c5-e2f8457a9ba6)

### Tela de "Minhas turmas" - Aluno (Agora com a turma em que ele se matriculou)
![matriculaTurmaD](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/3e244de9-ce83-4f64-baa2-7f444c3696ec)

## Frontend Mobile
### Tela de "Buscar Turma"
![matriculaEmTurma1](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/14d81f5e-a316-4e43-a180-c5037d5876ab)

### Tela de visualizar turma (botão "fazer matrícula aparece apenas para usuário tipo aluno)
![matriculaEmTurma2](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/3298fe96-3078-43c9-8a14-b1186fbf157b)

### Tela de visualizar turma - mensagem de sucesso
![matriculaEmTurma3](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/ed0a819d-b7d0-4933-b414-46626b2e39ba)

### Tela de "Minhas turmas" - Aluno (Agora com a turma em que ele se matriculou)
![matriculaEmTurma6](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/0f71b0de-985c-4253-b287-899f43555e20)

### Tela de visualizar turma (Cancelar Matricula)
![matriculaEmTurma4](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/d1b5d0ce-9a53-47b3-b470-591d443d0b1a)
![matriculaEmTurma5](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/1515c35a-c37c-457d-9f3c-34f6565b0b79)


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

### Frontend Web
- visualizarTurma.js
- visualizarTurmaComponent.js

### Frontend Mobile
- BuscarTurmaPage.js
- VisualizarTurmaPage.js
- MinhasTurmasPage.js
- turmas.services.js

### Instruções de acesso (Frontend Web)
1. Realizar login com uma conta do tipo "aluno";
2. Caso já não esteja na tela de "minhas turmas", abrir o menu de opções do usuário clicando no seu nome no cabeçalho e clicar em "Turmas";
3. Visualizar tela de "Minhas turmas";
4. Inserir os termos de busca desejados no campo de "buscar turma" e clicar no icone da lupa para realizar a busca;
5. Visualizar a tela de buscar turmas;
6. Selecionar a turma desejada;
7. Clicar em "Fazer matricula";
8. Caso a matrícula ocorra com sucesso, uma mensagem de sucesso será exibida;
9. Caso deseje cancelar a matrícula, basta clicar no botão de "Cancelar matrícula".

### Instruções de acesso (Frontend Mobile)
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


## Frontend Mobile
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

## Frontend Web
### Tela de visualizar turma (Selecionar atividade)
![fazerAtividade1](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/cd62faef-0699-4741-a20d-632fd3698c49)

### Tela de visualizar atividade 
![fazerAtividade2](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/6f21538d-669c-46e5-947a-d39fcffbda42)

### Tela de realizar atividade
![fazerAtividade3](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/8aebc0cd-b236-4b5e-987b-fdbd52defb3f)

### Tela de resultado da atividade
![fazerAtividade4](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/e45ec8ee-3496-4997-b97b-9586b5c4efed)

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

### Frontend Mobile
- VisualizarAtividadePage.js
- FazerAtividadePage.js
- VisualizarResultadoPage.js
- turmas.services.js
- atividades.services.js
- resultados.services.js

### Instruções de acesso (Frontend Web)
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

### Instruções de acesso (Frontend Mobile)
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
11. Caso todas as respostas tenham sido preenchidas, o usuário será redirecionado para a tela de visualizar resultado;
12. Visualizar resultado;
13. Clicar em "Voltar" para voltar para a tela de visualizar atividade;

## Visualização de métricas/notas por aluno e professor (RF-07 e RF-08)
A funcionalidade de visualização de métricas/notas permitem que o usuário visualize a nota obtida por um usuário para todas as atividades em uma determinada turma (no caso de atividades que permitem mais de uma tentativa, a nota exibida/mantida será a maior nota entre todas as tentativas do daquele usuário para aquela atividade). Para o usuário do tipo "aluno", o único usuário cujas notas ele poderá visualizar é ele mesmo, no caso do usuário do tipo "professor", uma tela de selecionar aluno aparecerá caso ele seja o dono da turma, na qual ele poderá selecionar qualquer aluno da turma e visualizar suas notas. 

## Frontend Web
### Tela de visualizar turma (Selecionar "notas")
![notasA](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/4c069d6f-acc5-48ae-a6cc-04f283d93c9c)

### Tela de selecionar aluno (Apenas para usuário "Professor)
![notasB](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/cdaec103-c746-4446-8838-579aa83d5178)

### Tela de visualizar notas
![notasC](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/8ddaa504-1cd4-454c-93d1-2f1290d5a53a)

### Tela de visualizar notas (busca de atividade)
![notasD](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/00ffc7e0-a521-4a09-97e2-cdbb7e268165)

## Frontend Mobile
### Tela de visualizar turma (Selecionar "notas")
![visualizarNota1](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/98aec044-eca0-4f28-91af-b2fa9e69c373)
![visualizarNota4](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/e0e0f7e2-a3dc-41f2-ae7c-ce5858ac55ec)

### Tela de selecionar aluno (Apenas para usuário "Professor)
![visualizarNota6](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/d260692b-9bd3-47c9-9ab6-fa42d4398cdd)

### Tela de visualizar notas
![visualizarNota3](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/dc827dd5-9be9-4629-a325-44ea47570590)

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

### Frontend Web
- visualizarAtividade.js
- visualizarAtividadeComponent.js
- visualizarNotas.js
- visualizarAlunosTurmaComponent.js
- visualizarNotasComponent.js

### Fronten Mobile
- VisualizarNotaPage.js
- SelecionarAlunoPage.js
- VisualizarTurmaPage.js
- turmas.services.js
- resultados.serviceos.js

### Instruções de acesso (Frontend Web)
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

### Instruções de acesso (Frontend Mobile)
1. Realizar login;
2. Caso já não esteja na tela de "minhas turmas", abrir o menu de opções do usuário clicando no seu nome no cabeçalho e clicar em "Turmas";
3. Visualizar tela de "Minhas turmas";
4. Selecionar uma turma e clicar em "Abrir";
5. Visualizar tela de detalhes da turma;
6. Clicar no botão "Notas";
7. Caso esteja logado numa conta do tipo "Professor", visualizar a tela de selecionar aluno e clicar no aluno cujas notas deseja visualizar;
8. Caso esteja logado numa conta do tipo "Aluno", o usuário será automaticamente redirecionado para a tela de visualizar notas contendo suas notas;
9. Visualizar a tela de "Visualizar notas";

## Recebimento e visualização de notificações  (RF-09 e RF-10)
A funcionalidade de recebimento e visualização de notificações permite que o usuário do tipo aluno seja notificado quando uma atividade de uma turma na qual ele está matriculado está perto do prazo de vencimento ou quando uma nova atividade é cadastrada em uma das turmas da qual ele faz parte. 

## Frontend Web
### Icone de notificações
![NotificacaoIcon](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/179d3449-bde1-432b-9d21-358e8e718d2e)

### Tela de visualizar notificações
![Notificacao](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/71572c9e-68b1-4c16-840f-72fb6d71cb14)

## Frontend Mobile
### Icone de notificações
![notM](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/fc1ec776-9e5f-4a97-93c7-f709a95489b2)

### Tela de visualizar notificações
![notMb](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/assets/74699119/74300ca8-1bb7-4a67-803d-53e186078bde)

### Requisitos atendidos
- RF-09
- RF-10

### Estrutura de Dados

Na tela de visualizar notificações, os dados das notificações para o usuário atual são recuparadas na seguinte estrutura JSON:
```
{
    "userId": 7004,
    "numeroDeNotificacoesNaoLidas": 0,
    "notificacoes": [
        {
            "titulo": "Nova atividade criada na turma 'Turma'",
            "conteudo": "Atividade 'Tx' foi recém criada na turma 'Turma'.",
            "data": "2023-06-14T23:22:43.632Z"
        },
        {
            "titulo": "Nova atividade criada na turma 'Turma'",
            "conteudo": "Atividade 'TesteNova' foi recém criada na turma 'Turma'.",
            "data": "2023-06-14T23:22:43.632Z"
        },
        {
            "titulo": "Atividade 'Teste' perto do prazo de entrega!",
            "conteudo": "A atividade 'Teste' da turma 'Turma' vence em 3 dias!",
            "data": "2023-06-14T23:22:43.656Z"
        },
        {
            "titulo": "Atividade 'Teste' perto do prazo de entrega!",
            "conteudo": "A atividade 'Teste' da turma 'Turma' vence em 2 dias!",
            "data": "2023-06-15T22:42:31.496Z"
        },
        {
            "titulo": "Nova atividade criada na turma 'Turma'",
            "conteudo": "Atividade 'Nova atividade' foi recém criada na turma 'Turma'.",
            "data": "2023-06-18T00:17:13.103Z"
        }
    ],
    "dataAtualizacao": "2023-06-25T22:22:26.8558642Z"
}
```

### Artefatos da funcionalidade

#### Models
- CaixaDeNotificacoesMongoDb.cs
- NotificacaoMongoDb.cs
- 
#### Services
- CaixaDeNotificacoesMongoDbService.cs

#### DTO
- UsuarioInfoDto.cs

#### Controllers
- UsuariosController.cs

### Frontend Web
- notificacoes.js
- visualizarNotificacoesComponent.js
- navbar.js

### Fronten Mobile
- NotificationsPage.js
- auth.services.js
- NavbarComponent.js

### Instruções de acesso (Frontend Web)
1. Realizar login;
2. Clicar no icone de sino presente no cabeçalho;
3. Visualizar notificações.

### Instruções de acesso (Frontend Mobile)

1. Realizar login;
2. Clicar no icone de sino presente no cabeçalho;
3. Visualizar notificações.
