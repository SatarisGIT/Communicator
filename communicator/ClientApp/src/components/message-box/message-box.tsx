import React, { Component } from 'react'
import './message-box.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ChatWebsocketService from '../../services/ChatWebsocketService'

export default class MessageBoxComponent extends Component {

     ChatWebsocketService = new ChatWebsocketService("NAZWA GRUPY");

     
     // componentWillMount() {
     //      
     // }


     componentWillUnmount() {
          this.ChatWebsocketService.disconnect();
     }

     sendMsg() {
          console.log("WYSYLAM WIADOMOSC")

          this.ChatWebsocketService.send("TEST MSG");
     }

     
     
     render() {

          console.log(this.ChatWebsocketService.connection)

          return (
               <section className="global-section">
                    <header className="global-section__header">

                         <div className="global-section__header-top">
                              <FontAwesomeIcon icon={'comment'} /> Wiadomości
                         </div>

                         <div className="global-section__header-bottom">
                              Wiadomości (user / channel)
                         </div>

                    </header>


                    <div className="global-section__content">

                    <button onClick={this.sendMsg}>SEND!</button>


                         Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />
                         Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />
                         Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />
                         Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />
                         Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />
                         Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />
                         Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />
                         Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />
                         Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />
                         Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />
                    </div>


               </section>
          )
     }
}
