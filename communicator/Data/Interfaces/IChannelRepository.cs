using communicator.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace communicator.Data.Interfaces
{
    public interface IChannelRepository
    {
        Task<IEnumerable<Channel>> GetAllChannelsAsync();
    }
}
