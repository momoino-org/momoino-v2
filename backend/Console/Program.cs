using Common.Database;
using Console.Modules.Auth;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi(opt => opt.OpenApiVersion = Microsoft.OpenApi.OpenApiSpecVersion.OpenApi3_0);
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseInMemoryDatabase("Testing"));
builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.CustomMapIdentityApi<IdentityUser>();

app.Run();
