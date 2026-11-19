using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BakeryApi.Models;

[Table("Users")]
public class User
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Username { get; set; } = string.Empty;

    [Required]
    [MaxLength(150)]
    public string FullName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(150)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MaxLength(255)]
    public string PasswordHash { get; set; } = string.Empty;

    [MaxLength(20)]
    public string Role { get; set; } = "Customer"; // Customer, Admin

    [MaxLength(20)]
    public string? PhoneNumber { get; set; }

    [MaxLength(255)]
    public string? Address { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public ICollection<Order> Orders { get; set; } = new List<Order>();
    public ICollection<Wishlist> Wishlists { get; set; } = new List<Wishlist>();
}
