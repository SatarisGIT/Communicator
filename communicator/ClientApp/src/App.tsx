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
import AddUserComponent from './components/admin-panel/add-user/add-user';
import ChatWebsocketService from './services/ChatWebsocketService';
import { Channel } from './models/Channel';
import { Channels, LoggedUser } from './App.context';
import { User } from './models/User';
import toastr from 'toastr';
import LoadingComponent from './components/loading/loading';
import { ChannelRaw } from './models/ChannelRaw';

interface IAppProps {

}


export interface IAppState {
     channels: Map<number, ChatWebsocketService>,
     loggedUser: User | null,
     loading: boolean
}


export default class App extends Component<IAppProps, IAppState> {

     // ChatWebsocketService = new ChatWebsocketService("NAZWA GRUPY");

     subscriptions$ = new Subscription();

     state: IAppState = {
          channels: new Map<number, ChatWebsocketService>(),
          loggedUser: null,
          loading: false
     }


     componentWillMount() {


          let token = localStorage.getItem('token');
          if (token) {

               let auth = {
                    token: token
               }

               this.setState({ loading: true });
               this.subscriptions$.add(
                    HttpApi.post('/api/users/authenticatetoken', auth)
                         .subscribe(
                              (data: User) => {
                                   // console.log('[user logged] => ', data)
                                   this.setState({ loading: false });
                                   toastr.success(`Przywrócono sesje użytkownika: ${data.nickname} `, "Logowanie");

                                   localStorage.setItem("token", data.token);
                                   this.userUpdate(data);

                                   this.getChannels();
                              },

                              (err: any) => {
                                   console.error(err);
                                   this.setState({ loading: false });
                                   localStorage.removeItem("token");
                                   toastr.error(`Sesja wygasła`, "Logowanie");
                                   this.getChannels();

                              }
                         )
               )

          } else {
               this.getChannels();
          }

     }


     getChannels() {
          this.setState({ loading: true });
          this.subscriptions$.add(
               HttpApi.get('/api/channels')
                    .subscribe(
                         (channels: ChannelRaw[]) => {
                              // console.log('[channels get] => ', channels)
                              this.setState({ loading: false });
     
                              let channelsToSet = new Map();

                              for (const channel of channels) {
                                   channelsToSet.set(channel.channelId, new ChatWebsocketService(channel.channelId, channel.name));
                              }

                              this.setState({
                                   channels: channelsToSet
                              })
               
                             
                         },

                         (err: any) => {
                              console.error(err);
                              this.setState({ loading: false });
                              toastr.error(`Blad podczas pobierania kanalow`, "Kanały");
                         }
                    )
          )


     }


     componentWillUnmount() {

          this.subscriptions$.unsubscribe();


          let { channels } = this.state;

          for (let value of channels.values()) {
               value.disconnect()
          }

     }


     userUpdate = (user: User) => {
          // console.log("Tutaj user bedzie udpateowany")
          // console.log(user)

          this.setState({
               loggedUser: user
          })
     }


     render() {

          let { channels } = this.state;


          return (
               <LoggedUser.Provider value={{
                    user: this.state.loggedUser,
                    updateUser: this.userUpdate
               }}>

                    <Channels.Provider value={channels}>

                         <div>
                              {this.state.loading ? <LoadingComponent fly={true} /> : null}

                              <NavbarComponent></NavbarComponent>
                              <AsideComponent></AsideComponent>

                              <main className="main">
                                   <Route exact path="/" component={HomeComponent} />
                                   <Route path="/admin" component={AdminPanelComponent} />
                                   <Route path="/messages/:groupId" component={MessageBoxComponent} />
                                   <Route path="/login" component={LoginComponent} />
                              </main>



                         </div>

                    </Channels.Provider>
               </LoggedUser.Provider>
          );
     }
}