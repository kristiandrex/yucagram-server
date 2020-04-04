import React from 'react';

export default function RecoverPass(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Nombre de usuario"/>
      </div>
      <div className="form-group">
        <input type="email" className="form-control" placeholder="Correo electrónico"/>
      </div>
      <button className="btn btn-primary">Recuperar contraseña</button>
      <button type="button" className="btn btn-link btn-sm mt-3" onClick={() => props.changeView(!props.view)}>
        ¿Ya tienes una contraseña?
      </button>
    </form>
  );
}
