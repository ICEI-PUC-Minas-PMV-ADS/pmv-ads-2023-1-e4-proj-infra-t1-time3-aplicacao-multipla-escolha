using MongoDB.Bson.Serialization.Attributes;

namespace multipla_escolha_api.Models.MongoDb
{
    public class AtividadeMongoDb
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string Id { get; set; }
        [BsonElement("Nome")]
        public string Nome { get; set; }
    }
}
