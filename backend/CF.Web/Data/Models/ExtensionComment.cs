namespace CF.Web.Data.Models;

public class ExtensionComment
{
    public Guid Id { get; set; }
    public Guid ExtensionId { get; set; }
    public Guid UserId { get; set; }
    public DateTime ModifiedTime { get; set; }
    public string Text { get; set; }
    public byte Rating { get; set; }

    public User User { get; set; }
    public Extension Extension { get; set; }
}