using communicator.Data.Interfaces;
using communicator.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace communicator.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChannelsController : ControllerBase
    {
        private IRepositoryWrapper _repository;
        private ILogger<ChannelsController> _logger;

        public ChannelsController(IRepositoryWrapper repository, ILogger<ChannelsController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<Channel>> GetChannels()
        {
            try
            {
                var channels = await _repository.Channel.GetAllChannelsAsync();
                return channels;
            }
            catch (Exception e)
            {
                _logger.LogError($"Error in GetUsers: {e}");
                return null;
            }
        }
    }
}
