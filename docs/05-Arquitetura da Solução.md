# Arquitetura da Solução

Esta seção apresenta a definição de como a aplicação será estruturada em termos de seus componentes, tecnologias utilizadas e hospedagem.

![ArquiteturaDaSolucao_eixo4](https://user-images.githubusercontent.com/74699119/223553148-8d3aeec7-4c48-4f26-a92b-e51440d521f9.png)
<p align="center"><b>Figura</b> - Arquitetura da solução</p>
<br>

## Diagrama de Classes

![DiagramaDeClasses_eixo4](https://user-images.githubusercontent.com/74699119/223539115-16cf8e10-cbd2-4979-9e36-e1114eaead34.png)
<p align="center"><b>Figura</b> - Diagrama de classes da aplicação</p>
<br>

## Modelo ER

![ModeloER_eixo4](https://user-images.githubusercontent.com/74699119/223539492-b955eeac-d590-4fa0-b9b0-bdcdba0467ee.png)
<p align="center"><b>Figura</b> - Modelo entidade/relacionamento da aplicação</p>
<br>

## Esquema Relacional

![EsquemaRelacional_eixo4](https://user-images.githubusercontent.com/74699119/223539560-2035f628-2383-47eb-b364-1825e72a937f.png)
<p align="center"><b>Figura</b> - Esquema relacional da aplicação</p>
<br>

## Modelo Físico

Entregar um arquivo banco.sql contendo os scripts de criação das tabelas do banco de dados. Este arquivo deverá ser incluído dentro da pasta src\bd.

## Tecnologias Utilizadas

Backend:
- **Linguagens:** C#;
- **Frameworks:** AspNetCore Web API (Framework/Template utilizado para criar a API), Entity Framework (ORM utilizado para mediar a gravação e recuperação de dados dos bancos de dados pela API);
- **Banco de dados:** SQL Server (gerenciamento de sessão do usuário e gravação e relações entre as entidades aluno, professor, turma, atividade e resultados) e MongoDB (guardar atividades e atividades preenchidas por alunos como documentos em formato BSON (Binary Javascript Object Notation));

Frontend:
- **Linguagens:** Javascript;
- **Frameworks:** React Native (Framework utilizado para criar o frontend mobile para Android e IoS) e React (Framework utilizado para criar o frontend web);

## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foi feita.

> **Links Úteis**:
>
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting Started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando Seu Site No Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)

## Qualidade de Software

O conceito de Qualidade de Software é um conjunto de fatores que precisam ser atendidos, isso representa que a aplicação deve estar em conformidade com as especificações de requisitos que foram combinadas junto ao cliente e também deve seguir os padrões de qualidade da empresa.

Cada ferramenta terá funções específicas, necessidades e também objetivos diversos, por isso a Qualidade de Software é medida pelo atendimento às necessidades do usuário e através da realização de testes torna-se muito mais assertiva, sendo os resultados condizentes ao que o cliente espera da aplicação.

Existem normas internacionais a serem seguidas pelo setor de software. A International Organization Standardization (ISO) e a International Electrotechnical Commission (IEC) são órgãos reconhecidos pela comunidade e regulam estas normas e padrões, contam com a finalidade de estabelecer um alinhamento aos membros de uma equipe para que superem suas barreiras de comunicação.

Podemos citar como referência a ISO/IEC 25010 para Qualidade de Software que é uma atualização da ISO/IEC 9126(NBR13596). O modelo de qualidade determina quais características de qualidade serão levadas em consideração ao avaliar as propriedades de um produto de software e a ISO/IEC 25010 compreende as oito características de qualidade citadas no quadro abaixo:


| Característica de qualidade | Subcaracteristicas  |     Justificativa     | 
|-----------------------------|--------------------------------------------|-----------------------|
| Adequação Funcional | Completude funcional; Correção funcional; Adequação funcional | Essa característica representa o grau em que um produto ou sistema fornece funções que atendem às necessidades declaradas e implícitas quando usado sob condições especificadas. | 
| Eficiência de Desempenho | Comportamento do tempo; Utilização de Recursos; Capacidade | Essa característica representa o desempenho em relação à quantidade de recursos utilizados nas condições estabelecidas. | 
| Compatibilidade | Coexistência; Interoperabilidade | Grau em que um produto, sistema ou componente pode trocar informações com outros produtos, sistemas ou componentes e/ou desempenhar suas funções necessárias enquanto compartilha o mesmo ambiente de hardware ou software  |
| Usabilidade | Reconhecimento de adequação; Aprendizagem; Operabilidade; Proteção contra erros do usuário; Estética da interface de usuário; Acessibilidade | Grau em que um produto ou sistema pode ser usado por usuários específicos para atingir objetivos específicos com eficácia, eficiência e satisfação em um contexto de uso específico. | 
| Confiabilidade | Maturidade; Disponibilidade; Tolerância a falhas; Recuperação | Grau em que um sistema, produto ou componente executa funções especificadas sob condições especificadas por um período de tempo especificado. |
| Segurança | Confidencialidade; Integridade; Não repúdio; Autenticidade | Grau em que um produto ou sistema protege informações e dados para que pessoas ou outros produtos ou sistemas tenham o grau de acesso a dados adequado aos seus tipos e níveis de autorização. |
| Manutenibilidade| Modularidade; Reutilização; Analisabilidade; Modificabilidade; Testabilidade | Essa característica representa o grau de eficácia e eficiência com que um produto ou sistema pode ser modificado para melhorá-lo, corrigi-lo ou adaptá-lo às mudanças no ambiente e nos requisitos. |
| Portabilidade | Adaptabilidade; Instabilidade; Substituibilidade | Grau de eficácia e eficiência com que um sistema, produto ou componente pode ser transferido de um hardware, software ou outro ambiente operacional ou de uso para outro.  |



| Subcaracterística  |                      Métricas  de Qualidade de Software               |  Peso  |
|--------------------|-----------------------------------------------------------------------|--------|
| Adequação | É adequado as necessidades do usuário? | Alto
| Acurácia | Faz o que foi proposto de forma correta?  | Alto |
| Interoperabilidade | É capaz de interagir com os sistemas especificados? | Alto |
| Conformidade | Está de acordo com as normas, leis, relacionadas a funcionalidade?| Alto |
| Conformidade | Está de acordo com as normas, leis, relacionadas a confiabilidade? | Alto |
| Conformidade | Está de acordo com as normas, leis, relacionadas a usabilidade? | Alto |
| Conformidade | Está de acordo com as normas, leis, relacionadas à eficiência? | Alto |
| Conformidade | Está de acordo com as normas, leis, relacionadas à manutenibilidade? | Alto |
| Conformidade | Está de acordo com as normas, leis, relacionadas à Portabilidade? | Alto |
| Segurança de acesso | Evita acesso não autorizado a programas e dados? | Alto |
| Maturidade | Com que Frequência apresenta falhas? | Alto |
| Tolerância a falhas | Ocorrendo falhas, como ele reage? | Alto |
| Recuperabilidade | É capaz de recuperar dados após uma falha? | Alto |
| Adaptabilidade | O software é capaz de executar todas as suas funções em diferentes dispositivos?  | Alto |
| Inteligibilidade | É fácil entender os conceitos utilizados? | Alto |
| Apreensibilidade | É fácil aprender a usar? | Alto |
| Operacionalidade | É fácil operar e controlar? | Alto |
| Atratividade | É atrativo ao usuário? | Alto |
| Comportamento em relação ao tempo | Qual o tempo de resposta e processamento? | Alto |
| Comportamento em relação aos recursos | Qual recurso usa? Durante quanto tempo? | Alto |
| Analisabilidade | É fácil encontrar uma falha? Quando ocorre? | Alto |
| Modificabilidade | É fácil modificar e remover defeitos? | Alto |
| Estabilidade | Existe riscos de efeitos inesperados quando se faz alterações? | Alto |
| Testabilidade | É fácil testa o software modificado? | Alto |
| Adaptabilidade | É fácil adaptar a ambientes diferentes? | Alto |
| Capacidade para instalar | É fácil para fazer instalação? | Alto |
| Capacidade para substituir| É fácil usar para substituir outro?| Alto |
| Coexistência | Pode coexistir com outros produtos independentes compartilhando recursos? | Alto |
