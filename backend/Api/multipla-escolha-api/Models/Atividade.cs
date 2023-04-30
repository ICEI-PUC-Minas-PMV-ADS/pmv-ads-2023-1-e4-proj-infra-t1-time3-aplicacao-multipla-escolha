using Microsoft.EntityFrameworkCore;
using multipla_escolha_api.Models.DTO;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace multipla_escolha_api.Models

{
    [Table("Atividades")]
    public class Atividade
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public float Valor { get; set; }
        [Required]
        public string Descricao { get; set; }
        [Required]
        public DateTime DataDeCriacao { get; set; }
        public DateTime? DataPrazoDeEntrega { get; set; }
        public int? TentativasPermitidas { get; set; }
        [Required]
        public string UuidNoMongoDb { get; set; }
        [Required]
        public Turma Turma { get; set; }
        [JsonIgnore]
        public ICollection<Resultado> Resultados { get; set; }
        public Atividade()
        {

        }
        public Atividade(AtividadeDto dto)
        {
            Id = 0;
            if (dto.Id != null)
            {
                Id = (int)dto.Id;
            }
            Nome = dto.Nome;
            Descricao = dto.Descricao;
            Valor = 0F;
            TentativasPermitidas = dto.TentativasPermitidas;
            if (dto.Valor != null)
            {
                Valor = (float) dto.Valor;
            }
            DataDeCriacao = DateTime.UtcNow;
            DataPrazoDeEntrega = null;
            DataPrazoDeEntrega = dto.DataPrazoDeEntrega;
            TentativasPermitidas = dto.TentativasPermitidas;
        }
        public static int GetNumeroDeTentativasAluno(int idAtividade, string idAluno, AppDbContext context)
        {
            return (context.Resultados.Include(r => r.Atividade).Include(r => r.Aluno).Where(r => r.Atividade.Id == idAtividade && r.Aluno.Id.ToString().Equals(idAluno)).Count() + 1);
        }
    }
}
