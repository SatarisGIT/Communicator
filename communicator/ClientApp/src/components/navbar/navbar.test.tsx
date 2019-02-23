import React from 'react';
import { shallow, mount } from 'enzyme';
import NavbarComponent from './navbar';
import { User } from '../../models/User';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { LoggedUser } from '../../App.context';


describe('<NavbarComponent /> Tests', () => {

     it('renders NavbarComponent without crashing', () => {
          shallow(<NavbarComponent />);
     });


     it('checks initial NabBar state', async function () {
          const wrapper = shallow<NavbarComponent>(<NavbarComponent />);

          //Initial menu toggle state
          expect(wrapper.instance().state.menuToggled).not.toBeTruthy();

     });


     it('checks NavBar toggling menu', () => {
          const wrapper = shallow<NavbarComponent>(<NavbarComponent />);
          expect(wrapper.contains("Strona główna")).not.toBeTruthy();

          wrapper.instance().setState({ menuToggled: true })

          expect(wrapper.contains("Strona główna")).toBeTruthy();
     });


     it('check Navbar reaction for logged not-admin user case', async function () {

          let mockUser = new User();

          mockUser.messagesSent = []
          mockUser.messagesReceived = []
          mockUser.userChannels = []
          mockUser.lazyLoader = "XXX"
          mockUser.userId = 1
          mockUser.nickname = "MockUser"
          mockUser.password = "MockUserPass"
          mockUser.isLogged = true
          mockUser.isAdmin = false
          mockUser.token = "userToken"

          const context = { user: mockUser };

          const wrapper = shallow<NavbarComponent>(
               <NavbarComponent />, { context }
          );

          NavbarComponent.contextType = LoggedUser

          wrapper.instance().context = {
               user: mockUser
          }

          //Check if user can go to admin panel
          expect(wrapper.contains(<Link to="/admin">Admin</Link>)).not.toBeTruthy();
     });

})

