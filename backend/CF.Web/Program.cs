var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

if (!app.Environment.IsDevelopment())
    app.UseHsts();

app.Map("/", () => "Hello World!");

app.Run();