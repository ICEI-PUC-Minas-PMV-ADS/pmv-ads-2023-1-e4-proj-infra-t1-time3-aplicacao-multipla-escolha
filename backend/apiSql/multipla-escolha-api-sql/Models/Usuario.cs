using multipla_escolha_api_sql.Models.DTO;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace multipla_escolha_api_sql.Models

{
    [Table("Usuarios")]
    public class Usuario
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string NomeDeUsuario { get; set; }
        [Required]
        [JsonIgnore]
        public string Senha { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Sobrenome { get; set; }
        [Required]
        public string Email { get; set; }
        public string Telefone { get; set; }
        [Required]
        public Perfil Perfil { get; set; }

        public ICollection<Turma> TurmasProfessor { get; set; }

        public ICollection<TurmaAluno> TurmasAluno { get; set; }

        public Usuario()
        {
                        
        }
        public Usuario(UsuarioDto dto)
        {
            Id = 0;
            if (dto.Id != null)
            {
                Id = (int) dto.Id;
            }
            NomeDeUsuario = dto.NomeDeUsuario;
            Senha = BCrypt.Net.BCrypt.HashPassword(dto.Senha);
            Nome = dto.Nome;
            Sobrenome = dto.Sobrenome;
            Email = dto.Email;
            Telefone = dto.Telefone;
            Perfil = dto.Perfil;
        }
    }

    public enum Perfil
    {
        [Display(Name = "Professor")]
        Professor,
        [Display(Name = "Aluno")]
        Aluno
    }
}
