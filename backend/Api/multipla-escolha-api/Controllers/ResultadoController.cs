using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using multipla_escolha_api.Models;
using multipla_escolha_api.Models.DTO;
using multipla_escolha_api.Models.MongoDb;
using multipla_escolha_api.Services;
using System.Security.Claims;

namespace multipla_escolha_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ResultadosController : ControllerBase
    {
        private readonly AppDbContext _context;

        private readonly AtividadeMongoDbService _atividadeMongoDbService;

        public ResultadosController(AppDbContext context, AtividadeMongoDbService atividadeMongoDbService)
        {
            _context = context;
            _atividadeMongoDbService = atividadeMongoDbService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var model = await _context.Resultados.ToListAsync();
            return Ok(model);
        }

        [HttpPost]
        public async Task<IActionResult> Corrigir(RespostasDto respostasDto)
        {
            var userClaims = Usuario.getUserClaims(HttpContext.User);

            if (!userClaims[ClaimTypes.Role].Equals("Aluno"))
            {
                return Forbid();
            }

            var atividade = await _context.Atividades.FirstOrDefaultAsync(a => a.Id == respostasDto.idAtividade);

            if (atividade == null)
            {
                return NotFound();
            }

            int numeroDeTentativas = Atividade.getNumeroDeTentativasAluno(respostasDto.idAtividade, userClaims[ClaimTypes.NameIdentifier], _context);

            if (atividade.DataPrazoDeEntrega != null && atividade.DataPrazoDeEntrega <= DateTime.UtcNow)
            {
                return BadRequest("Atividade fora do prazo!");
            }

            if (atividade.TentativasPermitidas != null && numeroDeTentativas > atividade.TentativasPermitidas)
            {
                return BadRequest("Número de tentativas extrapolado!");
            }

            Usuario aluno = await _context.Usuarios.FirstOrDefaultAsync(u => u.Id.ToString().Equals(userClaims[ClaimTypes.NameIdentifier]));


            AtividadeMongoDb atividadeMongoDb = await _atividadeMongoDbService.GetAsync(atividade.UuidNoMongoDb);

            if (atividadeMongoDb == null) return NotFound();

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

            return Ok(resultado);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(int id)
        {
            var userClaims = Usuario.getUserClaims(HttpContext.User);

            var model = await _context.Atividades.Include(a => a.Turma).ThenInclude(t => t.Professor).FirstOrDefaultAsync(t => t.Id == id);

            if (model == null) return NotFound();

            if (!model.Turma.Professor.Id.ToString().Equals(userClaims[ClaimTypes.NameIdentifier]))
            {
                return Forbid();
            }

            await _atividadeMongoDbService.DeleteAsync(model.UuidNoMongoDb);

            _context.Atividades.Remove(model);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var userClaims = Usuario.getUserClaims(HttpContext.User);

            var model = await _context.Resultados.Include(r => r.Aluno).Include(r => r.Atividade).ThenInclude(a => a.Turma).ThenInclude(t => t.Professor).FirstOrDefaultAsync(t => t.Id == id);

            if (model == null) return NotFound();

            if (!(model.Aluno.Id.ToString().Equals(userClaims[ClaimTypes.NameIdentifier]) || model.Atividade.Turma.Professor.Id.ToString().Equals(userClaims[ClaimTypes.NameIdentifier]))) {
                return Forbid();
            }

            AtividadeMongoDb atividadeMongoDb = await _atividadeMongoDbService.GetAsync(model.UuidNoMongoDb);

            if (atividadeMongoDb == null) return NotFound();

            ResultadoDto dto = new ResultadoDto(model);

            dto.AtividadeMongoDb = atividadeMongoDb;

            return Ok(dto);
        }
    }
}
