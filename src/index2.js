// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './UserContext'; // Import UserProvider
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider> {/* Wrap the entire App with UserProvider */}
      <App />
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
