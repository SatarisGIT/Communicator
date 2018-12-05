using communicator.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace communicator.Data
{
    public class CommunicatorRepository<T> : ICommunicatorRepository<T> where T: class
    {
        private readonly CommunicatorContext _context;
        private readonly ILogger<CommunicatorRepository<T>> _logger;

        public CommunicatorRepository(CommunicatorContext context, ILogger<CommunicatorRepository<T>> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        public void Create(T entity)
        {
            _context.Set<T>().Add(entity);
        }

        public void Update(T entity)
        {
            _context.Set<T>().Update(entity);
        }

        public void Delete(T entity)
        {
            _context.Set<T>().Remove(entity);
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<IEnumerable<T>> GetByConditionAsync(Expression<Func<T, bool>> expression)
        {
            return await _context.Set<T>().Where(expression).ToListAsync();
        }

        //public IEnumerable<Message> GetAllMessages()
        //{
        //    try
        //    {
        //        _logger.LogInformation("GetAllMessages was called");
        //        return _context.Messages.ToList();
        //    }
        //    catch (Exception e)
        //    {
        //        _logger.LogError($"Failed to GetAllMessages {e}");
        //        return null;
        //    }
        //}

        //public IEnumerable<User> GetAllUsers()
        //{    
        //    try
        //    {
        //        _logger.LogInformation("GetAllUsers was called");
        //        return _context.Users.ToList();
        //    }
        //    catch (Exception e)
        //    {
        //        _logger.LogError($"Failed to GetAllUsers {e}");
        //        return null;
        //    }
        //}

        //public Message GetMessageById(int id)
        //{
        //    try
        //    {
        //        _logger.LogInformation("GetMessageById was called");
        //        return _context.Messages.Find(id);
        //    }
        //    catch (Exception e)
        //    {
        //        _logger.LogError($"Failed to GetMessageById {e}");
        //        return null;
        //    }
        //}

        //public User GetUserById(int id)
        //{
        //    try
        //    {
        //        _logger.LogInformation("GetUserById was called");
        //        return _context.Users.Find(id);
        //    }
        //    catch (Exception e)
        //    {
        //        _logger.LogError($"Failed to GetUserById {e}");
        //        return null;
        //    }
        //}

        //public bool SaveAll()
        //{
        //    return _context.SaveChanges() > 0;
        //}
    }
}
