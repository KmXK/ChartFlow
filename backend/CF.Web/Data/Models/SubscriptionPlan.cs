namespace CF.Web.Data.Models;

public class SubscriptionPlan
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required short PeriodInDays { get; set; }
    public required decimal Cost { get; set; }
    public required DateTime StartTime { get; set; }
    public required DateTime EndTime { get; set; }
}