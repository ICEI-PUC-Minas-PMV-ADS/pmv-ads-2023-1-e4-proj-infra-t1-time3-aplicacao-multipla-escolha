using MongoDB.Bson.Serialization.Attributes;

namespace multipla_escolha_api.Models.MongoDb
{
    public class AtividadeMongoDbDatabaseSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string AtividadeCollectionName { get; set; }

    }
}
