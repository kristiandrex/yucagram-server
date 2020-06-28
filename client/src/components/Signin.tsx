import React, { ReactElement, useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { DispatchI } from '../react-app-env';

interface Props {
  children: ReactElement;
}

interface Error {
  username?: string;
  password?: string;
}

export default function Signin({ children }: Props) {
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch<DispatchI>();

  return (
    <Formik
      initialValues={{
        username: '',
        password: ''
      }}
      onSubmit={async (values) => {
        try {
          const response = await axios.post('/signin', values);

          dispatch({
            type: 'SIGNIN',
            payload: response.data
          });
        }

        catch (error) {
          setError(true);
          console.log(error)
        }
      }}
      validate={(values) => {
        const errors: Error = {};

        if (!values.username) {
          errors.username = "Este campo es requerido";
        }

        if (!values.password) {
          errors.password = "Este campo es requerido";
        }

        return errors;
      }}
    >
      {
        ({ handleChange, handleSubmit, errors, touched, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="alert alert-danger text-center">
                Nombre de usuario y/o contraseña incorrectos
              </div>
            )}
            <div className='form-group'>
              <input
                type='text'
                className={errors.username && touched.username ? 'form-control is-invalid' : 'form-control'}
                placeholder='Nombre de usuario'
                name='username'
                onChange={handleChange}
              />
              {errors.username && touched.username && <div className="invalid-feedback">{errors.username}</div>}
            </div>
            <div className='form-group'>
              <input
                type='password'
                className={errors.password && touched.username ? 'form-control is-invalid' : 'form-control'}
                placeholder='Contraseña'
                name='password'
                onChange={handleChange}
              />
              {errors.password && touched.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <button
              className='btn btn-primary btn-block'
              type='submit'
              disabled={isSubmitting}
            >
              Iniciar sesión
            </button>
            <div className='btn-group btn-block mt-3'>
              <button type='button' className='btn btn-link btn-sm'>
                ¿Olvidaste la contraseña?
              </button>
              {children}
            </div>
          </form>
        )
      }
    </Formik>
  );
}