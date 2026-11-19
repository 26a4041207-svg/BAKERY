using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BakeryApi.Models;

[Table("Categories")]
public class Category
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Slug { get; set; } = string.Empty;

    [MaxLength(255)]
    public string? Description { get; set; }

    [MaxLength(255)]
    public string? IconUrl { get; set; }

    [MaxLength(255)]
    public string? BannerUrl { get; set; }

    public int DisplayOrder { get; set; } = 0;

    public bool IsActive { get; set; } = true;

    // Navigation property
    public ICollection<Product> Products { get; set; } = new List<Product>();
}
