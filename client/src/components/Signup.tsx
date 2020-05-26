import React, { Fragment, FormEvent, ReactElement, useRef, useContext } from 'react';
import axios from 'axios';
import { UserContext, TokenContext } from '../context';

interface Props {
  children: ReactElement;
}

export default function Signup(props: Props) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { setUser } = useContext(UserContext);
  const { setToken } = useContext(TokenContext);

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const data = {
        username: usernameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value
      };

      const response = await axios.post('/signup/', data);
      setUser(response.data.user)
      setToken(response.data.token);
    } 
    
    catch (error) {

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
