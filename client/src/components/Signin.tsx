import React, {
  useContext,
  useState,
  FormEvent,
  createRef,
  ReactElement
} from 'react';

import axios from 'axios';
import { TokenContext, UserContext } from './App';
import Alert from './Alert';

interface Props {
  children: ReactElement;
}

export default function Signin(props: Props) {
  const { setToken } = useContext(TokenContext);
  const { setUser } = useContext(UserContext);
  const [alert, setAlert] = useState<string>();

  const usernameRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data = {
      username: (usernameRef.current as HTMLInputElement).value,
      password: (passwordRef.current as HTMLInputElement).value
    };

    try {
      const response = await axios.post('/signin', data);
      const { user, token } = response.data;
      setToken({ value: token });
      setUser(user);
    } catch (error) {
      setAlert(error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Alert type='danger' message={alert as string} onClose={setAlert} />
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
