using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using multipla_escolha_api_sql.Models;
using multipla_escolha_api_sql.Models.DTO;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using multipla_escolha_api_sql.Models.Config;
using Microsoft.Extensions.Options;

namespace multipla_escolha_api_sql.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IOptions<JwtConfig> _jwtConfig;

        public UsuariosController(AppDbContext context, IOptions<JwtConfig> jwtConfig)
        {
            _context = context;
            _jwtConfig = jwtConfig;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var model = await _context.Usuarios.Include(u => u.TurmasProfessor).ToListAsync();
            return Ok(model);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Create(UsuarioDto dto)
        {
            Usuario sameUsernameOrEmailUser = _context.Usuarios.FirstOrDefault(u => u.NomeDeUsuario == dto.NomeDeUsuario || u.Email == dto.Email);

            string errorMessage = "";

            if (sameUsernameOrEmailUser != null)
            {
                if (sameUsernameOrEmailUser.NomeDeUsuario == dto.NomeDeUsuario)
                {
                    errorMessage += "Nome de usuário já utilizado por outra conta!\n";
                }

                if (sameUsernameOrEmailUser.Email== dto.Email)
                {
                    errorMessage += "Email já utilizado por outra conta!\n";
                }
                return BadRequest(errorMessage);
            }

            dto.Id = 0;
            Usuario usuario = new(dto);

            _context.Usuarios.Add(usuario);

            await _context.SaveChangesAsync();

            return Ok(usuario);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var model = await _context.Usuarios.FirstOrDefaultAsync(t => t.Id == id);

            if (model == null) return NotFound();

            return Ok(model);
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate(AuthenticateDto dto)
        {
            try
            {
                var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.NomeDeUsuario == dto.NomeDeUsuario);

                if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Senha, user.Senha)) return Unauthorized();

                var jwt = GenerateJwtToken(user);

                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Expires = DateTime.UtcNow.AddHours(8),
                };

                Response.Cookies.Append("jwtToken", jwt, cookieOptions);

                return Ok(new {jwtToken = jwt});
            }
            catch
            {
                return Unauthorized();
            }
        }

        private string GenerateJwtToken(Usuario user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtConfig.Value.Key);
            var issuer = _jwtConfig.Value.Issuer;
            var claims = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Perfil.ToString()),
                new Claim(ClaimTypes.GivenName, user.Nome.ToString() + " " + user.Sobrenome.ToString()),
            });

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = DateTime.UtcNow.AddHours(8),
                Issuer = issuer,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
