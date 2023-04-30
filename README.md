# Multípla Escolha

`ANÁLISE E DESENVOLVIMENTO DE SISTEMAS`

`Desenvolvimento de uma Aplicação Distribuída`

`QUARTO SEMESTRE`

Com o intuito de facilitar o processo de adaptação de alunos e professores pós covid-19, em que o cenário educacional sofreu diversas mudanças e trazer maior comodidade ao dia-a-dia do mundo acadêmico, teve-se a ideia de desenvolver uma aplicação distribuída com interfaces web e mobile que forneça um ambiente de fácil acesso para que os profissionais da educação possam submeter atividades, materiais de apoio e testes, tanto via dispositivo móvel quanto a partir interface web acessada via computador. Nossa aplicação, concebida a partir de tal necessidade, chama-se "Multípla Escolha", e visa trazer comodidade aos usuários professores que irão submeter esses materiais tanto quanto para os usuários alunos que irão consumi-los.

## Integrantes

* Álvaro Alfaya Fonseca
* Denio Gonçalves de Lima
* Hestefani Romão Durães
* Mychel Costa da Silva
* Sérgio Luiz De Menezes Filho
* Talles Monteiro Góis

## Orientador

* Felipe Augusto Lara Soares

## Instruções de utilização

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

Mais detalhes sobre a utilização da aplicação podem ser vistos na [Seção 7 - Progamação de funcionalidades](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-1-e4-proj-infra-t1-time3-aplicacao-multipla-escolha/blob/main/docs/07-Programa%C3%A7%C3%A3o%20de%20Funcionalidades.md)

# Documentação

<ol>
<li><a href="docs/01-Documentação de Contexto.md"> Documentação de Contexto</a></li>
<li><a href="docs/02-Especificação do Projeto.md"> Especificação do Projeto</a></li>
<li><a href="docs/03-Metodologia.md"> Metodologia</a></li>
<li><a href="docs/04-Projeto de Interface.md"> Projeto de Interface</a></li>
<li><a href="docs/05-Arquitetura da Solução.md"> Arquitetura da Solução</a></li>
<li><a href="docs/06-Template Padrão da Aplicação.md"> Template Padrão da Aplicação</a></li>
<li><a href="docs/07-Programação de Funcionalidades.md"> Programação de Funcionalidades</a></li>
<li><a href="docs/08-Plano de Testes de Software.md"> Plano de Testes de Software</a></li>
<li><a href="docs/09-Registro de Testes de Software.md"> Registro de Testes de Software</a></li>
<li><a href="docs/10-Plano de Testes de Usabilidade.md"> Plano de Testes de Usabilidade</a></li>
<li><a href="docs/11-Registro de Testes de Usabilidade.md"> Registro de Testes de Usabilidade</a></li>
<li><a href="docs/12-Apresentação do Projeto.md"> Apresentação do Projeto</a></li>
<li><a href="docs/13-Referências.md"> Referências</a></li>
</ol>

# Código

<li><a href="src/README.md"> Código Fonte</a></li>

# Apresentação

<li><a href="presentation/README.md"> Apresentação da solução</a></li>
