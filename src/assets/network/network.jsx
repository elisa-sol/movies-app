import React, { useState, useEffect } from 'react';

import OnlineStatus from '../online/online';
import OfflineStatus from '../offline/offline';

const NetworkStatusManager = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const handleOnline = () => {
    setIsOnline(true);
  };

  const handleOffline = () => {
    setIsOnline(false);
  };

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return <div>{isOnline ? <OnlineStatus /> : <OfflineStatus />}</div>;
};

export default NetworkStatusManager;
