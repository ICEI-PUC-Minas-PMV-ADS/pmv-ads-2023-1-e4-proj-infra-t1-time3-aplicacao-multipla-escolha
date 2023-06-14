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
using multipla_escolha_api.Models.MongoDb;

namespace multipla_escolha_api.Services
{
    public class UsuariosService
    {
        private readonly AppDbContext _context;
        private readonly IOptions<JwtConfig> _jwtConfig;

        private readonly CaixaDeNotificacoesMongoDbService _caixaDeNotificacoesMongoDbService;
        public UsuariosService(AppDbContext context, IOptions<JwtConfig> jwtConfig, CaixaDeNotificacoesMongoDbService caixaDeNotificacoesMongoDbService)
        {
            _context = context;
            _jwtConfig = jwtConfig;
            _caixaDeNotificacoesMongoDbService = caixaDeNotificacoesMongoDbService;
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

                string errorMessage = Usuario.checkIfUserNameOrEmailIsAlreadyUsed(dto, sameUsernameOrEmailUser);

                if (errorMessage != null) return new ServiceResponse(errorMessage, 400);

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
                    string errorMessage = Usuario.checkIfUserNameOrEmailIsAlreadyUsed(dto, sameEmailUser);

                    if (errorMessage != null) return new ServiceResponse(errorMessage, 400);
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

        public async Task<ServiceResponse> GetUserInfo(Dictionary<String, String> userClaims)
        {
            int? numeroDeNotificacoesNaoLidas = 0;

            if (userClaims[ClaimTypes.Role].Equals("Aluno"))
            {
                CaixaDeNotificacoesMongoDb caixaDeNotificacoesMongoDb = await UpdateNotificacoes(userClaims);
                numeroDeNotificacoesNaoLidas = caixaDeNotificacoesMongoDb.NumeroDeNotificacoesNaoLidas;
            }

            UsuarioInfoDto userInfoDto = new(userClaims, numeroDeNotificacoesNaoLidas);

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
        public async Task<ServiceResponse> GetNotificacoes(Dictionary<String, String> userClaims)
        {
            CaixaDeNotificacoesMongoDb caixaDeNotificacoes = await UpdateNotificacoes(userClaims);
            caixaDeNotificacoes.NumeroDeNotificacoesNaoLidas = 0;
            await _caixaDeNotificacoesMongoDbService.UpdateAsync(caixaDeNotificacoes);
            return new ServiceResponse(caixaDeNotificacoes, 200);
        }

            private async Task<CaixaDeNotificacoesMongoDb> UpdateNotificacoes(Dictionary<String, String> userClaims)
        {
            int userId = Int32.Parse(userClaims[ClaimTypes.NameIdentifier]);

            CaixaDeNotificacoesMongoDb caixaDeNotificacoes = await _caixaDeNotificacoesMongoDbService.GetAsync(Int32.Parse(userClaims[ClaimTypes.NameIdentifier]));

            if (caixaDeNotificacoes == null)
            {
                Console.WriteLine("Caixa null");
                caixaDeNotificacoes = new CaixaDeNotificacoesMongoDb();
                caixaDeNotificacoes.UserId = 0;
                caixaDeNotificacoes.DataAtualizacao = DateTime.UtcNow.AddDays(-1);
                caixaDeNotificacoes.NumeroDeNotificacoesNaoLidas = 0;
                caixaDeNotificacoes.Notificacoes = new List<NotificacaoMongoDb>();
            }

            var dataAtual = DateTime.UtcNow;


            var atividadesDoAluno = _context.Atividades.Include(a => a.Turma).ThenInclude(t => t.AlunosTurma).Where(a => a.Turma.AlunosTurma.Any(at => at.AlunoId == userId));

            var atividadesRecemCriadas = await atividadesDoAluno.Where(a => a.DataDeCriacao > caixaDeNotificacoes.DataAtualizacao).ToListAsync();

            for (int i = 0; i < atividadesRecemCriadas.Count; i++)
            {
                NotificacaoMongoDb novaNotificacao = new NotificacaoMongoDb();

                Atividade atividade = atividadesRecemCriadas[i];

                novaNotificacao.Titulo = "Nova atividade criada na turma '" + atividade.Turma.Nome + "'";

                novaNotificacao.Conteudo = "Atividade '" + atividade.Nome + "' foi recém criada na turma '" + atividade.Turma.Nome + "'.";

                novaNotificacao.Data = dataAtual;

                caixaDeNotificacoes.Notificacoes.Add(novaNotificacao);

            }
            
            caixaDeNotificacoes.NumeroDeNotificacoesNaoLidas += atividadesRecemCriadas.Count;


            if (caixaDeNotificacoes.DataAtualizacao.DayOfYear < dataAtual.DayOfYear || caixaDeNotificacoes.DataAtualizacao.Year < dataAtual.Year)
            {
                var atividadesComPrazoProximo = await atividadesDoAluno.Where(a => a.DataPrazoDeEntrega > dataAtual && a.DataPrazoDeEntrega <= dataAtual.AddDays(7)).ToListAsync();

                for (int i = 0; i < atividadesComPrazoProximo.Count; i++)
                {
                    NotificacaoMongoDb novaNotificacao = new NotificacaoMongoDb();

                    Atividade atividade = atividadesComPrazoProximo[i];

                    novaNotificacao.Titulo = "Atividade '" + atividade.Nome + "' perto do prazo de entrega!";

                    int diasParaAtividadeVencer = 0;

                    if (dataAtual.Year == atividade.DataPrazoDeEntrega.Value.Year)
                    {
                        diasParaAtividadeVencer =  atividade.DataPrazoDeEntrega.Value.DayOfYear - dataAtual.DayOfYear;
                    }
                    else
                    {
                        diasParaAtividadeVencer = (atividade.DataPrazoDeEntrega.Value.DayOfYear + 365) - dataAtual.DayOfYear;

                        if (DateTime.IsLeapYear(DateTime.Now.Year))
                        {
                            diasParaAtividadeVencer += 1;
                        }
                    }
                    string message = "A atividade '" + atividade.Nome + "' da turma '" + atividade.Turma.Nome + "' vence em " + diasParaAtividadeVencer + " dias!";

                    novaNotificacao.Conteudo = message;
                    novaNotificacao.Data = DateTime.UtcNow;

                    caixaDeNotificacoes.Notificacoes.Add(novaNotificacao);
                }

                caixaDeNotificacoes.NumeroDeNotificacoesNaoLidas += atividadesComPrazoProximo.Count;
            }

            caixaDeNotificacoes.DataAtualizacao = DateTime.UtcNow;
            
            if (caixaDeNotificacoes.UserId == 0)
            {
                caixaDeNotificacoes.UserId = userId;
                await _caixaDeNotificacoesMongoDbService.CreateAsync(caixaDeNotificacoes);
            }
            else
            {
                await _caixaDeNotificacoesMongoDbService.UpdateAsync(caixaDeNotificacoes);
            }
            
            return caixaDeNotificacoes;
        }
    }
}
