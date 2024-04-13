namespace DuelWay.Clients;

public interface IChatClient
{
    Task UserJoined(string username);
    Task ReceiveMessage(string user, string message);
}
