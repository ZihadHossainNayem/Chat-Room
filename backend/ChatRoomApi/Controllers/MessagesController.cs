using ChatRoomApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatRoomApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly ChatContext _context;

        public MessagesController(ChatContext context)
        {
            _context = context;
        }

        // GET: api/Messages/roomName
        [HttpGet("{roomName}")]
        public async Task<ActionResult<IEnumerable<Message>>> GetRoomMessages(string roomName)
        {
            var messages = await _context.Messages
                                          .Where(m => m.RoomName == roomName)
                                          .OrderBy(m => m.Timestamp)
                                          .ToListAsync();

            if (messages == null || !messages.Any())
            {
                return NotFound();
            }

            return messages;
        }
    }
}
