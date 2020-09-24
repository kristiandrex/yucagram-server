import React, { useState, useCallback } from 'react';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Input from '../UI/Input';
import LoginLayout from './Layout';
import validateSignin from '../../helpers/validateSignin';
import { signin } from '../../redux/actions/auth';

export default function Signin() {
  const [alert, setAlert] = useState({ show: false, message: 'Nombre de usuario y/o contraseña incorrectos' });
  const dispatch = useDispatch();

  const handleOnSubmit = useCallback(async (values) => {
    try {
      const { data } = await axios.post('/api/signin', values);
      dispatch(signin(data.user, data.token));
    }

    catch (error) {
      console.warn(error.response);

      if (error.response.status === 400) {
        return setAlert((alert) => ({ ...alert, show: true }));
      }

      setAlert({ message: 'Intenta más tarde', show: true });
    }
  }, [dispatch]);

  return (
    <LoginLayout>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={handleOnSubmit}
        validate={validateSignin}
      >
        {({ handleChange, errors, touched, isSubmitting }) => (
          <Form>
            {
              alert.show && (
                <div className='alert alert-danger text-center'>
                  {alert.message}
                </div>
              )
            }
            <div className='form-group'>
              <Input
                type='text'
                name='username'
                placeholder='Nombre de usuario'
                onChange={handleChange}
                error={errors.username}
                invalid={errors.username && touched.username}
              />
            </div>
            <div className='form-group'>
              <Input
                type='password'
                name='password'
                placeholder='Contraseña'
                onChange={handleChange}
                error={errors.password}
                invalid={errors.password && touched.username}
              />
            </div>
            <button className='btn btn-primary btn-block' type='submit' disabled={isSubmitting}>
							Iniciar sesión
            </button>
            <div className='btn-group btn-block mt-3'>
              <button type='button' className='btn btn-link btn-sm'>
								¿Olvidaste la contraseña?
              </button>
              <Link className='btn btn-link btn-sm' to='/signup'>
								Regístrate
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </LoginLayout>
  );
}