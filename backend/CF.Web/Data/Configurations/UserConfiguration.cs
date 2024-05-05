using CF.Web.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CF.Web.Data.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");

        builder.HasKey(u => u.Id);

        builder.Property(u => u.Login)
            .IsRequired()
            .IsUnicode(false)
            .HasMaxLength(100);

        builder.Property(u => u.Email)
            .IsRequired()
            .IsUnicode(true)
            .HasMaxLength(100);

        builder.Property(u => u.PasswordSaltedHash)
            .IsRequired()
            .HasColumnName("binary(16)");

        builder.Property(u => u.PasswordSalt)
            .IsRequired()
            .HasColumnType("binary(16)");

        builder.Property(u => u.RefreshToken)
            .IsUnicode(false)
            .HasMaxLength(1000);

        builder.Property(u => u.RefreshTokenExpiryTime)
            .HasColumnType("datetime");

        builder.Property(u => u.LastOnlineTime)
            .IsRequired()
            .HasColumnType("datetime");

        builder.HasIndex(u => u.Login).IsUnique();
        builder.HasIndex(u => u.Email).IsUnique();
    }
}