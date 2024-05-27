using CF.Web.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CF.Web.Data.Configurations;

public class ExtensionConfiguration : IEntityTypeConfiguration<Extension>
{
    public void Configure(EntityTypeBuilder<Extension> builder)
    {
        builder.ToTable("Extensions");

        builder.HasKey(u => u.Id);

        builder.HasOne(u => u.Author)
            .WithMany()
            .HasForeignKey(u => u.AuthorId);

        builder.Property(u => u.Name)
            .IsRequired()
            .IsUnicode()
            .HasMaxLength(256);

        builder.Property(u => u.Description)
            .IsRequired()
            .IsUnicode();

        builder.Property(u => u.CreationTime)
            .IsRequired()
            .HasColumnType("datetime");

        builder.Property(u => u.IsRemoved)
            .IsRequired();

        builder.HasMany(x => x.Comments)
            .WithOne(x => x.Extension)
            .HasForeignKey(x => x.ExtensionId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.HasMany(x => x.Usings)
                .WithOne(x => x.Extension)
                .HasForeignKey(x => x.ExtensionId)
                .OnDelete(DeleteBehavior.NoAction);

        builder.HasData([
            new()
            {
                Id = Guid.NewGuid(),
                AuthorId = Guid.Parse("396f400a-2c1a-4cd0-9323-df2d02770833"),
                Name = "Gost",
                Description = "Gost is a simple, fast and reliable charting library.",
                CreationTime = DateTime.UtcNow,
                IsRemoved = false
            },
            new()
            {
                Id = Guid.NewGuid(),
                AuthorId = Guid.Parse("396f400a-2c1a-4cd0-9323-df2d02770833"),
                Name = "Grid movement helper",
                Description = "Helper for grid movement.",
                CreationTime = DateTime.UtcNow,
                IsRemoved = false
            }
        ]);
    }
}