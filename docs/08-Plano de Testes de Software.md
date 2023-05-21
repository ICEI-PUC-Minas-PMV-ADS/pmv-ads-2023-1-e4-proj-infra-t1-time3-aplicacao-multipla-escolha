# Plano de Testes de Software

Nesta seção são apresentados os cenários de testes utilizados na realização dos testes da aplicação, bem como sua descrição e critérios de êxito.

## Testes de Unidade

Os testes de unidade serão aplicados em todos os métodos que não realizem comunicação direta com o banco de dados (sendo estes testados nos testes de integração). Para métodos que recebem dados recuperados do banco de dados, mas que não fazem a comunicação diretamente, serão criados objetos criados na fase de arranjo dos testes com as informações necessárias para simular o recebimento de um objeto recuperado do banco de dados pelo ORM da aplicação. Dado essas limitações, apenas as classes Model "Usuario.cs", "Atividade.cs" e "AtividadeMongoDb.cs" passarão por testes de unidade, uma vez que apenas elas possuem métodos que não necessitam de comunicação direta com o banco de dados.

|Caso de Teste|CT-001 Testar método CheckIfUserNameOrEmailIsAlreadyUsed do Model "Usuario.cs"|
|------|---------|
|Tipo de Teste|Unidade|
|Objetivo do Teste|Testar o método CheckIfUserNameOrEmailIsAlreadyUsed, utilizado durante o cadastro ou atualização de dados de um usuário para ver se o nome de usuário e email informados estão disponíveis.|
|Passos|Serão criados testes de unidade utilizando o NUnit para testar o retorno do método checkIfUserNameOrEmailIsAlreadyUsed sob diferentes inputs |
|Requisitos que motivaram o teste|RF-001 Permitir que o usuário se cadastre como professor ou aluno.|
|Critérios de êxito|Todos os testes de unidade devem passar ao serem executados.|

|Caso de Teste|CT-002 Testar o método CheckIfUserCanTakeTest do Model "Atividade.cs"|
|------|---------|
|Tipo de Teste|Unidade|
|Objetivo do Teste|Testar o método CheckIfUserCanTakeTest, utilizado para verificar se o usuário já extrapolou o número de tentativas ou se perdeu o prazo para realização de uma determinada atividade.|
|Passos|Serão criados testes de unidade utilizando o NUnit para testar o retorno do método CheckIfUserCanTakeTest sob diferentes inputs |
|Requisitos que motivaram o teste|RF-006 Permitir que o usuário do tipo "aluno" possa realizar qualquer atividade de multipla escolha que não esteja com o prazo vencido ou com o limite de tentativas alcançado.|
|Critérios de êxito|Todos os testes de unidade devem passar ao serem executados.|

|Caso de Teste|CT-003 Testar o método Corrigir do Model "AtividadeMongoDb.cs"|
|------|---------|
|Tipo de Teste|Unidade|
|Objetivo do Teste|Testar o método Corrigir, utilizado para realizar a correção de uma atividade a partir das respostas submetidas pelo aluno e retornar a nota e a correção da atividade para o aluno.|
|Passos|Serão criados testes de unidade utilizando o NUnit para testar o retorno do método Corrigir sob diferentes inputs |
|Requisitos que motivaram o teste|RF-006 Permitir que o usuário do tipo "aluno" possa realizar qualquer atividade de multipla escolha que não esteja com o prazo vencido ou com o limite de tentativas alcançado.<br>RF-007 Permitir que o aluno tenha acesso as próprias métricas relativas às atividades de multipla escolha que já realizou.	|
|Critérios de êxito|Todos os testes de unidade devem passar ao serem executados.|
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
