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

        public async Task<ServiceResponse> GetAllTurmasProfessor(Dictionary<String, String> userClaims)
        {
            var turmas = await _context.Turmas.Include(t => t.Professor).Where(t => t.Professor.Id.ToString() == userClaims[ClaimTypes.NameIdentifier]).ToListAsync();
            return new ServiceResponse(turmas, 200);
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

        public async Task<ServiceResponse> GetTurmaById(int id)
        {
            var turma = await _context.Turmas.Include(t => t.Professor).Include(t => t.Atividades).FirstOrDefaultAsync(t => t.Id == id);

            if (turma == null) return new ServiceResponse(null, 404);

            return new ServiceResponse(turma, 200);
        }
    }
}
