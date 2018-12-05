using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace communicator.Models
{
    public class MessageInfo
    {
        public int ID { get; set; }

        [Key]
        [ForeignKey("User")]
        public int SenderID { get; set; }

        [Key]
        [ForeignKey("User")]
        public int ReceiverID { get; set; }

        [Key]
        [ForeignKey("Message")]
        public int MessageID { get; set; }

        public bool IsRead { get; set; }

        public DateTime DateSend { get; set; }


    }
}
