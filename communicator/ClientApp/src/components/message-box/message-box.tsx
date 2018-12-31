import React, { Component } from 'react'
import './message-box.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ChatWebsocketService from '../../services/ChatWebsocketService';
import { Message } from '../../models/Message';
import moment from 'moment';
import 'moment/locale/pl';
import { Channels, LoggedUser } from '../../App.context';
import { User } from '../../models/User';


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
     messageToSend: string;
}


export default class MessageBoxComponent extends Component<IMessageBoxProps, IMessageBoxState> {

     static contextType = Channels;

     currentWebsocket: ChatWebsocketService = this.context.get(+this.props.match.params.groupId);


     state = {
          messageToSend: ""
     }


     componentDidUpdate() {

          if (!this.currentWebsocket || (this.currentWebsocket && this.currentWebsocket.id !== +this.props.match.params.groupId) || !this.currentWebsocket.onMessage) {
               this.currentWebsocket = this.context.get(+this.props.match.params.groupId);

               if (this.currentWebsocket) {
                    this.currentWebsocket.onMessage = this.onMessage
                    this.forceUpdate();
               }

          }

     }


     componentWillUnmount() {
          this.currentWebsocket.onMessage = null;
     }


     onMessage = (message: Message) => {
          console.log(`Wiadomość w message boxie!: `, message)
          window.scrollTo(0, 999999999999999999999);
          this.forceUpdate();
     }


     handleSubmit = (e: Event | any, user: User) => {
          e.preventDefault();
          this.currentWebsocket.send(e.target.message.value, user);
          this.setState({ messageToSend: '' })
     }


     render() {

          if (!this.currentWebsocket) {
               return (
                    <section className="global-section MessageBoxComponent">
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


          let messages = this.currentWebsocket.messages.map((message: Message, index) => {

               let sender = "anon.";
               if (message && message.sender && message.sender.nickname) {
                    sender = message.sender.nickname;
               }


               return (
                    <div key={`message${index}`}>
                         <div className="message--data">Wysłano:{moment(message.dateSend).format("DD.MM.YYYY HH:mm:ss")}</div>
                         <div className="message" >

                              {message.content}

                         </div>
                         <div className="message--sender">{sender}</div>
                    </div>
               )
          })

          return (
               <section className="global-section MessageBoxComponent">
                    <header className="global-section__header">

                         <div className="global-section__header-top">
                              <FontAwesomeIcon icon={'comment'} /> Wiadomości
                         </div>

                         <div className="global-section__header-bottom">
                              Wiadomości: {this.currentWebsocket.groupName}
                         </div>

                    </header>


                    <div className="global-section__content messages-content">

                         {messages}

                         <LoggedUser.Consumer>

                              {(LoggedUser) => {

                                   let user = LoggedUser.user
                                   console.log("LOGGED???")
                                   console.log(user)

                                   return <form onSubmit={(e) => {
                                        this.handleSubmit(e, user)
                                   }} className="message-form">

                                        <textarea name="message" className="global-input message-form__input" value={this.state.messageToSend} onChange={
                                             (e) => {
                                                  this.setState({ messageToSend: e.target.value })
                                             }}
                                        />

                                        <button className="global-button global-button--blue global-button--lg">
                                             Wyślij
                         </button>
                                   </form>
                              }}

                         </LoggedUser.Consumer>



                    </div>


               </section>
          )
     }
}
