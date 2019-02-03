using communicator.Data;
using communicator.Data.Interfaces;
using communicator.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace communicator.Tests
{
    public class UserRepositoryTest
    {
        private IEnumerable<User> GetTestUsers()
        {
            var users = new List<User>
            {
                new User()
                {
                    UserId = 1,
                    IsAdmin = true,
                    IsLogged = true,
                    MessagesReceived = null,
                    MessagesSent = null,
                    Nickname = "TestUser1",
                    Password = "V3ryStr0ngP@ssword123",
                    Token = "8281jkzlkak7219j!321",
                    UserChannels = null
                },
                new User()
                {
                    UserId = 2,
                    IsAdmin = false,
                    IsLogged = false,
                    MessagesReceived = null,
                    MessagesSent = null,
                    Nickname = "TestUser2",
                    Password = "VeryWeakPassword1",
                    Token = "81293809dkl;ask;eq0e",
                    UserChannels = null
                },
                new User()
                {
                    UserId = 3,
                    IsAdmin = false,
                    IsLogged = false,
                    Password = null
                }
            };

            return users;
        }
        

        public async Task CreateUserAsync_WhenCalled_CreatesUser()
        {

        }
    }
}
