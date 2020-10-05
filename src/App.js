import React from 'react';
import './App.css';
import io from 'socket.io-client';
import bridge from '@vkontakte/vk-bridge';

function App() {

  let userName;
  let date = new Date();
  const time = date.getHours() + ':' + date.getMinutes();

  async function getInfo() {
    bridge.send('VKWebAppInit');
 
    try {
      const data = await bridge.send('VKWebAppGetUserInfo');
      return data;
    } catch (error) {

    }
  };
  
  getInfo().then(result => {
    userName = '[' + result.first_name + ' ' + result.last_name + ']'; 
  });


  const socket = io("https://chat2222.herokuapp.com/", {
    query: {
      userName: userName
    }
  });

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