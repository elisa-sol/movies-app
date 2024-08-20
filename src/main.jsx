import React from 'react';

import ReactDOM from 'react-dom/client';

import 'antd/dist/reset.css';
import './main.css';
import NetworkStatus from './assets/network/network';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NetworkStatus />
  </React.StrictMode>
);
