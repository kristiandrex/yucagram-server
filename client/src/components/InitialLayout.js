import React, { useState } from 'react';
import InitialFormsSwitch from './InitialFormsSwitch';
import RecoverPass from './RecoverPass';

export default function Initial() {
  const [view, changeView] = useState(true);

  return (
    <div className="row no-gutters h-100 d-flex justify-content-center">
      <div className="col-3 d-flex align-items-center">
        <div className="card w-100">
          <div className="card-body shadow-sm text-center">
            {
              view ? (
                <InitialFormsSwitch view={view} changeView={changeView}/>
              ) : (
                <RecoverPass view={view} changeView={changeView}/>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}