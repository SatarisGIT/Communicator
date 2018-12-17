using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace communicator.Models
{
    public class Message
    {
        public int MessageId { get; set; }
        public string Content { get; set; }
        public virtual User Sender { get; set; }
        public int SenderID { get; set; }
        public virtual User Receiver { get; set; }
        public int ReceiverID { get; set; }
        public bool IsRead { get; set; }
        public DateTime DateSend { get; set; }
    }
}
