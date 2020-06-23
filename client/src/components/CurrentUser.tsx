import React from 'react';
import { User, State, DispatchI } from '../react-app-env';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

export default function CurrentUser() {
  const token = useSelector<State, string>((state) => state.token as string);
  const current = useSelector<State, User>((state) => state.current.user as User);
  const dispatch = useDispatch<DispatchI>();

  const handleClick = async () => {
    try {
      const response = await axios.post('/chats', { user: current._id }, { headers: { authorization: token } });

      dispatch({
        type: 'ADD_CHAT',
        payload: response.data
      });

      dispatch({
        type: 'SET_CURRENT_CHAT',
        payload: {
          ...response.data,
          index: 0
        }
      });
    }

    catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="row no-gutters current-user">
      <div className="col-10 offset-1 align-items-center d-flex justify-content-center">
        <div className="card text-center shadow-sm">
          <div className="card-header bg-white">
            <h4>¿Quieres agregar este chat?</h4>
          </div>
          <div className="card-body">
            <button className="btn btn-primary" onClick={handleClick}>Agregar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

