import React, { useState, createContext, useEffect } from 'react';
import InitialLayout from './InitialLayout';
import Main from './Main';
import useLocalStorage from '../hooks/useLocalStorage';
import axios from 'axios';

export const UserContext = createContext();
export const TokenContext = createContext();

export default function App() {
  const [token, setToken] = useLocalStorage('token', null);
  const [user, setUser] = useState();

  const login = async () => {
    const response = await axios.post('/login/token', { token });
    setUser(response.data);
  };

  useEffect(() => {
    if (!user && token) {
      login();
    }
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <UserContext.Provider value={{ user, setUser }}>{user ? <Main /> : <InitialLayout />}</UserContext.Provider>
    </TokenContext.Provider>
  );
}
