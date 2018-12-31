using communicator.Data.Interfaces;
using communicator.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace communicator.Data.Repositories
{
    public class ChannelRepository : GenericRepository<Channel>, IChannelRepository
    {
        private readonly ILogger _logger;

        public ChannelRepository(CommunicatorContext context, ILogger<GenericRepository<Channel>> logger) : base(context, logger)
        {
            _logger = logger;
        }

        public async Task<IEnumerable<Channel>> GetAllChannelsAsync()
        {
            try
            {
                var channels = await GetAllAsync();
                return channels;
            }
            catch (Exception e)
            {
                _logger.LogError($"Error in GetAllChannelsAsync: {e}");
                return null;
            }
        }
    }
}
