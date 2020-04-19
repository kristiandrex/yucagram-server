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
              <RecoverPass view={viewPass} setView={setViewPass} />
            ) : state ? (
              <Signin view={state} setView={setState} />
            ) : (
              <Signup view={state} setView={setState} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
