import React, { createContext, useEffect } from 'react';
import { element } from 'prop-types';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import newMessage from '../redux/actions/newMessage';

export const SocketContext = createContext(null);

export default function Socket({ children }) {
  const socket = io.connect('/', { path: '/api/socket' });
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('NEW_MESSAGE', (message) => {
      dispatch(newMessage(message));
    });
  }, [dispatch, socket]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

Socket.propTypes = {
  children: element.isRequired
};