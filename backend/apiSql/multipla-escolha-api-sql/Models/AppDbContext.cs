using Microsoft.EntityFrameworkCore;

namespace multipla_escolha_api_sql.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Turma> Turmas { get; set; }
    }
}
