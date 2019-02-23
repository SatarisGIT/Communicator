import React from 'react';
import { shallow } from 'enzyme';
import App, { IAppState } from './App';
import NavbarComponent from './components/navbar/navbar';
import AsideComponent from './components/aside/aside';
import { User } from './models/User';


describe('<App /> Tests', () => {

     it('renders App component without crashing', () => {
          shallow(<App />);
     });


     it('checks NavBar exists on initialized App component', () => {
          const wrapper = shallow(<App />);
          expect(wrapper.contains(<NavbarComponent></NavbarComponent>)).toBeTruthy();
     });

     
     it('checks AsideComponent exists on initialized App component', () => {
          const wrapper = shallow(<App />);
          expect(wrapper.contains(<AsideComponent></AsideComponent>)).toBeTruthy();
     });


     it('checks initial App states', async function () {
          const wrapper = shallow(<App />);

          //Initial loading state
          expect((wrapper.instance().state as IAppState).loading).toBeTruthy()

          //Initial channels state
          expect((wrapper.instance().state as IAppState).channels).toBeInstanceOf(Map)

          //Initial loggedUser state
          expect((wrapper.instance().state as IAppState).loggedUser).toBeNull()
     });

     
     it('updateUser method and state checks', async function () {
          const wrapper = shallow<App>(<App />);

          let mockUser = new User();

          mockUser.messagesSent = []
          mockUser.messagesReceived = []
          mockUser.userChannels = []
          mockUser.lazyLoader = "XXX"
          mockUser.userId = 1
          mockUser.nickname = "MockUser"
          mockUser.password = "MockUserPass"
          mockUser.isLogged = true
          mockUser.isAdmin = true
          mockUser.token = "userToken"

          const wrapperInstance = wrapper.instance();

          wrapperInstance.userUpdate(mockUser)

          //Check if state is setted
          expect(wrapperInstance.state.loggedUser).toEqual(mockUser);

     });

})

