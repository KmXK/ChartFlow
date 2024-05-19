using CF.Web.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CF.Web.Data.Configurations;

public class SubscriptionPlanConfiguration : IEntityTypeConfiguration<SubscriptionPlan>
{
    public void Configure(EntityTypeBuilder<SubscriptionPlan> builder)
    {
        builder.ToTable("SubscriptionPlans");

        builder.HasKey(u => u.Id);

        builder.Property(u => u.Name)
            .IsRequired()
            .IsUnicode()
            .HasMaxLength(256);

        builder.Property(u => u.PeriodInDays)
            .IsRequired();

        builder.Property(u => u.Cost)
            .IsRequired()
            .HasColumnType("decimal(8,2)");

        builder.Property(u => u.StartTime)
            .IsRequired()
            .HasColumnType("datetime");

        builder.Property(u => u.EndTime)
            .IsRequired()
            .HasColumnType("datetime");

        builder.HasData(
            [
                new SubscriptionPlan
                {
                    Id = 1,
                    Name = "1 month",
                    PeriodInDays = 30,
                    Cost = 9.99m,
                    StartTime = DateTime.Parse("01-01-2020"),
                    EndTime = DateTime.Parse("01-01-2030")
                },
                new SubscriptionPlan
                {
                    Id = 2,
                    Name = "12 months",
                    PeriodInDays = 365,
                    Cost = 99.99m,
                    StartTime = DateTime.Parse("01-01-2020"),
                    EndTime = DateTime.Parse("01-01-2030")
                }
            ]
        );
    }
}