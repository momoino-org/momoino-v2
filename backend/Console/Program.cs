using System.Net;
using System.Net.Mime;
using Common;
using Common.Modules.Database;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.OpenApi;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using Scalar.AspNetCore;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options => options.AddServerHeader = false);

builder
    .Services.AddOpenTelemetry()
    .ConfigureResource(resource => resource.AddService("Momoino.Console"))
    .WithTracing(tracing =>
        tracing.AddAspNetCoreInstrumentation().AddHttpClientInstrumentation().AddOtlpExporter()
    );

builder.Services.AddRouting(options =>
{
    options.LowercaseUrls = true;
    options.LowercaseQueryStrings = true;
});

builder.Services.AddControllers();

builder.Services.AddOpenApi(opt => opt.OpenApiVersion = OpenApiSpecVersion.OpenApi3_0);

builder.Services.AddDbContext<ApplicationDbContext>();
builder
    .Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.Events = new JwtBearerEvents
        {
            OnChallenge = ctx =>
            {
                ctx.HandleResponse();

                if (
                    !string.IsNullOrEmpty(ctx.Error)
                    || !string.IsNullOrEmpty(ctx.ErrorDescription)
                    || !string.IsNullOrEmpty(ctx.ErrorUri)
                )
                {
                    return Task.CompletedTask;
                }

                ProblemDetailsFactory problemDetailsFactory =
                    ctx.HttpContext.RequestServices.GetRequiredService<ProblemDetailsFactory>();
                ProblemDetails problemDetails = problemDetailsFactory.CreateProblemDetails(
                    ctx.HttpContext,
                    StatusCodes.Status401Unauthorized,
                    "Authentication failed",
                    detail: "Missing bearer token"
                );

                ctx.Response.StatusCode = StatusCodes.Status401Unauthorized;

                return ctx.Response.WriteAsJsonAsync(
                    problemDetails,
                    options: null,
                    contentType: MediaTypeNames.Application.ProblemJson
                );
            },
            OnAuthenticationFailed = ctx =>
            {
                ProblemDetailsFactory problemDetailsFactory =
                    ctx.HttpContext.RequestServices.GetRequiredService<ProblemDetailsFactory>();
                ProblemDetails problemDetails = problemDetailsFactory.CreateProblemDetails(
                    ctx.HttpContext,
                    StatusCodes.Status401Unauthorized,
                    "Authentication failed",
                    detail: ctx.Exception.Message
                );

                return ctx.Response.WriteAsJsonAsync(
                    problemDetails,
                    options: null,
                    contentType: MediaTypeNames.Application.ProblemJson
                );
            },
        };
    });

builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.Providers.Add<BrotliCompressionProvider>();
    options.Providers.Add<GzipCompressionProvider>();
});

builder.Services.AddHttpContextAccessor();
builder.Services.AddProblemDetails();
builder.Services.AddCommonModule();

WebApplication app = builder.Build();

app.UseExceptionHandler();

app.MapOpenApi("/api/openapi/{documentName}.json");
app.MapScalarApiReference(x =>
{
    x.EndpointPathPrefix = "/api/doc/{documentName}";
    x.OpenApiRoutePattern = "/api/openapi/{documentName}.json";
});

app.UseRouting();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.UseResponseCompression();

app.MapControllers();

await app.RunAsync();
