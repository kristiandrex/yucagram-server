import React, { ReactElement, Fragment } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { DispatchI } from '../react-app-env';

interface Props {
  children: ReactElement;
}

interface Fields {
  username?: string;
  email?: string;
  password?: string;
}

export default function Signup(props: Props) {
  const dispatch = useDispatch<DispatchI>();

  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: ''
      }}
      onSubmit={async (values, { setFieldError }) => {
        try {
          const response = await axios.post('/signup', values);

          dispatch({
            type: 'SIGNIN',
            payload: response.data
          });
        }

        catch (error) {
          if (error.response.status === 400) {
            const errors = error.response.data.errors;

            if (errors.username) {
              setFieldError('username', 'Nombre de usuario no disponible');
            }

            if (errors.email) {
              setFieldError('email', 'Este correo ya está en uso');
            }
          }
        }
      }}
      validate={(values) => {
        const errors: Fields = {};

        if (!values.username) {
          errors.username = "Este campo es requerido";
        }

        if (!values.email) {
          errors.email = "Este campo es requerido";
        }

        if (!values.password) {
          errors.password = "Este campo es requerido";
        }

        else if (values.password.length < 8) {
          errors.password = "Debe tener al menos 8 caracteres";
        }

        return errors;
      }}
    >
      {
        ({ handleSubmit, handleChange, errors, touched, isSubmitting }) => (
          <Fragment>
            <form onSubmit={handleSubmit} noValidate>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Nombre de usuario'
                  name='username'
                  className={errors.username && touched.username ? "form-control is-invalid" : "form-control"}
                  onChange={handleChange}
                />
                {errors.username && touched.username && (<div className="invalid-feedback">{errors.username}</div>)}
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  placeholder='Correo electrónico'
                  name='email'
                  className={errors.email && touched.email ? "form-control is-invalid" : "form-control"}
                  onChange={handleChange}
                />
                {errors.email && touched.email && (<div className="invalid-feedback">{errors.email}</div>)}
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  placeholder='Contraseña'
                  name='password'
                  className={errors.password && touched.password ? "form-control is-invalid" : "form-control"}
                  onChange={handleChange}
                />
                {errors.password && touched.password ? (
                  <div className="invalid-feedback mt-2">{errors.password}</div>
                ) : (
                  <small className="text-muted form-text mt-2">Debe tener al menos 8 caracteres</small>
                )}
              </div>
              <button
                className='btn btn-primary btn-block'
                type="submit"
                disabled={isSubmitting}
              >
                Regístrate
              </button>
            </form>
            {props.children}
          </Fragment>
        )
      }
    </Formik>
  );
}