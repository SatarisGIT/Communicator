import React, { Component } from 'react'
import HttpApi from '../../../assets/lib/httpapi';
import { Subscription } from 'rxjs';
import { User } from '../../../models/User';
import toastr from 'toastr';
import './add-user.scss';
import LoadingComponent from '../../loading/loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'react-modal';
import { BrowserRouter, Route, Link } from "react-router-dom";


interface IAddUserProps {}


interface IAddUserState {}


export default class AddUserComponent extends Component<IAddUserProps, IAddUserState> {

     subscriptions$: Subscription;

     constructor(props: any) {
          super(props);

          this.state = {};

          this.subscriptions$ = new Subscription();


     }


     componentWillUnmount() {
          this.subscriptions$.unsubscribe();
     }



     render() {


          return (
               <div className="global-section__content">
                    {/* <button className="global-button global-button--green global-button--lg admin-panel-component__add-user-button" onClick={this.handleDeleteSubmit}>Dodaj nowego użytkownika</button> */}


                    <Link to="../" className="admin-panel-component__add-user-button">
                         <button
                              className="global-button global-button--orange global-button--lg">
                              Wróć
                         </button>
                    </Link>

                    ADD USER FORM.

               </div>
          )
     }
}
