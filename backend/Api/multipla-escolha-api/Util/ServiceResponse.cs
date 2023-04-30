using Microsoft.EntityFrameworkCore;
using multipla_escolha_api.Models.MongoDb;
using System.ComponentModel.DataAnnotations;

namespace multipla_escolha_api.Models.DTO
{
    public class ServiceResponse
    {
        public Object Content { get; set; }
        [Required]
        public int StatusCode { get; set; }

        public ServiceResponse()
        {

        }
        public ServiceResponse(Object content, int statusCode)
        {
            Content = content;
            StatusCode = statusCode;
        }
    }
}
