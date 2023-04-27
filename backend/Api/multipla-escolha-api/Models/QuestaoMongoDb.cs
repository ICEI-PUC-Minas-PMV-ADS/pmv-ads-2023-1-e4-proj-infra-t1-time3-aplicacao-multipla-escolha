using MongoDB.Bson.Serialization.Attributes;

namespace multipla_escolha_api.Models.MongoDb
{
    public class QuestaoMongoDb
    {
        [BsonRequired]
        [BsonElement("Valor")]
        public float Valor { get; set; }
        [BsonRequired]
        [BsonElement("Enunciado")]
        public string Enunciado { get; set; }
        [BsonElement("Imagem")]
        public string Imagem { get; set; }
        [BsonRequired]
        [BsonElement("Alternativas")]
        public string[] Alternativas { get; set; }
        [BsonElement("Resposta")]
        public int? Resposta { get; set; }
        [BsonElement("RespostaAluno")]
        public int? RespostaAluno { get; set; }

    }
}
