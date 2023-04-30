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
