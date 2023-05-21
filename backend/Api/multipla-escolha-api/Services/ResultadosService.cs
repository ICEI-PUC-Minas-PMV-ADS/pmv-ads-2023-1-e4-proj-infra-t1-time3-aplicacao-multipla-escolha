using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using multipla_escolha_api.Models;
using multipla_escolha_api.Models.DTO;
using multipla_escolha_api.Models.MongoDb;
using multipla_escolha_api.Services;
using System.Security.Claims;

namespace multipla_escolha_api.Services;

    public class ResultadosService
    {
        private readonly AppDbContext _context;

        private readonly AtividadeMongoDbService _atividadeMongoDbService;

        public ResultadosService(AppDbContext context, AtividadeMongoDbService atividadeMongoDbService)
        {
            _context = context;
            _atividadeMongoDbService = atividadeMongoDbService;
        }

        public async Task<ServiceResponse> GetAllResults()
        {
            var model = await _context.Resultados.ToListAsync();
            return new ServiceResponse(model, 200);
        }

        public async Task<ServiceResponse> Corrigir(RespostasDto respostasDto, Dictionary<String, String> userClaims)
        {
            if (!userClaims[ClaimTypes.Role].Equals("Aluno"))
            {
                return new ServiceResponse(null, 403);
            }

            var atividade = await _context.Atividades.Include(a => a.Turma).FirstOrDefaultAsync(a => a.Id == respostasDto.idAtividade);
        
            var alunosTurma = await _context.TurmasAlunos.FirstOrDefaultAsync(ta => ta.TurmaId == atividade.Turma.Id && ta.AlunoId.ToString().Equals(userClaims[ClaimTypes.NameIdentifier]));

            if (alunosTurma == null)
            {
                return new ServiceResponse(null, 403);
            }

            if (atividade == null)
            {
                return new ServiceResponse(null, 404);
            }

            int numeroDeTentativas = Atividade.GetNumeroDeTentativasAluno(respostasDto.idAtividade, userClaims[ClaimTypes.NameIdentifier], _context);

            string errorMessage = Atividade.CheckIfUserCanTakeTest(atividade, numeroDeTentativas);

            if (errorMessage != null)
            {
                return new ServiceResponse(errorMessage, 400);
            }

            Usuario aluno = await _context.Usuarios.FirstOrDefaultAsync(u => u.Id.ToString().Equals(userClaims[ClaimTypes.NameIdentifier]));

            AtividadeMongoDb atividadeMongoDb = await _atividadeMongoDbService.GetAsync(atividade.UuidNoMongoDb);

            if (atividadeMongoDb == null) return new ServiceResponse(null, 404);

            var correcaoAtividadeMongoDb = AtividadeMongoDb.Corrigir(atividadeMongoDb, respostasDto);

            atividadeMongoDb = correcaoAtividadeMongoDb.Item1;

            float notaAluno = correcaoAtividadeMongoDb.Item2;

            await _atividadeMongoDbService.CreateAsync(atividadeMongoDb);

            Resultado resultado = new (atividade, aluno, notaAluno, atividadeMongoDb.Id, numeroDeTentativas);

            _context.Resultados.Add(resultado);

            await _context.SaveChangesAsync();

            return new ServiceResponse(resultado, 200);
        }

        public async Task<ServiceResponse> GetResultById(int id, Dictionary<String, String> userClaims)
        {
            var model = await _context.Resultados.Include(r => r.Aluno).Include(r => r.Atividade).ThenInclude(a => a.Turma).ThenInclude(t => t.Professor).FirstOrDefaultAsync(t => t.Id == id);

            if (model == null) return new ServiceResponse(null, 404);

            if (!(model.Aluno.Id.ToString().Equals(userClaims[ClaimTypes.NameIdentifier]) || model.Atividade.Turma.Professor.Id.ToString().Equals(userClaims[ClaimTypes.NameIdentifier]))) {
                return new ServiceResponse(null, 403);
            }

            AtividadeMongoDb atividadeMongoDb = await _atividadeMongoDbService.GetAsync(model.UuidNoMongoDb);

            if (atividadeMongoDb == null) return new ServiceResponse(null, 404);

            ResultadoDto dto = new (model);

            dto.AtividadeMongoDb = atividadeMongoDb;

            return new ServiceResponse(dto, 200);
        }
    }

