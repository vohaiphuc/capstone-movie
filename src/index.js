import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import userSlice from "./redux/userSlice";
import filmSlice from "./redux/filmSlice";
import loginFormSlice from './redux/loginFormSlice';
import spinnerSlice from './redux/spinnerSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));
export const store = configureStore({
  reducer: {
    userSlice,
    filmSlice,
    loginFormSlice,
    spinnerSlice,
  }
})

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
