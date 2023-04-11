using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using multipla_escolha_api_sql.Models;

namespace multipla_escolha_api_sql.Controllers
{
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
        public async Task<IActionResult> Create(Turma model)
        {
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
