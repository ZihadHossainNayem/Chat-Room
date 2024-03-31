using ChatRoomApi.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace ChatRoomApi.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ChatContext _context;

        public ChatHub(ChatContext context)
        {
            _context = context;
        }

        public async Task SendMessage(string user, string room, string message)
        {
            var newMessage = new Message
            {
                UserName = user,
                RoomName = room,
                Text = message,
                Timestamp = DateTime.UtcNow
            };

            _context.Messages.Add(newMessage);
            await _context.SaveChangesAsync();

            await Clients.Group(room).SendAsync("ReceiveMessage", user, message);
        }

        public async Task JoinRoom(string user, string room)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, room);
            await Clients.Group(room).SendAsync("ReceiveMessage", "System", $"{user} has joined the room.");
        }

        public async Task LeaveRoom(string user, string room)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, room);
            await Clients.Group(room).SendAsync("ReceiveMessage", "System", $"{user} has left the room.");
        }

        public async Task<IEnumerable<Message>> GetRoomMessages(string room)
        {
            return await _context.Messages
                                  .Where(m => m.RoomName == room)
                                  .OrderBy(m => m.Timestamp)
                                  .ToListAsync();
        }
    }
   
}
