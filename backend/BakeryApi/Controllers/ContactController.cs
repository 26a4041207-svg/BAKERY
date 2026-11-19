using BakeryApi.Data;
using BakeryApi.DTOs;
using BakeryApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BakeryApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly BakeryDbContext _context;

    public ContactController(BakeryDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult> SubmitContact([FromBody] CreateContactRequestDto dto)
    {
        var message = new ContactMessage
        {
            FullName = dto.FullName.Trim(),
            Email = dto.Email.Trim(),
            PhoneNumber = dto.PhoneNumber?.Trim(),
            Subject = dto.Subject.Trim(),
            Message = dto.Message.Trim(),
            CreatedAt = DateTime.UtcNow,
            IsRead = false
        };

        _context.ContactMessages.Add(message);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Cảm ơn bạn đã liên hệ với HONEYQUE Bakery! Chúng tôi sẽ phản hồi sớm nhất." });
    }
}
