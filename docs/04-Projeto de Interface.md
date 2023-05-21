
# Projeto de Interface

Para o desenvolvimento da solução, as telas foram projetadas buscando estabelecer uma identidade visual intuitiva. A navegação entre as funcionalidades do sistema se dá ou pelo cabeçalho (através dos itens presentes no mesmo ou acessando o menu de opções do usuário clicando na seta ao lado do nome do usuário após o login) ou através de botões presentes em cada página específica que guiam o usuário para as ações relevantes daquela tela.
## Diagrama de Fluxo

O diagrama abaixo apresenta o fluxo de interação do usuário com a interface do sistema. Este diagrama se foca no fluxo mais provável que o usário seguirá, já que algumas das telas deixará o usuário realizar outros fluxos que deixariam o diagrama mais complexo e confuso se fossem detalhados. As telas deste fluxo são descritas melhor na seção de wireframes logo abaixo.

![Diagrama de Fluxo](img/diagrama-de-fluxo.png)

Para visualizar o diagrama de fluxo no ambiente do Figma, [**acesse aqui**](https://www.figma.com/file/aCHVALWOuj8kjGaLHbFMSv/Diagrama-de-Fluxo).

## Wireframes

![Imagem dos Wireframe](img/wireframes-site/Site.png)

Conforme o fluxo de telas do projeto, apresentado no item anterior, as telas do sistema são apresentadas em detalhes nos itens a seguir. Para visualizar os wireframes no ambiente do Figma, [**acesse aqui**](https://www.figma.com/file/WXp8lKy4eSbQx0ffBApD8q/Site).

As telas do sistema apresentam uma estrutura comum que é apresentada em [Template Padrão da Aplicação](./06-Template%20Padr%C3%A3o%20da%20Aplica%C3%A7%C3%A3o.md).

### Tela: Início (Homepage)

A primeira tela que o usuário verá ao acessar o site apresenta alguns detalhes do serviço. No cabeçalho existe a logo e um menu de navegação com três botões para "Início", "Sobre" e um botão para ir à [tela de fazer *login*](#tela-entrar-sign-in). Quando o usuário estiver conectado em sua conta, o botão que levaria ao *login* apresenta um *dropdown* com opções para levar o usuário à tela "[Meus Dados](#tela-dados-de-usuário)" ou "[Minhas Turmas](#tela-minhas-turmas)", além de se desconectar.

<div align="center">
    <img src="img/wireframes-site/Home.png" alt="Imagem da Homepage" width=50%>
</div>

### Tela: Entrar (Sign in)

Nesta tela o usuário poderá inserir o usuário e a senha para se conectar ou clicar no botão "[Cadastre-se](#tela-registrar-se-sign-up)" para se cadastrar.

<div align="center">
    <img src="img/wireframes-site/Login.png" alt="Imagem da tela de login" width=50%>
</div>

### Tela: Registrar-se (Sign up)

Nesta tela o usuário vai criar sua conta de usuário ao inserir os dados necessários nos campos disponíveis, selecionar o seu perfil como "Aluno" ou "Professor" e confirmar. Ao confirmar e o processo ser concluido com sucesso, o usuário poderá [ir fazer o *login*](#tela-entrar-sign-in).

<div align="center">
    <img src="img/wireframes-site/Cad. de Usuário.png" alt="Imagem da tela de cadastro de usuário" width=50%>
</div>

### Tela: Dados de Usuário

Esta tela é acessível apenas para usuários conectados. Nela o usuário poderá editar informações que cadastrou anteriormente e também excluir a conta. O menu de navegação presente na *Homepage* desaparece nesta tela. O cabeçalho passa a apresentar a logo e um botão *dropdown* com as opções *Turmas*, para levar o usuário à tela "[Minhas Turmas](#tela-minhas-turmas)", *Perfil*, para levar o usuário à tela "[Meus Dados](#tela-dados-de-usuário)" ou se desconectar.

![Imagem da tela de dados do usuário](img/wireframes-site/meus-dados.png)

#### Menu do botão *dropdown*

![Imagem do botão dropdown](img/wireframes-site/Menu%20Usu%C3%A1rio.png)

### Tela: Minhas Turmas

#### Para o professor

Esta tela é acessível apenas para usuários conectados como "Professor". Nela o usuário poderá abrir, editar ou excluir turmas já criadas. Também poderá filtrar o resultado das turmas por "Ativas" ou "Inativas" e criar uma turma ao clicar em "[Criar turma](#tela-criar-e-editar-turma)".

<div align="center">
    <img src="img/wireframes-site/Minhas%20Turmas%20-%20Professor.png" alt="Imagem da tela com as turmas do usuário professor" width=50%>
</div>

#### Para o aluno

Esta tela é acessível apenas para usuários conectados como "Aluno". Nela o usuário visualizará as turmas que está matriculado e notificações de novas atividades, atividades pendentes ou atrasadas em cada turma. Também poderá fazer uma busca por turmas.

<div align="center">
    <img src="img/wireframes-site/Minhas%20Turmas%20-%20Aluno.png" alt="Imagem da tela com as turmas do usuário aluno" width=50%>
</div>

### Tela: Criar e Editar Turma

Esta tela é acessível apenas para usuários conectados como "Professor". Nela o usuário poderá criar uma turma ao inserir os dados necessários nos campos disponíveis e selecionar se a turma está "Ativa" ou "Inativa". Caso a turma já esteja criada e o usuário queira atualizar informações, será carregada uma página semelhante com dados já preenchidos que que o usuário poderá alterar.

![Imagem da tela de criação da turma](img/wireframes-site/criar-turma.png)

### Tela: Buscar Turma

Na tela de busca, o usuário vai encontrar campos para filtrar o resultado da turma que está buscando, por nome da turma ou por nome ou email do professor. Após realizar a busca, receberá uma lista com os resultados e poderá clicar em uma turma para entrar.

<div align="center">
    <img src="img/wireframes-site/Buscar Turma.png" alt="Imagem da tela de busca" width=50%>
</div>

### Tela: Visualizar Turma

#### Para o professor

Esta tela é acessível apenas para usuários conectados como "Professor". Nela o usuário visualizará a turma criada. Também poderá ver o resultado dos alunos clicando no botão "Notas" ou criar uma atividade clicando em "[Criar Atividade](#tela-criar-e-editar-atividade)". Caso a turma já tenha atividades criadas, o usuário poderá "[Abrir](#tela-visualizar-atividade)", "[Editar](#tela-criar-e-editar-atividade)" ou "Deletar" as atividades.

<div align="center">
    <img src="img/wireframes-site/Visualizar%20Turma%20-%20Professor.png" alt="Imagem da tela de informações da turma do usuário professor" width=50%>
</div>

#### Para o aluno

Esta tela é acessível apenas para usuários conectados como "Aluno". Nela o usuário visualizará a turma que está matriculado e as atividades com avisos de *pendente*, *atrasada* ou *entregue* em cada uma e informações de *prazo* e *data de criação*, o usuário poderá abrir a atividade clicando no *card* que irá abrir a [tela de visualização da atividade](#tela-visualizar-atividade). Também poderá cancelar a matrícula na turma aberta ou ver as suas notas na turma clicando no botão "Notas".

<div align="center">
    <img src="img/wireframes-site/Visualizar%20Turma%20-%20Aluno.png" alt="Imagem da tela de informações da turma do usuário aluno" width=50%>
</div>

### Tela: Visualizar Atividade

Esta tela apresenta detalhes da atividade que o usuário abriu. Nela o usuário visualizará o *Nome da Atividade*, *Descrição*, as *Questões* e *Alternativas*, *Pontuação Total da Atividade*, *Prazo* e *Tentativas Permitidas*. A tela também possui um botão "[Fazer Atividade](#tela-realizar-atividade)" que o usuário poderá clicar para responder a atividade.

Ao realizar uma tentativa respondendo a atividade, um histórica das tentativas aparecerá na tela, com o *Número da Tentativa*, *Data e Hora*, *Pontuação Obtida* e um botão para ver a "[Correção](#tela-visualizar-correção)" de cada tentativa.

![Imagem da tela de atividade](img/wireframes-site/visualizar-atividade.png)

### Tela: Realizar Atividade

Esta tela é acessada quando o usuário "Aluno" clica no botão "Fazer Atividade". Nela o usuário poderá responder as questões da atividade respeitando as regras criadas para ela, como *Prazo* e *Número de Tentativas*. Ao terminar de responder a atividade, o aluno deve clicar em "Finalizar tarefa" para confirmar o envio.

<div align="center">
    <img src="img/wireframes-site/Fazer Atividade.png" alt="Imagem da tela de responder a atividade" width=50%>
</div>

### Tela: Visualizar Correção

Nesta tela o usuário poderá ver a correção da atividade, com a pontuação obtida e as respostas marcadas como corretas ou incorretas.

<div align="center">
    <img src="img/wireframes-site/Visualizar Correção.png" alt="Imagem da tela de correção da atividade respondida" width=50%>
</div>

### Tela: Criar e Editar Atividade

Esta tela é acessível apenas para usuários conectados como "Professor". Nela o usuário encontrará campos para criar a atividade, como *Nome*, *Descrição*, *Prazo* e *Número de Tentativas*. Também encontrará uma área para visualizar e criar as questões, ao clicar no botão "Adicionar Questão", aparecerá um *modal* com campos para *Enunciado*, *Pontos da Questão*, *Quantidade de Alternativas*, a *Alternativa Correta* e campos para o texto das alternativas.

![Imagem da tela de criar atividade](img/wireframes-site/criar-atividade.png)

## Tela: Visualizar Notas

Na tela de busca, o usuário vai encontrar um campo para filtrar o aluno que está buscando por nome ou email. Após realizar a busca, receberá uma lista com o resultado da busca e poderá clicar em um aluno para abrir a visualização das notas.

<div align="center">
    <img src="img/wireframes-site/Selecionar Aluno.png" alt="Imagem da tela de visualizar Notas dos Alunos" width=50%>
</div>
