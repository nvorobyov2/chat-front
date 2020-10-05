import React from 'react';
import './App.css';
import io from 'socket.io-client';
import bridge from '@vkontakte/vk-bridge';

export default class App extends React.Component{

  constructor(props) {
    super(props);

    this.socket = io("https://chat2222.herokuapp.com/");

    this.socket.on('message', function (data) {
      const p = document.createElement('p');  
      p.textContent = data.msg;
      document.getElementById('chat').appendChild(p);
    });
  }

  message() {
    const text = document.getElementById("text").value;
    this.socket.emit('message', {msg: text});
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
    return (
      <div className="wrapper">
        <div id="chat"></div>
        <div id="button">
          <input id="text" type="input" />
          <button onClick={this.message}>Отправить</button>
        </div>
      </div>
    );
  }
}