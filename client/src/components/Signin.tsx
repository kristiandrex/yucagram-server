import React, { useState, Dispatch, SetStateAction } from 'react';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { DispatchI } from '../react-app-env';
import validateSignin from '../helpers/validateSignin';
import InvalidFeedback from './InvalidFeedback';

interface Props {
  setState: Dispatch<SetStateAction<boolean>>;
  state: boolean;
}

interface Values {
  username: string;
  password: string;
}

export default function Signin({ setState, state }: Props) {
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch<DispatchI>();

  const handleOnSubmit = async (values: Values) => {
    try {
      const response = await axios.post('/signin', values);

      dispatch({
        type: 'SIGNIN',
        payload: response.data
      });
    }

    catch (error) {
      setError(true);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={handleOnSubmit}
      validate={validateSignin}
    >
      {
        ({ handleChange, errors, touched, isSubmitting }) => (
          <Form>
            {
              error && (
                <div className="alert alert-danger text-center">Nombre de usuario y/o contraseña incorrectos</div>
              )
            }
            <div className='form-group'>
              <input
                type='text'
                className={errors.username && touched.username ? 'form-control is-invalid' : 'form-control'}
                placeholder='Nombre de usuario'
                name='username'
                onChange={handleChange}
              />
              <InvalidFeedback 
                show={(errors.username && touched.username) as boolean} 
                message={errors.username as string} 
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className={errors.password && touched.username ? 'form-control is-invalid' : 'form-control'}
                placeholder='Contraseña'
                name='password'
                onChange={handleChange}
              />
              <InvalidFeedback 
                show={(errors.password && touched.password) as boolean} 
                message={errors.password as string} 
              />
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
              <div className='btn btn-link btn-sm' onClick={() => setState(!state)}>
                Regístrate
              </div>
            </div>
          </Form>
        )
      }
    </Formik>
  );
}