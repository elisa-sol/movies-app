import React from 'react';

import ReactDOM from 'react-dom/client';

import './index.css';
import 'antd/dist/reset.css';
import './main.css';
import NetworkStatus from './assets/network/network.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NetworkStatus />
  </React.StrictMode>
);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <>
//       <Online>
//         <App className="app" />
//       </Online>
//       <Offline>
//         <div className="offline">
//           <Alert type="error" message="You're offline right now. Check your connection." />
//           <Alert
//             type="error"
//             message="В данный момент вы не подключены к Интернету. Проверьте подключение."
//             size="large"
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               marginTop: '40px',
//             }}
//           />
//         </div>
//       </Offline>
//   </React.StrictMode>
// </>
// );
