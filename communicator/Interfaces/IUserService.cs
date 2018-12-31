using communicator.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace communicator.Interfaces
{
   public interface IUserService
   {
        Task<User> Authenticate(string username, string password);
        User AuthenticateToken(string token);
        IEnumerable<User> GetAllWithoutPasswords();
   }
}
