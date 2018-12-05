using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace communicator.Data.Interfaces
{
    public interface IRepositoryWrapper
    {
        IUserRepository User { get; }
    }
}
