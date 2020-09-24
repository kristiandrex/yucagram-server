import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../../redux/actions/chats';

export default function CurrentUser() {
  const user = useSelector((state) => state.chats.current.user._id);

  const dispatch = useDispatch();
  const handleClick = () => dispatch(addUser(user));

  return (
    <div className='row no-gutters current-user'>
      <div className='col-10 offset-1 align-items-center d-flex justify-content-center'>
        <div className='card text-center shadow-sm'>
          <div className='card-header bg-white'>
            <h4>¿Quieres agregar este chat?</h4>
          </div>
          <div className='card-body'>
            <button className='btn btn-primary' onClick={handleClick}>Agregar</button>
          </div>
        </div>
      </div>
    </div>
  );
}