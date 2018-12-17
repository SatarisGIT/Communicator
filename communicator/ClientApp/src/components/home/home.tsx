import React, { Component } from 'react'
import './home.scss'
import { ChatMessage } from '../../models/ChatMessage';
import ChatWebsocketService from '../../services/ChatWebsocketService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class HomeComponent extends Component {

     componentWillMount() {
          ChatWebsocketService.start();
     }


     componentWillUnmount() {
          ChatWebsocketService.stop();
     }


     render() {

          return (
               <section className="global-section">
                         <header className="global-section__header">

                              <div className="global-section__header-top">
                                   <FontAwesomeIcon icon={'comment'} /> Strona główna
                              </div>

                              <div className="global-section__header-bottom">
                                   WSEI - Communicator
                              </div>

                         </header>

                    <div className="global-section__content">
                         Home page - zawarty zostanie tutaj opis aplikacji
                         Tutaj też można testować komunikacje - ChatMessage
                    </div>


               </section>
          )
     }
}
