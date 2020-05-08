import React, { useState, createContext, useEffect } from 'react';
import InitialLayout from './InitialLayout';
import Main from './Main';
import useLocalStorage from '../hooks/useLocalStorage';
import axios from 'axios';
import Loading from './Loading';

interface Token {
  value: string | null;
}

export const UserContext = createContext({} as UserCTX);
export const TokenContext = createContext({} as TokenCTX);

export default function App() {
  const [token, setToken] = useLocalStorage<Token>('token', { value: null });
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState<boolean>();

  const login = async () => {
    try {
      setLoading(true);

      const response = await axios.get('/signin/token', { 
        headers: { 
          authorization: token.value
        } 
      });

      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      // TODO: Uncomment next line
      // setToken({ value: null });
    }
  };

  useEffect(() => {
    if (!user && token && token.value) {
      login();
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <UserContext.Provider value={{ user, setUser }}>
        {user ? <Main /> : <InitialLayout />}
      </UserContext.Provider>
    </TokenContext.Provider>
  );
}
