import { HubConnection, LogLevel, HubConnectionBuilder } from '@aspnet/signalr';

import { ChatMessage } from '../models/ChatMessage';
import { User } from '../models/User';
import { Message } from '../models/Message';

class ChatWebsocketService {

     public id: number;
     public groupName: string;
     public connection: HubConnection;
     public messages: Message[];

     constructor(id: number, groupName: string) {

          // console.log("%cChat service has been invoked.", "font-size: 1.3rem;color: gray;")

          this.groupName = groupName;
          this.id = id;
          this.messages = [];

          const connection = new HubConnectionBuilder()
               .withUrl("/chatHub")
               // .configureLogging(LogLevel.Information)
               .build()

          connection
               .start()
                    .then(xx => {
                         // console.log(`%cChat service: Połączenie z grupą ${groupName} zostało nawiazane`, "font-size: 1.1rem;color: green;")

                              this.connection
                                   .invoke('JoinGroup', groupName)
                                   .then(response => {
                                        // console.log(`Dołączono do grupy: ${groupName}`)
                                        // console.log(response)
                                   })
                                   .catch(err => console.error(err));

                    })
                    .catch(xx => {
                         console.log(`%cChat service: Połączenie z grupą ${groupName} NIE zostało nawiazane`, "font-size: 1.1rem;color: red;")
                    })

          this.connection = connection;


          this.connection.on('ReceiveMessage', (message: Message) => {
               this.messages.push(message);
               console.log(`Wiadomość do ${this.id}/${this.groupName}`, message)

               if(this.onMessage) {
                    this.onMessage(message);
               }
          })

          // connection.on('sendToAll', (nick, receivedMessage) => {
          //      const text = `${nick}: ${receivedMessage}`;
          //      console.log(nick, receivedMessage)
          // });

     }


     disconnect() {
          console.log("%cChat service: Połączenie zostaje kończone...", "font-size: 1.1rem;color: red;")
          this.connection.stop();
     }


     onMessage: Function | null = (message: Message) => {}


     send = (messageString: string, user: User) => {
          console.log(`Message sent: `, messageString)

          // let user = new User();
          //      user.nickname = "NickName!";
          //      // user.isAdmin = false;
          //      // user.isLogged = false;
          //      // user.lazyLoader = false;
          //      // user.messagesReceived = [];
          //      // user.messagesSent = [];
          //      // user.password = "";
          //      // user.userChannels = [];
          //      // user.userId = 2;


          let message = new Message();
               message.content = messageString;
               message.dateSend = new Date()
               message.messageId = 1
               // message.receiver = 1
               message.receiverID = 1
               message.sender = user ? user : null
               message.senderID = 2

          this.connection
               .invoke('SendGroupMessage', this.groupName, message)
               .catch(err => console.error(err));

          // this.connection
          //      .invoke('SendGroupMessage', user, message)
          //      .catch(err => console.error(err));

          // this.setState({ message: '' });
     }

     // more methods here ...
}



export default ChatWebsocketService;