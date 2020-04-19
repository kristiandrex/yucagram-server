import React, { useContext, useState } from 'react';
import axios from 'axios';
import { TokenContext, UserContext } from './App';
import Alert from './Alert';

export default function Signin(props) {
  const { setToken } = useContext(TokenContext);
  const { setUser } = useContext(UserContext);
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      username: event.target.username.value,
      password: event.target.password.value
    };

    try {
      const response = await axios.post('/login', user);
      setToken(response.data.token);
      setUser(response.data.user);
    } catch (error) {
      setAlert(error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Alert type='danger' message={alert} onClose={setAlert} />
      <div className='form-group'>
        <input type='text' className='form-control' placeholder='Nombre de usuario' name='username' />
      </div>
      <div className='form-group'>
        <input type='password' className='form-control' placeholder='Contraseña' name='password' />
      </div>
      <button className='btn btn-primary btn-block'>Iniciar sesión</button>
      <div className='btn-group btn-block'>
        <button type='button' className='btn btn-link btn-sm'>
          ¿Olvidaste la contraseña?
        </button>
        <button className='btn btn-link btn-sm' onClick={() => props.setView(!props.view)}>
          Regístrate
        </button>
      </div>
    </form>
  );
}
