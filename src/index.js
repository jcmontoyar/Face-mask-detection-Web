import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <div className="header">
      <h1 className="text-center">Face mask detection</h1>
    </div>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);