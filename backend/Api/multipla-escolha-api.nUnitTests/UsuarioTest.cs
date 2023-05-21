namespace multipla_escolha_api.nUnitTests
{
    public class UsuarioTest
    {
        [Test]
        public void Usuario_VerificarSeJaExisteUmUsuarioCadastradoComEmailOuNomeDeUsuarioIgual_EsperaseEmailENomeDeUsuarioLivresParaUsar()
        {
            // Arranjo
            var novoUsuarioDto = new UsuarioDto
            {
                NomeDeUsuario = "novoUsuario",
                Email = "emailNovo@email.com"
            };

            Usuario? usuarioRecuperadoDoBanco = null;

            string? mensagemDeErroEsperada = null;

            // A��o
            string mensagemDeErroRetornada = Usuario.checkIfUserNameOrEmailIsAlreadyUsed(novoUsuarioDto, usuarioRecuperadoDoBanco);
            
            // Asser��o
            Assert.That(mensagemDeErroRetornada, Is.EqualTo(mensagemDeErroEsperada));
        }
        [Test]
        public void Usuario_VerificarSeJaExisteUmUsuarioCadastradoComEmailOuNomeDeUsuarioIgual_EsperaseEmailJaCadastrado()
        {
            // Arranjo
            var novoUsuarioDto = new UsuarioDto
            {
                NomeDeUsuario = "novoUsuario",
                Email = "email@email.com"
            };

            var usuarioRecuperadoDoBanco = new Usuario
            {
                NomeDeUsuario = "usuarioAntigo",
                Email = "email@email.com"
            };

            string? mensagemDeErroEsperada = "Email j� cadastrado!";
            
            // A��o
            string mensagemDeErroRetornada = Usuario.checkIfUserNameOrEmailIsAlreadyUsed(novoUsuarioDto, usuarioRecuperadoDoBanco);
            
            // Asser��o
            Assert.That(mensagemDeErroRetornada, Is.EqualTo(mensagemDeErroEsperada));
        }
        [Test]
        public void Usuario_VerificarSeJaExisteUmUsuarioCadastradoComEmailOuNomeDeUsuarioIgual_EsperaseNomeDeUsuarioJaCadastrado()
        {
            // Arranjo
            var novoUsuarioDto = new UsuarioDto
            {
                NomeDeUsuario = "nomeDeUsuario",
                Email = "emailNovo@email.com"
            };

            var usuarioRecuperadoDoBanco = new Usuario
            {
                NomeDeUsuario = "nomeDeUsuario",
                Email = "emailAntigo@email.com"
            };

            string? mensagemDeErroEsperada = "Nome de usu�rio j� cadastrado!";
            
            // A��o
            string mensagemDeErroRetornada = Usuario.checkIfUserNameOrEmailIsAlreadyUsed(novoUsuarioDto, usuarioRecuperadoDoBanco);
            
            // Asser��o
            Assert.That(mensagemDeErroRetornada, Is.EqualTo(mensagemDeErroEsperada));
        }
    }
}