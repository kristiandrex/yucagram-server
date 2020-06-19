import React, { FormEvent, ReactElement, useRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

interface Props {
  children: ReactElement;
}

export default function Signin(props: Props) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value
    };

    try {
      const response = await axios.post('/signin', data);

      dispatch({
        type: 'SIGNIN',
        payload: response.data
      });

    } catch (error) {
      console.log(error)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <input
          type='text'
          className='form-control'
          placeholder='Nombre de usuario'
          name='username'
          ref={usernameRef}
        />
      </div>
      <div className='form-group'>
        <input
          type='password'
          className='form-control'
          placeholder='Contraseña'
          name='password'
          ref={passwordRef}
        />
      </div>
      <button className='btn btn-primary btn-block'>Iniciar sesión</button>
      <div className='btn-group btn-block'>
        <button type='button' className='btn btn-link btn-sm'>
          ¿Olvidaste la contraseña?
        </button>
        {props.children}
      </div>
    </form>
  );
}
