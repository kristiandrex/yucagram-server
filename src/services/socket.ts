import io from 'socket.io';
import { Server } from 'http';
// import authSocket from '../middlewares/authSocket';

export default (httpServer: Server) => {
  const socket = io(httpServer);

  socket.on('connection', (client) => {

    console.log(client.id);

  });

  return socket;
};