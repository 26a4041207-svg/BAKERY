using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BakeryApi.Models;

[Table("Products")]
public class Product
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string ProductCode { get; set; } = string.Empty; // e.g. "001", "002"

    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal? OriginalPrice { get; set; }

    public int CategoryId { get; set; }

    [ForeignKey(nameof(CategoryId))]
    public Category? Category { get; set; }

    [MaxLength(100)]
    public string? StatusTags { get; set; } // "New,Sale", "Sold Out", "Flash Sale"

    public string? Description { get; set; }

    public string? Ingredients { get; set; } // JSON array: ["Bột mì", "Cà rốt tươi", ...]

    // Nutrition information
    public int? Calories { get; set; }
    public int? Fat { get; set; }
    public int? Carb { get; set; }
    public int? Protein { get; set; }

    public int StockQuantity { get; set; } = 100;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public ICollection<ProductImage> Images { get; set; } = new List<ProductImage>();
    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    public ICollection<Wishlist> Wishlists { get; set; } = new List<Wishlist>();
}
