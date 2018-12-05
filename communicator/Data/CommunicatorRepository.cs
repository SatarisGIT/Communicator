using communicator.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace communicator.Data
{
    public class CommunicatorRepository : ICommunicatorRepository
    {
        private readonly CommunicatorContext _context;
        private readonly ILogger<CommunicatorRepository> _logger;

        public CommunicatorRepository(CommunicatorContext context, ILogger<CommunicatorRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public void AddEntity(object model)
        {
            _context.Add(model);
        }

        public IEnumerable<Message> GetAllMessages()
        {
            try
            {
                _logger.LogInformation("GetAllMessages was called");
                return _context.Messages.ToList();
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to GetAllMessages {e}");
                return null;
            }
        }

        public IEnumerable<User> GetAllUsers()
        {    
            try
            {
                _logger.LogInformation("GetAllUsers was called");
                return _context.Users.ToList();
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to GetAllUsers {e}");
                return null;
            }
        }

        public Message GetMessageById(int id)
        {
            try
            {
                _logger.LogInformation("GetMessageById was called");
                return _context.Messages.Find(id);
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to GetMessageById {e}");
                return null;
            }
        }

        public User GetUserById(int id)
        {
            try
            {
                _logger.LogInformation("GetUserById was called");
                return _context.Users.Find(id);
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to GetUserById {e}");
                return null;
            }
        }

        public bool SaveAll()
        {
            return _context.SaveChanges() > 0;
        }
    }
}
