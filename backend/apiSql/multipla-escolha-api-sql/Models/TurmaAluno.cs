namespace multipla_escolha_api_sql.Models
{
    public class TurmaAluno
    {
        public int TurmaId { get; set; }
        public Turma Turma { get; set; }
        public int AlunoId { get; set; }
        public Usuario Aluno { get; set; }
    }
}
