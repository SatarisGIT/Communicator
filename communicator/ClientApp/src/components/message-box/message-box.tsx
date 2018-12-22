import React, { Component } from 'react'
import './message-box.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Channels } from '../../App.context';
import ChatWebsocketService from '../../services/ChatWebsocketService';

interface IMessageBoxProps {
     match: {
          isExact: boolean
          params: {
               groupId: number;
          }
          path: string;
          url: string;
     }
}


interface IMessageBoxState {

}


export default class MessageBoxComponent extends Component<IMessageBoxProps, IMessageBoxState> {

     static contextType = Channels;


     componentWillMount() {

          // console.error(this.context.get(this.props.match.params.groupName))

     }


     render() {

          let groupId = +this.props.match.params.groupId
          let currentWebsocket: ChatWebsocketService = this.context.get(groupId);


          if (!currentWebsocket) {
               return (
                    <section className="global-section">
                         <header className="global-section__header">

                              <div className="global-section__header-top">
                                   <FontAwesomeIcon icon={'comment'} /> Wiadomości
                              </div>

                              <div className="global-section__header-bottom">
                                   Wiadomości - błąd.
                              </div>

                         </header>


                         <div className="global-section__content">

                              Brak webSocketu o nazwie {this.props.match.params.groupId ? this.props.match.params.groupId : "..."}

                         </div>


                    </section>
               )
          }



          return (
               <section className="global-section">
                    <header className="global-section__header">

                         <div className="global-section__header-top">
                              <FontAwesomeIcon icon={'comment'} /> Wiadomości
                         </div>

                         <div className="global-section__header-bottom">
                              Wiadomości: {currentWebsocket.groupName}
                         </div>

                    </header>


                    <div className="global-section__content">

                         Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />Wiadomosci....<br />
 
                         <button onClick={() => {currentWebsocket.send("SEND! C:C :CC:C:")}}>xxxxxxxxxx</button>
                    </div>


               </section>
          )
     }
}
