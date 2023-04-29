using Microsoft.EntityFrameworkCore;

namespace multipla_escolha_api.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Usuario>()
                .HasIndex(u => u.NomeDeUsuario).IsUnique();
            builder.Entity<Usuario>()
                .HasIndex(u => u.Email).IsUnique();

            builder.Entity<Turma>()
                .HasOne(t => t.Professor).WithMany(p => p.TurmasProfessor)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<TurmaAluno>()
                .HasKey(ta => new { ta.TurmaId, ta.AlunoId });
            
            builder.Entity<TurmaAluno>()
                .HasOne(ta => ta.Turma).WithMany(t => t.AlunosTurma)
                .HasForeignKey(ta => ta.TurmaId)
                .OnDelete(DeleteBehavior.NoAction);
            
            builder.Entity<TurmaAluno>()
                .HasOne(ta => ta.Aluno).WithMany(a => a.TurmasAluno)
                .HasForeignKey(ta => ta.AlunoId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Atividade>()
           .HasMany(a => a.Resultados).WithOne(r => r.Atividade)
           .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Usuario>()
            .HasMany(u => u.Resultados).WithOne(r => r.Aluno)
            .OnDelete(DeleteBehavior.NoAction);
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Turma> Turmas { get; set; }
        public DbSet<Atividade> Atividades { get; set; }
        public DbSet<Resultado> Resultados { get; set; }
        public DbSet<TurmaAluno> TurmasAlunos { get; set; }
    }
}
