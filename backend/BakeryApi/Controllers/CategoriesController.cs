using BakeryApi.Data;
using BakeryApi.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BakeryApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly BakeryDbContext _context;

    public CategoriesController(BakeryDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<CategoryDto>>> GetCategories()
    {
        var categories = await _context.Categories
            .Where(c => c.IsActive)
            .OrderBy(c => c.DisplayOrder)
            .Select(c => new CategoryDto
            {
                Id = c.Id,
                Name = c.Name,
                Slug = c.Slug,
                Description = c.Description,
                IconUrl = c.IconUrl,
                BannerUrl = c.BannerUrl,
                ProductCount = c.Products.Count(p => p.IsActive)
            })
            .ToListAsync();

        return Ok(categories);
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<CategoryDto>> GetCategoryBySlug(string slug)
    {
        var category = await _context.Categories
            .Include(c => c.Products)
            .FirstOrDefaultAsync(c => c.Slug == slug && c.IsActive);

        if (category == null)
        {
            return NotFound(new { message = "Không tìm thấy danh mục này." });
        }

        return Ok(new CategoryDto
        {
            Id = category.Id,
            Name = category.Name,
            Slug = category.Slug,
            Description = category.Description,
            IconUrl = category.IconUrl,
            BannerUrl = category.BannerUrl,
            ProductCount = category.Products.Count(p => p.IsActive)
        });
    }
}
