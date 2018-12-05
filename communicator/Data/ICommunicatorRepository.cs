using communicator.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace communicator.Data
{
    public interface ICommunicatorRepository
    {
        bool SaveAll();
        void AddEntity(object model);

        IEnumerable<User> GetAllUsers();
        IEnumerable<Message> GetAllMessages();

        User GetUserById(int id);
        Message GetMessageById(int id);
    }
}
