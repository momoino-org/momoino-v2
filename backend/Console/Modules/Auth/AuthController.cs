using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Console.Modules.Auth;

[ApiController]
[Route("auth")]
[Tags("Authentication")]
public class AuthController(SignInManager<IdentityUser> signInManager) : ControllerBase
{
    [HttpPost]
    [Route("logout")]
    [Authorize]
    [EndpointDescription("Logout")]
    public async Task<IResult> Logout([FromBody] object empty)
    {
        if (empty != null)
        {
            await signInManager.SignOutAsync();
            return Results.Ok();
        }

        return Results.Unauthorized();
    }
}
