-- Cria a tabela de usuários

CREATE TABLE Usuario(
IdUsuario BIGINT NOT NULL,
Email NVARCHAR(50) NOT NULL,
NomeUsuario NVARCHAR(50) NOT NULL,
Nome NVARCHAR(50) NOT NULL,
Sobrenome NVARCHAR(50) NOT NULL,
Senha NVARCHAR(50) NOT NULL,
Telefone NVARCHAR(50),
PRIMARY KEY(IdUsuario)
);

-- Cria a tabela de usuários do tipo "professor"

CREATE TABLE Usuario_professor(
IdProfessor BIGINT NOT NULL,
PRIMARY KEY(IdProfessor),
FOREIGN KEY (IdProfessor) REFERENCES Usuario(IdUsuario)
);

-- Cria a tabela de usuários do tipo "aluno"

CREATE TABLE Usuario_aluno(
IdAluno BIGINT NOT NULL,
PRIMARY KEY(IdAluno),
FOREIGN KEY (IdAluno) REFERENCES Usuario(IdUsuario)
);

-- Cria a tabela de Turmas

CREATE TABLE Turma(
IdTurma BIGINT NOT NULL,
Nome NVARCHAR(50) NOT NULL,
Descricao TEXT,
DataDeCriacao DATETIME,
Ativo BIT,
idProfessor BIGINT NOT NULL,
PRIMARY KEY(IdTurma),
FOREIGN KEY (IdProfessor) REFERENCES Usuario_professor(IdProfessor)
);

-- Cria a tabela de junção Aluno_turma

CREATE TABLE Aluno_turma(
IdAluno BIGINT NOT NULL,
IdTurma BIGINT NOT NULL,
CONSTRAINT PK_Aluno_turma PRIMARY KEY (IdAluno, IdTurma),
FOREIGN KEY (IdAluno) REFERENCES Usuario_aluno(IdAluno),
FOREIGN KEY (IdTurma) REFERENCES Turma(IdTurma)
);

-- Cria a tabela de Atividades

CREATE TABLE Atividade(
IdAtividade BIGINT NOT NULL,
Nome NVARCHAR NOT NULL,
Descricao TEXT,
Valor INT,
DataDeCriacao DATETIME,
DataPrazoDeEntrega DATETIME,
TentativasIlimitadas BIT,
TentativasPermitidas INT,
UuidNoMongoDb NVARCHAR,
IdTurma BIGINT NOT NULL,
PRIMARY KEY(IdAtividade),
FOREIGN KEY (IdTurma) REFERENCES Turma(IdTurma)
);

-- Cria a tabela de Resultados

CREATE TABLE Resultado(
IdResultado BIGINT NOT NULL,
NotaDoAluno INT,
NotaMaxima INT,
NumeroDaTentativa INT,
DataDaTentativa DATETIME,
UuidNoMongoDb NVARCHAR,
IdAtividade BIGINT NOT NULL,
IdAluno BIGINT NOT NULL,
PRIMARY KEY(IdResultado),
FOREIGN KEY (IdAtividade) REFERENCES Atividade(IdAtividade),
FOREIGN KEY (IdAluno) REFERENCES Usuario_aluno(IdAluno)
);
