import React, { Component } from 'react';
import './navbar.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Channels, LoggedUser } from '../../App.context';
import { User } from '../../models/User';

interface INavbarProps { }

interface INavbarState {
     menuToggled: boolean;
}

export default class NavbarComponent extends Component<INavbarProps, INavbarState> {

     static contextType = LoggedUser;

     state: INavbarState = {
          menuToggled: false
     };


     toggleMenu = () => {
          let currentMenuToggledState = this.state.menuToggled;
          this.setState({ menuToggled: !currentMenuToggledState })
     }


     render() {

          console.warn(this)

          let { user } = this.context;

          let menuContent = <div onClick={this.toggleMenu} className="menu-content">
               <Link to="/">Strona główna</Link>

               {user && user.isAdmin ? <Link to="/admin">Admin</Link> : null}

               <Link to="/login">{user ? 'Profil użytkownika' : 'Logowanie'}</Link>
          </div>

          return (
               <nav className="navbar">

                    <div className="navbar__user">
                         <i className="fas fa-user"></i>

                         <span className="navbar__user-nickname">
                              {user ? user.nickname : "Anonimowy"}
                         </span>

                    </div>

                    <button onClick={this.toggleMenu} className="hamburger">
                         <div className="hamburger__line"></div>
                         <div className="hamburger__line"></div>
                         <div className="hamburger__line"></div>
                    </button>


                    {this.state.menuToggled ? menuContent : null}


               </nav>
          )
     }
}