using communicator.Controllers;
using communicator.Data.Interfaces;
using communicator.Interfaces;
using communicator.Models;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace communicator.Tests
{
    public class UsersControllerTest
    {
        public UsersController _controller;
        public readonly IRepositoryWrapper _repository;
        public readonly ILogger<UsersController> _logger;
        public readonly IUserService _service;

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
                }
            };

            return users;
        }

        [Fact]
        public async Task GetUsers_RetriveListOfStudentsAsIEnumerable_ReturnsCorrectAmountOfUsers()
        {
            //Arrange
            var mockRepo = new Mock<IRepositoryWrapper>();
            mockRepo.Setup(repo => repo.User.GetAllUsersAsync())
                .ReturnsAsync(GetTestUsers());
            var controller = new UsersController(mockRepo.Object, _logger, _service);

            //Act
            var result = await controller.GetUsers();

            //Assert
            var model = Assert.IsAssignableFrom<IEnumerable<User>>(result);
            model.Count().Should().Be(2);
        }

        [Fact]
        public async Task CreateUser_AddNewUser_ReturnsOkStatus()
        {
            //Arrange
            var mockRepo = new Mock<IRepositoryWrapper>();
            mockRepo.Setup(repo => repo.User.GetAllUsersAsync())
                .ReturnsAsync(GetTestUsers());
            var controller = new UsersController(mockRepo.Object, _logger, _service);
            var newUser = new User
            {
                UserId = 3,
                IsAdmin = true,
                IsLogged = true,
                Password = "1230dsa",
                Nickname = "TestUser3"
            };

            //Act
            var result = await controller.CreateUser(newUser);

            //Assert
            var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
            var user = okResult.Value.Should().BeAssignableTo<User>().Subject;
            user.UserId.Should().Be(3);
        }

        [Fact]
        public async Task UpdateUser_PatchCurrentUserById_ReturnsOkStatus()
        {
            //Arrange
            var mockRepo = new Mock<IRepositoryWrapper>();
            mockRepo.Setup(repo => repo.User.GetAllUsersAsync())
                .ReturnsAsync(GetTestUsers());
            var controller = new UsersController(mockRepo.Object, _logger, _service);
            var newUser = new User
            {
                UserId = 3,
                IsAdmin = true,
                IsLogged = true,
                Password = "1230dsa",
                Nickname = "TestUser3"
            };

            //Act
            var result = await controller.UpdateUser(3);

            //Assert
            var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
            var codeStatus = okResult.Value.Should().BeAssignableTo<int>().Subject;
            codeStatus.Should().Be(200);
        }

        [Fact]
        public async Task DeleteUser_RemoveUser_UserShouldNotBeFound()
        {
            //Arrange
            var mockRepo = new Mock<IRepositoryWrapper>();
            mockRepo.Setup(repo => repo.User.GetAllUsersAsync())
                .ReturnsAsync(GetTestUsers());
            var controller = new UsersController(mockRepo.Object, _logger, _service);

            //Act
            var result = await controller.DeleteUser(2);

            //Assert
            var okResult = result.Should().BeOfType<NoContentResult>().Subject;         
            Assert.Throws<NullReferenceException>(() => _controller.GetUserById(2).Result);
        }
    }
}
