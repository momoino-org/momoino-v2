using Common.Modules.Auth;
using Microsoft.Extensions.DependencyInjection;

namespace Common;

/// <summary>
/// Provides extension methods to add services related to the Common module.
/// </summary>
public static class CommonModule
{
    /// <summary>
    /// Adds the Common module services to the specified <see cref="IServiceCollection"/>.
    /// </summary>
    public static void AddCommonModule(this IServiceCollection services) =>
        services.AddScoped<UserService>();
}
