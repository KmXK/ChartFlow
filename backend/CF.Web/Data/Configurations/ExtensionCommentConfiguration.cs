using CF.Web.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CF.Web.Data.Configurations;

public class ExtensionCommentConfiguration : IEntityTypeConfiguration<ExtensionComment>
{
    public void Configure(EntityTypeBuilder<ExtensionComment> builder)
    {
        builder.ToTable("ExtensionComments");

        builder.HasKey(u => u.Id);

        builder.HasOne(u => u.Extension)
            .WithMany()
            .HasForeignKey(u => u.ExtensionId);

        builder.HasOne(u => u.User)
            .WithMany()
            .HasForeignKey(u => u.UserId);

        builder.Property(u => u.ModifiedTime)
            .IsRequired()
            .HasColumnType("datetime");

        builder.Property(u => u.Text)
            .IsRequired()
            .IsUnicode();

        builder.Property(u => u.Rating)
            .IsRequired();
    }
}
