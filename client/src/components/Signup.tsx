import React, { Fragment, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Formik, FormikHelpers, Form } from 'formik';
import { DispatchI } from '../react-app-env';
import validateSignup from '../helpers/validateSignup';
import InvalidFeedback from './InvalidFeedback';
import FormFeedback from './FormFeedback';

interface Props {
  setState: Dispatch<SetStateAction<boolean>>;
  state: boolean;
}

interface Values {
  username: string;
  email: string;
  password: string;
}

export default function Signup({ setState, state }: Props) {
  const dispatch = useDispatch<DispatchI>();

  const handleOnSubmit = async (values: Values, { setFieldError }: FormikHelpers<Values>) => {
    try {
      const response = await axios.post('/signup', values);

      dispatch({
        type: 'SIGNIN',
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
  }

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      onSubmit={handleOnSubmit}
      validate={validateSignup}
    >
      {
        ({ handleChange, errors, touched, isSubmitting }) => (
          <Fragment>
            <Form noValidate>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Nombre de usuario'
                  name='username'
                  className={errors.username && touched.username ? "form-control is-invalid" : "form-control"}
                  onChange={handleChange}
                />
                <FormFeedback
                  error={(errors.username && touched.username) as boolean}
                  invalid={errors.username as string}
                  valid="No debe contener espacios"
                />
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  placeholder='Correo electrónico'
                  name='email'
                  className={errors.email && touched.email ? "form-control is-invalid" : "form-control"}
                  onChange={handleChange}
                />
                <InvalidFeedback
                  show={(errors.email && touched.email) as boolean}
                  message={errors.email as string}
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  placeholder='Contraseña'
                  name='password'
                  className={errors.password && touched.password ? "form-control is-invalid" : "form-control"}
                  onChange={handleChange}
                />
                <FormFeedback
                  error={(errors.password && touched.password) as boolean}
                  invalid={errors.password as string}
                  valid="Debe tener al menos 8 caracteres"
                />
              </div>
              <button
                className='btn btn-primary btn-block'
                type="submit"
                disabled={isSubmitting}
              >
                Regístrate
              </button>
            </Form>
            <div className='btn btn-link btn-sm btn-block mt-3' onClick={() => setState(!state)}>
              Inicia sesión
            </div>
          </Fragment>
        )
      }
    </Formik>
  );
}