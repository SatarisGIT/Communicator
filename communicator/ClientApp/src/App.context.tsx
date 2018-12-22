import React, { Component } from 'react'
import ChatWebsocketService from './services/ChatWebsocketService';

export const Channels = React.createContext(new Map<number, ChatWebsocketService>());