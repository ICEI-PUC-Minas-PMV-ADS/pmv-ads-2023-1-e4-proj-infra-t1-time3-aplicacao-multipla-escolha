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
        private readonly AtividadesService _atividadesService;
        public AtividadesController(AtividadesService atividadesService)
        {
            _atividadesService = atividadesService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var response = await _atividadesService.GetAllAtividades();
            return StatusCode(response.StatusCode, response.Content);
        }

        [HttpPost]
        public async Task<IActionResult> Create(AtividadeDto dto)
        {
            var userClaims = Usuario.getUserClaims(HttpContext.User);
            var response = await _atividadesService.CreateAtividade(dto, userClaims);
            return StatusCode(response.StatusCode, response.Content);
        }

        [HttpPut]
        public async Task<IActionResult> Edit(AtividadeDto dto)
        {
            var userClaims = Usuario.getUserClaims(HttpContext.User);
            var response = await _atividadesService.EditAtividade(dto, userClaims);
            return StatusCode(response.StatusCode, response.Content);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(int id)
        {
            var userClaims = Usuario.getUserClaims(HttpContext.User);
            var response = await _atividadesService.DeleteAtividadeById(id, userClaims);
            return StatusCode(response.StatusCode, response.Content);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var userClaims = Usuario.getUserClaims(HttpContext.User);
            var response = await _atividadesService.GetAtividadeById(id, userClaims);
            return StatusCode(response.StatusCode, response.Content);
        }
    }
}
