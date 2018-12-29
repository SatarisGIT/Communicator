import React, { Component, FormEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './login.scss';
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
                         
                         <form onSubmit={this.onSubmit}>
                              Login:<br></br>
                              <input type="text" name="user" />
                              <br></br>
                              Hasło: <br></br>
                              <input type="password" name="password" />
                              <br></br>
                              <button className="button-submit">Zaloguj!</button>
                              
                         </form>
                    </div>

               </section>
          )
     }
}
