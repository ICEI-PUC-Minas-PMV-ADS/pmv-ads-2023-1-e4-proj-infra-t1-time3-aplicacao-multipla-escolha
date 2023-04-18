using System.ComponentModel.DataAnnotations;

namespace multipla_escolha_api_sql.Models.DTO
{
    public class AuthenticateDto
    {
        [Required]
        public string NomeDeUsuario { get; set; }
        [Required]
        public string Senha { get; set; }
    }
}
