using System.Text;
using CF.Web.Data;
using CF.Web.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<ApplicationDbContext>(config =>
{
    config.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            ValidateAudience = false, // not working ;(
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:AccessKey"]!))
        };

        options.UseSecurityTokenValidators = true;
    });

builder.Services.AddSingleton<PasswordService>();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
    app.UseHsts();

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
scope.ServiceProvider.GetRequiredService<ApplicationDbContext>()!.Database.Migrate();

app.Run();