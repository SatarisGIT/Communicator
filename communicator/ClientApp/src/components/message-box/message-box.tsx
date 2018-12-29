import React, { Component } from 'react'
import './message-box.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Channels } from '../../App.context';
import ChatWebsocketService from '../../services/ChatWebsocketService';
import { Message } from '../../models/Message';
import moment from 'moment';
import 'moment/locale/pl';


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

          console.warn("will udpate>?>>>?/")

          if (!this.currentWebsocket || (this.currentWebsocket && this.currentWebsocket.id !== +this.props.match.params.groupId)) {
               this.currentWebsocket = this.context.get(+this.props.match.params.groupId);
               this.currentWebsocket.onMessage = this.onMessage
               this.forceUpdate();
          } 

          // else 
          // {
          //      console.log(this.currentWebsocket)
          // }

     }


     onMessage = (message: Message) => {
          console.log(`Wiadomość w message boxie!: `, message)
          this.forceUpdate();
     }


     handleSubmit = (e: Event | any) => {
          e.preventDefault();
          this.currentWebsocket.send(e.target.message.value);
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

               let sender = message.sender.nickname ? message.sender.nickname : "anon.";

               return (
                    <div>
                    <div className="message--data">Wysłano:{moment(message.dateSend).format("DD.MM.YYYY HH:mm:ss")}</div>
                    <div className="message" key={`message${index}`}>

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


                    <div className="global-section__content">

                         {messages}

                         <form onSubmit={this.handleSubmit} className="message-form">

                              <textarea name="message" className="global-input message-form__input" value={this.state.messageToSend} onChange={ 
                                   (e) => {
                                        this.setState({messageToSend: e.target.value})
                                   }} 
                              />
 
                              <button className="global-button global-button--blue global-button--lg">
                                   Wyślij
                              </button>
                         </form>




                    </div>


               </section>
          )
     }
}
