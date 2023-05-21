using MongoDB.Bson.Serialization.Attributes;
using multipla_escolha_api.Models.DTO;

namespace multipla_escolha_api.Models.MongoDb
{
    public class AtividadeMongoDb
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string Id { get; set; }
        [BsonElement("Questões")]
        public QuestaoMongoDb[] Questoes { get; set; }
    
        public static Tuple<AtividadeMongoDb, float> Corrigir(AtividadeMongoDb atividadeMongoDb, RespostasDto respostasDto)
        {
            float notaAluno = 0F;
            for (int i = 0; i < atividadeMongoDb.Questoes.Length; i++)
            {
                if (atividadeMongoDb.Questoes[i].Resposta == respostasDto.Respostas[i])
                {
                    notaAluno += atividadeMongoDb.Questoes[i].Valor;
                    atividadeMongoDb.Questoes[i].AlunoAcertouResposta = true;
                }
                else
                {
                    atividadeMongoDb.Questoes[i].AlunoAcertouResposta = false;
                }
                atividadeMongoDb.Questoes[i].Resposta = respostasDto.Respostas[i];
            }

            atividadeMongoDb.Id = System.Guid.NewGuid().ToString();

            return new Tuple<AtividadeMongoDb, float>(atividadeMongoDb, notaAluno);
        }
    }
}
