import React, { createContext, useEffect } from 'react';
import socket from 'helpers/socket';
import PropTypes from 'prop-types';
export const SocketContext = createContext(null);

export default function Socket({ children }) {

  useEffect(() => {
    socket.connect();
    return () => socket.disconnect();
  }, [])

  return (
    <SocketContext.Provider value={socket.connect()}>
      {children}
    </SocketContext.Provider>
  );
}

Socket.propTypes = {
  children: PropTypes.element.isRequired
};