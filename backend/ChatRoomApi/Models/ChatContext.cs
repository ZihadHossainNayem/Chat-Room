using Microsoft.EntityFrameworkCore;

namespace ChatRoomApi.Models
{
    public class ChatContext : DbContext
    {
        public ChatContext(DbContextOptions<ChatContext> options)
            : base(options) { }

        public DbSet<Message> Messages { get; set; }
    }
}
