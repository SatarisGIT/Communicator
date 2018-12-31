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

import { withRouter } from 'react-router-dom'

interface ControllerAddUserForm extends EventTarget {
     name: HTMLInputElement,
     password: HTMLInputElement,
     admin: HTMLInputElement,
}



interface IAddUserProps {
     loading: boolean
     history: any
}

interface IAddUserState { }


export default class AddUserComponent extends Component<IAddUserProps, IAddUserState> {


     state = {
          loading: false
     };

     subscriptions$: Subscription = new Subscription();


     componentWillUnmount() {
          this.subscriptions$.unsubscribe();
     }


     handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          let form = (e.target as ControllerAddUserForm);
          let toSend = new User();

          toSend.nickname = form.name.value;
          toSend.password = form.password.value;
          toSend.isAdmin = !!form.admin.checked;

          console.warn("Submited...", toSend);


          this.setState({ loading: true });
          this.subscriptions$.add(
               HttpApi.post('/api/Users', toSend)
                    .subscribe(
                         (data: User) => {
                              console.log('[user added] => ', data)

                              this.setState({ loading: false });

                              this.props.history.push('../')

                         },

                         (err: any) => {
                              console.error(err);
                              this.setState({ loading: false });
                         }
                    )
          )


     }


     render() {

          // if (this.state.toAdmPanel === true) {
          //      return <Redirect to='/admin/add' />
          // }

          return (
               <div className="global-section__content">

                    <Link to="../" className="admin-panel-component__add-user-button">
                         <button
                              className="global-button global-button--orange global-button--lg">
                              Wróć
                         </button>
                    </Link>


                    {this.state.loading ? <LoadingComponent fly={true} /> : null}


                    <form onSubmit={this.handleSubmit} className="global-form add-user-form">

                         <label className="global-label">
                              <div>Nick</div>
                              <input className="global-input" name="name" required />
                         </label>

                         <label className="global-label">
                              <div>Hasło</div>
                              <input className="global-input" name="password" required />
                         </label>

                         <label className="global-label">
                              <div>Administrator</div>
                              <input className="global-input" name="admin" type="checkbox" />
                         </label>

                         <button className="global-button global-button--green global-button--lg">Utwórz</button>

                    </form>

               </div>
          )
     }
}
