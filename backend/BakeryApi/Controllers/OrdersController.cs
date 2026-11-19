using System.Security.Claims;
using BakeryApi.Data;
using BakeryApi.DTOs;
using BakeryApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BakeryApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly BakeryDbContext _context;

    public OrdersController(BakeryDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<OrderResponseDto>> CreateOrder([FromBody] CreateOrderRequestDto dto)
    {
        if (dto.Items == null || dto.Items.Count == 0)
        {
            return BadRequest(new { message = "Đơn hàng phải có ít nhất một sản phẩm." });
        }

        // Get user id if authenticated
        int? userId = null;
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!string.IsNullOrEmpty(userIdStr) && int.TryParse(userIdStr, out int uid))
        {
            userId = uid;
        }

        var productIds = dto.Items.Select(i => i.ProductId).Distinct().ToList();
        var products = await _context.Products
            .Include(p => p.Images)
            .Where(p => productIds.Contains(p.Id) && p.IsActive)
            .ToDictionaryAsync(p => p.Id);

        decimal subTotal = 0;
        var orderItems = new List<OrderItem>();

        foreach (var reqItem in dto.Items)
        {
            if (!products.TryGetValue(reqItem.ProductId, out var product))
            {
                return BadRequest(new { message = $"Sản phẩm ID {reqItem.ProductId} không tồn tại hoặc đã ngừng bán." });
            }

            var itemTotal = product.Price * reqItem.Quantity;
            subTotal += itemTotal;

            var mainImg = product.Images.FirstOrDefault(i => i.IsMain)?.ImageUrl 
                         ?? product.Images.FirstOrDefault()?.ImageUrl;

            orderItems.Add(new OrderItem
            {
                ProductId = product.Id,
                ProductName = product.Name,
                ProductImage = mainImg,
                UnitPrice = product.Price,
                Quantity = reqItem.Quantity,
                TotalPrice = itemTotal
            });
        }

        decimal shippingFee = subTotal >= 500000 ? 0 : 30000; // Miễn phí ship từ 500.000đ
        decimal totalAmount = subTotal + shippingFee;

        var orderCode = $"HNQ-{DateTime.UtcNow:yyyyMMdd}-{Random.Shared.Next(1000, 9999)}";

        var order = new Order
        {
            OrderCode = orderCode,
            UserId = userId,
            CustomerName = dto.CustomerName.Trim(),
            PhoneNumber = dto.PhoneNumber.Trim(),
            Email = dto.Email?.Trim(),
            ShippingAddress = dto.ShippingAddress.Trim(),
            Note = dto.Note,
            PaymentMethod = dto.PaymentMethod,
            PaymentStatus = dto.PaymentMethod == "COD" ? "Pending" : "Pending",
            OrderStatus = "Processing",
            ShippingFee = shippingFee,
            SubTotal = subTotal,
            TotalAmount = totalAmount,
            CreatedAt = DateTime.UtcNow,
            Items = orderItems
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOrderByCode), new { code = order.OrderCode }, MapToOrderDto(order));
    }

    [HttpGet("{code}")]
    public async Task<ActionResult<OrderResponseDto>> GetOrderByCode(string code)
    {
        var order = await _context.Orders
            .Include(o => o.Items)
            .FirstOrDefaultAsync(o => o.OrderCode == code);

        if (order == null)
        {
            return NotFound(new { message = "Không tìm thấy đơn hàng." });
        }

        return Ok(MapToOrderDto(order));
    }

    private static OrderResponseDto MapToOrderDto(Order order)
    {
        return new OrderResponseDto
        {
            Id = order.Id,
            OrderCode = order.OrderCode,
            CustomerName = order.CustomerName,
            PhoneNumber = order.PhoneNumber,
            Email = order.Email,
            ShippingAddress = order.ShippingAddress,
            Note = order.Note,
            PaymentMethod = order.PaymentMethod,
            PaymentStatus = order.PaymentStatus,
            OrderStatus = order.OrderStatus,
            ShippingFee = order.ShippingFee,
            SubTotal = order.SubTotal,
            TotalAmount = order.TotalAmount,
            CreatedAt = order.CreatedAt,
            Items = order.Items.Select(i => new OrderItemDto
            {
                Id = i.Id,
                ProductId = i.ProductId,
                ProductName = i.ProductName,
                ProductImage = i.ProductImage,
                UnitPrice = i.UnitPrice,
                Quantity = i.Quantity,
                TotalPrice = i.TotalPrice
            }).ToList()
        };
    }
}
