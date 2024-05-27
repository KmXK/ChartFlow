using System.Collections.Generic;

namespace CF.Web.Data.Models;

public class Extension
{
    public required Guid Id { get; set; }
    public required Guid AuthorId { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required DateTime CreationTime { get; set; }
    public required bool IsRemoved { get; set; }

    public User Author { get; set; }
    public virtual ICollection<ExtensionComment> Comments { get; set; } = new HashSet<ExtensionComment>();
    public virtual ICollection<ExtensionUsing> Usings { get; set; } = new HashSet<ExtensionUsing>();
}