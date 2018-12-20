import React, { Component } from 'react'
import './message-box.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IMessageBoxProps {
     match: {
          isExact: boolean
          params: {
               groupName: string;
          }
          path: string;
          url: string;
     }
}


interface IMessageBoxState {

}


export default class MessageBoxComponent extends Component<IMessageBoxProps, IMessageBoxState> {


     componentWillMount() {

          console.error(this.props.match.params.groupName)
          // console.error(this)
          // console.error(this)
          // console.error(this)
          // console.error(this)
          // console.error(this)
          // console.error(this)
          // console.error(this)
          // console.error(this)
          // this.props

          // this.props.match.params

     }


     render() {


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
