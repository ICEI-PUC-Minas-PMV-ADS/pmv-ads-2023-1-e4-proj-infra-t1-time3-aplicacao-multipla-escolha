# Plano de Testes de Usabilidade

O teste de usabilidade permite avaliar a qualidade da interface com o usuário da aplicação interativa. 

Os testes de usabilidade serão realizados com pessoas de fora da equipe supervisionadas por membros da equipe, adotando-se o modelo de descoberta de problemas. Os usuários selecionados serão instruidos a realizar tarfeas relacionadas a funcionalidades do sistema e observados pelos membros da equipe sem ajuda dos mesmos. Os supervisores observarão o uso do sistema pelos usuários e farão anotações sobre possíveis dificuldades que estes venham a ter no uso. Após finalizados os testes, os supervisores perguntarão também sobre possíveis sugestões dos usuários sobre melhorias na usabilidade do sistema. Os resultados de cada teste serão descritos na seção de "Registros de Testes de Usabilidade" presente neste repositório.

As tabelas abaixo demonstram cada caso de teste:

<table> 
<tr><th>Caso de Teste </th>
<th>CT-01 – Realizar cadastro na plataforma</th></tr>
<tr><th>Objetivo do teste</th>
  <th>•	Verificar a usabilidade da funcionalidade de cadastro na plataforma como aluno ou professor</th></tr>
<tr><th>Ações esperadas</th>
  <th>1 - Usuário visualiza a homepage da aplicação.<br>
 2- Usuário clica na opção de "Fazer login" presente no cabeçalho.<br>
 3– Usuário visualiza a tela de login e clica no botão "Cadastre-se".<br>
 4- Usuário preenche todos os campos solicitados para o registro, escolhe se é uma conta professor ou aluno e clica em "Fazer Cadastro".<br>
 5- Usuário visualiza o alerta de "Usuário cadastrado com sucesso!" e clica em "Ok".<br>
 6- Usuário é redirecionado para a tela de login.</th></tr>
<tr><th>Critérios de Êxito</th>	
  <th>•	Usuário deve ser capaz de realizar o cadastro na plataforma como professor ou aluno.</th></tr>
  </table>

<table> 
<tr><th>Caso de Teste </th>
<th>CT-02 – Realizar login na plataforma com a conta préviamente cadastrada</th></tr>
<tr><th>Objetivo do teste</th>
  <th>•	Verificar a usabilidade da funcionalidade de login na plataforma</th></tr>
<tr><th>Ações esperadas</th>
  <th>1 - Usuário visualiza a homepage da aplicação.<br>
 2- Usuário clica na opção de "Fazer login" presente no cabeçalho.<br>
 3– Usuário informa o nome de usuário e senha usados préviamente cadastrados e clica em "Fazer Login".<br>
 4- Usuário realiza login no sistema e é redirecionado para a tela "Minhas Turmas".</th></tr>
<tr><th>Critérios de Êxito</th>	
  <th>•	Usuário deve ser capaz de realizar o login na plataforma utilizando a conta préviamente cadastrada.</th></tr>
  </table>

<table> 
<tr><th>Caso de Teste </th>
<th>CT-03 – Realizar cadastro de novas turmas associadas ao usuário de tipo "Professor"</th></tr>
<tr><th>Objetivo do teste</th>
  <th>•	Verificar a usabilidade da funcionalidade de cadastro de novas turmas associadas ao professor</th></tr>
<tr><th>Ações esperadas</th>
  <th>1 - Usuário visualiza a página "Minhas Turmas" da aplicação.<br>
 2- Usuário clica na opção de "Nova Turma" presente no cabeçalho.<br>
 3– Usuário informa o nome da turma, descrição sobre a turma, seleciona se a turma é ativa ou inativa e clica em "Cadastrar Turma".<br>
 4- Usuário visualiza o alerta de "Turma cadastrada com sucesso!" e clica em "Ok".<br>
 5- Usuário é redirecionado para a tela "Minhas Turmas".</th></tr>
