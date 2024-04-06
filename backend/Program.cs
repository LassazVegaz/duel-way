using DuelWay.Data;
using DuelWay.Hubs;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddPolicy("dev policy", builder =>
    {
        builder.WithOrigins("http://localhost:3000")
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials();
    });
});

builder.Services.AddDbContext<DuelWayContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DuelWayDb"));
});


var app = builder.Build();

app.UseCors("dev policy");

app.MapControllers();

app.MapHub<ChatHub>(ChatHub.HUB_URL);

app.Run();
