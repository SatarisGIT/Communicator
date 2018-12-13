import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import { Observable, Subscription } from 'rxjs';
import axios from 'axios';

import HttpApi from './assets/lib/httpapi';

import NavbarComponent from './components/navbar/navbar'
import AsideComponent from './components/aside/aside'
import MessageBoxComponent from './components/message-box/message-box';
import AdminPanelComponent from './components/admin-panel/admin-panel';
import HomeComponent from './components/home/home';
import LoginComponent from './components/login/login';

class App extends Component {

     render() {

          return (
               <div>
                    <NavbarComponent></NavbarComponent>
                    <AsideComponent></AsideComponent>

                    <main className="main">
                         <Route exact path="/" component={HomeComponent} />
                         <Route path="/admin" component={AdminPanelComponent} />
                         <Route path="/messages" component={MessageBoxComponent} />
                         <Route path="/login" component={LoginComponent} />
                    </main>

               </div>
          );
     }
}

export default App;




//For test purposes
export class FetchData extends Component<any, any> {
     displayName = FetchData.name

     subscriptions$: Subscription;

     constructor(props: any) {
          super(props);
          this.state = { forecasts: [], loading: true };

          this.subscriptions$ = new Subscription();


          this.subscriptions$.add(
               HttpApi.get('https://jsonplaceholder.typicode.com/users')
                    .subscribe(
                         (data: any) => {
                              console.log('[data!12] => ', data)
                              this.setState({ forecasts: data, loading: false });
                         }
                    )
          )

          this.subscriptions$.unsubscribe();

     }

     static renderForecastsTable(forecasts: Array<any>) {
          return (
               <table className='table'>
                    <thead>
                         <tr>
                              <th>Date</th>
                              <th>Temp. (C)</th>
                              <th>Temp. (F)</th>
                              <th>Summary</th>
                         </tr>
                    </thead>
                    <tbody>
                         {forecasts.map(forecast =>
                              <tr key={forecast.dateFormatted}>
                                   <td>{forecast.dateFormatted}</td>
                                   <td>{forecast.temperatureC}</td>
                                   <td>{forecast.temperatureF}</td>
                                   <td>{forecast.summary}</td>
                              </tr>
                         )}
                    </tbody>
               </table>
          );
     }

     render() {


          let contents = this.state.loading
               ? <p><em>Loading...</em></p>
               : FetchData.renderForecastsTable(this.state.forecasts);

          return (
               <div>
                    <h1>Weather forecast</h1>
                    <p>This component demonstrates fetching data from the server.</p>
                    {contents}
               </div>
          );
     }
}
