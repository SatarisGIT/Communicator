import React, { Component } from 'react';
import './navbar.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

interface INavbarProps {}

interface INavbarState {
     menuToggled: boolean;
}

export default class NavbarComponent extends Component<INavbarProps, INavbarState> {

     constructor(props: any) {
          super(props);

          this.state = { 
               menuToggled: false
          };
     }
     

     toggleMenu = () => {

          let currentMenuToggledState = this.state.menuToggled;
          this.setState({menuToggled: !currentMenuToggledState})
     }


     render() {


          let menuContent =   <div onClick={this.toggleMenu} className="menu-content">
                                   <Link to="/">Strona główna</Link>
                                   <Link to="/messages">Wiadomości</Link>
                                   <Link to="/admin">Admin</Link>
                                   <Link to="/login">Login</Link>
                              </div>

          return (
               <nav className="navbar">

                    <div>USER</div>
                    <button onClick={this.toggleMenu} className="hamburger">
                         <div className="hamburger__line"></div>
                         <div className="hamburger__line"></div>
                         <div className="hamburger__line"></div>
                    </button>


                    {this.state.menuToggled ? menuContent : null }
              

               </nav>
          )
     }
}