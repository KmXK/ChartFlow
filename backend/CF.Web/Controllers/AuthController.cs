using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using CF.Web.Data;
using CF.Web.Data.Models;
using CF.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace CF.Web.Controllers;

[Route("api")]
[ApiController]
public class AuthController(
    ApplicationDbContext context,
    IConfiguration configuration
)
    : ControllerBase
{
    private readonly ApplicationDbContext _context = context;
    private readonly IConfiguration _configuration = configuration;

    [HttpPost("login")]
    public async Task<IActionResult> LoginAsync(LoginModel model)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Login == model.Login);

        if (user == null)
        {
            return Unauthorized("User not found");
        }

        // Hash the submitted password with stored salt and compare it with stored hash
        var hashed = KeyDerivation.Pbkdf2(
            password: model.Password,
            salt: user.PasswordSalt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256 / 8);

        if (!hashed.SequenceEqual(user.PasswordSaltedHash))
        {
            return Unauthorized("Invalid credentials");
        }

        var jwtToken = GenerateAccessToken(user);
        var refreshToken = GenerateRefreshToken(user);

        // Response.Cookies.Append("RefreshToken", refreshToken, new CookieOptions { HttpOnly = true });

        return Ok(new { access = jwtToken, refresh = refreshToken });
    }

    [HttpPost("register")]
    public async Task<IActionResult> RegisterAsync(RegistrationModel model)
    {
        if (await _context.Users.AnyAsync(u => u.Login == model.Login))
        {
            return BadRequest("User already exists");
        }

        if (await _context.Users.AnyAsync(u => u.Email == model.Email))
        {
            return BadRequest("Email is already registered");
        }

        var salt = new byte[128 / 8];

        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(salt);
        }

        var hashed = KeyDerivation.Pbkdf2(
            password: model.Password,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256 / 8);

        var user = new User
        {
            Login = model.Login,
            Email = model.Email,
            PasswordSaltedHash = hashed,
            PasswordSalt = salt,
            RefreshToken = string.Empty,
            LastOnlineTime = DateTime.UtcNow,
            RefreshTokenExpiryTime = DateTime.UtcNow
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        var jwtToken = GenerateAccessToken(user);
        var refreshToken = GenerateRefreshToken(user);

        // Response.Cookies.Append("RefreshToken", refreshToken, new CookieOptions { HttpOnly = true });

        return Ok(new { id = user.Id, access = jwtToken, refresh = refreshToken });
    }

    [Authorize]
    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshToken(string refreshToken)
    {
        if (!ValidateRefreshToken(refreshToken ?? ""))
        {
            return Unauthorized("Invalid refresh token. Relogin required");
        }

        if (!Guid.TryParse(User.Claims.FirstOrDefault(x => x.Type == "Id")?.Value ?? string.Empty, out var userId))
        {
            return Unauthorized("Invalid user id");
        }

        var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);

        if (user is null)
        {
            return Unauthorized("Invalid user id");
        }

        var newJwtToken = GenerateAccessToken(user);

        return Ok(new { access = newJwtToken });
    }

    private string GenerateJwtToken(string secretString, List<Claim> claims)
    {
        var jwtSettings = _configuration.GetSection("Jwt");
        var secret = Encoding.UTF8.GetBytes(secretString);
        var creds = new SigningCredentials(new SymmetricSecurityKey(secret), SecurityAlgorithms.HmacSha256);
        var expiry = DateTime.UtcNow.AddMinutes(30);

        var token = new SecurityTokenDescriptor
        {
            Issuer = jwtSettings["Issuer"],
            Audience = jwtSettings["Audience"],
            Claims = claims.ToDictionary(x => x.Type, x => x.Value as object),
            NotBefore = DateTime.UtcNow,
            Expires = expiry,
            SigningCredentials = creds,
        };

        return new JwtSecurityTokenHandler().CreateEncodedJwt(token);
    }

    private string GenerateAccessToken(User user)
    {
        return GenerateJwtToken(
            _configuration["Jwt:AccessKey"]!,
            [
                new Claim("Id", user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Login),
            ]
        );
    }

    private string GenerateRefreshToken(User user)
    {
        return GenerateJwtToken(
            _configuration["Jwt:RefreshKey"]!,
            [
                new Claim("Id", user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Login),
            ]
        );
    }

    private bool ValidateRefreshToken(string refreshToken)
    {
        var validationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            ValidateIssuer = true,
            ValidateAudience = false,
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:RefreshKey"]!)),
            ValidIssuer = _configuration["Jwt:Issuer"],
            ValidAudience = _configuration["Jwt:Audience"],
            ClockSkew = TimeSpan.Zero
        };

        try
        {
            new JwtSecurityTokenHandler()
                .ValidateToken(
                    refreshToken,
                    validationParameters,
                    out SecurityToken validatedToken
                );

            return true;
        }
        catch
        {
            return false;
        }
    }
}
