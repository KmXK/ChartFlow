using System.Collections.Generic;
using CF.Web.Data;
using CF.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CF.Web.Services;

[Route("api/extension")]
[ApiController]
public class ExtensionController(ApplicationDbContext context) : ControllerBase
{
    [Authorize]
    [HttpGet]
    public async Task<IActionResult> List([FromQuery] bool installed)
    {
        var id = Guid.Parse(User.Claims.Single(x => x.Type == "Id").Value);

        return Ok(
            await context.Extensions
                .Include(x => x.Author)
                .Include(x => x.Comments).ThenInclude(x => x.User)
                .Where(x => !x.IsRemoved && (!installed || x.Usings.Any(x => x.UserId == id && x.DeactivationTime == null)))
                .Select(x => new
                {
                    x.Id,
                    x.Name,
                    x.Description,
                    Author = new
                    {
                        Id = x.AuthorId,
                        x.Author.Login
                    },
                    Installed = x.Usings.Any(x => x.UserId == id && x.DeactivationTime == null)
                })
                .ToListAsync()
        );
    }

    [Authorize]
    [HttpGet("{id:guid}/comments")]
    public async Task<IActionResult> Comments(Guid id)
    {
        return Ok(
            await context.ExtensionComments
            .Where(x => x.ExtensionId == id)
            .OrderByDescending(x => x.ModifiedTime)
            .Select(x => new
            {
                x.Id,
                x.Text,
                x.Rating,
                User = new
                {
                    x.User.Id,
                    x.User.Login
                },
                x.ModifiedTime
            })
            .ToListAsync());
    }

    [Authorize]
    [HttpPost("{id:guid}/comments")]
    public async Task<IActionResult> AddComment(Guid id, [FromBody] CommentModel comment)
    {
        context.ExtensionComments.Add(new Data.Models.ExtensionComment
        {
            ExtensionId = id,
            ModifiedTime = DateTime.UtcNow,
            Text = comment.Text,
            Rating = comment.Rating,
            UserId = Guid.Parse(User.Claims.Single(x => x.Type == "Id").Value)
        });

        await context.SaveChangesAsync();
        return Ok();
    }

    [Authorize]
    [HttpPost("install")]
    public async Task Install([FromBody] InstallModel model)
    {
        var userId = Guid.Parse(User.Claims.Single(x => x.Type == "Id").Value);

        var now = DateTime.UtcNow;

        var activeUsings = await context.ExtensionUsings.Where(x => x.DeactivationTime == null && x.UserId == userId).ToDictionaryAsync(x => x.ExtensionId, x => x);

        var set = new HashSet<Guid>(model.Ids);

        foreach (var removeUsing in activeUsings.Where(x => !set.Contains(x.Key)))
        {
            removeUsing.Value.DeactivationTime = now;
        }

        foreach (var newUsing in set.Where(x => !activeUsings.ContainsKey(x)))
        {
            context.ExtensionUsings.Add(new Data.Models.ExtensionUsing
            {
                ActivationTime = now,
                ExtensionId = newUsing,
                UserId = userId
            });
        }

        await context.SaveChangesAsync();
    }

    public class InstallModel
    {
        public Guid[] Ids { get; set; }
    }
}