import { HubConnection, LogLevel, HubConnectionBuilder } from '@aspnet/signalr';

import { ChatMessage } from '../models/ChatMessage';
import { User } from '../models/User';
import { Message } from '../models/Message';

class ChatWebsocketService {

     public id: number;
     public groupName: string;
     public connection: HubConnection;


     constructor(id: number, groupName: string) {

          // console.log("%cChat service has been invoked.", "font-size: 1.3rem;color: gray;")

          this.groupName = groupName;
          this.id = id;

          const connection = new HubConnectionBuilder()
               .withUrl("/chatHub")
               .configureLogging(LogLevel.Information)
               .build()

          connection
               .start()
               .then(xx => {
                    console.log(`%cChat service: Połączenie z grupą ${groupName} zostało nawiazane`, "font-size: 1.1rem;color: green;")
               })
               .catch(xx => {
                    console.log(`%cChat service: Połączenie z grupą ${groupName} NIE zostało nawiazane`, "font-size: 1.1rem;color: red;")
               })

          this.connection = connection;
          console.log("Connection from service: ", connection)
          console.log(`Dołączanie do grupy: ${groupName}`)


          // this.connection
          //      .invoke('JoinGroup', "NAZWA GRUPY")
          //      .then(response => {
          //           console.log(`Dołączono do grupy: ${groupName}`)
          //           console.log(response)
          //      })
          //      .catch(err => console.error(err));



          // connection.on('sendToAll', (nick, receivedMessage) => {
          //      const text = `${nick}: ${receivedMessage}`;
          //      console.log(nick, receivedMessage)
          // });

     }



     disconnect() {
          console.log("%cChat service: Połączenie zostaje kończone...", "font-size: 1.1rem;color: red;")
          this.connection.stop();
     }



     send = (messageString: string) => {
          console.log("MESSAGE")
          console.log(messageString)


          let user = new User();

          user.isAdmin = false;
          user.isLogged = false;
          user.lazyLoader = false;
          user.messagesReceived = [];
          user.messagesSent = [];
          user.nickname = "lalalla";
          user.password = "lalala C:";
          user.userChannels = [];
          user.userId = 2;


          let message = new Message();
          message.content = "lalal";
          message.dateSend = new Date()
          message.messageId = 1
          // message.receiver = 1
          message.receiverID = 1
          // message.sender = 
          message.senderID = 2

          this.connection
               .invoke('SendGroupMessage', "xxx", message)
               .catch(err => console.error(err));

          // this.connection
          //      .invoke('SendGroupMessage', user, message)
          //      .catch(err => console.error(err));

          // this.setState({ message: '' });
     }

     // more methods here ...
}



export default ChatWebsocketService;