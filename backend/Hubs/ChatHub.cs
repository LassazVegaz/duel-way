using Microsoft.AspNetCore.SignalR;

namespace DuelWay.Hubs;

public class ChatHub : Hub
{
    public const string HUB_URL = "/chat";


    public async Task SendMessage(string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", message);
    }
}
