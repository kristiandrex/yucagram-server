import io from 'socket.io';
import { Server } from 'http';

export default (server: Server) => {
  const socket = io(server);

  socket.on('connection', (client) => {
  });

  return socket;
};