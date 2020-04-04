import React, { Fragment, useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';

export default function InitialFormsSwitch(props) {
  const [state, setState] = useState(true);

  return state ? (
    <Fragment>
      <Signin />
      <div className="btn-group">
        <button className="btn btn-link btn-sm mt-3" onClick={() => props.changeView(!props.view)}>
          ¿Olvidaste la contraseña?
        </button>
        <button className="btn btn-link btn-sm mt-3" onClick={() => setState(!state)}>
          Registrate
        </button>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <Signup />
      <button className="btn btn-link btn-sm mt-3" onClick={() => setState(!state)}>
        ¿Ya tienes una cuenta? Inicia sesión
    </button>
    </Fragment>
  );
}
