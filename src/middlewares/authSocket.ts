import { Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import User from '../models/user';

async function authSocket(socket: Socket, next: (err?: any) => void) {
  try {
    const token = socket.handshake.query.token;
    const _id = jwt.verify(token, <string>process.env.SEED);
    const user = await User.findOne({ _id });

    if(!user)
      return new Error('Authentication error');

    next();
  }

  catch (error) {
    return new Error('Authentication error');
  }
}

export default authSocket;