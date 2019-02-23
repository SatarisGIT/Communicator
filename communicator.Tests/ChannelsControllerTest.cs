using communicator.Controllers;
using communicator.Data.Interfaces;
using communicator.Models;
using FluentAssertions;
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
    public class ChannelsControllerTest
    {
        public ChannelsController _controller;
        public readonly IRepositoryWrapper _repository;
        public readonly ILogger<ChannelsController> _logger;

        private IEnumerable<Channel> GetTestChannels()
        {
            var channels = new List<Channel>
            {
                new Channel()
                {
                    ChannelId = 1,
                    Name = "Channel1",
                    UserChannels = null
                },
                new Channel()
                {
                    ChannelId = 2,
                    Name = "Channel2",
                    UserChannels = null
                },
                new Channel()
                {
                    ChannelId = 3,
                    Name = "Channel3",
                    UserChannels = null
                }
            };

            return channels;
        }

        [Fact]
        public async Task GetChannels_WhenCalled_ReturnsCorrectAmountOfChannels()
        {
            //Arrange
            var mockRepo = new Mock<IRepositoryWrapper>();
            mockRepo.Setup(repo => repo.Channel.GetAllChannelsAsync())
                .ReturnsAsync(GetTestChannels());
            var controller = new ChannelsController(mockRepo.Object, _logger);

            //Act
            var result = await controller.GetChannels();

            //Assert
            var model = Assert.IsAssignableFrom<IEnumerable<Channel>>(result);
            model.Count().Should().Be(3);
        }

        [Fact]
        public async Task GetChannels_WhenCalled_HandlesException()
        {
            //Arrange
            var mockRepo = new Mock<IRepositoryWrapper>();
            var mockLogger = new Mock<ILogger<ChannelsController>>();
            mockRepo
                .Setup(repo => repo.Channel.GetAllChannelsAsync())
                .ThrowsAsync(new InvalidOperationException());

            var controller = new ChannelsController(mockRepo.Object, mockLogger.Object);

            //Act
            var result = await controller.GetChannels();

            //Assert
            Assert.Null(result);
        }
    }
}
