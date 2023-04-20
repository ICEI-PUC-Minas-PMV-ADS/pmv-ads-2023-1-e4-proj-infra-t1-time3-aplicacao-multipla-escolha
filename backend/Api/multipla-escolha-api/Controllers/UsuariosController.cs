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

namespace multipla_escolha_api.Controllers
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
            var model = await _context.Usuarios.ToListAsync();
            return Ok(model);
        }

        [HttpGet("current")]
        public async Task<IActionResult> GetCurrent()
        {
            var userClaims = Usuario.getUserClaims(HttpContext.User);
            try
            {
                var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Id == Int32.Parse(userClaims[ClaimTypes.NameIdentifier]));

            return Ok(user);
            }
            catch { }
            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Create(UsuarioDto dto)
        {
            try
            {

            Usuario sameUsernameOrEmailUser = _context.Usuarios.FirstOrDefault(u => u.NomeDeUsuario == dto.NomeDeUsuario || u.Email == dto.Email);

            if (sameUsernameOrEmailUser != null)
            {
                if (sameUsernameOrEmailUser.NomeDeUsuario == dto.NomeDeUsuario)
                {
                    return BadRequest("Nome de usuário já cadastrado!");
                }

                if (sameUsernameOrEmailUser.Email== dto.Email)
                {
                    return BadRequest("Email já cadastrado!");
                }               
            }

            dto.Id = 0;
            Usuario usuario = new(dto);

            _context.Usuarios.Add(usuario);

            await _context.SaveChangesAsync();

            return Ok(usuario);
            }
            catch { }
            return BadRequest("Erro no cadastro!");
        }

        [HttpPut]
        public async Task<IActionResult> Update(UsuarioDto dto)
        {
            var userClaims = Usuario.getUserClaims(HttpContext.User);

            try
            {
                var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Id == Int32.Parse(userClaims[ClaimTypes.NameIdentifier]));

                if (user == null || dto.SenhaAntiga == null || !BCrypt.Net.BCrypt.Verify(dto.SenhaAntiga, user.Senha)) return Unauthorized("Senha incorreta!");

                if (dto.Email != user.Email)
                {
                    Usuario sameEmailUser = _context.Usuarios.FirstOrDefault(u => u.Email == dto.Email);
                    if (sameEmailUser != null)
                    {
                        return BadRequest("Email já cadastrado!");
                    }
                }

                user.Nome = dto.Nome;

                user.Sobrenome = dto.Sobrenome;

                user.Email = dto.Email;

                user.Telefone = dto.Telefone;

                user.Senha = BCrypt.Net.BCrypt.HashPassword(dto.Senha);

                _context.Usuarios.Update(user);

                await _context.SaveChangesAsync();

                return Ok(user);
            }
            catch
            {
                return Unauthorized("Erro de autorização!");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var model = await _context.Usuarios.FirstOrDefaultAsync(t => t.Id == id);

            if (model == null) return NotFound();

            return Ok(model);
        }

        [HttpGet("info")]
        public IActionResult GetInfo()
        {
            var userClaims = Usuario.getUserClaims(HttpContext.User);

            UsuarioInfoDto userInfoDto = new(userClaims);

            return Ok(userInfoDto);
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
                    HttpOnly = false,
                    Secure = true,
                    SameSite = SameSiteMode.None,
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
            
            try
            {
                var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Id == Int32.Parse(userClaims[ClaimTypes.NameIdentifier]));

                _context.Usuarios.Remove(user);

                await _context.SaveChangesAsync();

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
