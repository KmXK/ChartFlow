namespace CF.Web.Data.Models;

public class Subscription
{
    public Guid Id { get; set; }

    public required DateTime StartTime { get; set; }
    public required DateTime EndTime { get; set; }

    public required Guid UserId { get; set; }
    public User User { get; set; }

    public required int PlanId { get; set; }
    public SubscriptionPlan Plan { get; set; }

}