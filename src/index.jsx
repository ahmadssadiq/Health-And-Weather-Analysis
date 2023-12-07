/*
This script is similar to index.js, serving as an entry point for a React application.
It renders the App component inside a BrowserRouter, which is necessary for enabling routing in the application.
*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from 'src/App.jsx'; // Assuming App.jsx is in the same directory
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
