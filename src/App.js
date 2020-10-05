import React from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import bridge from '@vkontakte/vk-bridge';

class App extends React.Component{

  constructor() {
    const socket = io("https://chat2222.herokuapp.com/");

    socket.on('message', function (data) {
      const p = document.createElement('p');  
      p.textContent = data.msg;
      document.getElementById('chat').appendChild(p);
    });
  }

  message() {
    const text = document.getElementById("text").value;
    socket.emit('message', {msg: text});
  }

  async vk() {
    bridge.send('VKWebAppInit');
 
    try {
      const data = await bridge.send('VKWebAppGetUserInfo');
      console.log(data);
    } catch (error) {

    }
  }

  render() {
    this.vk();
    return (
      <div className="wrapper">
        <div id="chat"></div>
        <div id="button">
          <input id="text" type="input" />
          <button onClick={this.message}>Отправить</button>
        </div>
      </div>
    )
  }
}

export default App;
