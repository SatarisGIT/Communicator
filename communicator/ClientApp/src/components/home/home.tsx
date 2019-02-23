import React, { Component } from 'react'
import './home.scss'
import { ChatMessage } from '../../models/ChatMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class HomeComponent extends Component<any, any> {


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

                         <div>Autorstwa:</div>

                         <ul>
                              <li>Patryk Śliż</li>
                              <li>Filip Wilczura </li>
                              <li>Konrad Piech</li>
                         </ul>

                    </div>


               </section>
          )
     }
}
