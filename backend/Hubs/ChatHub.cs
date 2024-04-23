using DuelWay.Clients;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace DuelWay.Hubs;

public class ChatHub : Hub<IChatClient>
{
    public const string HUB_URL = "/chat";


    public override async Task OnConnectedAsync()
    {
        var user = Context.User?.Identity?.Name!;
        await Clients.All.UserJoined(user);
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var user = Context.User?.Identity?.Name!;
        await Clients.All.UserLeft(user);
    }


    [Authorize]
    public async Task SendMessage(string message)
    {
        var user = Context.User?.Identity?.Name!;
        await Clients.All.ReceiveMessage(user, message);
    }
}
