using MongoDB.Bson.Serialization.Attributes;
using multipla_escolha_api.Models.DTO;

namespace multipla_escolha_api.Models.MongoDb
{
    public class NotificacaoMongoDb
    {
        [BsonElement("Titulo")]
        public string Titulo { get; set; }
        [BsonElement("Conteudo")]
        public string Conteudo { get; set; }
        [BsonElement("Data")]
        public DateTime Data { get; set; }
    }
}
