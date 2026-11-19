using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BakeryApi.Models;

[Table("ProductImages")]
public class ProductImage
{
    [Key]
    public int Id { get; set; }

    public int ProductId { get; set; }

    [ForeignKey(nameof(ProductId))]
    public Product? Product { get; set; }

    [Required]
    [MaxLength(500)]
    public string ImageUrl { get; set; } = string.Empty;

    public bool IsMain { get; set; } = false;

    public int DisplayOrder { get; set; } = 0;
}
