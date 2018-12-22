import React, { Component } from 'react'
import './aside.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ChatWebsocketService from '../../services/ChatWebsocketService';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Channels } from '../../App.context';

interface IAsideProps {

}


interface IAsideState {

}



export default class AsideComponent extends Component<IAsideProps, IAsideState> {

     static contextType = Channels;


     channelsElement() {


          let channels: Array<JSX.Element> = [];

          this.context.forEach(channel => {

               channels.push(
                    <li key={`channel__${channel.id}`} className="channels-area__channel">
                         <Link to={`/messages/${channel.id}`}><FontAwesomeIcon icon="globe" /> {channel.groupName}</Link>
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

          console.warn(this)

          return (
               <aside className="aside">

                    {this.channelsElement()}

               </aside>
          )

     }
}


