using multipla_escolha_api.Models.MongoDb;
using System.ComponentModel.DataAnnotations;

namespace multipla_escolha_api.Models.DTO
{
    public class AtividadeDto
    {
        public int? Id { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Descricao { get; set; }
        public float? Valor { get; set; }
        public DateTime? DataPrazoDeEntrega { get; set; }
        public int? TentativasPermitidas { get; set; }
        public int? TurmaId { get; set; }
        public Turma Turma { get; set; }
        [Required]
        public AtividadeMongoDb AtividadeMongoDb { get; set; }
        public bool? podeSerRealizada { get; set; }

        public List<Resultado> TentativasAnteriores { get; set; }

        public AtividadeDto()
        {

        }
        public AtividadeDto(Atividade model)
        {
            Id = model.Id;
            Nome = model.Nome;
            Descricao = model.Descricao;
            Valor = model.Valor;
            DataPrazoDeEntrega = model.DataPrazoDeEntrega;
            TentativasPermitidas = model.TentativasPermitidas;
            TurmaId = model.Turma.Id;
            Turma = model.Turma;
        }
    }
}
