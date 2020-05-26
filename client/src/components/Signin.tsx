import React, { useContext, FormEvent, ReactElement, useRef } from 'react';

import axios from 'axios';
import { TokenContext, UserContext } from '../context';

interface Props {
  children: ReactElement;
}

export default function Signin(props: Props) {
  const { setToken } = useContext(TokenContext);
  const { setUser } = useContext(UserContext);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value
    };

    try {
      const response = await axios.post('/signin', data);
      const { user, token } = response.data;

      setToken(token);
      setUser(user);
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
