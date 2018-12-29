using communicator.Controllers;
using communicator.Data.Interfaces;
using communicator.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace communicator.Tests
{
    public class UsersControllerTest
    {
        private UsersController _controller;
        private readonly IRepositoryWrapper _repository;
        private readonly ILogger<UsersController> _logger;

        public UsersControllerTest()
        {
            _controller = new UsersController(_repository, _logger);
        }

        [Fact]
        public void GetUsers_WhenCalled_ReturnsIEnumerableUsers()
        {
            //Act
            var okResult = _controller.GetUsers();

            //Assert
            var assert = Assert.IsAssignableFrom<IEnumerable<User>>(okResult.Result);
        }

        [Fact]
        public void GetUserById_WhenCalled_ReturnCorrectItem()
        {
            //Arrange
            var id = 1;

            //Act
            var okResult = _controller.GetUserById(id);

            //Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }
    }
}
