import React, { Component } from 'react'
import HttpApi from '../../../assets/lib/httpapi';
import { Subscription } from 'rxjs';
import { User } from '../../../models/User';
import toastr from 'toastr';
import './users-table.scss';
import LoadingComponent from '../../loading/loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'react-modal';
import { BrowserRouter, Route, Link } from "react-router-dom";


interface IUserTableProps { }


interface IUserTableState {
     users: User[];
     modalIsOpen: boolean;
     loading: {
          global: boolean;
     };
     deletingUserId: number | null;
}


export default class UserTableComponent extends Component<IUserTableProps, IUserTableState> {

     subscriptions$: Subscription = new Subscription();

     constructor(props) {
          super(props)

          this.state = {
               users: [],
               modalIsOpen: false,
               loading: {
                    global: true
               },
               deletingUserId: null
          };
     }




     componentWillMount() {
          this.getData();
     }


     getData() {

          let loading = this.state.loading;
          loading.global = true;
          this.setState({ loading: loading });

          this.subscriptions$.add(
               HttpApi.get('/api/Users')
                    .subscribe(
                         (data: User[]) => {
                              let loading = this.state.loading;
                              loading.global = false;
                              this.setState({ users: data, loading: loading });
                         },

                         (err: any) => {
                              console.error(err);
                              let loading = this.state.loading;
                              loading.global = false;
                              this.setState({ loading: loading });
                         }
                    )
          )
     }

     componentWillUnmount() {
          this.subscriptions$.unsubscribe();
     }


     handleDelete = (e: any | MouseEvent, userId: number) => {
          this.setState({ modalIsOpen: true, deletingUserId: userId });
     }


     handleDeleteSubmit = (e: any | MouseEvent) => {

          let loading = this.state.loading;
          loading.global = true;
          this.setState({ loading: loading });

          this.subscriptions$.add(
               HttpApi.delete(`/api/Users/${this.state.deletingUserId}`)
                    .subscribe(
                         (data: User) => {
                              let loading = this.state.loading;
                              loading.global = false;

                              this.setState({ loading: loading });
                              toastr.success(`Użytkownik ${data.nickname} został usunięty`, "Usuwanie");

                              this.getData();
                              this.closeModal();
                         },

                         (err: any) => {
                              console.error(err);
                              let loading = this.state.loading;
                              loading.global = false;
                              this.setState({ loading: loading });
                              toastr.error(`Użytkownik nie został usunięty`, "Błąd");

                              this.closeModal();

                         }
                    )
          )


     }


     closeModal = () => {
          this.setState({ modalIsOpen: false });
     }


     render() {

          let userTable = <table className='admin-panel-table'>
               <thead>
                    <tr>
                         <th>ID</th>
                         <th>Nick</th>
                         <th>Password</th>
                         <th>Akcje</th>
                    </tr>
               </thead>
               <tbody>
                    {this.state.users.map(user =>
                         <tr key={'user_' + user.userId}>
                              <td>{user.userId}</td>
                              <td>{user.nickname}</td>
                              <td>{user.password}</td>
                              <td className="actions">
                                   <button className="global-button global-button--red" onClick={(e) => { this.handleDelete(e, user.userId) }}>Usuń</button>
                              </td>
                         </tr>
                    )}
               </tbody>
          </table>


          return (
               <div className="global-section__content">

                    <Link to="/add" className="admin-panel-component__add-user-button">
                         <button
                              className="global-button global-button--green global-button--lg global-button--adduser">
                              Dodaj nowego użytkownika
                         </button>
                    </Link>

                    {this.state.loading.global ? <LoadingComponent fly={true} /> : userTable}

                    <Modal isOpen={this.state.modalIsOpen}
                         contentLabel="Example Modal"
                    >

                         <h2 className="ReactModal__title">Usuwanie</h2>

                         <div className="ReactModal__message">
                              Czy napewno chcesz usunąć użytkownika o ID: {this.state.deletingUserId}
                         </div>

                         <div className="modal-buttons-container">
                              <button className="global-button global-button--red global-button--lg" onClick={this.handleDeleteSubmit}>Usuń</button>
                              <button className="global-button global-button--orange global-button--lg" onClick={this.closeModal}>Anuluj</button>
                         </div>
                    </Modal>
               </div>
          )
     }
}
