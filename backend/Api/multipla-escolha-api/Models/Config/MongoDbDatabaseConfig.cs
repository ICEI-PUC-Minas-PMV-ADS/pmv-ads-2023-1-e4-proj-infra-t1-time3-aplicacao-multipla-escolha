using MongoDB.Bson.Serialization.Attributes;

namespace multipla_escolha_api.Models.MongoDb
{
    public class MongoDbDatabaseConfig
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}
