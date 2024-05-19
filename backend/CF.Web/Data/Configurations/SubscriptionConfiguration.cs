using CF.Web.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CF.Web.Data.Configurations;

public class SubscriptionConfiguration : IEntityTypeConfiguration<Subscription>
{
    public void Configure(EntityTypeBuilder<Subscription> builder)
    {
        builder.ToTable("Subscriptions");

        builder.HasKey(u => u.Id);

        builder.HasOne(u => u.User)
            .WithMany()
            .HasForeignKey(u => u.UserId);

        builder.HasOne(u => u.Plan)
            .WithMany()
            .HasForeignKey(u => u.PlanId);

        builder.Property(u => u.StartTime)
            .IsRequired()
            .HasColumnType("datetime");

        builder.Property(u => u.EndTime)
            .IsRequired()
            .HasColumnType("datetime");
    }
}