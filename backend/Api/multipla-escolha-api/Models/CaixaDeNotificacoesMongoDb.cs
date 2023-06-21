using MongoDB.Bson.Serialization.Attributes;
using multipla_escolha_api.Models.DTO;

namespace multipla_escolha_api.Models.MongoDb
{
    public class CaixaDeNotificacoesMongoDb
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.Int32)]
        public int UserId { get; set; }
        [BsonElement("NumeroDeNotificacoesNaoLidas")]
        public int? NumeroDeNotificacoesNaoLidas { get; set; }
        [BsonElement("Notificacoes")]
        public List<NotificacaoMongoDb> Notificacoes { get; set; }
        [BsonElement("DataAtualizacao")]
        public DateTime DataAtualizacao { get; set; }
    }
}
