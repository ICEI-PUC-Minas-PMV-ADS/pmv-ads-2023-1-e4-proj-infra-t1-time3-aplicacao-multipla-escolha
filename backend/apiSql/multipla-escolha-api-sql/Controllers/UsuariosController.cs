using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using multipla_escolha_api_sql.Models;
using multipla_escolha_api_sql.Models.DTO;

namespace multipla_escolha_api_sql.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var model = await _context.Usuarios.Include(u => u.TurmasProfessor).ToListAsync();
            return Ok(model);
        }

        [HttpPost]
        public async Task<IActionResult> Create(UsuarioDto model)
        {
            model.Id = 0;
            Usuario usuario = new(model);

            _context.Usuarios.Add(usuario);

            await _context.SaveChangesAsync();

            return Ok(usuario);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var model = await _context.Usuarios.FirstOrDefaultAsync(t => t.Id == id);

            if (model == null) NotFound();

            return Ok(model);
        }
    }
}
