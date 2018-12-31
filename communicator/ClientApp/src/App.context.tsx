import React, { Component } from 'react'
import ChatWebsocketService from './services/ChatWebsocketService';

export const Channels = React.createContext(new Map<number, ChatWebsocketService>());
export const LoggedUser: React.Context<ILoggedUser | any> = React.createContext({
     user: null,
     updateUser: () => {}
});


interface ILoggedUser {
     user: null | number;
     updateUser: Function;
}