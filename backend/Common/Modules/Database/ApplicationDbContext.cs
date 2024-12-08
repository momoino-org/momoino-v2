using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Common.Modules.Database;

/// <inheritdoc/>
public class ApplicationDbContext(IConfiguration configuration) : DbContext
{
    /// <inheritdoc/>
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) =>
        optionsBuilder.UseNpgsql(
            configuration.GetConnectionString("Default"),
            builder => builder.SetPostgresVersion(16, 0)
        );
}
