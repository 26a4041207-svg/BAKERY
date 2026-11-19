using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BakeryApi.Models;

[Table("Orders")]
public class Order
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string OrderCode { get; set; } = string.Empty;

    public int? UserId { get; set; }

    [ForeignKey(nameof(UserId))]
    public User? User { get; set; }

    [Required]
    [MaxLength(150)]
    public string CustomerName { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string PhoneNumber { get; set; } = string.Empty;

    [MaxLength(150)]
    public string? Email { get; set; }

    [Required]
    [MaxLength(500)]
    public string ShippingAddress { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Note { get; set; }

    [MaxLength(50)]
    public string PaymentMethod { get; set; } = "COD"; // COD, BankTransfer, VNPAY

    [MaxLength(50)]
    public string PaymentStatus { get; set; } = "Pending"; // Pending, Paid, Failed

    [MaxLength(50)]
    public string OrderStatus { get; set; } = "Processing"; // Processing, Confirmed, Shipping, Completed, Cancelled

    [Column(TypeName = "decimal(18,2)")]
    public decimal ShippingFee { get; set; } = 0;

    [Column(TypeName = "decimal(18,2)")]
    public decimal SubTotal { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal TotalAmount { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
}
