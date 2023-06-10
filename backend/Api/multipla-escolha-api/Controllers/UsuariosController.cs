using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using multipla_escolha_api.Models;
using multipla_escolha_api.Models.DTO;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using multipla_escolha_api.Models.Config;
using Microsoft.Extensions.Options;
using multipla_escolha_api.Services;

namespace multipla_escolha_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {

        private readonly UsuariosService _usuariosService;

        public UsuariosController(UsuariosService usuariosService)
        {
            _usuariosService = usuariosService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            ServiceResponse response = await _usuariosService.GetAllUsers();
            return StatusCode(response.StatusCode, response.Content);
        }

        [HttpGet("current")]
        public async Task<IActionResult> GetCurrent()
        {
            var userClaims = Usuario.getUserClaims(HttpContext.User);
            ServiceResponse response = await _usuariosService.GetCurrentUser(userClaims);
            return StatusCode(response.StatusCode, response.Content);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Create(UsuarioDto dto)
        {
            ServiceResponse response = await _usuariosService.CreateUser(dto);
            return StatusCode(response.StatusCode, response.Content);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UsuarioDto dto)
        {
            var userClaims = Usuario.getUserClaims(HttpContext.User);
            ServiceResponse response = await _usuariosService.UpdateUser(dto, userClaims);
            return StatusCode(response.StatusCode, response.Content);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            ServiceResponse response = await _usuariosService.GetUserById(id);
            return StatusCode(response.StatusCode, response.Content);
        }

        [HttpGet("info")]
        public IActionResult GetInfo()
        {
            var userClaims = Usuario.getUserClaims(HttpContext.User);
            ServiceResponse response = _usuariosService.GetUserInfo(userClaims);
            return StatusCode(response.StatusCode, response.Content);
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate(AuthenticateDto dto)
        {
            ServiceResponse response = await _usuariosService.AuthenticateUser(dto);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = false,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddHours(8),
            };

            Response.Cookies.Append("jwtToken", response.Content.ToString(), cookieOptions);

            return StatusCode(response.StatusCode, new { jwtToken = response.Content });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = false,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddHours(8),
            };

            Response.Cookies.Delete("jwtToken", cookieOptions);

            return NoContent();
        }

        [HttpDelete("delete-account")]
        public async Task<IActionResult> DeleteAccount()
        {
            var userClaims = Usuario.getUserClaims(HttpContext.User);
            ServiceResponse response = await _usuariosService.DeleteAccount(userClaims);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = false,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddHours(8),
            };

            if (response.StatusCode == 204)
            {
                Response.Cookies.Delete("jwtToken", cookieOptions);
            }
            
            return StatusCode(response.StatusCode, response.Content);
        }
    }
}