<tr><th>Critérios de Êxito</th>	
  <th>•	Usuário deve ser capaz de associar novas turmas na plataforma e visualizar elas na página "Minhas Turmas".</th></tr>
  </table>

<table> 
<tr><th>Caso de Teste </th>
<th>CT-04 – Realizar cadastro de atividades de múltipla escolha associadas as turmas das quais o usuário do tipo "Professor" é dono.</th></tr>
<tr><th>Objetivo do teste</th>
  <th>•	Verificar a usabilidade da funcionalidade de cadastro de novas atividas nas turmas associadas ao professor</th></tr>
<tr><th>Ações esperadas</th>
  <th>1 - Usuário visualiza uma turma criada na página "Minhas Turmas" da aplicação.<br>
 2- Usuário clica na opção "Abrir" presente no cabeçalho da turma criada.<br>
 3– Usuário clica em "Criar Atividade" presente no cabeçalho da página da turma selecionada.<br>
 4- Usuário informa o nome da atividade, descrição da atividade, seleciona o prazo de entrega da atividade ou sem prazo, seleciona se a atividade possui tentativas limitadas ou ilimitadas(se possuir, indicar o número de tentativas permitidas), no campo visualização clicar em "Adicionar Questão" e informar: valor da atividade, enunciado, número de tentativas, resposta(informar a letra da alternativa correspondente), colocar o conteúdo nas  alternativas A,B,C,D confirmar clicando em "Adicionar Questão" e clicar em "Cadastrar Atividade".<br>
 5- Usuário é redirecionado para a tela "Minhas Turmas".<br>
 6- Usuário visualiza o alerta de "Atividade cadastrada com sucesso!" e clica em "Ok".<br>
 7- Usuário é redirecionado para a tela da turma cadastrada.</th></tr>
<tr><th>Critérios de Êxito</th>	
  <th>•	Usuário deve ser capaz de associar novas atividades as turmas criadas na plataforma e visualizar elas na página da turma criada.</th></tr>
  </table>

<table> 
<tr><th>Caso de Teste </th>
<th>CT-05 – Realizar matrícula do usuário tipo "Aluno" a turmas existentes.</th></tr>
<tr><th>Objetivo do teste</th>
  <th>•	Verificar a usabilidade da funcionalidade de realizar matrícula a turmas existentes pelo usuário do tipo "Aluno" na plataforma</th></tr>
<tr><th>Ações esperadas</th>
  <th>1 - Usuário visualiza a página "Minhas Turmas" da aplicação.<br>
 2- Usuário clica na opção buscar nova turma, insere o nome da turma caso ele saiba ou então clica no ícone da lupa presente no cabeçalho e é redirecionado para a página "Buscar Turma".<br>
 3– Usuário visualiza as turmas existentes e ao encontrar a desejada clica em "Abrir" e é redirecionado para a página da turma selecionada.<br>
 4- Usuário clica em "Fazer Matrícula" presente no cabeçalho da página.<br>
 5- Usuário visualiza o alerta de "Matrícula realizada com sucesso!" e clica em "Ok".</th></tr>
<tr><th>Critérios de Êxito</th>	
  <th>•	Usuário deve ser capaz de realizar matrícula a uma turma existente na plataforma.</th></tr>
  </table>

<table> 
<tr><th>Caso de Teste </th>
<th>CT-06 – Acessar e realizar atividades da turma matriculada do usuário tipo "Aluno".</th></tr>
<tr><th>Objetivo do teste</th>
  <th>•	Verificar a usabilidade da funcionalidade de realizar o acesso as atividades da turma matriculada pelo usuário do tipo "Aluno" na plataforma</th></tr>
