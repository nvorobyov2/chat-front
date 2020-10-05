import React from 'react';
import './App.css';
import io from 'socket.io-client';
import bridge from '@vkontakte/vk-bridge';

function App() {

  const socket = io("https://chat2222.herokuapp.com/");

  socket.on('message', function (data) {
    const p = document.createElement('p');  
    p.textContent = data.msg;
    document.getElementById('chat').appendChild(p);
  });

  function message() {
    const text = document.getElementById("text").value;
    socket.emit('message', {msg: text});
  }

  async function vk() {
    bridge.send('VKWebAppInit');
 
    try {
      const data = await bridge.send('VKWebAppGetUserInfo');
      console.log(data);
    } catch (error) {

    }
  };

  return (
    <div className="wrapper">
      <div id="chat"></div>
      <div id="button">
        <input id="text" type="input" />
        <button onClick={message}>Отправить</button>
      </div>
    </div>
  );
}

export default App;