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
        private readonly ResultadosService _resultadosService;
    
        public ResultadosController(ResultadosService resultadosService)
        {
            _resultadosService = resultadosService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var response = await _resultadosService.GetAllResults();
            return StatusCode(response.StatusCode, response.Content);
        }

        [HttpPost]
        public async Task<IActionResult> Corrigir(RespostasDto respostasDto)
        {
            var userClaims = Usuario.getUserClaims(HttpContext.User);
            var response = await _resultadosService.Corrigir(respostasDto, userClaims);
            return StatusCode(response.StatusCode, response.Content);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var userClaims = Usuario.getUserClaims(HttpContext.User);
            var response = await _resultadosService.GetResultById(id, userClaims);
            return StatusCode(response.StatusCode, response.Content);
        }
    }
}
