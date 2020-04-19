import React, { Fragment, useState, createRef, useContext } from 'react';
import AvatarChooser from './AvatarChooser';
import InputValidate from './InputValidate';
import axios from 'axios';
import { UserContext, TokenContext } from './App';
import Alert from './Alert';

export default function Signup(props) {
  const { setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);

  const formRef = createRef();
  const [view, setView] = useState(true);
  const [localUser, setLocalUser] = useState({});
  const [alert, setAlert] = useState(null);

  const validateUsername = async (username) => {
    try {
      // eslint-disable-next-line
      const regex = /^\S*$/;

      if (!regex.test(username)) {
        return {
          value: 'El nombre de usuario no debe contener espacios'
        };
      }

      const response = await axios.post('/validate/username', { username });

      return response.data ? { value: 'Este nombre de usuario ya está en uso' } : { value: null };
    } catch (error) {
      console.error(error);
    }
  };

  const validateEmail = async (email) => {
    if (email.trim() === '') {
      return { value: null };
    }

    try {
      // eslint-disable-next-line
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

      if (!regex.test(email)) {
        return { value: 'Ingresa un correo válido' };
      }

      const response = await axios.post('/validate/email', { email });

      return response.data ? { value: 'Este correo electrónico ya está en uso' } : { value: null };
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const elements = event.target.elements;

    for (const element of elements) {
      if (element.value.trim() === '') {
        return setAlert('Completa todos los campos');
      }
    }

    const user = {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value
    };

    try {
      const response = await axios.post('/users', user);
      setToken(response.data.token);
      setLocalUser(response.data.user);

      setView(!view);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnSaveAvatar = async (file, isDefault) => {
    if (isDefault) {
      return setUser(localUser);
    }

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const avatar = await axios.post('/upload/avatar', formData);

      const url = `/users/${localUser.username}/avatar`;
      const response = await axios.post(url, avatar.data.secure_url, { headers: { token } });

      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <Alert type='danger' message={alert} onClose={setAlert} />
      {view ? (
        <Fragment>
          <form onSubmit={handleFormSubmit} noValidate ref={formRef}>
            <div className='form-group'>
              <InputValidate
                type='text'
                placeholder='Nombre de usuario'
                name='username'
                onValidate={validateUsername}
              />
            </div>
            <div className='form-group'>
              <InputValidate
                type='email'
                placeholder='Correo electrónico'
                name='email'
                onValidate={validateEmail}
              />
            </div>
            <div className='form-group'>
              <InputValidate type='password' placeholder='Contraseña' name='password' />
            </div>
          </form>
          <button className='btn btn-primary btn-block' onClick={() => formRef.current.requestSubmit()}>
            Regístrate
          </button>
          <button
            type='button'
            onClick={() => props.setView(!props.view)}
            className='btn btn-link btn-sm btn-block'
          >
            Inicia sesión
          </button>
        </Fragment>
      ) : (
        <AvatarChooser onSave={handleOnSaveAvatar} />
      )}
    </Fragment>
  );
}
