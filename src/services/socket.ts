import io from 'socket.io';
import { Server } from 'http';
import jwt from 'jsonwebtoken';

export default (httpServer: Server) => {
  const socket: io.Server = io(httpServer);

  socket.on('connection', (client: io.Socket) => {
    client.on('signin', (token: string) => {
      try {
        const _id: string = <string>jwt.verify(token, <string>process.env.SEED);
        client.join(_id);
      }

      catch (error) {
        console.error(error);
      }
    });
  });

  return socket;
};