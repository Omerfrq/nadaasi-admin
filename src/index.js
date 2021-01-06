import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toggle/style.css';

const baseURL =
  window.location.hostname === 'localhost'
    ? 'https://bdinvest.herokuapp.com/'
    : 'https://bdinvest.herokuapp.com/';

if (process.env.API) axios.defaults.baseURL = process.env.API;
else axios.defaults.baseURL = baseURL;

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
