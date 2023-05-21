namespace multipla_escolha_api.nUnitTests
{
    public class AtividadeTest
    {
        [Test]
        public void Atividade_VerificarSeNumeroDeTentativasOuPrazoDeEntregaDaAtividadeASerCorrigidaJaEstaoEsgotados_EsperaseNaoReceberMensagemDeErro()
        {
            // Arranjo
            var atividade = new Atividade
            {
                TentativasPermitidas = 1,
                DataPrazoDeEntrega = DateTime.Now.AddDays(30),
            };

            int numeroDeTentativas = 0;

            string? mensagemDeErroEsperada = null;

            // Ação
            string mensagemDeErroRetornada = Atividade.CheckIfUserCanTakeTest(atividade, numeroDeTentativas);
            
            // Asserção
            Assert.That(mensagemDeErroRetornada, Is.EqualTo(mensagemDeErroEsperada));
        }
        [Test]
        public void Atividade_VerificarSeNumeroDeTentativasOuPrazoDeEntregaDaAtividadeASerCorrigidaJaEstaoEsgotados_EsperaseMensagemDePrazoEsgotado()
        {
            // Arranjo
            var atividade = new Atividade
            {
                TentativasPermitidas = 1,
                DataPrazoDeEntrega = DateTime.Now.AddDays(-30),
            };

            int numeroDeTentativas = 0;

            string? mensagemDeErroEsperada = "Atividade fora do prazo!";

            // Ação
            string mensagemDeErroRetornada = Atividade.CheckIfUserCanTakeTest(atividade, numeroDeTentativas);

            // Asserção
            Assert.That(mensagemDeErroRetornada, Is.EqualTo(mensagemDeErroEsperada));
        }
        [Test]
        public void Atividade_VerificarSeNumeroDeTentativasOuPrazoDeEntregaDaAtividadeASerCorrigidaJaEstaoEsgotados_EsperaseMensagemDeTentativasEsgotadas()
        {
            // Arranjo
            var atividade = new Atividade
            {
                TentativasPermitidas = 2,
                DataPrazoDeEntrega = DateTime.Now.AddDays(30),
            };

            int numeroDeTentativas = 2;

            string? mensagemDeErroEsperada = "Número de tentativas extrapolado!";

            // Ação
            string mensagemDeErroRetornada = Atividade.CheckIfUserCanTakeTest(atividade, numeroDeTentativas);

            // Asserção
            Assert.That(mensagemDeErroRetornada, Is.EqualTo(mensagemDeErroEsperada));
        }
    }
}