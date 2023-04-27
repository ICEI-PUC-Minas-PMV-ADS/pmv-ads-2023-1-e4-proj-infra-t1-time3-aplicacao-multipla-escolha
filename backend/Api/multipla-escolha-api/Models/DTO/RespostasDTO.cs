using multipla_escolha_api.Models.MongoDb;
using System.ComponentModel.DataAnnotations;

namespace multipla_escolha_api.Models.DTO
{
    public class RespostasDto
    {
        public int idAtividade { get; set; }
        public int[] Respostas { get; set; }

    }
}
