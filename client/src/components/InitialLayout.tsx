import React, { useState } from 'react';
import RecoverPass from './RecoverPass';
import Signin from './Signin';
import Signup from './Signup';

export default function InitialLayout() {
  const [state, setState] = useState(true);
  const [viewPass, setViewPass] = useState(false);

  return (
    <div className='row no-gutters h-100 d-flex justify-content-center'>
      <div className='col-3 d-flex align-items-center'>
        <div className='card w-100'>
          <div className='card-body shadow-sm'>
            {viewPass ? (
              <RecoverPass>{}</RecoverPass>
            ) : state ? (
              <Signin>
                <div 
                  className='btn btn-link btn-sm' 
                  onClick={() => setState(!state)}
                >
                  Regístrate
                </div>
              </Signin>
            ) : (
              <Signup>
                <div 
                  className='btn btn-link btn-sm btn-block'
                  onClick={() => setState(!state)}
                >
                  Inicia sesión
                </div>
              </Signup>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}