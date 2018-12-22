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
import { Channel } from './models/Channel';
import ChatWebsocketService from './services/ChatWebsocketService';
import { Channels } from './App.context';

interface IAppProps {

}


interface IAppState {
     channels: Map<number, ChatWebsocketService>,
}


export default class App extends Component<IAppProps, IAppState> {

     // ChatWebsocketService = new ChatWebsocketService("NAZWA GRUPY");

     state = {
          channels: new Map<number, ChatWebsocketService>(),
     }


     returnChannels(): Array<Channel> {
          let result: any = []

          for (let i = 0; i < 1; i++) {

               let type = i > 5 ? "public" : "user"

               // let channel = new Channel(i, `XKanał nr: ${i}`, type)
               let channel = new Channel(i, `yyy`, type)
               result.push(channel)

          }

          return result;
     }


     componentWillMount() {

          let { channels } = this.state;

          console.log("ASIDE WILL MOUNT - pobieranie kanałów...")

          setTimeout(() => {
               console.log("Kanały pobrane!")

               let response: Array<Channel> = this.returnChannels();

               for (let channel of response) {
                    channels.set(channel.id, new ChatWebsocketService(channel.id, channel.name));
               }

               this.setState({
                    channels: channels
               })

          }, 30);

     }


     componentWillUnmount() {
          let { channels } = this.state;

          for (let value of channels.values()) {
               value.disconnect()
          }

     }


     render() {

          let { channels } = this.state;

          return (
               <Channels.Provider value={channels}>

                    <div>
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
          );
     }
}