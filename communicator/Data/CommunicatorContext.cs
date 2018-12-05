using communicator.Models;
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
        
        public DbSet<User> Users { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<MessageInfo> MessageInfos { get; set; }
    }
}
