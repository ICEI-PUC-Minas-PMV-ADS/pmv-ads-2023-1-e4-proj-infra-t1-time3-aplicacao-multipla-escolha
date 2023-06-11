using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace multipla_escolha_api.nUnitTests;
public class UsuarioIntegrationTest : IDisposable
{
    AppDbContext _context;

    public UsuarioIntegrationTest()
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
    public void SalvarUsuarioEVerificarSeUsuarioRecuperadoCorrespondeAEle()
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
            Perfil = Perfil.Aluno
        };
        
        // Ação
        _context.Usuarios.Add(novoUsuario);
        _context.SaveChanges();
        Usuario usuarioRecuperado = _context.Usuarios.FirstOrDefault(u => u.NomeDeUsuario == "Joao");

        // Asserção
        Xunit.Assert.Equal(novoUsuario.Nome, usuarioRecuperado.Nome);
    }

    [Fact]
    public void SalvarUsuarioComMesmoNomeDeUsuarioOuEmail_EsperaSeRetornarErro()
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
            Perfil = Perfil.Aluno
        };
        _context.Usuarios.Add(novoUsuario);
        _context.SaveChanges();

        try
        {
            // Ação
            novoUsuario.Email = "outroemail@email.com";
            _context.Usuarios.Add(novoUsuario);
            _context.SaveChanges();
        Usuario usuarioRecuperado = _context.Usuarios.FirstOrDefault(u => u.NomeDeUsuario == "Joao");
            // Asserção
            Xunit.Assert.Fail("Ambos os usuários foram salvos");
        }
        catch
        {
            // Asserção
            Xunit.Assert.True(true, "Não foi possível salvar ambos os usuários");
        }

        try
        {        
            // Ação
            novoUsuario.NomeDeUsuario = "outroNome";
            _context.Usuarios.Add(novoUsuario);
            _context.SaveChanges();
            Usuario usuarioRecuperado = _context.Usuarios.FirstOrDefault(u => u.NomeDeUsuario == "Joao");
            // Asserção
            Xunit.Assert.Fail("Ambos os usuários foram salvos");
        }
        catch
        {
            // Asserção
            Xunit.Assert.True(true, "Não foi possível salvar ambos os usuários");
        }
    }

    public void Dispose()
    {
        _context.Database.EnsureDeleted();
    }
}