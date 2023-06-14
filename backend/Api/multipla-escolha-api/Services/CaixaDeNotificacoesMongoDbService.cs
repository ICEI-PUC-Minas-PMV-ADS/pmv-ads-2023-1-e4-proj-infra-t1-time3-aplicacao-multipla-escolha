using Microsoft.Extensions.Options;
using MongoDB.Driver;
using multipla_escolha_api.Models.MongoDb;

namespace multipla_escolha_api.Services
{
    public class CaixaDeNotificacoesMongoDbService
    {
        private readonly IMongoCollection<CaixaDeNotificacoesMongoDb> _caixaDeNotificacoesMongoDbCollection;

        public CaixaDeNotificacoesMongoDbService(IOptions<MongoDbDatabaseConfig> options)
        {
            var mongoClient = new MongoClient(options.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(options.Value.DatabaseName);

            _caixaDeNotificacoesMongoDbCollection = mongoDatabase.GetCollection<CaixaDeNotificacoesMongoDb>
                ("CaixasDeNotificacoes");
        }

        public async Task<List<CaixaDeNotificacoesMongoDb>> GetAllAsync() =>
            await _caixaDeNotificacoesMongoDbCollection.Find(x => true).ToListAsync();
        public async Task<CaixaDeNotificacoesMongoDb> GetAsync(int userId) =>
            await _caixaDeNotificacoesMongoDbCollection.Find(x => x.UserId == userId).FirstOrDefaultAsync();
        public async Task CreateAsync(CaixaDeNotificacoesMongoDb caixaDeNotificacoes) =>
            await _caixaDeNotificacoesMongoDbCollection.InsertOneAsync(caixaDeNotificacoes);

        public async Task UpdateAsync(CaixaDeNotificacoesMongoDb caixaDeNotificacoes) =>
        await _caixaDeNotificacoesMongoDbCollection.ReplaceOneAsync((x => x.UserId == caixaDeNotificacoes.UserId), caixaDeNotificacoes);
        public async Task DeleteAsync(int userId) =>
await _caixaDeNotificacoesMongoDbCollection.DeleteOneAsync(x => x.UserId == userId);

        public static implicit operator CaixaDeNotificacoesMongoDbService(CaixaDeNotificacoesMongoDb v)
        {
            throw new NotImplementedException();
        }
    }
}
