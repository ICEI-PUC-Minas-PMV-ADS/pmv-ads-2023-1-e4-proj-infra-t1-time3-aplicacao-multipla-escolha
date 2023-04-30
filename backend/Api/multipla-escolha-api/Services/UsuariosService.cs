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

namespace multipla_escolha_api.Services
{
    public class UsuariosService
    {
        private readonly AppDbContext _context;
        private readonly IOptions<JwtConfig> _jwtConfig;

        public UsuariosService(AppDbContext context, IOptions<JwtConfig> jwtConfig)
        {
            _context = context;
            _jwtConfig = jwtConfig;
        }

        public async Task<ServiceResponse> GetAllUsers()
        {
            var model = await _context.Usuarios.ToListAsync();
            return new ServiceResponse(model, 200);
        }

        public async Task<ServiceResponse> GetCurrentUser(Dictionary<String, String> userClaims)
        {
            try
            {
                var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Id == Int32.Parse(userClaims[ClaimTypes.NameIdentifier]));

            return new ServiceResponse(user, 200);
            }
            catch { }
            return new ServiceResponse(null, 401);
        }

        public async Task<ServiceResponse> CreateUser(UsuarioDto dto)
        {
            try
            {
                Usuario sameUsernameOrEmailUser = _context.Usuarios.FirstOrDefault(u => u.NomeDeUsuario == dto.NomeDeUsuario || u.Email == dto.Email);

                if (sameUsernameOrEmailUser != null)
                {
                    if (sameUsernameOrEmailUser.NomeDeUsuario == dto.NomeDeUsuario)
                    {
                        return new ServiceResponse("Nome de usuário já cadastrado!", 400);
                    }

                    if (sameUsernameOrEmailUser.Email == dto.Email)
                    {
                        return new ServiceResponse("Email já cadastrado!", 400);
                    }
                }

                dto.Id = 0;
                Usuario usuario = new(dto);

                _context.Usuarios.Add(usuario);

                await _context.SaveChangesAsync();

                return new ServiceResponse(usuario, 201);
            }
            catch { }
            return new ServiceResponse("Erro no cadastro!", 400);
        }

        public async Task<ServiceResponse> UpdateUser(UsuarioDto dto, Dictionary<String, String> userClaims)
        {
            try
            {
                var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Id == Int32.Parse(userClaims[ClaimTypes.NameIdentifier]));

                if (user == null || dto.SenhaAntiga == null || !BCrypt.Net.BCrypt.Verify(dto.SenhaAntiga, user.Senha)) return new ServiceResponse("Senha incorreta!", 401);

                if (dto.Email != user.Email)
                {
                    Usuario sameEmailUser = _context.Usuarios.FirstOrDefault(u => u.Email == dto.Email);
                    if (sameEmailUser != null)
                    {
                        return new ServiceResponse("Email já cadastrado!", 400);
                    }
                }

                user.Nome = dto.Nome;

                user.Sobrenome = dto.Sobrenome;

                user.Email = dto.Email;

                user.Telefone = dto.Telefone;

                user.Senha = BCrypt.Net.BCrypt.HashPassword(dto.Senha);

                _context.Usuarios.Update(user);

                await _context.SaveChangesAsync();

                return new ServiceResponse(null, 204);
            }
            catch
            {
                return new ServiceResponse("Erro de autorização!", 401);
            }
        }

        public async Task<ServiceResponse> GetUserById(int id)
        {
            var user = await _context.Usuarios.FirstOrDefaultAsync(t => t.Id == id);

            if (user == null) return new ServiceResponse(null, 204);

            return new ServiceResponse(user, 200);
        }

        public ServiceResponse GetUserInfo(Dictionary<String, String> userClaims)
        {           
            UsuarioInfoDto userInfoDto = new(userClaims);

            return new ServiceResponse(userInfoDto, 200);
        }

        public async Task<ServiceResponse> AuthenticateUser(AuthenticateDto dto)
        {
            try
            {
                var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.NomeDeUsuario == dto.NomeDeUsuario);

                if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Senha, user.Senha)) return new ServiceResponse("Usuário ou senha incorretos!", 401);

                var jwt = GenerateJwtToken(user);

                return new ServiceResponse(jwt, 200);
            }
            catch
            {
                return new ServiceResponse(null, 401);
            }
        }

        public async Task<ServiceResponse> DeleteAccount(Dictionary<String, String> userClaims)
        {
            try
            {
                var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Id == Int32.Parse(userClaims[ClaimTypes.NameIdentifier]));

                _context.Usuarios.Remove(user);

                await _context.SaveChangesAsync();

                return new ServiceResponse(null, 204);
            }
            catch
            {
                return new ServiceResponse(null, 401);
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
