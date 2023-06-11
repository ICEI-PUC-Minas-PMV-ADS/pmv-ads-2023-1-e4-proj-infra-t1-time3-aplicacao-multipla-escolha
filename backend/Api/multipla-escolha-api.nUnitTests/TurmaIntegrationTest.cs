using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace multipla_escolha_api.nUnitTests;
public class TurmaIntegrationTest : IDisposable
{
    AppDbContext _context;

    public TurmaIntegrationTest()
    {
        var serviceProvider = new ServiceCollection()
            .AddEntityFrameworkSqlServer()
            .BuildServiceProvider();

        var builder = new DbContextOptionsBuilder<AppDbContext>();

        builder.UseSqlServer($"Server=(localdb)\\mssqllocaldb;Database=multipla_escolha_{Guid.NewGuid()};Trusted_Connection=True;MultipleActiveResultSets=true")
                .UseInternalServiceProvider(serviceProvider);

        _context = new AppDbContext(builder.Options);
        _context.Database.Migrate();

    }

    [Fact]
    public void SalvarERecuperarTurmaComUsuarioProfessorRecemCriado()
    {
        // Arranjo
        Usuario novoUsuario = new Usuario
        {
            Id = 0,
            Senha = "Senha",
            NomeDeUsuario = "Joao",
            Nome = "Joao",
            Sobrenome = "Silva",
            Email = "Joao@email.com",
            Telefone = "(99)99999999",
            Perfil = Perfil.Professor
        };
        
        _context.Usuarios.Add(novoUsuario);
        _context.SaveChanges();
        Usuario usuarioRecuperado = _context.Usuarios.FirstOrDefault(u => u.NomeDeUsuario == "Joao");

        // Ação
     
        Turma novaTurma = new Turma()
        {
            Nome = "Nova turma",
            Descricao = "Nova turma desc",
            Ativo = true,
            Professor = usuarioRecuperado
        };

        _context.Turmas.Add(novaTurma);
        _context.SaveChanges();

        Turma turmaRecuperada = _context.Turmas.FirstOrDefault(t => t.Nome == "Nova turma");

        // Asserção
        Xunit.Assert.Equal(novaTurma.Nome, turmaRecuperada.Nome);
    }

    [Fact]
    public void SalvarMultiplasTurmasComUsuarioProfessorRecemCriadoERecuperarComoListaParaAqueleProfessor()
    {
        // Arranjo
        Usuario novoUsuario = new Usuario
        {
            Id = 0,
            Senha = "Senha",
            NomeDeUsuario = "Joao",
            Nome = "Joao",
            Sobrenome = "Silva",
            Email = "Joao@email.com",
            Telefone = "(99)99999999",
            Perfil = Perfil.Professor
        };

        _context.Usuarios.Add(novoUsuario);
        _context.SaveChanges();
        Usuario usuarioRecuperado = _context.Usuarios.FirstOrDefault(u => u.NomeDeUsuario == "Joao");

        // Ação

        Turma novaTurma = new Turma()
        {
            Nome = "Nova turma",
            Descricao = "Nova turma desc",
            Ativo = true,
            Professor = usuarioRecuperado
        };

        Turma novaTurma2 = new Turma()
        {
            Nome = "Nova turma 2",
            Descricao = "Nova turma 2 desc",
            Ativo = true,
            Professor = usuarioRecuperado
        };

        Turma novaTurma3 = new Turma()
        {
            Nome = "Nova turma 3",
            Descricao = "Nova turma 3 desc",
            Ativo = true,
            Professor = usuarioRecuperado
        };

        _context.Turmas.Add(novaTurma);
        _context.Turmas.Add(novaTurma2);
        _context.Turmas.Add(novaTurma3);
        _context.SaveChanges();

        List<Turma> turmasRecuperadas = _context.Turmas.Include(t => t.Professor).Where(t => t.Professor.Id == usuarioRecuperado.Id).ToList();

        // Asserção
        Xunit.Assert.Equal(turmasRecuperadas.Count(), 3);
    }

