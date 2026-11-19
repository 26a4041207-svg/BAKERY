using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BakeryApi.Models;

[Table("Wishlists")]
public class Wishlist
{
    [Key]
    public int Id { get; set; }

    public int UserId { get; set; }

    [ForeignKey(nameof(UserId))]
    public User? User { get; set; }

    public int ProductId { get; set; }

    [ForeignKey(nameof(ProductId))]
    public Product? Product { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
