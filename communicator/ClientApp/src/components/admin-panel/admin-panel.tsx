import React, { Component } from 'react'
import HttpApi from '../../assets/lib/httpapi';
import { Subscription } from 'rxjs';
import { User } from '../../models/User';

import toastr from 'toastr'

import 'toastr/build/Admin'


import './admin-panel.scss';
import LoadingComponent from '../loading/loading';

interface IAdminPanelProps {
     any: any
}

interface IAdminPanelState {
     users: Array<User>;
     loading: {
          global: boolean;
     };
}


export default class AdminPanelComponent extends Component<IAdminPanelProps, IAdminPanelState> {

     subscriptions$: Subscription;

     constructor(props: any) {
          super(props);

          this.state = {
               users: [],
               loading: {
                    global: true
               }
          };

          this.subscriptions$ = new Subscription();

          this.subscriptions$.add(
               HttpApi.get('/api/Users')
                    .subscribe(
                         (data: User[]) => {
                              console.log('[state.users] => ', data)

                              let loading = this.state.loading;
                              loading.global = false;
                              this.setState({ users: data, loading: loading });
                         },

                         (err: any) => {
                              console.error(err);
                         }
                    )
          )

     }


     componentWillUnmount() {
          this.subscriptions$.unsubscribe();
     }


     render() {



          toastr.success("TEST!");
          toastr.info('Are you the 6 fingered man?')



          let userTable = <table className='admin-panel-table'>
               <thead>
                    <tr>
                         <th>ID</th>
                         <th>Nick</th>
                         <th>Password</th>
                         <th colSpan={2}>Akcje</th>
                    </tr>
               </thead>
               <tbody>
                    {this.state.users.map(user =>
                         <tr key={'user_' + user.id}>
                              <td>{user.id}</td>
                              <td>{user.nickname}</td>
                              <td>{user.password}</td>
                              <td><button className="global-button global-button--orange">Edytuj</button></td>
                              <td><button className="global-button global-button--red">Usuń</button></td>
                         </tr>
                    )}
               </tbody>
          </table>


          return (
               <section className="global-section">
                    <header className="global-section__header">Admin panel</header>



                    {this.state.loading.global ? <LoadingComponent/> : userTable }

               </section>
          )
     }
}