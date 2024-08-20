import React from 'react';

import { Alert } from 'antd';

function OfflineStatus() {
  return (
    <div className="offline">
      <Alert
        type="error"
        message="На данный момент Вы не подключены к Интернету. Проверьте подключение."
        size="large"
        tyle={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '40px',
        }}
      />
    </div>
  );
}

export default OfflineStatus;
