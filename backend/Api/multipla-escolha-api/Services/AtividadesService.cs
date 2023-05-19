using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using multipla_escolha_api.Models;
using multipla_escolha_api.Models.DTO;
using multipla_escolha_api.Models.MongoDb;
using multipla_escolha_api.Services;
using System.Security.Claims;

namespace multipla_escolha_api.Services
{
    public class AtividadesService
    {
        private readonly AppDbContext _context;

        private readonly AtividadeMongoDbService _atividadeMongoDbService;

        public AtividadesService(AppDbContext context, AtividadeMongoDbService atividadeMongoDbService)
        {
            _context = context;
            _atividadeMongoDbService = atividadeMongoDbService;
        }

        public async Task<ServiceResponse> GetAllAtividades()
        {
            var atividades = await _context.Atividades.Include(a => a.Turma).ToListAsync();
            return new ServiceResponse(atividades, 200);
        }

        public async Task<ServiceResponse> CreateAtividade(AtividadeDto dto, Dictionary<String, String> userClaims)
        {
            if (!userClaims[ClaimTypes.Role].Equals("Professor")) {
                return new ServiceResponse(null, 403);
            }

            dto.Id = 0;

            dto.AtividadeMongoDb.Id = System.Guid.NewGuid().ToString();

            Atividade model = new(dto);

            var turma = _context.Turmas.Include(t => t.Professor).FirstOrDefault(t => t.Id == dto.TurmaId);

            if (turma == null)
            {
                return new ServiceResponse(null, 400);
            }

            if (!turma.Professor.Id.ToString().Equals(userClaims[ClaimTypes.NameIdentifier]))
            {
                return new ServiceResponse(null, 403);
            }

            model.Turma = turma;            

            await _atividadeMongoDbService.CreateAsync(dto.AtividadeMongoDb);

            model.UuidNoMongoDb = dto.AtividadeMongoDb.Id;

            _context.Atividades.Add(model);
            await _context.SaveChangesAsync();

            return new ServiceResponse(model, 201);
        }

        public async Task<ServiceResponse> EditAtividade(AtividadeDto dto, Dictionary<String, String> userClaims)
        {            
            if (!userClaims[ClaimTypes.Role].Equals("Professor"))
            {
                return new ServiceResponse(null, 403);
            }

            if (dto.Id == null)
            {
                return new ServiceResponse(null, 400);
            }

            Atividade model = await _context.Atividades.Include(a => a.Turma).ThenInclude(t => t.Professor).FirstOrDefaultAsync(a => a.Id == dto.Id);

            model.Nome = dto.Nome;
            model.Descricao = dto.Descricao;
            model.Valor = dto.Valor != null? (float) dto.Valor : 0F;
            model.TentativasPermitidas = dto.TentativasPermitidas;
            model.DataPrazoDeEntrega = dto.DataPrazoDeEntrega;

            if (!model.Turma.Professor.Id.ToString().Equals(userClaims[ClaimTypes.NameIdentifier]))
            {
                return new ServiceResponse(null, 403);
            }

            dto.AtividadeMongoDb.Id = model.UuidNoMongoDb;

            await _atividadeMongoDbService.UpdateAsync(dto.AtividadeMongoDb);
           
            _context.Atividades.Update(model);
            await _context.SaveChangesAsync();

            return new ServiceResponse(null, 204);
        }

        public async Task<ServiceResponse> DeleteAtividadeById(int id, Dictionary<String, String> userClaims)
        {
            var model = await _context.Atividades.Include(a => a.Turma).ThenInclude(t => t.Professor).FirstOrDefaultAsync(t => t.Id == id);

            if (model == null) return new ServiceResponse(null, 404);

            if (!model.Turma.Professor.Id.ToString().Equals(userClaims[ClaimTypes.NameIdentifier]))
            {
                return new ServiceResponse(null, 403);
            }

            await _atividadeMongoDbService.DeleteAsync(model.UuidNoMongoDb);

            _context.Atividades.Remove(model);

            await _context.SaveChangesAsync();

            return new ServiceResponse(null, 204);
        }

        public async Task<ServiceResponse> GetAtividadeById(int id, Dictionary<String, String> userClaims)
        {
            var model = await _context.Atividades.Include(a => a.Turma).ThenInclude(t => t.Professor).FirstOrDefaultAsync(t => t.Id == id);

            if (model == null) return new ServiceResponse(null, 404);

            AtividadeMongoDb atividadeMongoDb = await _atividadeMongoDbService.GetAsync(model.UuidNoMongoDb);

            if (atividadeMongoDb == null) return new ServiceResponse(null, 404);

            AtividadeDto dto = new (model);

            if (!model.Turma.Professor.Id.ToString().Equals(userClaims[ClaimTypes.NameIdentifier]))
            {
                for (int i = 0; i < atividadeMongoDb.Questoes.Length; i++)
                {
                    atividadeMongoDb.Questoes[i].Resposta = null;
                }
            }
            
            dto.AtividadeMongoDb = atividadeMongoDb;
            
            bool podeSerRealizada = true;

            if (!userClaims[ClaimTypes.Role].Equals("Aluno"))
            {
                dto.TentativasAnteriores = new List<Resultado>();
                podeSerRealizada = false;
            }
            else
            {
                dto.TentativasAnteriores = await _context.Resultados.Include(r => r.Atividade).Include(r => r.Aluno).Where(r => r.Atividade.Id == id && r.Aluno.Id.ToString().Equals(userClaims[ClaimTypes.NameIdentifier])).OrderByDescending(t => t.DataDaTentativa).ToListAsync();

                var alunosTurma = await _context.TurmasAlunos.FirstOrDefaultAsync(ta => ta.TurmaId == model.Turma.Id && ta.AlunoId.ToString().Equals(userClaims[ClaimTypes.NameIdentifier]));

                if (alunosTurma == null) {
                    podeSerRealizada = false;
                }
            }

            if (model.DataPrazoDeEntrega != null && model.DataPrazoDeEntrega <= DateTime.UtcNow)
            {
                podeSerRealizada = false;
            }
            else if (model.TentativasPermitidas != null && dto.TentativasAnteriores.Count >= model.TentativasPermitidas)
            {
                podeSerRealizada = false;
            }

            dto.PodeSerRealizada = podeSerRealizada;            

            return new ServiceResponse(dto, 200);
        }
    }
}
