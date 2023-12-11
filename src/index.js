// index.js
import { initializeApp } from 'firebase/app';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { UserProvider } from './UserContext'; // Import 
import './index.css';
import reportWebVitals from './reportWebVitals';

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTx-vgovENB0YtmiCEXk4I5FsYLIDafj8",
  authDomain: "web-app-9abe7.firebaseapp.com",
  projectId: "web-app-9abe7",
  storageBucket: "web-app-9abe7.appspot.com",
  messagingSenderId: "414567470405",
  appId: "1:414567470405:web:46043a1ee14c8c61c61a2c",
  measurementId: "G-Q79XV9S54S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider> 
        <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();