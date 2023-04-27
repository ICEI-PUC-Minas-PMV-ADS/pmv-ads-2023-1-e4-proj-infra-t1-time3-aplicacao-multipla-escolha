using multipla_escolha_api.Models.DTO;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace multipla_escolha_api.Models

{
    [Table("Resultados")]
    public class Resultado
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public float NotaDoAluno { get; set; }
        [Required]
        public float NotaMaxima { get; set; }
        [Required]
        public int NumeroDaTentativa { get; set; }
        [Required]
        public DateTime DataDaTentativa { get; set; }
        [Required]
        public string UuidNoMongoDb { get; set; }
        [Required]
        public Usuario Aluno { get; set; }
        [Required]
        public Atividade Atividade { get; set; }

        public Resultado()
        {

        }
        public Resultado(Atividade atividade, Usuario aluno, float notaDoAluno, string uuidNoMongoDb, int numeroDaTentativa)
        {
            Id = 0;
            NotaDoAluno = notaDoAluno;
            NotaMaxima = atividade.Valor;
            NumeroDaTentativa = numeroDaTentativa;
            DataDaTentativa = DateTime.UtcNow;
            UuidNoMongoDb = uuidNoMongoDb;
            Aluno = aluno;
            Atividade = atividade;
        }
    }
}
