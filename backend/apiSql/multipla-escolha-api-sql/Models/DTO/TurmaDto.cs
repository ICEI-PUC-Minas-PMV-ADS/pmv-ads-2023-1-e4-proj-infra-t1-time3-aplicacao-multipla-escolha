using System.ComponentModel.DataAnnotations;

namespace multipla_escolha_api_sql.Models.DTO
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
    }
}
