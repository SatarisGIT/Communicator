using communicator.Data.Interfaces;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace communicator.Data.Repositories
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private CommunicatorContext _context;
        private IUserRepository _user;
        private IChannelRepository _channel;

        public IUserRepository User
        {
            get
            {
                if(_user == null)
                {
                    _user = new UserRepository(_context, null);
                }

                return _user;
            }
        }

        public IChannelRepository Channel
        {
            get
            {
                if (_channel == null)
                {
                    _channel = new ChannelRepository(_context, null);
                }

                return _channel;
            }
        }

        public RepositoryWrapper(CommunicatorContext context)
        {
            _context = context;
        }
    }
}
