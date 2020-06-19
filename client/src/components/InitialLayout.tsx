import React, { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';

export default function InitialLayout() {
  const [state, setState] = useState(true);

  return (
    <div className='row no-gutters h-100 d-flex justify-content-center'>
      <div className='col-10 col-md-4 col-lg-3 d-flex align-items-center'>
        <div className='card w-100'>
          <div className='card-body shadow-sm'>
            {state ? (
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