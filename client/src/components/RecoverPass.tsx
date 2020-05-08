import React, { FormEvent, ReactElement } from 'react';

interface Props {
  children: ReactElement;
}

export default function RecoverPass(props: Props) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <input
          type='text'
          className='form-control'
          placeholder='Nombre de usuario'
        />
      </div>
      <div className='form-group'>
        <input
          type='email'
          className='form-control'
          placeholder='Correo electrónico'
        />
      </div>
      <button className='btn btn-primary'>Recuperar contraseña</button>
      {props.children}
    </form>
  );
}
