using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using multipla_escolha_api.Models;
using multipla_escolha_api.Models.DTO;
using System.Security.Claims;

namespace multipla_escolha_api.Services
{
    public class TurmasService
    {
        private readonly AppDbContext _context;

        public TurmasService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ServiceResponse> GetAllTurmas(string searchStringTurma,string searchStringProfessor, int pageSize, int pageNumber)
        {
            var turmas = _context.Turmas.Include(t => t.Professor).Where(t => t.Ativo == true).OrderBy(t => t.Nome);

            if (searchStringTurma != null && searchStringTurma.Length > 0)
            {
                turmas = (IOrderedQueryable<Turma>) turmas.Where(x => x.Nome.Contains(searchStringTurma));
            }
            if (searchStringProfessor != null && searchStringProfessor.Length > 0)
            {
                turmas = (IOrderedQueryable<Turma>) turmas.Where(x => x.Professor.Nome.Contains(searchStringProfessor) || x.Professor.Email.Contains(searchStringProfessor));
            }

            var page = await Page.GetPageAsync(turmas, pageSize, pageNumber);

            return new ServiceResponse(page, 200);
        }

        public async Task<ServiceResponse> GetAllTurmasUsuario(Dictionary<String, String> userClaims, bool ativas, int pageSize, int pageNumber)
        {
            if (userClaims[ClaimTypes.Role].Equals("Professor"))
            {
                var turmas = _context.Turmas.Include(t => t.Professor).Where(t => t.Professor.Id.ToString() == userClaims[ClaimTypes.NameIdentifier]).Where(t => t.Ativo == ativas).OrderByDescending(t => t.DataDeCriacao);

                var page = await Page.GetPageAsync(turmas, pageSize, pageNumber);
                
                return new ServiceResponse(page, 200);
            }

            if (userClaims[ClaimTypes.Role].Equals("Aluno"))
            {
                var turmas = _context.Turmas.Include(t => t.AlunosTurma).Where(t => t.AlunosTurma.Any(at => at.AlunoId == Int32.Parse(userClaims[ClaimTypes.NameIdentifier]))).OrderByDescending(t => t.DataDeCriacao);

                var page = await Page.GetPageAsync(turmas, pageSize, pageNumber);

                return new ServiceResponse(page, 200);
            }
            return new ServiceResponse(null, 400);
        }

        public async Task<ServiceResponse> CreateTurma(TurmaDto dto, Dictionary<String, String> userClaims)
        {
            if (!userClaims[ClaimTypes.Role].Equals("Professor")) {
                return new ServiceResponse(null, 403);
            }

            dto.Id = 0;

            Turma model = new(dto);

            var professor = _context.Usuarios.FirstOrDefault(u => u.Id == Int32.Parse(userClaims[ClaimTypes.NameIdentifier]));

            if (professor == null)
            {
                return new ServiceResponse(null, 400);
            }

            model.Professor = professor;
           
            _context.Turmas.Add(model);
            await _context.SaveChangesAsync();

            return new ServiceResponse(model, 201);
        }

        public async Task<ServiceResponse> UpdateTurma(TurmaDto dto, Dictionary<String, String> userClaims)
        {
            if (!userClaims[ClaimTypes.Role].Equals("Professor"))
            {
                return new ServiceResponse(null, 403);
            }

            Turma turma = _context.Turmas.Include(t => t.Professor).FirstOrDefault(t => t.Id == dto.Id);

            if (turma == null)
            {
                return new ServiceResponse(null, 404);
            }

            if (!turma.Professor.Id.ToString().Equals(userClaims[ClaimTypes.NameIdentifier]))
            {
                return new ServiceResponse(null, 403);
            }

            turma.Nome = dto.Nome;
            turma.Descricao = dto.Descricao;
            turma.Ativo = dto.Ativo;

            _context.Turmas.Update(turma);

            await _context.SaveChangesAsync();

            return new ServiceResponse(null, 204);
        }

        public async Task<ServiceResponse> DeleteTurma(int id, Dictionary<String, String> userClaims)
        {           
            Turma turma = await _context.Turmas.Include(t => t.Professor).FirstOrDefaultAsync(t => t.Id == id);

            if (turma == null)
            {
                return new ServiceResponse(null, 404);
            }

            if (!turma.Professor.Id.ToString().Equals(userClaims[ClaimTypes.NameIdentifier]))
            {
                return new ServiceResponse(null, 403);
            }

            _context.Turmas.Remove(turma);

            await _context.SaveChangesAsync();

            return new ServiceResponse(null, 204);
        }

        public async Task<ServiceResponse> GetTurmaById(int id, String alunoId, Dictionary<String, String> userClaims)
        {
            var turma = await _context.Turmas.Include(t => t.Professor).Include(t => t.Atividades).Include(t => t.AlunosTurma).ThenInclude(at => at.Aluno).FirstOrDefaultAsync(t => t.Id == id);

            if (turma == null) return new ServiceResponse(null, 404);

            TurmaDto turmaDto = null;
            
            if (userClaims[ClaimTypes.Role].Equals("Aluno"))
            {
                turmaDto = new TurmaDto(turma, _context, userClaims[ClaimTypes.NameIdentifier]);

                if (turma.AlunosTurma.Any(at => at.AlunoId == Int32.Parse(userClaims[ClaimTypes.NameIdentifier])))
                {
                    turmaDto.Matriculado = true;
                }
                else
                {
                    turmaDto.Matriculado = false;
                }
            }
            else
            {
                turmaDto = new TurmaDto(turma, _context, alunoId);
            }        

            return new ServiceResponse(turmaDto, 200);
        }

        public async Task<ServiceResponse> RealizarMatriculaEmTurma(int idTurma, Dictionary<String, String> userClaims)
        {
            if (!userClaims[ClaimTypes.Role].Equals("Aluno"))
            {
                return new ServiceResponse(null, 403);
            }

            var aluno = _context.Usuarios.FirstOrDefault(u => u.Id == Int32.Parse(userClaims[ClaimTypes.NameIdentifier]));

            if (aluno == null)
            {
                return new ServiceResponse(null, 400);
            }

            TurmaAluno turmaAluno = new();

            turmaAluno.Turma = await _context.Turmas.FirstOrDefaultAsync(t => t.Id == idTurma);

            turmaAluno.Aluno = await _context.Usuarios.FirstOrDefaultAsync(u => u.Id.ToString().Equals(userClaims[ClaimTypes.NameIdentifier]));

            _context.TurmasAlunos.Add(turmaAluno);

            await _context.SaveChangesAsync();

            return new ServiceResponse(null, 204);
        }

        public async Task<ServiceResponse> CancelarMatriculaEmTurma(int idTurma, Dictionary<String, String> userClaims)
        {
            TurmaAluno turmaAluno = await _context.TurmasAlunos.FirstOrDefaultAsync(ta => ta.TurmaId == idTurma && ta.AlunoId == Int32.Parse(userClaims[ClaimTypes.NameIdentifier]));

            if (turmaAluno == null)
            {
                return new ServiceResponse(null, 400);
            }

            _context.TurmasAlunos.Remove(turmaAluno);

            await _context.SaveChangesAsync();

            return new ServiceResponse(null, 204);
        }
    }
}
