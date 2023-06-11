using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace multipla_escolha_api.nUnitTests;
public class AtividadeIntegrationTest : IDisposable
{
    AppDbContext _context;

    public AtividadeIntegrationTest()
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
    public void SalvarERecuperarAtividadeCadastradaEmTurma()
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

        // Asserção
        Xunit.Assert.Equal(novaAtividade.Nome, atividadeRecuperada.Nome);
    }
    [Fact]
    public void SalvarERecuperarMultiplasAtividadesEmUmaTurma()
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

        Atividade novaAtividade2 = new Atividade()
        {
            Nome = "Nova atividade2",
            Descricao = "Descricao nova atividade2",
            Valor = 10.5F,
            DataDeCriacao = DateTime.Now,
            DataPrazoDeEntrega = DateTime.Now,
            TentativasPermitidas = 1,
            UuidNoMongoDb = Guid.NewGuid().ToString(),
            Turma = turmaRecuperada
        };

        Atividade novaAtividade3 = new Atividade()
        {
            Nome = "Nova atividade3",
            Descricao = "Descricao nova atividade3",
            Valor = 10.5F,
            DataDeCriacao = DateTime.Now,
            DataPrazoDeEntrega = DateTime.Now,
            TentativasPermitidas = 1,
            UuidNoMongoDb = Guid.NewGuid().ToString(),
            Turma = turmaRecuperada
        };

        _context.Atividades.Add(novaAtividade);
        _context.Atividades.Add(novaAtividade2);
        _context.Atividades.Add(novaAtividade3);
        _context.SaveChanges();

        List<Atividade> atividadesRecuperadas = _context.Atividades.Include(a => a.Turma).Where(a => a.Turma.Id == turmaRecuperada.Id).ToList();

        // Asserção
        Xunit.Assert.Equal(atividadesRecuperadas.Count(), 3);
    }
    [Fact]
    public void SalvarEditarERecuperarAtividade_EsperaSeQueOsDadosTenhamSidoAtualizadosAoRecuperarAAtividadeEditada()
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

        atividadeRecuperada.Nome = "Novo nome";
        atividadeRecuperada.Descricao = "Nova descrição";
        atividadeRecuperada.Valor = 20;
        atividadeRecuperada.TentativasPermitidas = 2;

        _context.Atividades.Update(atividadeRecuperada);
        _context.SaveChanges();

        Atividade atividadeAtualizada = _context.Atividades.FirstOrDefault(a => a.Id == atividadeRecuperada.Id);

        // Asserção
        Xunit.Assert.Equal(atividadeAtualizada.Nome, "Novo nome");
        Xunit.Assert.Equal(atividadeAtualizada.Descricao, "Nova descrição");
        Xunit.Assert.Equal(atividadeAtualizada.Valor, 20);
        Xunit.Assert.Equal(atividadeAtualizada.TentativasPermitidas, 2);
    }

    public void Dispose()
    {
        _context.Database.EnsureDeleted();
    }
}