using System.ComponentModel.DataAnnotations;

namespace BakeryApi.DTOs;

public class CreateOrderRequestDto
{
    [Required]
    [MaxLength(150)]
    public string CustomerName { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string PhoneNumber { get; set; } = string.Empty;

    [EmailAddress]
    public string? Email { get; set; }

    [Required]
    [MaxLength(500)]
    public string ShippingAddress { get; set; } = string.Empty;

    public string? Note { get; set; }

    public string PaymentMethod { get; set; } = "COD"; // COD, BankTransfer, VNPAY

    [Required]
    public List<OrderItemRequestDto> Items { get; set; } = new();
}

public class OrderItemRequestDto
{
    [Required]
    public int ProductId { get; set; }

    [Range(1, 100)]
    public int Quantity { get; set; }
}

public class OrderResponseDto
{
    public int Id { get; set; }
    public string OrderCode { get; set; } = string.Empty;
    public string CustomerName { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string ShippingAddress { get; set; } = string.Empty;
    public string? Note { get; set; }
    public string PaymentMethod { get; set; } = string.Empty;
    public string PaymentStatus { get; set; } = string.Empty;
    public string OrderStatus { get; set; } = string.Empty;
    public decimal ShippingFee { get; set; }
    public decimal SubTotal { get; set; }
    public decimal TotalAmount { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<OrderItemDto> Items { get; set; } = new();
}

public class OrderItemDto
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public string? ProductImage { get; set; }
    public decimal UnitPrice { get; set; }
    public int Quantity { get; set; }
    public decimal TotalPrice { get; set; }
}
