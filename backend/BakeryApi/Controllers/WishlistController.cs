using System.Security.Claims;
using BakeryApi.Data;
using BakeryApi.DTOs;
using BakeryApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BakeryApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class WishlistController : ControllerBase
{
    private readonly BakeryDbContext _context;

    public WishlistController(BakeryDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<ProductDto>>> GetWishlist()
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userIdStr) || !int.TryParse(userIdStr, out int userId))
        {
            return Unauthorized();
        }

        var wishlistProducts = await _context.Wishlists
            .Where(w => w.UserId == userId)
            .Include(w => w.Product)
                .ThenInclude(p => p!.Category)
            .Include(w => w.Product)
                .ThenInclude(p => p!.Images)
            .Select(w => w.Product!)
            .Where(p => p != null && p.IsActive)
            .ToListAsync();

        return Ok(wishlistProducts.Select(p => new ProductDto
        {
            Id = p.Id,
            ProductCode = p.ProductCode,
            Name = p.Name,
            Price = p.Price,
            OriginalPrice = p.OriginalPrice,
            CategoryId = p.CategoryId,
            CategoryName = p.Category?.Name ?? string.Empty,
            Description = p.Description,
            Images = p.Images.OrderBy(img => img.DisplayOrder).Select(img => img.ImageUrl).ToList(),
            StockQuantity = p.StockQuantity,
            IsActive = p.IsActive
        }).ToList());
    }

    [HttpPost("toggle")]
    public async Task<ActionResult> ToggleWishlist([FromBody] WishlistToggleDto dto)
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userIdStr) || !int.TryParse(userIdStr, out int userId))
        {
            return Unauthorized();
        }

        var existing = await _context.Wishlists
            .FirstOrDefaultAsync(w => w.UserId == userId && w.ProductId == dto.ProductId);

        if (existing != null)
        {
            _context.Wishlists.Remove(existing);
            await _context.SaveChangesAsync();
            return Ok(new { added = false, message = "Đã xóa khỏi danh sách yêu thích" });
        }

        var productExists = await _context.Products.AnyAsync(p => p.Id == dto.ProductId && p.IsActive);
        if (!productExists) return NotFound(new { message = "Sản phẩm không tồn tại." });

        _context.Wishlists.Add(new Wishlist
        {
            UserId = userId,
            ProductId = dto.ProductId,
            CreatedAt = DateTime.UtcNow
        });

        await _context.SaveChangesAsync();
        return Ok(new { added = true, message = "Đã thêm vào danh sách yêu thích" });
    }
}