    [Fact]
    public void SalvarEditarERecuperarTurma_EsperaSeQueOsDadosTenhamSidoAtualizadosAoRecuperarATurmaEditada()
    {
        // Arranjo
        Usuario novoUsuario = new Usuario
        {
            Id = 0,
            Senha = "Senha",
            NomeDeUsuario = "Joao",
            Nome = "Joao",
            Sobrenome = "Silva",
            Email = "Joao@email.com",
            Telefone = "(99)99999999",
            Perfil = Perfil.Professor
        };

        _context.Usuarios.Add(novoUsuario);
        _context.SaveChanges();
        Usuario usuarioRecuperado = _context.Usuarios.FirstOrDefault(u => u.NomeDeUsuario == "Joao");

        // Ação

        Turma novaTurma = new Turma()
        {
            Nome = "Nova turma",
            Descricao = "Nova turma desc",
            Ativo = true,
            Professor = usuarioRecuperado
        };

        _context.Turmas.Add(novaTurma);
        _context.SaveChanges();

        Turma turmaRecuperada = _context.Turmas.FirstOrDefault(t => t.Nome == "Nova turma");

        turmaRecuperada.Nome = "Novo nome";
        turmaRecuperada.Descricao = "Nova descrição";
        turmaRecuperada.Ativo = false;

        _context.Turmas.Update(turmaRecuperada);

        Turma turmaAtualizada = _context.Turmas.FirstOrDefault(t => t.Id == turmaRecuperada.Id);

        // Asserção
        Xunit.Assert.Equal(turmaAtualizada.Nome, "Novo nome");
        Xunit.Assert.Equal(turmaAtualizada.Descricao, "Nova descrição");
        Xunit.Assert.Equal(turmaAtualizada.Ativo, false);
    }

    [Fact]
    public void MatricularAlunoEmTurmaRecemCriada_EsperaSeQueChecagemRetorneFalseAntesDeSalvarAsMudancasMasRetorneTrueAposRealizarAMatricula()
    {
        // Arranjo
        Usuario novoUsuario = new Usuario
        {
            Id = 0,
            Senha = "Senha",
            NomeDeUsuario = "Joao",
            Nome = "Joao",
            Sobrenome = "Silva",
            Email = "Joao@email.com",
            Telefone = "(99)99999999",
            Perfil = Perfil.Professor
        };

        Usuario novoUsuarioAluno = new Usuario
        {
            Id = 0,
            Senha = "Senha",
            NomeDeUsuario = "Pedro",
            Nome = "Pedro",
            Sobrenome = "Rodrigues",
            Email = "Pedro@email.com",
            Telefone = "(99)99999997",
            Perfil = Perfil.Aluno
        };

        _context.Usuarios.Add(novoUsuario);
        _context.Usuarios.Add(novoUsuarioAluno);
        _context.SaveChanges();
        Usuario usuarioRecuperado = _context.Usuarios.FirstOrDefault(u => u.NomeDeUsuario == "Joao");
        Usuario usuarioAlunoRecuperado = _context.Usuarios.FirstOrDefault(u => u.NomeDeUsuario == "Pedro");
        
        Turma novaTurma = new Turma()
        {
            Nome = "Nova turma",
            Descricao = "Nova turma desc",
            Ativo = true,
            Professor = usuarioRecuperado
        };

        _context.Turmas.Add(novaTurma);
        _context.SaveChanges();

        Turma turmaRecuperada = _context.Turmas.FirstOrDefault(t => t.Nome == "Nova turma");

        // Ação
        TurmaAluno turmaAluno = new();
        turmaAluno.Aluno = usuarioAlunoRecuperado;
        turmaAluno.Turma = turmaRecuperada;

        bool alunoMatriculado = _context.Turmas.Include(t => t.AlunosTurma).Any(t => t.AlunosTurma.Any(at => at.AlunoId == usuarioAlunoRecuperado.Id));

        _context.TurmasAlunos.Add(turmaAluno);
        _context.SaveChanges();

        // Asserção
        Xunit.Assert.Equal(alunoMatriculado, false);

        alunoMatriculado = _context.Turmas.Include(t => t.AlunosTurma).Any(t => t.AlunosTurma.Any(at => at.AlunoId == usuarioAlunoRecuperado.Id));

        // Asserção
        Xunit.Assert.Equal(alunoMatriculado, true);
    }
    public void Dispose()
    {
        _context.Database.EnsureDeleted();
    }
}