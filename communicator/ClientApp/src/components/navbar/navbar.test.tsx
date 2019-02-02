import React from 'react';
import { shallow } from 'enzyme';
import NavbarComponent from './navbar';


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

          wrapper.instance().setState({menuToggled: true})

          expect(wrapper.contains("Strona główna")).toBeTruthy();
     });



     

     // it('checks AsideComponent exists on initialized App component', () => {
     //      const wrapper = shallow(<App />);
     //      expect(wrapper.contains(<AsideComponent></AsideComponent>)).toBeTruthy();
     // });

     
     // it('updateUser method and state checks', async function () {
     //      const wrapper = shallow<App>(<App />);

     //      let mockUser = new User();

     //      mockUser.messagesSent = []
     //      mockUser.messagesReceived = []
     //      mockUser.userChannels = []
     //      mockUser.lazyLoader = "XXX"
     //      mockUser.userId = 1
     //      mockUser.nickname = "MockUser"
     //      mockUser.password = "MockUserPass"
     //      mockUser.isLogged = true
     //      mockUser.isAdmin = true
     //      mockUser.token = "userToken"

     //      const wrapperInstance = wrapper.instance();

     //      wrapperInstance.userUpdate(mockUser)

     //      //Check if state is setted
     //      expect(wrapperInstance.state.loggedUser).toEqual(mockUser);

     // });

})

