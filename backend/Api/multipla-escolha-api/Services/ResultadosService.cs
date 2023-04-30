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

            var atividade = await _context.Atividades.FirstOrDefaultAsync(a => a.Id == respostasDto.idAtividade);

            if (atividade == null)
            {
                return new ServiceResponse(null, 404);
            }

            int numeroDeTentativas = Atividade.getNumeroDeTentativasAluno(respostasDto.idAtividade, userClaims[ClaimTypes.NameIdentifier], _context);

            if (atividade.DataPrazoDeEntrega != null && atividade.DataPrazoDeEntrega <= DateTime.UtcNow)
            {
                return new ServiceResponse("Atividade fora do prazo!", 400);
            }

            if (atividade.TentativasPermitidas != null && numeroDeTentativas > atividade.TentativasPermitidas)
            {
                return new ServiceResponse("Número de tentativas extrapolado!", 400);
            }

            Usuario aluno = await _context.Usuarios.FirstOrDefaultAsync(u => u.Id.ToString().Equals(userClaims[ClaimTypes.NameIdentifier]));


            AtividadeMongoDb atividadeMongoDb = await _atividadeMongoDbService.GetAsync(atividade.UuidNoMongoDb);

            if (atividadeMongoDb == null) return new ServiceResponse(null, 404);

            float notaAluno = 0F;

            for (int i = 0; i < atividadeMongoDb.Questoes.Count(); i++)
            {
                if (atividadeMongoDb.Questoes[i].Resposta == respostasDto.Respostas[i])
                {
                    notaAluno += atividadeMongoDb.Questoes[i].Valor;
                    atividadeMongoDb.Questoes[i].AlunoAcertouResposta = true;
                }
                else
                {
                    atividadeMongoDb.Questoes[i].AlunoAcertouResposta = false;
                }
                atividadeMongoDb.Questoes[i].Resposta = respostasDto.Respostas[i];
            }

            atividadeMongoDb.Id = System.Guid.NewGuid().ToString();

            await _atividadeMongoDbService.CreateAsync(atividadeMongoDb);

            Resultado resultado = new Resultado(atividade, aluno, notaAluno, atividadeMongoDb.Id, numeroDeTentativas);

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

            ResultadoDto dto = new ResultadoDto(model);

            dto.AtividadeMongoDb = atividadeMongoDb;

            return new ServiceResponse(dto, 200);
        }
    }

