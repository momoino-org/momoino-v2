namespace Common.Modules.Auth;

/// <summary>
/// Represents a principal user with basic identity and profile information.
/// </summary>
public record PrincipalUser
{
    /// <summary>
    /// Gets or sets the unique identifier of the user.
    /// </summary>
    public required string Id { get; set; }

    /// <summary>
    /// Gets or sets the username of the user.
    /// </summary>
    public required string Username { get; set; }

    /// <summary>
    /// Gets or sets the email address of the user.
    /// </summary>
    public required string Email { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether the user's email is verified.
    /// </summary>
    public required bool EmailVerified { get; set; }

    /// <summary>
    /// Gets or sets the first name of the user.
    /// </summary>
    public required string FirstName { get; set; }

    /// <summary>
    /// Gets or sets the last name of the user.
    /// </summary>
    public required string LastName { get; set; }

    /// <summary>
    /// Gets or sets the locale of the user.
    /// </summary>
    public required string Locale { get; set; }

    /// <summary>
    /// Gets or sets the access token of the user.
    /// </summary>
    public required string AccessToken { get; set; }
}
