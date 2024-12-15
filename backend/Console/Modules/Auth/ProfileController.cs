using System.Net.Mime;
using Common.Modules.Auth;
using Common.Modules.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Console.Modules.Auth;

/// <summary>
/// Controller to manage user profile-related actions.
/// </summary>
[Route("api/v1/auth/[controller]")]
[ApiController]
[Authorize]
public class ProfileController(UserService userService) : ControllerBase
{
    /// <summary>
    /// Gets the profile of the currently authenticated user.
    /// </summary>
    /// <returns>
    /// An Ok result containing an ApiResponse with the PrincipalUser object.
    /// </returns>
    [HttpGet]
    [ProducesResponseType<ApiResponse<PrincipalUser>>(StatusCodes.Status200OK)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status400BadRequest)]
    public async Task<IResult> GetProfileAsync()
    {
        // Calls the UserService to retrieve the PrincipalUser object asynchronously.
        PrincipalUser principalUser = await userService.GetPrincipalUserAsync();

        // Returns an Ok result containing the ApiResponse with the PrincipalUser object.
        return TypedResults.Ok(ResponseWrapper.Normal(this.HttpContext, principalUser));
    }
}
