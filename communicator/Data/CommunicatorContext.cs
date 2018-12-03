using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace communicator.Data
{
    public class CommunicatorContext : DbContext
    {
        public CommunicatorContext(DbContextOptions<CommunicatorContext> options) : base(options)
        {
        }

        public CommunicatorContext()
        {

        }
        //Place for DbSets when the models are prepared
    }
}
