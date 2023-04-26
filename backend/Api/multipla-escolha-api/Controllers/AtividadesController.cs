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
    public class AtividadesController : ControllerBase
    {
        private readonly AppDbContext _context;

        private readonly AtividadeMongoDbService _atividadeMongoDbService;

        public AtividadesController(AppDbContext context, AtividadeMongoDbService atividadeMongoDbService)
        {
            _context = context;
            _atividadeMongoDbService = atividadeMongoDbService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var model = await _context.Atividades.Include(a => a.Turma).ToListAsync();
            return Ok(model);
        }

        [HttpPost]
        public async Task<IActionResult> Create(AtividadeDto dto)
        {
            var userClaims = Usuario.getUserClaims(HttpContext.User);

            if (!userClaims[ClaimTypes.Role].Equals("Professor")) {
                return Forbid();
            }

            dto.Id = 0;

            dto.AtividadeMongoDb.Id = System.Guid.NewGuid().ToString();

            Atividade model = new(dto);

            var turma = _context.Turmas.Include(t => t.Professor).FirstOrDefault(t => t.Id == dto.TurmaId);

            if (turma == null)
            {
                return BadRequest();
            }

            if (!turma.Professor.Id.ToString().Equals(userClaims[ClaimTypes.NameIdentifier]))
            {
                return Forbid();
            }

            model.Turma = turma;            

            await _atividadeMongoDbService.CreateAsync(dto.AtividadeMongoDb);

            model.UuidNoMongoDb = dto.AtividadeMongoDb.Id;

            _context.Atividades.Add(model);
            await _context.SaveChangesAsync();
                
            return Ok(model);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(AtividadeDto dto)
        {
            var userClaims = Usuario.getUserClaims(HttpContext.User);

            if (!userClaims[ClaimTypes.Role].Equals("Professor"))
            {
                return Forbid();
            }

            if (dto.Id == null)
            {
                return BadRequest();
            }

            Atividade model = await _context.Atividades.Include(a => a.Turma).ThenInclude(t => t.Professor).FirstOrDefaultAsync(a => a.Id == dto.Id);

            model.Nome = dto.Nome;
            model.Descricao = dto.Descricao;
            model.Valor = dto.Valor != null? (float) dto.Valor : 0F;
            model.DataPrazoDeEntrega = dto.DataPrazoDeEntrega;

            if (!model.Turma.Professor.Id.ToString().Equals(userClaims[ClaimTypes.NameIdentifier]))
            {
                return Forbid();
            }

            dto.AtividadeMongoDb.Id = model.UuidNoMongoDb;

            await _atividadeMongoDbService.UpdateAsync(dto.AtividadeMongoDb);
           
            _context.Atividades.Update(model);
            await _context.SaveChangesAsync();

            return Ok(model);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var model = await _context.Atividades.Include(a => a.Turma).ThenInclude(t => t.Professor).FirstOrDefaultAsync(t => t.Id == id);

            if (model == null) return NotFound();

            Console.WriteLine("Teste");
            Console.WriteLine(model.UuidNoMongoDb);

            AtividadeMongoDb atividadeMongoDb = await _atividadeMongoDbService.GetAsync(model.UuidNoMongoDb);

            if (atividadeMongoDb == null) return NotFound();

            AtividadeDto dto = new AtividadeDto(model);

            dto.AtividadeMongoDb = atividadeMongoDb;

            return Ok(dto);
        }
    }
}
