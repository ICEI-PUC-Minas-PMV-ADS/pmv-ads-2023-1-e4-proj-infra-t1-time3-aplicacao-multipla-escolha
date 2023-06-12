using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace multipla_escolha_api.nUnitTests;
public class ResultadoIntegrationTest : IDisposable
{
    AppDbContext _context;

    public ResultadoIntegrationTest()
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
    public void SalvarERecuperarResultadoAssociadoAUmaAtividade()
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


        Atividade novaAtividade = new Atividade()
        {
            Nome = "Nova atividade",
            Descricao = "Descricao nova atividade",
            Valor = 10.5F,
            DataDeCriacao = DateTime.Now,
            DataPrazoDeEntrega = DateTime.Now,
            TentativasPermitidas = 1,
            UuidNoMongoDb = Guid.NewGuid().ToString(),
            Turma = turmaRecuperada
        };

        _context.Atividades.Add(novaAtividade);
        _context.SaveChanges();

        Atividade atividadeRecuperada = _context.Atividades.FirstOrDefault(t => t.Nome == "Nova atividade");

        // Ação

        Resultado novoResultado = new Resultado()
        {
            Id = 0,
            NotaDoAluno = 10,
            NotaMaxima = 12,
            DataDaTentativa = DateTime.Now,
            UuidNoMongoDb = Guid.NewGuid().ToString(),
            Aluno = usuarioAlunoRecuperado,
            Atividade = atividadeRecuperada
        };

        _context.Resultados.Add(novoResultado);
        _context.SaveChanges();

        Resultado resultadoRecuperado = _context.Resultados.FirstOrDefault(t => t.UuidNoMongoDb == novoResultado.UuidNoMongoDb);

        // Asserção
        Xunit.Assert.Equal(novoResultado.UuidNoMongoDb, resultadoRecuperado.UuidNoMongoDb);
    }

    [Fact]
    public void SalvarMutltiplosResultadosParaUmaMesmaAtividadeERecuperarOValorDaMaiorNotaEntreEles()
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


        Atividade novaAtividade = new Atividade()
        {
            Nome = "Nova atividade",
            Descricao = "Descricao nova atividade",
            Valor = 10.5F,
            DataDeCriacao = DateTime.Now,
            DataPrazoDeEntrega = DateTime.Now,
            TentativasPermitidas = 3,
            UuidNoMongoDb = Guid.NewGuid().ToString(),
            Turma = turmaRecuperada
        };

        _context.Atividades.Add(novaAtividade);
        _context.SaveChanges();

        Atividade atividadeRecuperada = _context.Atividades.FirstOrDefault(t => t.Nome == "Nova atividade");

        // Ação

        Resultado novoResultado = new Resultado()
        {
            Id = 0,
            NotaDoAluno = 6F,
            NotaMaxima = 12F,
            DataDaTentativa = DateTime.Now,
            UuidNoMongoDb = Guid.NewGuid().ToString(),
            Aluno = usuarioAlunoRecuperado,
            Atividade = atividadeRecuperada
        };

        Resultado novoResultado2 = new Resultado()
        {
            Id = 0,
            NotaDoAluno = 10.5F,
            NotaMaxima = 12,
            DataDaTentativa = DateTime.Now,
            UuidNoMongoDb = Guid.NewGuid().ToString(),
            Aluno = usuarioAlunoRecuperado,
            Atividade = atividadeRecuperada
        };

        Resultado novoResultado3 = new Resultado()
        {
            Id = 0,
            NotaDoAluno = 8F,
            NotaMaxima = 12F,
            DataDaTentativa = DateTime.Now,
            UuidNoMongoDb = Guid.NewGuid().ToString(),
            Aluno = usuarioAlunoRecuperado,
            Atividade = atividadeRecuperada
        };

        _context.Resultados.Add(novoResultado);
        _context.Resultados.Add(novoResultado2);
        _context.Resultados.Add(novoResultado3);
        _context.SaveChanges();

        float maiorNotaEntreOsResultados = _context.Resultados.Include(r => r.Atividade).Where(r => r.Atividade.Id == atividadeRecuperada.Id).Max(r => r.NotaDoAluno);

        // Asserção
        Xunit.Assert.Equal(10.5F, maiorNotaEntreOsResultados);
    }
    public void Dispose()
    {
        _context.Database.EnsureDeleted();
    }
}