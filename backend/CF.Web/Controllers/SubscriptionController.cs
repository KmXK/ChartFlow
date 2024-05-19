using System.Security.Claims;
using CF.Web.Data;
using CF.Web.Data.Models;
using CF.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api")]
[ApiController]
public sealed class SubscriptionController(ApplicationDbContext context) : ControllerBase
{
    [Authorize]
    [HttpGet("active-plans")]
    public async Task<List<SubscriptionPlanModel>> GetActivePlans()
    {
        var now = DateTime.UtcNow;
        return await context.SubscriptionPlans
            .Where(x => x.StartTime <= now && x.EndTime > now)
            .Select(x => new SubscriptionPlanModel
            {
                Id = x.Id,
                Name = x.Name
            })
            .ToListAsync();
    }

    [Authorize]
    [HttpPost("purchase/{planId:int}")]
    public async Task<IActionResult> PurchaseSubscription(int planId)
    {
        var userId = Guid.Parse(User.FindFirst("Id")!.Value);

        var plan = await context.SubscriptionPlans.SingleAsync(x => x.Id == planId);

        if (plan is null)
        {
            return NotFound();
        }

        var subscription = new Subscription
        {
            UserId = userId,
            PlanId = planId,
            StartTime = DateTime.UtcNow,
            EndTime = DateTime.UtcNow.AddDays(plan.PeriodInDays)
        };

        await context.Subscriptions.AddAsync(subscription);

        await context.SaveChangesAsync();

        return Ok();
    }

    [Authorize]
    [HttpGet("subscription")]
    public async Task<IActionResult> GetUserSubscription()
    {
        var userId = Guid.Parse(User.FindFirst("Id")!.Value);
        var now = DateTime.UtcNow;

        var subscription =
            await context.Subscriptions
                .Include(x => x.Plan)
                .Where(x => x.UserId == userId &&
                            x.StartTime <= now &&
                            x.EndTime > now)
                .Select(x => new
                {
                    x.Id,
                    Plan = new SubscriptionPlanModel
                    {
                        Id = x.Plan.Id,
                        Name = x.Plan.Name
                    }
                })
                .FirstOrDefaultAsync();

        if (subscription is null)
        {
            return Ok();
        }

        return Ok(subscription);
    }
}