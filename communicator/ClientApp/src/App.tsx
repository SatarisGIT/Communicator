import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

export interface HelloProps { compiler: string; framework: string; }


import { Observable, Subscription } from 'rxjs';
import axios from 'axios';

import HttpApi from './assets/lib/httpapi';

import NavbarComponent from './components/navbar/navbar'


declare global {
     namespace JSX {
         interface IntrinsicElements {
             'my-html-custom-tag': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
         }
     }
 }

class App extends Component {

     render() {

          return (

               <div className="App">
                    <header className="App-header">
                         <img src={logo} className="App-logo" alt="logo" />
                         <p>
                              Edit <code>src/App.js</code> and save to reload.
                         </p>
                         <a
                              className="App-link"
                              href="https://reactjs.org"
                              target="_blank"
                              rel="noopener noreferrer"
                         >
                              Learn Reacttttsrsadasdasd

                         <NavbarComponent></NavbarComponent>

                         </a>
                    </header>
               </div>
          );
     }
}

export default App;




export class FetchData extends Component {
     displayName = FetchData.name


     constructor(props) {
          super(props);
          this.state = { forecasts: [], loading: true };

          this.subscriptions$ = new Subscription();

          Observable.create

          window.



               this.subscriptions$.add(
                    HttpApi.get('https://jsonplaceholder.typicode.com/users')
                         .subscribe(
                              data => {
                                   console.log('[data!12] => ', data)
                                   this.setState({ forecasts: data, loading: false });
                              }
                         )
               )

          this.subscriptions$.unsubscribe();

     }

     static renderForecastsTable(forecasts) {
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
