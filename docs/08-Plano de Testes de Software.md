# Plano de Testes de Software

Nesta seção são apresentados os cenários de testes utilizados na realização dos testes da aplicação, bem como sua descrição e critérios de êxito.

## Testes de Unidade

Os testes de unidade serão aplicados em todos os métodos que não realizem comunicação direta com o banco de dados (sendo estes testados nos testes de integração). Para métodos que recebem dados recuperados do banco de dados, mas que não fazem a comunicação diretamente, serão criados objetos criados na fase de arranjo dos testes com as informações necessárias para simular o recebimento de um objeto recuperado do banco de dados pelo ORM da aplicação. Dado essas limitações, apenas as classes Model "Usuario.cs", "Atividade.cs" e "AtividadeMongoDb.cs" passarão por testes de unidade, uma vez que apenas elas possuem métodos que não necessitam de comunicação direta com o banco de dados.

|Caso de Teste|CTU-001 Testar método CheckIfUserNameOrEmailIsAlreadyUsed do Model "Usuario.cs"|
|------|---------|
|Tipo de Teste|Unidade|
|Objetivo do Teste|Testar o método CheckIfUserNameOrEmailIsAlreadyUsed, utilizado durante o cadastro ou atualização de dados de um usuário para ver se o nome de usuário e email informados estão disponíveis.|
|Passos|Serão criados testes de unidade utilizando o NUnit para testar o retorno do método checkIfUserNameOrEmailIsAlreadyUsed sob diferentes inputs |
|Requisitos que motivaram o teste|RF-001 Permitir que o usuário se cadastre como professor ou aluno.|
|Critérios de êxito|Todos os testes de unidade devem passar ao serem executados.|

|Caso de Teste|CTU-002 Testar o método CheckIfUserCanTakeTest do Model "Atividade.cs"|
|------|---------|
|Tipo de Teste|Unidade|
|Objetivo do Teste|Testar o método CheckIfUserCanTakeTest, utilizado para verificar se o usuário já extrapolou o número de tentativas ou se perdeu o prazo para realização de uma determinada atividade.|
|Passos|Serão criados testes de unidade utilizando o NUnit para testar o retorno do método CheckIfUserCanTakeTest sob diferentes inputs |
|Requisitos que motivaram o teste|RF-006 Permitir que o usuário do tipo "aluno" possa realizar qualquer atividade de multipla escolha que não esteja com o prazo vencido ou com o limite de tentativas alcançado.|
|Critérios de êxito|Todos os testes de unidade devem passar ao serem executados.|

|Caso de Teste|CTU-003 Testar o método Corrigir do Model "AtividadeMongoDb.cs"|
|------|---------|
|Tipo de Teste|Unidade|
|Objetivo do Teste|Testar o método Corrigir, utilizado para realizar a correção de uma atividade a partir das respostas submetidas pelo aluno e retornar a nota e a correção da atividade para o aluno.|
|Passos|Serão criados testes de unidade utilizando o NUnit para testar o retorno do método Corrigir sob diferentes inputs |
|Requisitos que motivaram o teste|RF-006 Permitir que o usuário do tipo "aluno" possa realizar qualquer atividade de multipla escolha que não esteja com o prazo vencido ou com o limite de tentativas alcançado.<br>RF-007 Permitir que o aluno tenha acesso as próprias métricas relativas às atividades de multipla escolha que já realizou.	|
|Critérios de êxito|Todos os testes de unidade devem passar ao serem executados.|

## Testes de Integração

Os testes de unidade serão aplicados para testar a integração da aplicação com o banco de dados, testando diversos cenários nos quais espera-se que uma certa operação obtenha sucesso ou falhe (por exemplo, tentar salvar um dado com uma chave única duplicada no banco de dados, o que não deveria acontecer). Para garantir que o banco de dados principal do projeto não seja afetado por esses testes, uma cópia com um nome aleatório (multipla-escolha seguido de um UUID aleatório) que é imediatamente apagada após a finalização dos testes. Assim como os testes de unidade, os testes de integração consistem em três fases: arranjo, ação e asserção. Após o arranjo das condições do teste e a execução das ações a serem testadas, determina-se se o teste foi bem sucedido ou não na fase de asserção.

|Caso de Teste|CTI-001 Verificar se as operações de salvar e recuperar usuários do banco de dados estão funcionando adequadamente|
|------|---------|
|Tipo de Teste|Integração|
|Objetivo do Teste|Testar se um usuário consegue ser salvo sem problemas no banco de dados, além de verificar se ao recuperar este usuário, ele corresponde ao que foi salvo. |
|Passos|Serão criados testes de integração utilizando o XUnit e o Entity Framework Core (para fazer a comunicação com o banco de dados temporário), testando se os resultados obtidos batem com os esperados na fase de asserção |
|Requisitos que motivaram o teste|RF-001 Permitir que o usuário se cadastre como professor ou aluno.|
|Critérios de êxito|Todos os testes de integração devem passar ao serem executados.|

