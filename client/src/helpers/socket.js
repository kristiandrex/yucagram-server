import io from 'socket.io-client';

let instance;

function connect() {
  if (!instance) {
    const token = localStorage.getItem('token');
    instance = io.connect({ path: '/api/socket', query: { token } });
  }

  return instance;
}

function disconnect() {
  return instance = null;
}

export default {
  connect,
  disconnect
}