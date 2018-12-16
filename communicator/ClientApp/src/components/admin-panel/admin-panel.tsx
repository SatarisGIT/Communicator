import React, { Component } from 'react'
import './admin-panel.scss';
import UserTableComponent from './users-table/users-table';
import AddUserComponent from './add-user/add-user';

import { BrowserRouter, Route } from "react-router-dom";

export default class AdminPanelComponent extends Component {

     render() {

          return (
               <BrowserRouter basename="/admin">

                    <section className="global-section admin-panel-component">
                         <header className="global-section__header">Admin panel</header>
               
                         <Route exact path="/" component={UserTableComponent} />
                         <Route path="/add" component={AddUserComponent} />

                    </section>
               </BrowserRouter>

          )
     }
}