import React, { useState, useEffect } from 'react';
import useToken from '../hooks/useToken';
import { UserContext, TokenContext, SocketContext } from '../context'
import InitialLayout from './InitialLayout';
import Main from './Main';
import Loading from './Loading';
import axios from 'axios';
import io from 'socket.io-client';
import { User } from '../react-app-env';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken, removeToken] = useToken();
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);

  const signin = async () => {
    try {
      const response = await axios.get(`/signin/token`, { headers: { authorization: token } });
      setUser(response.data);
    }

    catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setSocket(io('/'));
  }, []);

  useEffect(() => {
    if (!user && token !== null) {
      signin();
    }
  }, [user, token]);

  if (!user && token !== null) {
    return <Loading />;
  }

  if (!token) {
    return (
      <TokenContext.Provider value={{ token, setToken, removeToken }}>
        <InitialLayout />
      </TokenContext.Provider>
    );
  }

  return (
    <SocketContext.Provider value={socket}>
      <TokenContext.Provider value={{ token, setToken, removeToken }}>
        <UserContext.Provider value={{ user, setUser }}>
          <Main />
        </UserContext.Provider>
      </TokenContext.Provider>
    </SocketContext.Provider>
  );
}