import React, { Component } from 'react';
import './navbar.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class NavbarComponent extends Component {
     render() {


          return (
               <nav className="navbar">
                    <ul>
                         <li>
                              <Link to="/">Strona główna</Link>
                         </li>
                         <li>
                              <Link to="/messages">Wiadomości</Link>
                         </li>
                         <li>
                              <Link to="/admin">Admin</Link>
                         </li>
                         <li>
                              <Link to="/login">Login</Link>
                         </li>
                    </ul>
               </nav>
          )
     }
}