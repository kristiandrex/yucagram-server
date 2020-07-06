import React, { useEffect, useCallback } from 'react';
import InitialLayout from './InitialLayout';
import Loading from './Loading';
import axios from 'axios';
import { State } from '../react-app-env';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from './Socket';
import Session from './Session';
import styled from 'styled-components';
import pattern from '../assets/i-like-food.svg';

const Styled = styled.div`
  background-image: url(${pattern});
  height: 100%;
  width: 100%;
`;

export default function App() {
  const dispatch = useDispatch();

  const token = useSelector((state: State) => state.token);
  const user = useSelector((state: State) => state.user);

  const signin = useCallback(async () => {
    try {
      const response = await axios.get(`/signin/token`, { headers: { authorization: token } });

      socket.emit('SIGNIN', token);

      dispatch({
        type: 'SET_USER',
        payload: response.data
      });
    }

    catch (error) {
      dispatch({ type: 'SIGNOUT' });

      console.error(error);
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (!user && token !== null) {
      signin();
    }
  }, [user, token, signin]);

  if (!user && token !== null)
    return <Loading />;

  return (
    <Styled>
      {!token ? <InitialLayout /> : <Session />}
    </Styled>
  );
}