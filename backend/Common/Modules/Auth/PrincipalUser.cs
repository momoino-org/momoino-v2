using System.Text.Json.Serialization;

namespace Common.Modules.Auth;

/// <summary>
/// Represents a principal user with basic identity and profile information.
/// </summary>
public record PrincipalUser
{
    /// <summary>
    /// Gets or sets the unique identifier of the user.
    /// </summary>
    [JsonPropertyOrder(0)]
    public required string Id { get; set; }

    /// <summary>
    /// Gets or sets the username of the user.
    /// </summary>
    [JsonPropertyOrder(10)]
    public required string Username { get; set; }

    /// <summary>
    /// Gets or sets the email address of the user.
    /// </summary>
    [JsonPropertyOrder(20)]
    public required string Email { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether the user's email is verified.
    /// </summary>
    [JsonPropertyOrder(30)]
    public required bool EmailVerified { get; set; }

    /// <summary>
    /// Gets or sets the first name of the user.
    /// </summary>
    [JsonPropertyOrder(40)]
    public required string FirstName { get; set; }

    /// <summary>
    /// Gets or sets the last name of the user.
    /// </summary>
    [JsonPropertyOrder(50)]
    public required string LastName { get; set; }

    /// <summary>
    /// Gets or sets the display name.
    /// </summary>
    [JsonPropertyOrder(60)]
    public required string DisplayName { get; set; }

    /// <summary>
    /// Gets or sets the locale of the user.
    /// </summary>
    [JsonPropertyOrder(70)]
    public required string Locale { get; set; }

    /// <summary>
    /// Gets or sets the access token of the user.
    /// </summary>
    [JsonPropertyOrder(80)]
    public required string AccessToken { get; set; }
}
