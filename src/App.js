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
    let text = document.getElementById("text").value;
    text = time + userName + ' ' + text;
    socket.emit('message', {msg: text});
  }

  async function getInfo() {
    bridge.send('VKWebAppInit');
 
    try {
      const data = await bridge.send('VKWebAppGetUserInfo');
      return data;
    } catch (error) {

    }
  };

  let userName;
  
  getInfo().then(result => {
    console.log(result.first_name + ' ' + result.last_name);
    userName = '[' + result.first_name + ' ' + result.last_name + ']'; 
  });

  let date = new Date();
  const time = date.getHours() + ':' + date.getMinutes();
  
  function onSubmit(e) {
    e.preventDefault();
    message();
    document.getElementById('text').value = '';
  }

  return (
    <div className="wrapper">
      <div id="chat"></div>
      <form onSubmit={onSubmit} id="button">
        <input id="text" type="input" />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}

export default App;