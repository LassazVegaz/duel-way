using DuelWay.Clients;
using DuelWay.Data;
using DuelWay.Hubs;
using DuelWay.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace DuelWay.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController(DuelWayContext context, IHubContext<ChatHub, IChatClient> chatHub) : ControllerBase
{
    private readonly DuelWayContext _context = context;
    private readonly IHubContext<ChatHub, IChatClient> _chatHub = chatHub;

    [HttpPost("login")]
    public async Task<ActionResult> Login(User user)
    {
        var userInDb = await _context.Users.FirstOrDefaultAsync(u => u.Name == user.Name);

        if (userInDb == null || userInDb.Password != user.Password) return Unauthorized();

        List<Claim> claims =
        [
            new("name", userInDb.Name)
        ];
        var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme, "name", null);
        var principal = new ClaimsPrincipal(identity);

        await HttpContext.SignInAsync(principal);

        return Ok();
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        await HttpContext.SignOutAsync();
        return Ok();
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register(User user)
    {
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();

        await _chatHub.Clients.All.UserJoined(user.Name);

        return StatusCode(StatusCodes.Status201Created);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult> Get()
    {
        var userName = User.Identity!.Name;
        var user = await _context.Users.FirstAsync(u => u.Name == userName);
        user.Password = "";
        return Ok(user);
    }
}
