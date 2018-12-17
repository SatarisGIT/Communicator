import React, { Component } from 'react'
import './admin-panel.scss';
import UserTableComponent from './users-table/users-table';
import AddUserComponent from './add-user/add-user';

import { BrowserRouter, Route } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



export default class AdminPanelComponent extends Component {

     render() {

          return (
               <BrowserRouter basename="/admin">

                    <section className="global-section admin-panel-component">
                         <header className="global-section__header">

                              <div className="global-section__header-top">
                                   <FontAwesomeIcon icon={'comment'} /> Admin panel
                              </div>

                              <div className="global-section__header-bottom">
                                   Panel administracyjny
                              </div>

                         </header>

                         <Route exact path="/" component={UserTableComponent} />
                         <Route path="/add" component={AddUserComponent} />

                    </section>
               </BrowserRouter>

          )
     }
}