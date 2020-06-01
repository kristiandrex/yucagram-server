import React from 'react';
import { User, State, ActionI } from '../react-app-env';
import ProfileCard from './ProfileCard';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Dispatch } from 'redux';

const StyledDiv = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
`;

export default function CurrentUser() {
  const { currentUser, token } = useSelector((state: State) => {
    return {
      currentUser: state.current.user as User,
      token: state.token as string
    }
  });

  const dispatch = useDispatch<Dispatch<ActionI>>();

  const handleClick = async () => {

    try {
      const response = await axios.post('/chats', { user: currentUser._id }, { headers: { authorization: token } });

      dispatch({
        type: 'SET_CURRENT_CHAT',
        payload: response.data
      });

      dispatch({
        type: 'ADD_CHAT',
        payload: response.data
      });
    }

    catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledDiv className="col-9">
      <ProfileCard user={currentUser} />
      <div className="d-flex align-items-center justify-content-center">
        <div className="card text-center shadow-sm">
          <div className="card-header bg-white">
            <h4>¿Quieres agregar este chat?</h4>
          </div>
          <div className="card-body">
            <button className="btn btn-primary" onClick={handleClick}>Agregar</button>
          </div>
        </div>
      </div>
    </StyledDiv>
  );
}
