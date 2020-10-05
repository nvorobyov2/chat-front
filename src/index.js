import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';

class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Привет, {this.props.name}
      </div>
    );
  }
}

ReactDOM.render(
    <HelloMessage name="Саша" />,
    document.getElementById('hello-example')
);

