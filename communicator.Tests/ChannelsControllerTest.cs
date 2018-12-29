using communicator.Controllers;
using communicator.Data.Interfaces;
using communicator.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace communicator.Tests
{
    public class ChannelsControllerTest
    {
        private ChannelsController _controller;
        private readonly IRepositoryWrapper _repository;
        private readonly ILogger<ChannelsController> _logger;

        public ChannelsControllerTest()
        {
            _controller = new ChannelsController(_repository, _logger);
        }

        [Fact]
        public void GetChannels_WhenCalled_ReturnCollection()
        {
            var okResult = _controller.GetChannels();

            var assert = Assert.IsAssignableFrom<IEnumerable<Channel>>(okResult.Result);
        }
    }
}
