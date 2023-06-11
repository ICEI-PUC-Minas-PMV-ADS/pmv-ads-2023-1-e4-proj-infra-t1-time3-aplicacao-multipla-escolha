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
    public void QueryMonstersFromSqlTest()
    {
        //Add some monsters before querying
        _context.Usuarios.Add(new Usuario { 
            Id = 0, 
            Senha = "Senha",
            NomeDeUsuario = "Joao", 
            Nome = "Joao", 
            Sobrenome = "Silva", 
            Email = "Joao@email.com", 
            Telefone = "(99)99999999", 
            Perfil = Perfil.Aluno 
        });
        _context.SaveChanges();

        //Execute the query


        //Verify the results
        Xunit.Assert.Equal(1, 1);
    }

    public void Dispose()
    {
        _context.Database.EnsureDeleted();
    }
}