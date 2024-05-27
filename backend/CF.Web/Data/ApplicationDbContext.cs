using CF.Web.Data.Configurations;
using CF.Web.Data.Models;
using CF.Web.Services;
using Microsoft.EntityFrameworkCore;

namespace CF.Web.Data;

public class ApplicationDbContext(
    DbContextOptions<ApplicationDbContext> options,
    PasswordService passwordService
)
    : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Subscription> Subscriptions { get; set; }
    public DbSet<SubscriptionPlan> SubscriptionPlans { get; set; }
    public DbSet<Extension> Extensions { get; set; }
    public DbSet<ExtensionUsing> ExtensionUsings { get; set; }
    public DbSet<ExtensionComment> ExtensionComments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(UserConfiguration).Assembly);

        var (hash, salt) = passwordService.HashPassword("chartflow");

        modelBuilder.Entity<User>().HasData([
            new User() {
                Id = Guid.Parse("396f400a-2c1a-4cd0-9323-df2d02770833"),
                Login = "chartflow",
                Email = "chartflow@yandex.by",
                PasswordSalt = salt,
                PasswordSaltedHash = hash,
                LastOnlineTime = DateTime.UtcNow
            }
        ]);
    }
}