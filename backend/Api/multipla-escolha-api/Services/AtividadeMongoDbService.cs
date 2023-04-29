using Microsoft.Extensions.Options;
using MongoDB.Driver;
using multipla_escolha_api.Models.MongoDb;

namespace multipla_escolha_api.Services
{
    public class AtividadeMongoDbService
    {
        private readonly IMongoCollection<AtividadeMongoDb> _atividadeMongoDbCollection;

        public AtividadeMongoDbService(IOptions<MongoDbDatabaseConfig> options)
        {
            var mongoClient = new MongoClient(options.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(options.Value.DatabaseName);

            _atividadeMongoDbCollection = mongoDatabase.GetCollection<AtividadeMongoDb>
                ("Atividades");
        }

        public async Task<List<AtividadeMongoDb>> GetAllAsync() =>
            await _atividadeMongoDbCollection.Find(x => true).ToListAsync();
        public async Task<AtividadeMongoDb> GetAsync(string id) =>
            await _atividadeMongoDbCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        public async Task CreateAsync(AtividadeMongoDb atividade) =>
            await _atividadeMongoDbCollection.InsertOneAsync(atividade);

        public async Task UpdateAsync(AtividadeMongoDb atividade) =>
        await _atividadeMongoDbCollection.ReplaceOneAsync((x => x.Id == atividade.Id), atividade);
        public async Task DeleteAsync(string id) =>
await _atividadeMongoDbCollection.DeleteOneAsync(x => x.Id == id);

    }
}
