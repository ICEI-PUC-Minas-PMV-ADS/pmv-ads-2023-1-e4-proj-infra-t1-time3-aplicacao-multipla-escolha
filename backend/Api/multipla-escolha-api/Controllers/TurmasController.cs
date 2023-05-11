using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using multipla_escolha_api.Models;
using multipla_escolha_api.Models.DTO;
using multipla_escolha_api.Services;
using System.Security.Claims;

namespace multipla_escolha_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TurmasController : ControllerBase
    {
        private readonly TurmasService _turmasService;
        
        private readonly AppDbContext _context;
        public TurmasController(TurmasService turmasService, AppDbContext context)
        {
            _turmasService = turmasService;
            _context = context;
         }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery(Name = "searchStringTurma")] string searchStringTurma = "", [FromQuery(Name = "searchStringProfessor")] string searchStringProfessor = "", [FromQuery(Name = "pageSize")] int pageSize = 50, [FromQuery(Name = "pageNumber")] int pageNumber = 0)
        {
            var response = await _turmasService.GetAllTurmas(searchStringTurma, searchStringProfessor, pageSize, pageNumber);
            return StatusCode(response.StatusCode, response.Content);
        }

        [HttpGet("user-turmas")]
        public async Task<IActionResult> GetAllProfessor([FromQuery(Name = "ativas")] bool ativas = true, [FromQuery(Name = "pageSize")] int pageSize = 50, [FromQuery(Name = "pageNumber")] int pageNumber = 0)
        {
            var userClaims = Usuario.getUserClaims(HttpContext.User);
            var response = await _turmasService.GetAllTurmasUsuario(userClaims, ativas, pageSize, pageNumber);
            return StatusCode(response.StatusCode, response.Content);
        }

        [HttpPost]
        public async Task<IActionResult> Create(TurmaDto dto)
        {
            var userClaims = Usuario.getUserClaims(HttpContext.User);
            var response = await _turmasService.CreateTurma(dto, userClaims);
            return StatusCode(response.StatusCode, response.Content);
        }

        [HttpPut]
        public async Task<IActionResult> Update(TurmaDto dto)
        {
            var userClaims = Usuario.getUserClaims(HttpContext.User);
            var response = await _turmasService.UpdateTurma(dto, userClaims);
            return StatusCode(response.StatusCode, response.Content);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userClaims = Usuario.getUserClaims(HttpContext.User);
            var response = await _turmasService.DeleteTurma(id, userClaims);
            return StatusCode(response.StatusCode, response.Content);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var response = await _turmasService.GetTurmaById(id);
            return StatusCode(response.StatusCode, response.Content);
        }
         
        [HttpGet("{idTurma}/usuarios")]

        public async Task<IActionResult> RealizarMatricula(int idTurma)
        {
            var userClaims = Usuario.getUserClaims(HttpContext.User);
            var response = await _turmasService.RealizarMatriculaEmTurma(idTurma, userClaims);
            return StatusCode(response.StatusCode, response.Content);
        }
    }
}
