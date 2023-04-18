using System.ComponentModel.DataAnnotations;

namespace multipla_escolha_api_sql.Models.DTO
{
    public class UsuarioDto
    {
        public int? Id { get; set; }
        [Required]
        public string NomeDeUsuario { get; set; }
        [Required]
        public string Senha { get; set; }
        public string SenhaAntiga { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Sobrenome { get; set; }
        [Required]
        public string Email { get; set; }
        public string Telefone { get; set; }
        [Required]
        public Perfil Perfil { get; set; }
    }
}
