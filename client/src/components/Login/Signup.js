import React, { Fragment, useCallback } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import Input from '../UI/Input';
import LoginLayout from './Layout';
import validateSignup from '../../helpers/validateSignup';
import types from '../../redux/types';

export default function Signup() {
  const dispatch = useDispatch();

  const handleOnSubmit = useCallback(async (values, { setFieldError }) => {
    try {
      const response = await axios.post('/api/signup', values);

      dispatch({
        type: types.SIGNIN,
        payload: response.data
      });
    }

    catch (error) {
      const errors = error.response.data.errors;

      if (errors.username) {
        setFieldError('username', 'Nombre de usuario no disponible');
      }

      if (errors.email) {
        setFieldError('email', 'Este correo ya está en uso');
      }
    }
  }, [dispatch]);

  return (
    <LoginLayout>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        onSubmit={handleOnSubmit}
        validate={validateSignup}
      >
        {({ handleChange, errors, touched, isSubmitting }) => (
          <Fragment>
            <Form noValidate>
              <div className='form-group'>
                <Input
                  type='text'
                  name='username'
                  placeholder='Nombre de usuario'
                  onChange={handleChange}
                  label='No debe contener espacios'
                  invalid={errors.username && touched.username}
                  error={errors.username}
                />
              </div>
              <div className='form-group'>
                <Input
                  type='email'
                  name='email'
                  placeholder='Correo electrónico'
                  onChange={handleChange}
                  invalid={errors.email && touched.email}
                  error={errors.email}
                />
              </div>
              <div className='form-group'>
                <Input
                  type='password'
                  name='password'
                  placeholder='Contraseña'
                  onChange={handleChange}
                  invalid={errors.password && touched.password}
                  error={errors.password}
                />
              </div>
              <button
                className='btn btn-primary btn-block'
                type='submit'
                disabled={isSubmitting}
              >
								Regístrate
              </button>
            </Form>
            <Link className='btn btn-link btn-sm btn-block mt-3' to='/signin'>
							Inicia sesión
            </Link>
          </Fragment>
        )}
      </Formik>
    </LoginLayout>
  );
}
