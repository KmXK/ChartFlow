using CF.Web.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CF.Web.Data.Configurations;

public class ExtensionUsingConfiguration : IEntityTypeConfiguration<ExtensionUsing>
{
    public void Configure(EntityTypeBuilder<ExtensionUsing> builder)
    {
        builder.ToTable("ExtensionUsings");

        builder.HasKey(u => u.Id);

        builder.HasOne(u => u.User)
            .WithMany()
            .HasForeignKey(u => u.UserId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.Property(u => u.ActivationTime)
            .IsRequired()
            .HasColumnType("datetime");

        builder.Property(u => u.DeactivationTime)
            .HasColumnType("datetime");
    }
}