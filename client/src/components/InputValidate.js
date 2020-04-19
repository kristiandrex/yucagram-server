import React, { useState } from 'react';

export default function InputValidate(props) {
  const [error, setError] = useState({ value: null });

  const handleInput = async (event) => {
    const error = await props.onValidate(event.target.value);

    if (error.value) {
      setError(error);
    } else {
      setError({ value: null });
    }
  };

  return (
    <div className='form-group'>
      <input
        type={props.type}
        className={error.value ? 'form-control is-invalid' : 'form-control'}
        placeholder={props.placeholder}
        name={props.name}
        onBlur={props.onValidate ? handleInput : null}
      />
      {error.value && <small className='text-danger'>{error.value}</small>}
    </div>
  );
}