|Caso de Teste|CTI-002 Verificar se o banco de dados impede que se salvem usuários com chaves únicas duplicadas (nome de usuário e e-mail) |
|------|---------|
|Tipo de Teste|Integração|
|Objetivo do Teste|Testar se o a aplicação impede que sejam salvos usuários que violem os constraints de "chave única" das colunas de nome de usuário e email da tabela "usuários". |
|Passos|Serão criados testes de integração utilizando o XUnit e o Entity Framework Core (para fazer a comunicação com o banco de dados temporário), testando se os resultados obtidos batem com os esperados na fase de asserção |
|Requisitos que motivaram o teste|RF-001 Permitir que o usuário se cadastre como professor ou aluno.|
|Critérios de êxito|Todos os testes de integração devem passar ao serem executados.|

|Caso de Teste|CTI-003 Salvar e recuperar uma turma associada a um usuário "professor" recém criado |
|------|---------|
|Tipo de Teste|Integração|
|Objetivo do Teste|Testar se a aplicação permite que sejam salvas novas turmas associadas a um professor sem maiores problemas. |
|Passos|Serão criados testes de integração utilizando o XUnit e o Entity Framework Core (para fazer a comunicação com o banco de dados temporário), testando se os resultados obtidos batem com os esperados na fase de asserção |
|Requisitos que motivaram o teste|RF-002 Permitir que o usuário do tipo "professor" cadastre novas turmas associadas a ele.|
|Critérios de êxito|Todos os testes de integração devem passar ao serem executados.|

|Caso de Teste|CTI-004 Salvar multíplas turmas associadas a um mesmo usuário "professor" recém criado e recupera-las filtrando pelo id do professor |
|------|---------|
|Tipo de Teste|Integração|
|Objetivo do Teste|Testar se a aplicação permite que sejam salvas multíplas turmas associadas ao mesmo professor e também se é possível recuperar todas elas através do id do professor. |
|Passos|Serão criados testes de integração utilizando o XUnit e o Entity Framework Core (para fazer a comunicação com o banco de dados temporário), testando se os resultados obtidos batem com os esperados na fase de asserção |
|Requisitos que motivaram o teste|RF-002 Permitir que o usuário do tipo "professor" cadastre novas turmas associadas a ele.|
|Critérios de êxito|Todos os testes de integração devem passar ao serem executados.|

|Caso de Teste|CTI-005 Salvar, editar e recuperar a turma recém editada |
|------|---------|
|Tipo de Teste|Integração|
|Objetivo do Teste|Testar se a aplicação permite que as informações de uma turma salva sejam modificadas sem maiores problemas. |
|Passos|Serão criados testes de integração utilizando o XUnit e o Entity Framework Core (para fazer a comunicação com o banco de dados temporário), testando se os resultados obtidos batem com os esperados na fase de asserção |
|Requisitos que motivaram o teste|RF-002 Permitir que o usuário do tipo "professor" cadastre novas turmas associadas a ele.|
|Critérios de êxito|Todos os testes de integração devem passar ao serem executados.|

|Caso de Teste|CTI-006 Matricular aluno em turma recém criada|
|------|---------|
|Tipo de Teste|Integração|
|Objetivo do Teste|Testar se a aplicação permite associar uma aluno recém criado a uma turma recém criada como aluno matriculado. |
|Passos|Serão criados testes de integração utilizando o XUnit e o Entity Framework Core (para fazer a comunicação com o banco de dados temporário), testando se os resultados obtidos batem com os esperados na fase de asserção |
|Requisitos que motivaram o teste|RF-004 Permitir que o usuário do tipo "aluno" se matricule em turmas existentes |
|Critérios de êxito|Todos os testes de integração devem passar ao serem executados.|

|Caso de Teste|CTI-007 Salvar e recuperar uma atividade associada a uma turma recém criada |
|------|---------|
|Tipo de Teste|Integração|
|Objetivo do Teste|Testar se a aplicação permite que sejam salvas novas atividades associadas a uma turma sem maiores problemas. |
|Passos|Serão criados testes de integração utilizando o XUnit e o Entity Framework Core (para fazer a comunicação com o banco de dados temporário), testando se os resultados obtidos batem com os esperados na fase de asserção |
|Requisitos que motivaram o teste|RF-003 Permitir que o usuário do tipo "professor" cadastre atividades de multipla escolha associadas as turmas das quais é dono, RF-005 Permitir que o usuário do tipo "aluno" tenha acesso a todas as atividades de multipla escolha cadastradas nas turmas das quais participa., RF-006 Permitir que o usuário do tipo "aluno" possa realizar qualquer atividade de multipla escolha que não esteja com o prazo vencido ou com o limite de tentativas alcançado. |
|Critérios de êxito|Todos os testes de integração devem passar ao serem executados.|

