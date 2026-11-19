using System.Text.Json;
using BakeryApi.Data;
using BakeryApi.DTOs;
using BakeryApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BakeryApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly BakeryDbContext _context;

    public ProductsController(BakeryDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<PagedResult<ProductDto>>> GetProducts([FromQuery] ProductQueryParameters query)
    {
        var q = _context.Products
            .Include(p => p.Category)
            .Include(p => p.Images)
            .Where(p => p.IsActive)
            .AsQueryable();

        // Filter by Category (slug, id, or name)
        if (!string.IsNullOrWhiteSpace(query.Category))
        {
            var catLower = query.Category.Trim().ToLower();
            q = q.Where(p => p.Category != null && 
                (p.Category.Slug == catLower || p.Category.Name.ToLower() == catLower || p.Category.Id.ToString() == catLower));
        }

        // Filter by Status (New, Sale, Sold Out, Flash Sale)
        if (!string.IsNullOrWhiteSpace(query.Status))
        {
            var statusLower = query.Status.Trim().ToLower();
            q = q.Where(p => p.StatusTags != null && p.StatusTags.ToLower().Contains(statusLower));
        }

        // Search in Name or Description
        if (!string.IsNullOrWhiteSpace(query.Search))
        {
            var searchLower = query.Search.Trim().ToLower();
            q = q.Where(p => p.Name.ToLower().Contains(searchLower) || 
                            (p.Description != null && p.Description.ToLower().Contains(searchLower)));
        }

        // Price filter
        if (query.MinPrice.HasValue)
        {
            q = q.Where(p => p.Price >= query.MinPrice.Value);
        }
        if (query.MaxPrice.HasValue)
        {
            q = q.Where(p => p.Price <= query.MaxPrice.Value);
        }

        // Sorting
        q = query.SortBy switch
        {
            "price_asc" => q.OrderBy(p => p.Price),
            "price_desc" => q.OrderByDescending(p => p.Price),
            "name_asc" => q.OrderBy(p => p.Name),
            "name_desc" => q.OrderByDescending(p => p.Name),
            "newest" => q.OrderByDescending(p => p.CreatedAt),
            _ => q.OrderBy(p => p.Id)
        };

        var totalItems = await q.CountAsync();
        var page = query.Page <= 0 ? 1 : query.Page;
        var pageSize = query.PageSize <= 0 ? 12 : query.PageSize;

        var items = await q
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var dtos = items.Select(MapToProductDto).ToList();

        return Ok(new PagedResult<ProductDto>
        {
            Items = dtos,
            TotalItems = totalItems,
            Page = page,
            PageSize = pageSize
        });
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDto>> GetProductById(string id)
    {
        Product? product = null;

        if (int.TryParse(id, out int intId))
        {
            product = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == intId && p.IsActive);
        }

        if (product == null)
        {
            // Search by product code e.g. "001"
            product = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.ProductCode == id && p.IsActive);
        }

        if (product == null)
        {
            return NotFound(new { message = "Không tìm thấy sản phẩm." });
        }

        return Ok(MapToProductDto(product));
    }

    [HttpGet("{id}/related")]
    public async Task<ActionResult<List<ProductDto>>> GetRelatedProducts(string id, [FromQuery] int limit = 4)
    {
        var product = await _context.Products
            .FirstOrDefaultAsync(p => p.Id.ToString() == id || p.ProductCode == id);

        if (product == null) return NotFound(new { message = "Không tìm thấy sản phẩm." });

        var related = await _context.Products
            .Include(p => p.Category)
            .Include(p => p.Images)
            .Where(p => p.CategoryId == product.CategoryId && p.Id != product.Id && p.IsActive)
            .Take(limit)
            .ToListAsync();

        return Ok(related.Select(MapToProductDto).ToList());
    }

    [HttpGet("featured")]
    public async Task<ActionResult<List<ProductDto>>> GetFeaturedProducts([FromQuery] int limit = 8)
    {
        var items = await _context.Products
            .Include(p => p.Category)
            .Include(p => p.Images)
            .Where(p => p.IsActive && (p.StatusTags != null && (p.StatusTags.Contains("New") || p.StatusTags.Contains("Sale"))))
            .Take(limit)
            .ToListAsync();

        return Ok(items.Select(MapToProductDto).ToList());
    }

    private static ProductDto MapToProductDto(Product p)
    {
        var statusList = string.IsNullOrWhiteSpace(p.StatusTags)
            ? new List<string>()
            : p.StatusTags.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries).ToList();

        List<string> ingredientsList = new();
        if (!string.IsNullOrWhiteSpace(p.Ingredients))
        {
            try
            {
                ingredientsList = JsonSerializer.Deserialize<List<string>>(p.Ingredients) ?? new();
            }
            catch
            {
                ingredientsList = new List<string> { p.Ingredients };
            }
        }

        NutritionDto? nutrition = null;
        if (p.Calories.HasValue || p.Fat.HasValue || p.Carb.HasValue || p.Protein.HasValue)
        {
            nutrition = new NutritionDto
            {
                Calories = p.Calories ?? 0,
                Fat = p.Fat ?? 0,
                Carb = p.Carb ?? 0,
                Protein = p.Protein ?? 0
            };
        }

        return new ProductDto
        {
            Id = p.Id,
            ProductCode = p.ProductCode,
            Name = p.Name,
            Price = p.Price,
            OriginalPrice = p.OriginalPrice,
            CategoryId = p.CategoryId,
            CategoryName = p.Category?.Name ?? string.Empty,
            Status = statusList,
            Description = p.Description,
            Images = p.Images.OrderBy(img => img.DisplayOrder).Select(img => img.ImageUrl).ToList(),
            Ingredients = ingredientsList,
            Nutrition = nutrition,
            StockQuantity = p.StockQuantity,
            IsActive = p.IsActive,
            CreatedAt = p.CreatedAt
        };
    }
}
