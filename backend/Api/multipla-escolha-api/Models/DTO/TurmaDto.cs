using System.ComponentModel.DataAnnotations;

namespace multipla_escolha_api.Models.DTO
{
    public class TurmaDto
    {
        public int? Id { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Descricao { get; set; }
        [Required]
        public bool Ativo { get; set; }
        public DateTime DataDeCriacao { get; set; }
        public Usuario Professor { get; set; }
        public ICollection<TurmaAluno> AlunosTurma { get; set; }
        public ICollection<Atividade> Atividades { get; set; }
        public bool? Matriculado { get; set; }

        public TurmaDto()
        {
        }
        public TurmaDto(Turma turma)
        {
            Id = turma.Id;
            Nome = turma.Nome;
            Descricao = turma.Descricao;
            Ativo = turma.Ativo;
            DataDeCriacao = turma.DataDeCriacao;
            Professor = turma.Professor;
            AlunosTurma = turma.AlunosTurma;
            Atividades = turma.Atividades;
        }
    }
}
