import React from 'react';

export default function Signup() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Nombre de usuario" />
      </div>
      <div className="form-group">
        <input type="email" className="form-control" placeholder="Correo electrónico" />
      </div>
      <div className="form-group">
        <input type="password" className="form-control" placeholder="Contraseña" />
      </div>
      <button className="btn btn-primary">Registrarse</button>
    </form>
  );
}
