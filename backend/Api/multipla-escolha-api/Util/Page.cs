using Microsoft.EntityFrameworkCore;
using multipla_escolha_api.Models.MongoDb;
using System.ComponentModel.DataAnnotations;

namespace multipla_escolha_api.Models.DTO
{
    public class Page
    {
        [Required]
        public int TotalItems { get; set; }
        [Required]
        public int TotalPages { get; set; }
        [Required]
        public int CurrentPage { get; set; }
        [Required]
        public int PageSize { get; set; }
        [Required]
        public int CurrentPageSize { get; set; }
        [Required]
        public List<Object> Items { get; set; }
        public Page()
        {

        }
        public static async Task<Page> getPageAsync(IQueryable<Object> query, int pageSize, int pageNumber)
        {
            Page page = new Page();
            page.TotalItems = query.Count();
            page.TotalPages = 1 + ((page.TotalItems - 1) / pageSize);
            page.CurrentPage = pageNumber;
            page.Items = await query.Skip(pageNumber * pageSize).Take(pageSize).ToListAsync();
            page.PageSize = pageSize;
            page.CurrentPageSize = page.Items.Count();

            return page;
        }
    }
}
