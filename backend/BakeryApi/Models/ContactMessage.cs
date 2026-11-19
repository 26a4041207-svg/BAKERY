using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BakeryApi.Models;

[Table("ContactMessages")]
public class ContactMessage
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(150)]
    public string FullName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(150)]
    public string Email { get; set; } = string.Empty;

    [MaxLength(50)]
    public string? PhoneNumber { get; set; }

    [Required]
    [MaxLength(200)]
    public string Subject { get; set; } = string.Empty;

    [Required]
    public string Message { get; set; } = string.Empty;

    public bool IsRead { get; set; } = false;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
