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
    public class AtividadeMongoDbController : ControllerBase
    {
        private readonly AtividadeMongoDbService _atividadeMongoDbService;

        public AtividadeMongoDbController(AtividadeMongoDbService atividadeMongoDbService)
        {
            _atividadeMongoDbService = atividadeMongoDbService;
        }

        [HttpGet]
        public async Task<List<AtividadeMongoDb>> GetAll()
            => await _atividadeMongoDbService.GetAllAsync();

        [HttpPost]
        public async Task<AtividadeMongoDb> Create(AtividadeMongoDb atividade)
        {
            await _atividadeMongoDbService.CreateAsync(atividade);
            return atividade;
        }
    }
}
