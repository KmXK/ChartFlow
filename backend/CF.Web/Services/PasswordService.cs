using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace CF.Web.Services;

public class PasswordService
{
    public (byte[] Hash, byte[] Salt) HashPassword(string password)
    {
        var salt = new byte[128 / 8];

        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(salt);
        }

        var hashed = KeyDerivation.Pbkdf2(
            password: password,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256 / 8);

        return (hashed, salt);
    }
}