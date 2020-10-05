import React from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import bridge from '@vkontakte/vk-bridge';

class App extends React.Component{

    private function message) {
        

    render() {
      return (
        `<div className="wrapper">
          <div id="chat"></div>
          <div id="button">
            <input id="text" type="input" />
            <button onClick=${message}>Отправить</button>
          </div>
        </div>`
      )
    }
  }