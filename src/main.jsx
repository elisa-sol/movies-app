import React from 'react';

import { Alert } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Offline, Online } from 'react-detect-offline';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';
import 'antd/dist/reset.css';
import './main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Online>
      <App className="app" />
    </Online>
    <Offline>
      <div className="offline">
        <Alert
          type="error"
          message="В данный момент вы не подключены к Интернету. Проверьте подключение."
          size="large"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '40px',
          }}
        />
      </div>
    </Offline>
  </>
);
