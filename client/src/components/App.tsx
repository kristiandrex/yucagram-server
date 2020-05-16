import React, { useState, createContext, useEffect } from 'react';
import InitialLayout from './InitialLayout';
import Main from './Main';
import useToken from '../hooks/useToken';
import axios from 'axios';
import Loading from './Loading';
import { UserCTX, TokenCTX, User } from '../react-app-env';

export const UserContext = createContext<UserCTX>({
  user: null,
  setUser: () => { }
});

export const TokenContext = createContext<TokenCTX>({
  token: null,
  removeToken: () => { },
  setToken: () => { }
});

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>();

  const [token, setToken, removeToken] = useToken();

  const signin = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`/signin/token/?socket=${null}`, {
        headers: {
          authorization: token
        }
      });

      setUser(response.data);
      setLoading(false);
    }

    catch (error) {
      console.error(error);
      // TODO: Uncomment next line
      // removeToken(); 
    }
  };

  useEffect(() => {
    if (!user && token) {
      signin();
    }
  }, [user, token]);

  if (loading) {
    return <Loading />;
  }

  return (
    <TokenContext.Provider value={{ token, setToken, removeToken }}>
      <UserContext.Provider value={{ user, setUser }}>
        {user ? <Main /> : <InitialLayout />}
      </UserContext.Provider>
    </TokenContext.Provider>
  );
}