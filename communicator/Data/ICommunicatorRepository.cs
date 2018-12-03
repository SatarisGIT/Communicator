using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace communicator.Data
{
    public interface ICommunicatorRepository
    {
        bool SaveAll();
    }
}