<tr><th>Ações esperadas</th>
  <th>1 - Usuário visualiza a página "Minhas Turmas" da aplicação.<br>
 2- Usuário clica no campo da turma matriculada e é redirecionado para a página da turma.<br>
 3– Usuário visualiza as informações da turma como nome do professor, nome da turma, data de criação, pode cancelar matrícula clicando em "Cancelar Matrícula" presente no cabeçalho, e abaixo ele consegue visualizar a atividade cadastrada na turma que foi matriculado.<br>
 4– O usuário clica em "Realizar atividade" e responde as questões de multípla escolha da atividade<br>
 5– Usuário recebe a correção de sua atividade;
  </th></tr>
<tr><th>Critérios de Êxito</th>	
  <th>•	Usuário deve ser capaz de visualizar e realizar as atividades correspondentes a turma matriculada na plataforma, obtendo o resultado da correção da mesma.</th></tr>
  </table>

<table> 
<tr><th>Caso de Teste </th>
<th>CT-07 – Visualização de suas notas por usuário do tipo "Aluno".</th></tr>
<tr><th>Objetivo do teste</th>
  <th>•	Verificar a usabilidade da funcionalidade de realizar o acesso as atividades da turma matriculada pelo usuário do tipo "Aluno" na plataforma</th></tr>
<tr><th>Ações esperadas</th>
  <th>1 - Usuário visualiza a página "Minhas Turmas" da aplicação.<br>
 2- Usuário clica no campo da turma matriculada e é redirecionado para a página da turma.<br>
 3– Usuário visualiza as informações da turma como nome do professor, nome da turma, data de criação, pode cancelar matrícula clicando em "Cancelar Matrícula" presente no cabeçalho, e abaixo ele consegue visualizar a atividade cadastrada na turma que foi matriculado.<br>
 4– O usuário clica em "Notas";<br>
 5– Usuário visualiza a tela de Notas;
  </th></tr>
<tr><th>Critérios de Êxito</th>	
  <th>•	Usuário deve ser capaz de visualizar todas as suas notas para as atividades da turma em questão, sendo a maior nota de cada tentativa exibida.</th></tr>
  </table>

  <table> 
<tr><th>Caso de Teste </th>
<th>CT-08 – Visualização das notas de aluno por usuário do tipo "Professor".</th></tr>
<tr><th>Objetivo do teste</th>
  <th>•	Verificar a usabilidade da funcionalidade de realizar o acesso as atividades da turma matriculada pelo usuário do tipo "Aluno" na plataforma</th></tr>
<tr><th>Ações esperadas</th>
  <th>1 - Usuário visualiza a página "Minhas Turmas" da aplicação.<br>
 2- Usuário clica no no card da turma cujos alunos ele quer visualizar as notas.<br>
 3– Usuário visualiza as informações da turma.<br>
 4– O usuário clica em "Notas";<br>
 6– Seleciona o nome do aluno cujas notas deseja visualizar;<br>
 5– Usuário visualiza as notas do aluno selecionado;
  </th></tr>
<tr><th>Critérios de Êxito</th>	
  <th>•	Usuário deve ser capaz de visualizar todas as notas do aluno escolhido para as atividades da turma em questão, sendo a maior nota de cada tentativa exibida.</th></tr>
  </table>

<table> 
<tr><th>Caso de Teste </th>
<th>CT-09 – Visualização de notificações por usuário.</th></tr>
<tr><th>Objetivo do teste</th>
  <th>•	Verificar a usabilidade da funcionalidade de realizar o acesso as atividades da turma matriculada pelo usuário do tipo "Aluno" na plataforma</th></tr>
<tr><th>Ações esperadas</th>
  <th>1 - Usuário visualiza a página "Minhas Turmas" da aplicação.<br>
 2- Usuário clica no ícone de sino presente no cabeçalho.<br>
 3– Usuário visualiza suas notificações.
  </th></tr>
<tr><th>Critérios de Êxito</th>	
  <th>•	Usuário deve ser capaz de visualizar suas notificações.</th></tr>
  </table>
