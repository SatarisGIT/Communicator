using communicator.Controllers;
using communicator.Data.Interfaces;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;

namespace communicator.Tests
{
    public class UsersControllerTest
    {
        private UsersController _controller;
        private IRepositoryWrapper _repository;
        private ILogger<UsersController> _logger;

        public UsersControllerTest()
        {
            _controller = new UsersController(_repository, _logger);
        }

        public void GetUsers_WhenCalled_ReturnsIEnumerableUsers()
        {
            //Act
            var okResult = _controller.GetUsers();
        }
    }
}
