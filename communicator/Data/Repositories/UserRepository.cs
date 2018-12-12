using communicator.Data.Interfaces;
using communicator.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace communicator.Data
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        private readonly ILogger _logger;

        public UserRepository(CommunicatorContext context, ILogger<GenericRepository<User>> logger) : base(context, logger)
        {
            _logger = logger;
        }

        public async Task CreateUserAsync(User user)
        {
            try
            {
                Create(user);
                await SaveAsync();
            }
            catch (Exception e)
            {
                _logger.LogError($"Error in CreateUserAsync: {e}");
            }
        }

        public async Task DeleteUserAsync(User user)
        {
            try
            {
                Delete(user);
                await SaveAsync();
            }
            catch (Exception e)
            {
                _logger.LogError($"Error in DeleteUserAsync: {e}");
            }
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            try
            {
                var users = await GetAllAsync();
                return users;
            }
            catch (Exception e)
            {
                _logger.LogError($"Error in GetAllUsersAsync: {e}");
                return null;
            }
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            try
            {
                var user = await GetByConditionAsync(u => u.ID == id);
                return user.FirstOrDefault();
            }
            catch (Exception e)
            {
                _logger.LogError($"Error in GetUserByIdAsync: {e}");
                return null;
            }
        }

        public async Task UpdateUserAsync(User user)
        {
            try
            {
                Update(user);
                await SaveAsync();
            }
            catch (Exception e)
            {
                _logger.LogError($"Error in UpdateUserAsync: {e}");
            }
        }
    }
}
