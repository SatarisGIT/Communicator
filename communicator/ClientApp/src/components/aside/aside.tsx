import React, { Component } from 'react'
import './aside.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class AsideComponent extends Component {
     render() {
          return (
               <aside className="aside">

                    <div className="channels-area">
                         <div className="channels-area__title">Kanaly publiczne</div>
                         <ul className="channels-area__channels-list">
                              <li className="channels-area__channel">
                                   <FontAwesomeIcon icon="globe" /> Global channel 1
                              </li>
                              <li className="channels-area__channel">
                                   <FontAwesomeIcon icon="globe" /> Global channel 2
                              </li>
                              <li className="channels-area__channel">
                                   <FontAwesomeIcon icon="globe" /> Global channel 3
                              </li>
                         </ul>
                    </div>

                    <div className="channels-area">
                         <div className="channels-area__title">Kanaly prywatne</div>
                         <ul className="channels-area__channels-list">
                              <li className="channels-area__channel">
                                   <FontAwesomeIcon icon="globe" /> Prv channel 1
                              </li>
                              <li className="channels-area__channel">
                                   <FontAwesomeIcon icon="globe" /> Prv channel 2
                              </li>
                              <li className="channels-area__channel">
                                   <FontAwesomeIcon icon="globe" /> Prv channel 3
                              </li>
                         </ul>
                    </div>

                    <div className="channels-area">
                         <div className="channels-area__title">Wiadomosci bezposrednie</div>
                         <ul className="channels-area__channels-list">
                              <li className="channels-area__channel">
                                   <FontAwesomeIcon icon="user" /> User 1
                              </li>
                              <li className="channels-area__channel">
                                   <FontAwesomeIcon icon="user" /> User 2
                              </li>
                              <li className="channels-area__channel">
                                   <FontAwesomeIcon icon="user" /> User 3
                              </li>
                         </ul>
                    </div>

               </aside>
          )
     }
}


