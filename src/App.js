import React from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import bridge from '@vkontakte/vk-bridge';

async function vk () {
  bridge.send('VKWebAppInit');
 
  try {
    const data = await bridge.send('VKWebAppGetUserInfo');
   
    // Handling received data
    console.log(data);
  } catch (error) {
    // Handling an error
  }
}

function App() {
  vk();
  const socket = io("https://chat2222.herokuapp.com/");

  function Message() {
    const text = document.getElementById("text").value;

    socket.emit('message', {msg: text});
  }

  socket.on('message', function (data) {
    const p = document.createElement('p');  
    p.textContent = data.msg;
    document.getElementById('chat').appendChild(p);
  });

  return (
    <div className="wrapper">
      <div id="chat"></div>
      <div id="button">
        <input id="text" type="input" />
        <button onClick={Message}>Отправить</button>
      </div>
    </div>
  );
}

export default App;
