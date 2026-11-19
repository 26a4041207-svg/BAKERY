using System.Security.Claims;
using BakeryApi.Data;
using BakeryApi.DTOs;
using BakeryApi.Models;
using BakeryApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BakeryApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly BakeryDbContext _context;
    private readonly ITokenService _tokenService;

    public AuthController(BakeryDbContext context, ITokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register([FromBody] RegisterRequestDto dto)
    {
        if (await _context.Users.AnyAsync(u => u.Username.ToLower() == dto.Username.ToLower()))
        {
            return BadRequest(new { message = "Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác." });
        }

        if (await _context.Users.AnyAsync(u => u.Email.ToLower() == dto.Email.ToLower()))
        {
            return BadRequest(new { message = "Email này đã được sử dụng. Vui lòng dùng email khác." });
        }

        var user = new User
        {
            Username = dto.Username.Trim(),
            FullName = dto.FullName.Trim(),
            Email = dto.Email.Trim().ToLower(),
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = "Customer",
            PhoneNumber = dto.PhoneNumber,
            Address = dto.Address,
            CreatedAt = DateTime.UtcNow
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        var token = _tokenService.GenerateJwtToken(user);

        return Ok(new AuthResponseDto
        {
            Id = user.Id,
            Username = user.Username,
            FullName = user.FullName,
            Email = user.Email,
            Role = user.Role,
            Token = token
        });
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginRequestDto dto)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Username.ToLower() == dto.Username.ToLower() || u.Email.ToLower() == dto.Username.ToLower());

        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
        {
            return Unauthorized(new { message = "Tên đăng nhập hoặc mật khẩu không chính xác." });
        }

        var token = _tokenService.GenerateJwtToken(user);

        return Ok(new AuthResponseDto
        {
            Id = user.Id,
            Username = user.Username,
            FullName = user.FullName,
            Email = user.Email,
            Role = user.Role,
            Token = token
        });
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<UserProfileDto>> GetCurrentUser()
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userIdStr) || !int.TryParse(userIdStr, out int userId))
        {
            return Unauthorized();
        }

        var user = await _context.Users.FindAsync(userId);
        if (user == null) return NotFound(new { message = "Không tìm thấy người dùng." });

        return Ok(new UserProfileDto
        {
            Id = user.Id,
            Username = user.Username,
            FullName = user.FullName,
            Email = user.Email,
            Role = user.Role,
            PhoneNumber = user.PhoneNumber,
            Address = user.Address,
            CreatedAt = user.CreatedAt
        });
    }
}
