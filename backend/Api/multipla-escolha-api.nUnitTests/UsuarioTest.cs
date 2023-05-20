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

            var usuarioRecuperadoDoBanco = new Usuario
            {
                NomeDeUsuario = "usuarioAntigo",
                Email = "emailAntigo@email.com"
            };

            string? esperado = null;
            // A��o
            string retornado = Usuario.checkIfUserNameOrEmailIsAlreadyUsed(novoUsuarioDto, usuarioRecuperadoDoBanco);
            // Asser��o
            Assert.That(retornado, Is.EqualTo(esperado));
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

            string? esperado = "Email j� cadastrado!";
            // A��o
            string retornado = Usuario.checkIfUserNameOrEmailIsAlreadyUsed(novoUsuarioDto, usuarioRecuperadoDoBanco);
            // Asser��o
            Assert.That(retornado, Is.EqualTo(esperado));
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

            string? esperado = "Nome de usu�rio j� cadastrado!";
            // A��o
            string retornado = Usuario.checkIfUserNameOrEmailIsAlreadyUsed(novoUsuarioDto, usuarioRecuperadoDoBanco);
            // Asser��o
            Assert.That(retornado, Is.EqualTo(esperado));
        }
    }
}