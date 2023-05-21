# Plano de Testes de Software

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>

Apresente os cenários de testes utilizados na realização dos testes da sua aplicação. Escolha cenários de testes que demonstrem os requisitos sendo satisfeitos.

Enumere quais cenários de testes foram selecionados para teste. Neste tópico o grupo deve detalhar quais funcionalidades avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.
 
## Ferramentas de Testes (Opcional)

### NUnit
Framework de testes de unidade para a plataforma dotnet. Foi utilizado como um projeto separado chamado "multipla-escolha-api.nUnitTests dentro da mesma solução (Solution) da Web API do projeto. O arquivo Usings.cs deste projeto é utilizado para importar todos os Models, Dtos e outras classes relevantes da aplicação, permitindo com que estes sejam utilizados para elaborar os testes, o conteúdo deste arquivo é mostrado abaixo como exemplo:

```
global using NUnit.Framework;
global using multipla_escolha_api.Models;
global using multipla_escolha_api.Models.DTO;
global using multipla_escolha_api.Models.MongoDb;
```
Para rodar os testes de unidade utilizando o NUnit, basta abrir o arquivo ".solution" da API no Visual Studio Community 2022 e selecionar a opção "Run All Tests" da aba "Test".
