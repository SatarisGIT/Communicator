import React, { Component } from 'react'
import './aside.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ChatWebsocketService from '../../services/ChatWebsocketService';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

interface IAsideProps {
     channels: Map<string, ChatWebsocketService>;
}


interface IAsideState {

}



export default class AsideComponent extends Component<IAsideProps, IAsideState> {



     channelsElement() {

          console.log(`\n\n\n\n`)
          console.log(this.props.channels)
          console.log(`\n\n\n\n`)

          let channels: Array<JSX.Element> = [];

          this.props.channels.forEach(channel => {

               channels.push(
                    <li className="channels-area__channel">
                         <Link to={`/messages/${channel.groupName}`}><FontAwesomeIcon icon="globe" /> {channel.groupName}</Link>
                    </li>
               )

          })


          return (
               <div className="channels-area">
                    <div className="channels-area__title">Kanaly publiczne</div>
                    <ul className="channels-area__channels-list">
                         {channels}
                    </ul>
               </div>
          )
     }


     render() {

          return (
               <aside className="aside">


                    {this.channelsElement()}


               </aside>
          )

          // return (
          //      <aside className="aside">

          //           <div className="channels-area">
          //                <div className="channels-area__title">Kanaly publiczne</div>
          //                <ul className="channels-area__channels-list">
          //                     <li className="channels-area__channel">
          //                          <FontAwesomeIcon icon="globe" /> Global channel 1
          //                     </li>
          //                     <li className="channels-area__channel">
          //                          <FontAwesomeIcon icon="globe" /> Global channel 2
          //                     </li>
          //                     <li className="channels-area__channel">
          //                          <FontAwesomeIcon icon="globe" /> Global channel 3
          //                     </li>
          //                </ul>
          //           </div>

          //           <div className="channels-area">
          //                <div className="channels-area__title">Kanaly prywatne</div>
          //                <ul className="channels-area__channels-list">
          //                     <li className="channels-area__channel">
          //                          <FontAwesomeIcon icon="globe" /> Prv channel 1
          //                     </li>
          //                     <li className="channels-area__channel">
          //                          <FontAwesomeIcon icon="globe" /> Prv channel 2
          //                     </li>
          //                     <li className="channels-area__channel">
          //                          <FontAwesomeIcon icon="globe" /> Prv channel 3
          //                     </li>
          //                </ul>
          //           </div>

          //           <div className="channels-area">
          //                <div className="channels-area__title">Wiadomosci bezposrednie</div>
          //                <ul className="channels-area__channels-list">
          //                     <li className="channels-area__channel">
          //                          <FontAwesomeIcon icon="user" /> User 1
          //                     </li>
          //                     <li className="channels-area__channel">
          //                          <FontAwesomeIcon icon="user" /> User 2
          //                     </li>
          //                     <li className="channels-area__channel">
          //                          <FontAwesomeIcon icon="user" /> User 3
          //                     </li>
          //                </ul>
          //           </div>

          //      </aside>
          // )
     }
}


