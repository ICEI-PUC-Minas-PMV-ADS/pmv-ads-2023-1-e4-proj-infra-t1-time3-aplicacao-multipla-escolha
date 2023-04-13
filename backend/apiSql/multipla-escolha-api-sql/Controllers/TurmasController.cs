using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using multipla_escolha_api_sql.Models;
using multipla_escolha_api_sql.Models.DTO;
using System.Security.Claims;

namespace multipla_escolha_api_sql.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TurmasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TurmasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var model = await _context.Turmas.ToListAsync();
            return Ok(model);
        }

        [HttpPost]
        public async Task<IActionResult> Create(TurmaDto dto)
        {              
            var userClaims = Usuario.getUserClaims(HttpContext.User);

            dto.Id = 0;

            Turma model = new(dto);

            var professor = _context.Usuarios.FirstOrDefault(u => u.Id == Int32.Parse(userClaims[ClaimTypes.NameIdentifier]));

            if (professor == null)
            {
                return BadRequest();
            }

            model.Professor = professor;
           
            _context.Turmas.Add(model);
            await _context.SaveChangesAsync();

            return Ok(model);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var model = await _context.Turmas.FirstOrDefaultAsync(t => t.Id == id);

            if (model == null) NotFound();

            return Ok(model);
        }
    }
}
