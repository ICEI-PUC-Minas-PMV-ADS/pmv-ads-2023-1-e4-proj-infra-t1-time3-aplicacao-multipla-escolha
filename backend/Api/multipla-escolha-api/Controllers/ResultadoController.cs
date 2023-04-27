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

        private int getNumeroDeTentativas(int idAtividade, string idAluno)
        {
            return (_context.Resultados.Include(r => r.Atividade).Include(r => r.Aluno).Where(r => r.Atividade.Id == idAtividade && r.Aluno.Id.ToString().Equals(idAluno)).Count() + 1);
        }

        [HttpPost]
        public async Task<IActionResult> Corrigir(RespostasDto respostasDto)
        {
            var atividade = await _context.Atividades.FirstOrDefaultAsync(a => a.Id == respostasDto.idAtividade);

            if (atividade == null)
            {
                return NotFound();
            }

            var userClaims = Usuario.getUserClaims(HttpContext.User);

            int numeroDeTentativas = getNumeroDeTentativas(respostasDto.idAtividade, userClaims[ClaimTypes.NameIdentifier]);
            
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
                atividadeMongoDb.Questoes[i].RespostaAluno = respostasDto.Respostas[i];
                if (atividadeMongoDb.Questoes[i].Resposta == respostasDto.Respostas[i])
                {
                    notaAluno += atividadeMongoDb.Questoes[i].Valor;
                }
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

            var model = await _context.Atividades.Include(a => a.Turma).ThenInclude(t => t.Professor).FirstOrDefaultAsync(t => t.Id == id);

            if (model == null) return NotFound();

            AtividadeMongoDb atividadeMongoDb = await _atividadeMongoDbService.GetAsync(model.UuidNoMongoDb);

            if (atividadeMongoDb == null) return NotFound();

            AtividadeDto dto = new AtividadeDto(model);

            if (!model.Turma.Professor.Id.ToString().Equals(userClaims[ClaimTypes.NameIdentifier]))
            {
                for (int i = 0; i < atividadeMongoDb.Questoes.Count(); i++)
            {
                atividadeMongoDb.Questoes[i].Resposta = null;
            }
            }

            dto.AtividadeMongoDb = atividadeMongoDb;

            return Ok(dto);
        }
    }
}
