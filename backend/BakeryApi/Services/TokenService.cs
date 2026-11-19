using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BakeryApi.Models;
using Microsoft.IdentityModel.Tokens;

namespace BakeryApi.Services;

public class TokenService : ITokenService
{
    private readonly IConfiguration _config;

    public TokenService(IConfiguration config)
    {
        _config = config;
    }

    public string GenerateJwtToken(User user)
    {
        var secretKey = _config["Jwt:Key"] ?? "BakerySecretKey_SuperSecureKeyForJwtTokens_2026";
        var issuer = _config["Jwt:Issuer"] ?? "BakeryApi";
        var audience = _config["Jwt:Audience"] ?? "BakeryClient";

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Name, user.Username),
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.Role, user.Role),
            new("fullname", user.FullName)
        };

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            Issuer = issuer,
            Audience = audience,
            SigningCredentials = creds
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
