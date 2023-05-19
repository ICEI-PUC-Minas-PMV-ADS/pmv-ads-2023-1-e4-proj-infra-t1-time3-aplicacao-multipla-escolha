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
        public ICollection<AtividadeDto> Atividades { get; set; }
        public bool? Matriculado { get; set; }

        public TurmaDto()
        {
        }
        public TurmaDto(Turma turma, AppDbContext context, String userId)
        {
            var atividadesDto = new List<AtividadeDto>();

            var atividades = turma.Atividades.ToList();

            for (int i = 0; i < atividades.Count; i++)
            {
                var atividadeDto = new AtividadeDto(atividades[i]);
                var resultado = context.Resultados.FirstOrDefault(r => r.Aluno.Id.ToString().Equals(userId) && r.Atividade.Id == atividades[i].Id);
                if (resultado != null)
                {
                    atividadeDto.Status = "Entregue";
                }
                else
                {
                    var date = DateTime.Now;
                    if (atividadeDto.DataPrazoDeEntrega > DateTime.Now)
                    {
                        atividadeDto.Status = "Atividade pendente";
                    }
                    else
                    {
                        atividadeDto.Status = "Atividade atrasada";
                    }
                }
                atividadesDto.Add(atividadeDto);
            }            

            Id = turma.Id;
            Nome = turma.Nome;
            Descricao = turma.Descricao;
            Ativo = turma.Ativo;
            DataDeCriacao = turma.DataDeCriacao;
            Professor = turma.Professor;
            AlunosTurma = turma.AlunosTurma;
            Atividades = atividadesDto;
        }
    }
}
