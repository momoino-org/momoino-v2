using System.Net;
using System.Net.Mime;
using Common;
using Common.Modules.Database;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.OpenApi;
using Microsoft.OpenApi.Models;
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

builder.Services.AddOpenApi(opt =>
{
    opt.OpenApiVersion = OpenApiSpecVersion.OpenApi3_0;
    _ = opt.AddDocumentTransformer(
        (document, _, _) =>
        {
            IConfigurationSection authConfig = builder.Configuration.GetRequiredSection(
                "OpenAPI:OAuth2"
            );
            var authorizationUrl =
                authConfig.GetValue<string>("AuthorizationUrl")
                ?? throw new InvalidOperationException(
                    "AuthorizationUrl not found in the configuration."
                );
            var tokenUrl =
                authConfig.GetValue<string>("TokenUrl")
                ?? throw new InvalidOperationException("TokenUrl not found in the configuration.");

            // Add OAuth2 security scheme to the OpenAPI document.
            var scheme = new OpenApiSecurityScheme
            {
                Type = SecuritySchemeType.OAuth2,
                Flows = new OpenApiOAuthFlows
                {
                    AuthorizationCode = new OpenApiOAuthFlow
                    {
                        AuthorizationUrl = new Uri(authorizationUrl),
                        TokenUrl = new Uri(tokenUrl),
                    },
                },
                Reference = new OpenApiReference
                {
                    Id = "oauth2",
                    Type = ReferenceType.SecurityScheme,
                },
            };

            document.Components ??= new OpenApiComponents();
            document.Components.SecuritySchemes ??= new Dictionary<string, OpenApiSecurityScheme>();
            document.Components.SecuritySchemes[scheme.Reference.Id] = scheme;
            document.SecurityRequirements ??= [];
            document.SecurityRequirements.Add(new OpenApiSecurityRequirement { [scheme] = [] });

            return Task.CompletedTask;
        }
    );
});

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
                    (int)HttpStatusCode.Unauthorized,
                    "Authentication failed",
                    detail: "Missing bearer token"
                );

                ctx.Response.StatusCode = (int)HttpStatusCode.Unauthorized;

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
                    (int)HttpStatusCode.Unauthorized,
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

app.MapOpenApi();
app.MapScalarApiReference();

app.UseRouting();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.UseResponseCompression();

app.MapControllers();

await app.RunAsync();
