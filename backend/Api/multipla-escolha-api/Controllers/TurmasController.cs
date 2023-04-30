using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using multipla_escolha_api.Models;
using multipla_escolha_api.Models.DTO;
using System.Security.Claims;

namespace multipla_escolha_api.Controllers
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
        public async Task<IActionResult> GetAll([FromQuery(Name = "searchStringTurma")] string searchStringTurma = "", [FromQuery(Name = "searchStringProfessor")] string searchStringProfessor = "", [FromQuery(Name = "pageSize")] int pageSize = 50, [FromQuery(Name = "pageNumber")] int pageNumber = 0)
        {
            var model = _context.Turmas.Include(t => t.Professor).Where(t => t.Ativo == true).OrderBy(t => t.Nome);

            if (searchStringTurma != null && searchStringTurma.Length > 0)
            {
                model = (IOrderedQueryable<Turma>)model.Where(x => x.Nome.Contains(searchStringTurma));
            }
            if (searchStringProfessor != null && searchStringProfessor.Length > 0)
            {
                model = (IOrderedQueryable<Turma>)model.Where(x => x.Professor.Nome.Contains(searchStringProfessor) || x.Professor.Email.Contains(searchStringProfessor));
            }

            var page = await Page.getPageAsync(model, pageSize, pageNumber);

            return Ok(page);
        }

        [HttpGet("user-turmas")]
        public async Task<IActionResult> GetAllProfessor()
        {
            var userClaims = Usuario.getUserClaims(HttpContext.User);
            var model = await _context.Turmas.Include(t => t.Professor).Where(t => t.Professor.Id.ToString() == userClaims[ClaimTypes.NameIdentifier]).ToListAsync();
            return Ok(model);
        }

        [HttpPost]
        public async Task<IActionResult> Create(TurmaDto dto)
        {
            var userClaims = Usuario.getUserClaims(HttpContext.User);

            if (!userClaims[ClaimTypes.Role].Equals("Professor")) {
                return Forbid();
            }

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

        [HttpPut]
        public async Task<IActionResult> Update(TurmaDto dto)
        {
            var userClaims = Usuario.getUserClaims(HttpContext.User);

            if (!userClaims[ClaimTypes.Role].Equals("Professor"))
            {
                return Forbid();
            }

            Turma turma = _context.Turmas.Include(t => t.Professor).FirstOrDefault(t => t.Id == dto.Id);

            if (turma == null)
            {
                return NotFound();
            }

            if (!turma.Professor.Id.ToString().Equals(userClaims[ClaimTypes.NameIdentifier]))
            {
                return Forbid();
            }

            turma.Nome = dto.Nome;
            turma.Descricao = dto.Descricao;
            turma.Ativo = dto.Ativo;

            _context.Turmas.Update(turma);

            await _context.SaveChangesAsync();

            return Ok(turma);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userClaims = Usuario.getUserClaims(HttpContext.User);

            Turma turma = await _context.Turmas.Include(t => t.Professor).FirstOrDefaultAsync(t => t.Id == id);

            if (turma == null)
            {
                return NotFound();
            }

            if (!turma.Professor.Id.ToString().Equals(userClaims[ClaimTypes.NameIdentifier]))
            {
                return Forbid();
            }

            _context.Turmas.Remove(turma);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var model = await _context.Turmas.Include(t => t.Professor).Include(t => t.Atividades).FirstOrDefaultAsync(t => t.Id == id);

            if (model == null) NotFound();

            return Ok(model);
         }
         
        [HttpGet("{idTurma}/usuarios")]

        public async Task<IActionResult> RealizarMatricula(int idTurma)
        {
            var userClaims = Usuario.getUserClaims(HttpContext.User);

            if (!userClaims[ClaimTypes.Role].Equals("Aluno"))
            {
                return Forbid();
            }

            var aluno = _context.Usuarios.FirstOrDefault(u => u.Id == Int32.Parse(userClaims[ClaimTypes.NameIdentifier]));

            if (aluno == null)
            {
                return BadRequest();
            }

            TurmaAluno turmaAluno = new TurmaAluno();

            turmaAluno.Turma = _context.Turmas.FirstOrDefault(t => t.Id == idTurma);

            turmaAluno.Aluno = _context.Usuarios.FirstOrDefault(u => u.Id.ToString().Equals(userClaims[ClaimTypes.NameIdentifier]));

            _context.TurmasAlunos.Add(turmaAluno);

            await _context.SaveChangesAsync();

            return Ok(turmaAluno);

        }
    }
}
