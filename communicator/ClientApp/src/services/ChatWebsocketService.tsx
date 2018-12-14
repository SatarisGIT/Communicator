import { HubConnection, LogLevel, HubConnectionBuilder } from '@aspnet/signalr';

import { ChatMessage } from '../models/ChatMessage';

class ChatWebsocketService {

     public connection: HubConnection;

     constructor() {

          console.log("%cChat service has been invoked.", "font-size: 1.3rem;color: gray;")

          const connection = new HubConnectionBuilder()
               .withUrl("/chatHub")
               .configureLogging(LogLevel.Information)
               .build();

          this.connection = connection;

          console.log("Connection from service: ", connection)
     }

     start() {
          // start connection
          console.log("%cChat service: Połączenie zostaje nawiązywane...", "font-size: 1.1rem;color: green;")
          this.connection.start().catch(err => console.error(err, 'red'));

     }

     stop() {
          console.log("%cChat service: Połączenie zostaje kończone...", "font-size: 1.1rem;color: red;")
          this.connection.stop();
     }

     // more methods here ...
}

const WebsocketService = new ChatWebsocketService();

export default WebsocketService;