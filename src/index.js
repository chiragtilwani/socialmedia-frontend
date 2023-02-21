import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
// import { AuthProvider } from '../src/context/AuthContext'
import { store } from './app/store'
import { Provider } from 'react-redux'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <AuthProvider> */}
      <Provider store={store}>
        <App />
      </Provider>
      {/* </AuthProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);