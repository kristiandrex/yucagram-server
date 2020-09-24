import React from 'react';
import PropsTypes from 'prop-types';

export default function Layout({ children }) {
  return (
    <div className='row no-gutters h-100 d-flex justify-content-center'>
      <div className='col-10 col-md-4 col-lg-3 d-flex align-items-center'>
        <div className='card w-100'>
          <div className='card-body shadow-sm'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropsTypes.element.isRequired
};