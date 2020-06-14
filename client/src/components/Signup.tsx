import React, { Fragment, FormEvent, ReactElement, useRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

interface Props {
  children: ReactElement;
}

export default function Signup(props: Props) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const data = {
        username: usernameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value
      };

      const response = await axios.post('/signup/', data);
      
      dispatch({
        type: 'SET_TOKEN',
        payload: response.data.token
      });

      dispatch({
        type: 'SET_USER',
        payload: response.data.user
      });
    }

    catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleFormSubmit} noValidate>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Nombre de usuario'
            name='username'
            className="form-control"
            ref={usernameRef}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Correo electrónico'
            name='email'
            className="form-control"
            ref={emailRef}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Contraseña'
            name='password'
            className="form-control"
            ref={passwordRef}
          />
        </div>
        <button className='btn btn-primary btn-block'>Regístrate</button>
      </form>
      {props.children}
    </Fragment>
  );
}
