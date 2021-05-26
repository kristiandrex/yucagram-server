import { Socket } from "socket.io";
import verifyToken from "@util/verifyToken";

export default function authSocket(client: Socket, next: () => void): void {
  const token = <string>client.handshake.auth.token;

  try {
    const _id = <string>verifyToken(token);
    client.join(_id);
    console.log(`User ${_id} connected`);

    next();
  } catch (error) {
    console.error(error);
  }
}
