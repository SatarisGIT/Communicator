import React, { Component, FormEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class LoginComponent extends Component {


     onSubmit = (e: FormEvent) => {

          e.preventDefault();

          console.log("Submited.")
     }


     render() {
          return (
               <section className="global-section">
                    <header className="global-section__header">

                         <div className="global-section__header-top">
                              <FontAwesomeIcon icon={'comment'} /> Login
                         </div>

                         <div className="global-section__header-bottom">
                              Formularz logowania
                         </div>

                    </header>

                    <div className="global-section__content">
                         Login form
                         <form onSubmit={this.onSubmit}>

                              <input type="text" name="user" />
                              <input type="text" name="password" />

                              <button>Zaloguj!</button>
                         </form>
                    </div>

               </section>
          )
     }
}