|Caso de Teste|CTI-008 Salvar multíplas atividades associadas a uma mesma turma recém criada e recupera-las filtrando pelo id da turma |
|------|---------|
|Tipo de Teste|Integração|
|Objetivo do Teste|Testar se a aplicação permite que sejam salvas multíplas atividades associadas a uma mesma turma e também se é possível recuperar todas elas através do id da turma. |
|Passos|Serão criados testes de integração utilizando o XUnit e o Entity Framework Core (para fazer a comunicação com o banco de dados temporário), testando se os resultados obtidos batem com os esperados na fase de asserção |
|Requisitos que motivaram o teste|RF-003 Permitir que o usuário do tipo "professor" cadastre atividades de multipla escolha associadas as turmas das quais é dono, RF-005 Permitir que o usuário do tipo "aluno" tenha acesso a todas as atividades de multipla escolha cadastradas nas turmas das quais participa., RF-006 Permitir que o usuário do tipo "aluno" possa realizar qualquer atividade de multipla escolha que não esteja com o prazo vencido ou com o limite de tentativas alcançado. |
|Critérios de êxito|Todos os testes de integração devem passar ao serem executados.|

|Caso de Teste|CTI-009 Salvar, editar e recuperar a atividade recém editada |
|------|---------|
|Tipo de Teste|Integração|
|Objetivo do Teste|Testar se a aplicação permite que as informações de uma atividade salva sejam modificadas sem maiores problemas. |
|Passos|Serão criados testes de integração utilizando o XUnit e o Entity Framework Core (para fazer a comunicação com o banco de dados temporário), testando se os resultados obtidos batem com os esperados na fase de asserção |
|Requisitos que motivaram o teste|RF-003 Permitir que o usuário do tipo "professor" cadastre atividades de multipla escolha associadas as turmas das quais é dono, RF-005 Permitir que o usuário do tipo "aluno" tenha acesso a todas as atividades de multipla escolha cadastradas nas turmas das quais participa., RF-006 Permitir que o usuário do tipo "aluno" possa realizar qualquer atividade de multipla escolha que não esteja com o prazo vencido ou com o limite de tentativas alcançado. |
|Critérios de êxito|Todos os testes de integração devem passar ao serem executados.|

|Caso de Teste|CTI-010 Salvar e recuperar resultado associado a uma atividade recém criada|
|------|---------|
|Tipo de Teste|Integração|
|Objetivo do Teste|Testar se a aplicação permite que as informações de um resultado sejam salvas associadas a uma atividade. |
|Passos|Serão criados testes de integração utilizando o XUnit e o Entity Framework Core (para fazer a comunicação com o banco de dados temporário), testando se os resultados obtidos batem com os esperados na fase de asserção |
|Requisitos que motivaram o teste|RF-007 Permitir que o aluno tenha acesso as próprias métricas relativas às atividades de multipla escolha que já realizou, RF-008 Permitir que o professor tenha acesso as métricas de desempenho de todos os alunos cadastrados em alguma de suas turmas|
|Critérios de êxito|Todos os testes de integração devem passar ao serem executados.|

|Caso de Teste|CTI-011 Salvar multiplos resultados associados a uma atividade e recuperar a maior nota entre eles |
|------|---------|
|Tipo de Teste|Integração|
|Objetivo do Teste|Testar se a aplicação permite que as informações de vários resultado sejam associados a uma atividade e se é possível recuperar a maior nota entre eles. |
|Passos|Serão criados testes de integração utilizando o XUnit e o Entity Framework Core (para fazer a comunicação com o banco de dados temporário), testando se os resultados obtidos batem com os esperados na fase de asserção |
|Requisitos que motivaram o teste|RF-007 Permitir que o aluno tenha acesso as próprias métricas relativas às atividades de multipla escolha que já realizou, RF-008 Permitir que o professor tenha acesso as métricas de desempenho de todos os alunos cadastrados em alguma de suas turmas.|
|Critérios de êxito|Todos os testes de integração devem passar ao serem executados.|

## Testes de Sistema
Os testes de sistema da aplicação serão realizados através da aplicação OWASP ZAP, que utiliza um servidor proxy para testar vulnerabilidades na solução.

## Ferramentas de Testes (Opcional)

### NUnit
Framework de testes de unidade para a plataforma dotnet. Foi utilizado como um projeto separado chamado "multipla-escolha-api.tests dentro da mesma solução (Solution) da Web API do projeto. O arquivo Usings.cs deste projeto é utilizado para importar todos os Models, Dtos e outras classes relevantes da aplicação, permitindo com que estes sejam utilizados para elaborar os testes, o conteúdo deste arquivo é mostrado abaixo como exemplo:

```
global using NUnit.Framework;
global using multipla_escolha_api.Models;
global using multipla_escolha_api.Models.DTO;
global using multipla_escolha_api.Models.MongoDb;
```
Para rodar os testes de unidade utilizando o NUnit, basta abrir o arquivo ".solution" da API no Visual Studio Community 2022 e selecionar a opção "Run All Tests" da aba "Test".

### XUnit
Framework de testes de unidade para a plataforma dotnet. Foi utilizado também no projeto separado "multipla-escolha-api.tests" para os testes de integração, especificamente devido a sua maior facilidade em operar com o Entity Framwork Core, utiliza o mesmo arquivo "usings" do NUnit.

### OWASP ZAP (Zed Attack Proxy)
Scanner de aplicações Web de código aberto que pode ser utilizado para identificação de vulnerabilidades nas aplicações.
