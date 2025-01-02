using System.Globalization;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace Common.Modules.Auth;

/// <summary>
/// Provides services related to user information, including retrieving the principal user from the HTTP context.
/// </summary>
public class UserService(IHttpContextAccessor contextAccessor, IConfiguration configuration)
{
    private readonly HttpContext? _httpContext = contextAccessor.HttpContext;
    private readonly IConfiguration _configuration = configuration;

    /// <summary>
    /// Retrieves the principal user from the current HTTP context.
    /// </summary>
    /// <returns>The <see cref="PrincipalUser"/> representing the current authenticated user.</returns>
    /// <exception cref="ArgumentNullException">Thrown if any required claim is missing from the current user's identity.</exception>
    public async Task<PrincipalUser> GetPrincipalUserAsync()
    {
        ArgumentNullException.ThrowIfNull(this._httpContext?.User);

        ClaimsPrincipal claims = this._httpContext.User;
        var userId = claims.FindFirstValue(ClaimTypes.NameIdentifier);
        var username = claims.FindFirstValue("preferred_username");
        var email = claims.FindFirstValue(ClaimTypes.Email);
        var emailVerified = string.Equals(
            claims.FindFirstValue("email_verified"),
            "true",
            StringComparison.OrdinalIgnoreCase
        );
        var firstName = claims.FindFirstValue(ClaimTypes.GivenName);
        var lastName = claims.FindFirstValue(ClaimTypes.Surname);
        var locale = claims.FindFirstValue("locale");
        var preferredDisplayNameTemplate = this._configuration.GetValue<string>(
            $"UserConfig:PreferredDisplayName:{locale}"
        );
        var accessToken = await this._httpContext.GetTokenAsync("access_token");

        ArgumentNullException.ThrowIfNull(userId);
        ArgumentNullException.ThrowIfNull(username);
        ArgumentNullException.ThrowIfNull(email);
        ArgumentNullException.ThrowIfNull(firstName);
        ArgumentNullException.ThrowIfNull(lastName);
        ArgumentNullException.ThrowIfNull(locale);
        ArgumentNullException.ThrowIfNull(preferredDisplayNameTemplate);
        ArgumentNullException.ThrowIfNull(accessToken);

        return new PrincipalUser
        {
            Id = userId,
            Username = username,
            Email = email,
            EmailVerified = emailVerified,
            FirstName = firstName,
            LastName = lastName,
            DisplayName = string.Format(
                    CultureInfo.InvariantCulture,
                    preferredDisplayNameTemplate,
                    firstName,
                    lastName
                )
                .Trim(),
            Locale = locale,
            AccessToken = accessToken,
        };
    }
}
