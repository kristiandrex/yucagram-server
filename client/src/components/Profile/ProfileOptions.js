import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch } from 'react-redux';
import { signout, openProfile } from '../../redux/actions/auth';

export default function ProfileOptions() {
  const dispatch = useDispatch();

  const handleSignout = () => dispatch(signout());
  const handleEdit = () => dispatch(openProfile());

  return (
    <Dropdown>
      <Dropdown.Toggle>
        <i className='material-icons text-white'>more_vert</i>
      </Dropdown.Toggle>
      <Dropdown.Menu className='text-center'>
        <Dropdown.Item onClick={handleSignout}>Cerrar sesión</Dropdown.Item>
        <Dropdown.Item onClick={handleEdit}>Editar perfil</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}