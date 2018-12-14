using communicator.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace communicator.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(User user, Message message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
            //await Clients.User(user.ID.ToString()).SendAsync("ReceiveMessage", user, message);
        }
    }
}
