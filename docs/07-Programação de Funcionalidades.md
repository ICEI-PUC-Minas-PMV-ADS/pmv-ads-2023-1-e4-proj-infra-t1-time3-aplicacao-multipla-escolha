Nesta seção são exibidas as telas correspondentes a cada funcionalidade da aplicação com suas respectivas instruções de acesso.

Para rodar a aplicação localmente, seguir os seguintes passos:

API:
- Realizar a instalação do Visual Studio Community 2022 e do MongoDB na sua máquina caso já não estejam instalados;
- Fazer o download do arquivo do projeto (ZIP) ou clone do projeto no GitHub;
- Abrir o arquivo "multipla_escolha_api.sln" (Presente na pasta backend/Api/multipla-escolha-api) no Visual Studio;
- Executar o comando "update-database" no console do Package Manager para criar as tabelas do banco de dados localmente através dos arquivos "migrations" do Entity Framework Core;
- Rodar o projeto em modo de desenvolvimento no Visual Studio, que deverá abrir uma janela do browser no endereço https://localhost:7284/swagger/index.html, exibindo a -- - interface do Swagger para utilização dos endpoints da API;

Frontend:
- Após rodar a API conforme as instruções detalhadas acima, abrir o arquivo "multipla_escolha_api.sln" (Presente na pasta backend/Api/multipla-escolha-api) no Visual Studio;
- Abrir o Visual Studio Code e rodar o projeto presente na pasta frontend/multipla-escolha com o comando npm start;
- Abrir o navegador na URL http://localhost:3000 para acessar a homepage;

Uma vez que o projeto esteja rodando localmente, basta seguir as instruções abaixo para utilizar cada funcionalidade através do frontend em React. As funcionalidades também podem ser testadas a partir da interface do Swagger, fornecendo os parâmetros solicitados para cada endpoint. É importante ressaltar que a maioria dos endpoints da API requer autenticação para retornar resposta, sendo necessário fazer o login de usuário através do endereço http://localhost:3000/login para o frontend em React ou pelo endpoint /api/Usuarios/authenticate pelo Swagger.

## Cadastro de usuário(RF-01)
A funcionalidade de cadastro de usuário permite que um novo usuário se registre como "Aluno" ou "Professor", obtendo uma conta que pode utilizar para acessar as demais funcionalidades do sistema.

### Tela de Cadastro
![cadastro](https://user-images.githubusercontent.com/74699119/235332970-ec5a7931-c7ad-4721-93a5-5357bfe3cdcb.png)

### Requisitos atendidos
- RF-01

### Artefatos da funcionalidade

#### Models
- Usuario.cs
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
