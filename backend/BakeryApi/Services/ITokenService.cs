using BakeryApi.Models;

namespace BakeryApi.Services;

public interface ITokenService
{
    string GenerateJwtToken(User user);
}
