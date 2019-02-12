using communicator.Controllers;
using communicator.Data.Interfaces;
using communicator.Interfaces;
using communicator.Models;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
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

        [Fact]
        public async Task GetUsers_WhenCalled_ReturnsCorrectAmountOfUsers()
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
            model.Count().Should().Be(3);
        }

        [Fact]
        public async Task GetUsers_WhenCalled_HandlesException()
        {
            //Arrange
            var mockRepo = new Mock<IRepositoryWrapper>();
            var mockLogger = new Mock<ILogger<UsersController>>();
            mockRepo
                .Setup(repo => repo.User.GetAllUsersAsync())
                .ThrowsAsync(new InvalidOperationException());

            var controller = new UsersController(mockRepo.Object, mockLogger.Object, _service);

            //Act
            var result = await controller.GetUsers();

            //Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task GetUserById_WhenCalled_ReturnsOk()
        {
            //Arrange   
            var mockRepo = new Mock<IRepositoryWrapper>();
            mockRepo.Setup(repo => repo.User.GetAllUsersAsync())
                .ReturnsAsync(GetTestUsers());
            var controller = new UsersController(mockRepo.Object, _logger, _service);
            var id = 1;
            //Act
            var result = await controller.GetUserById(id);

            //Assert
            var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
        }

        [Fact]
        public async Task GetuserById_WhenCalled_HandlesException()
        {
            //Arrange
            var mockRepo = new Mock<IRepositoryWrapper>();
            var mockLogger = new Mock<ILogger<UsersController>>();
            mockRepo
                .Setup(repo => repo.User.GetUserByIdAsync(1))
                .ThrowsAsync(new InvalidOperationException());

            var controller = new UsersController(mockRepo.Object, mockLogger.Object, _service);

            //Act
            var result = await controller.GetUserById(1);

            //Assert
            var okResult = result.Should().BeOfType<NotFoundResult>();
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
        public async Task CreateUser_WhenCalled_HandlesException()
        {
            //Arrange
            var mockRepo = new Mock<IRepositoryWrapper>();
            var newUser = new User
            {
                UserId = 3,
                IsAdmin = true,
                IsLogged = true,
                Password = "1230dsa",
                Nickname = "TestUser3"
            };

            var mockLogger = new Mock<ILogger<UsersController>>();
            mockRepo
                .Setup(repo => repo.User.CreateUserAsync(newUser))
                .ThrowsAsync(new InvalidOperationException());

            var controller = new UsersController(mockRepo.Object, mockLogger.Object, _service);

            //Act
            var result = await controller.CreateUser(newUser);

            //Assert
            var okResult = result.Should().BeOfType<StatusCodeResult>();
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
        public async Task UpdateUser_WhenCalled_HandlesException()
        {
            //Arrange
            var mockRepo = new Mock<IRepositoryWrapper>();
            var newUser = new User
            {
                UserId = 3,
                IsAdmin = true,
                IsLogged = true,
                Password = "1230dsa",
                Nickname = "TestUser3"
            };

            var mockLogger = new Mock<ILogger<UsersController>>();
            mockRepo
                .Setup(repo => repo.User.GetUserByIdAsync(3))
                .ThrowsAsync(new InvalidOperationException());

            var controller = new UsersController(mockRepo.Object, mockLogger.Object, _service);

            //Act
            var result = await controller.UpdateUser(3);

            //Assert
            var okResult = result.Should().BeOfType<StatusCodeResult>();
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

        [Fact]
        public async Task DeleteUser_WhenCalled_HandlesException()
        {
            //Arrange
            var mockRepo = new Mock<IRepositoryWrapper>();

            var mockLogger = new Mock<ILogger<UsersController>>();
            mockRepo
                .Setup(repo => repo.User.GetUserByIdAsync(2))
                .ThrowsAsync(new InvalidOperationException());

            var controller = new UsersController(mockRepo.Object, mockLogger.Object, _service);

            //Act
            var result = await controller.DeleteUser(2);

            //Assert
            var okResult = result.Should().BeOfType<StatusCodeResult>();
        }

        [Fact]
        public void AuthenticateToken_WhenCalled_ReturnsBadRequest()
        {
            //Arrange
            var mockService = new Mock<IUserService>();
            var user = new User()
            {
                UserId = 4,
                IsAdmin = true,
                Token = "12983912803981",
                IsLogged = true,
                MessagesSent = null,
                MessagesReceived = null,
                Nickname = "test3",
                Password = "Str0ngP@ssword123",
                UserChannels = null
            };
            
            var controller = new UsersController(_repository, _logger, mockService.Object);
            
            //Act
            var result = controller.AuthenticateToken(user);

            //Assert
            var okResult = result.Should().BeOfType<BadRequestObjectResult>();         
        }

        [Fact]
        public void AuthenticateToken_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var mockService = new Mock<IUserService>();
            var user = new User()
            {
                UserId = 4,
                IsAdmin = true,
                Token = "12983912803981",
                IsLogged = true,
                MessagesSent = null,
                MessagesReceived = null,
                Nickname = "test3",
                Password = "Str0ngP@ssword123",
                UserChannels = null
            };

            mockService.Setup(x => x.AuthenticateToken("12983912803981")).Returns(user);


            var controller = new UsersController(_repository, _logger, mockService.Object);

            //Act
            var result = controller.AuthenticateToken(user);

            //Assert
            var okResult = result.Should().BeOfType<OkObjectResult>();
        }

        [Fact]
        public void Authenticate_WhenCalled_ReturnsBadRequest()
        {
            //Arrange
            var mockService = new Mock<IUserService>();
            var user = new User()
            {
                UserId = 4,
                IsAdmin = true,
                Token = "12983912803981",
                IsLogged = true,
                MessagesSent = null,
                MessagesReceived = null,
                Nickname = "test3",
                Password = "Str0ngP@ssword123",
                UserChannels = null
            };

            var controller = new UsersController(_repository, _logger, mockService.Object);

            //Act
            var result = controller.Authenticate(user);

            //Assert
            var okResult = result.Should().BeOfType<BadRequestObjectResult>();
        }

        [Fact]
        public void Authenticate_WhenCalled_ReturnsOk()
        {
            //Arrange
            var mockService = new Mock<IUserService>();
            var user = new User()
            {
                UserId = 4,
                IsAdmin = true,
                Token = "12983912803981",
                IsLogged = true,
                MessagesSent = null,
                MessagesReceived = null,
                Nickname = "test3",
                Password = "Str0ngP@ssword123",
                UserChannels = null
            };

            mockService.Setup(x => x.Authenticate("test3", "Str0ngP@ssword123")).ReturnsAsync(user);

            var controller = new UsersController(_repository, _logger, mockService.Object);

            //Act
            var result = controller.Authenticate(user);

            //Assert
            var okResult = result.Should().BeOfType<OkObjectResult>();
        }

        [Fact]
        public void GetAllWithoutPasswords_WhenCalled_ReturnsOk()
        {
            //Arrange
            var mockService = new Mock<IUserService>();
            var mockRepo = new Mock<IRepositoryWrapper>();
            mockRepo.Setup(repo => repo.User.GetAllUsersAsync())
                .ReturnsAsync(GetTestUsers());
            var controller = new UsersController(mockRepo.Object, _logger, mockService.Object);

            //Act
            var result = controller.GetAllWithoutPasswords();

            var okResult = result.Should().BeOfType<OkObjectResult>();
        }
    }
}
