import React from 'react';

export default function Alert(props) {
  if (!props.message) {
    return null;
  }

  return (
    <div className={`alert alert-${props.type} d-flex justify-content-between align-items-center`}>
      {props.message}
      <div onClick={() => props.onClose(null)} style={{ cursor: 'pointer' }}>
        <i className='material-icons'>clear</i>
      </div>
    </div>
  );
}
