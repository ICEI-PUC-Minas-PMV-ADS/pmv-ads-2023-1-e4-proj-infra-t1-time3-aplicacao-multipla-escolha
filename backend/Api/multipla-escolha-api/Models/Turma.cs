using multipla_escolha_api.Models.DTO;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace multipla_escolha_api.Models

{
    [Table("Turmas")]
    public class Turma
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Descricao { get; set; }
        [Required]
        public DateTime DataDeCriacao { get; set; }
        [Required]
        public bool Ativo { get; set; }
        public Usuario Professor { get; set; }
        [JsonIgnore]
        public ICollection<TurmaAluno> AlunosTurma { get; set; }

        public Turma()
        {

        }
        public Turma(TurmaDto dto) {
            Id = 0;
            if (dto.Id != null)
            {
                Id = (int)dto.Id;
            }
            Nome = dto.Nome;
            Descricao = dto.Descricao;
            DataDeCriacao = DateTime.UtcNow;
            Ativo = true;
            if (dto.Ativo != null)
            {
                Ativo = (bool) dto.Ativo;
            }
        }
    }
}
