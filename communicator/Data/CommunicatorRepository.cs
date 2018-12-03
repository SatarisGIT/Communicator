using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace communicator.Data
{
    public class CommunicatorRepository : ICommunicatorRepository
    {
        private readonly CommunicatorContext _context;
        private readonly ILogger<CommunicatorRepository> _logger;

        public CommunicatorRepository(CommunicatorContext context, ILogger<CommunicatorRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public bool SaveAll()
        {
            return _context.SaveChanges() > 0;
        }
    }
}
