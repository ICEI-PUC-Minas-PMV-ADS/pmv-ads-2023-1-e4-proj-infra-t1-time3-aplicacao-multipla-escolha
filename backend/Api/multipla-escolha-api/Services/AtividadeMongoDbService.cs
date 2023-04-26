using Microsoft.Extensions.Options;
using MongoDB.Driver;
using multipla_escolha_api.Models.MongoDb;

namespace multipla_escolha_api.Services
{
    public class AtividadeMongoDbService
    {
        private readonly IMongoCollection<AtividadeMongoDb> _atividadeMongoDbCollection;

        public AtividadeMongoDbService(IOptions<AtividadeMongoDbDatabaseSettings> options)
        {
            var mongoClient = new MongoClient("mongodb://localhost:27017");
            var mongoDatabase = mongoClient.GetDatabase("multipla-escolha");

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

    }
}
