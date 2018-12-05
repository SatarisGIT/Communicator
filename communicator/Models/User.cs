﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace communicator.Models
{
    public class User
    {
        public int ID { get; set; }
        public string Nickname { get; set; }
        public string Password { get; set; }
        public virtual ICollection<Message> MessagesSent { get; set; }
        public virtual ICollection<Message> MessagesReceived { get; set; }
    }
}