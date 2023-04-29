using multipla_escolha_api.Models.MongoDb;
using System.ComponentModel.DataAnnotations;

namespace multipla_escolha_api.Models.DTO
{
    public class ResultadoDto
    {
        public int? Id { get; set; }
        [Required]
        public Atividade Atividade { get; set; }
        public float? NotaDoAluno { get; set; }
        public float? NotaMaxima { get; set; }
        public int NumeroDaTentativa { get; set; }
        public DateTime DataDaTentativa { get; set; }
        
        public AtividadeMongoDb AtividadeMongoDb { get; set; }
        public ResultadoDto()
        {

        }
        public ResultadoDto(Resultado model)
        {
            Id = model.Id;
            NotaDoAluno = model.NotaDoAluno;
            NotaMaxima = model.NotaMaxima;
            DataDaTentativa = model.DataDaTentativa;
            NumeroDaTentativa = model.NumeroDaTentativa;
            Atividade = model.Atividade;
        }
    }
}
