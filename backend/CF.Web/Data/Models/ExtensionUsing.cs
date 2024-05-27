namespace CF.Web.Data.Models;

public class ExtensionUsing
{
    public Guid Id { get; set; }
    public Guid ExtensionId { get; set; }
    public Guid UserId { get; set; }
    public DateTime ActivationTime { get; set; }
    public DateTime? DeactivationTime { get; set; }

    public User User { get; set; }
    public Extension Extension { get; set; }
}