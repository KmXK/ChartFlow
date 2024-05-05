namespace CF.Web.Data.Models;

public class User
{
    public Guid Id { get; set; }
    public required string Login { get; set; }
    public required string Email { get; set; }
    public required byte[] PasswordSaltedHash { get; set; }
    public required byte[] PasswordSalt { get; set; }
    public required DateTime LastOnlineTime { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiryTime { get; set; }
}